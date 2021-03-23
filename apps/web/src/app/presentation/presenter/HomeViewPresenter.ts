import { Presenter } from "./Presenter";
import { HomeView } from "../view/HomeView";
import { container } from "tsyringe";
import { GetAllDomainsUseCase } from "../../domain/usecase/domain/GetAllDomainsUseCase";
import { GetAllSubdomainsForDomainUseCase } from "../../domain/usecase/subdomain/GetAllSubdomainsForDomainUseCase";

export class HomeViewPresenter implements Presenter {
  private readonly getAllDomains: GetAllDomainsUseCase;

  /**
   * Create a new HomeViewPresenter instance.
   * @param view the HomeView.
   */
  constructor(private readonly view: HomeView) {
    // build the use cases
    this.getAllDomains = container.resolve(GetAllDomainsUseCase);

    // binding
    this.initializeView = this.initializeView.bind(this);
  }

  /**
   * Initialize the view.
   */
  initializeView(): void {
    // get the domains
    // this.getAllDomains.execute().then(domains => this.view.showDomains(domains));
    this.getAllDomains
      .execute()
      .then((domains) => {
        return Promise.all(
          domains.map((domain) => {
            const getAllSubdomainsForDomain = container.resolve(
              GetAllSubdomainsForDomainUseCase
            );
            getAllSubdomainsForDomain.setRequestParams(domain.name);
            return getAllSubdomainsForDomain
              .execute()
              .then((subdomains) => ({ domain, subdomains }));
          })
        ).then((domainsAndSubdomains) =>
          this.view.showDomainsAndSubdomains(domainsAndSubdomains)
        );
      })
      .catch((error) => this.view.showError(error?.message));
  }
}
