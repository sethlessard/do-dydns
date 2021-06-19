import { Presenter } from "./Presenter";
import { HomeView } from "../view/HomeView";
import { container } from "tsyringe";
import { GetAllDomains } from "../../domain/usecase/domain/GetAllDomains";
import { GetAllSubdomainsForDomain } from "../../domain/usecase/subdomain/GetAllSubdomainsForDomain";
import { GetSettings } from "../../domain/usecase/settings/GetSettings";

export class HomeViewPresenter implements Presenter {
  private readonly getAllDomains: GetAllDomains;
  private readonly getSettingsUseCase: GetSettings;

  /**
   * Create a new HomeViewPresenter instance.
   * @param view the HomeView.
   */
  constructor(private readonly view: HomeView) {
    // build the use cases
    this.getAllDomains = container.resolve(GetAllDomains);
    this.getSettingsUseCase = container.resolve(GetSettings);

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
        if (!settings.apiKeyValid) {
          this.view.showApiKeySetup();
        } else {
          // get the the user's domains
          return this.getAllDomains
            .execute()
            .then((domains) =>
              Promise.all(
                domains.map((domain) => {
                  const getAllSubdomainsForDomain = container.resolve(
                    GetAllSubdomainsForDomain
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
