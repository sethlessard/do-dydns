import { Presenter } from "./Presenter";
import { HomeView } from "../view/HomeView";
import { container } from "tsyringe";
import { GetAllDomainsUseCase } from "../../domain/usecase/domain/GetAllDomainsUseCase";
import { GetAllSubdomainsForDomainUseCase } from "../../domain/usecase/subdomain/GetAllSubdomainsForDomainUseCase";
import { GetSettingsUseCase } from "../../domain/usecase/settings/GetSettingsUseCase";

export class HomeViewPresenter implements Presenter {
  private readonly getAllDomains: GetAllDomainsUseCase;
  private readonly getSettingsUseCase: GetSettingsUseCase;

  /**
   * Create a new HomeViewPresenter instance.
   * @param view the HomeView.
   */
  constructor(private readonly view: HomeView) {
    // build the use cases
    this.getAllDomains = container.resolve(GetAllDomainsUseCase);
    this.getSettingsUseCase = container.resolve(GetSettingsUseCase);

    // binding
    this.initializeView = this.initializeView.bind(this);
  }

  /**
   * Initialize the view.
   */
  initializeView(): void {
    // load the settings and verify that the user's digital ocean api key has been set
    this.getSettingsUseCase
      .execute()
      .then((settings) => {
        if (!settings.apiKey || settings.apiKey.length === 0) {
          this.view.showApiKeySetup();
        } else {
          // get the the user's domains
          return this.getAllDomains
            .execute()
            .then((domains) =>
              Promise.all(
                domains.map((domain) => {
                  const getAllSubdomainsForDomain = container.resolve(
                    GetAllSubdomainsForDomainUseCase
                  );
                  getAllSubdomainsForDomain.setRequestParams(domain.name);
                  return getAllSubdomainsForDomain
                    .execute()
                    .then((subdomains) => ({ domain, subdomains }));
                })
              )
            )
            .then((domainsAndSubdomains) =>
              this.view.showDomainsAndSubdomains(domainsAndSubdomains)
            );
        }
      })
      .catch((error) => this.view.showError(error?.message));
  }
}
