import { Presenter } from "./Presenter";
import { SubdomainsView } from "../view/SubdomainsView";
import { GetAllSubdomainsForDomainUseCase } from "../../domain/usecase/subdomain/GetAllSubdomainsForDomainUseCase";
import { container } from "tsyringe";

export class SubdomainsViewPresenter implements Presenter {
  private readonly getAllSubdomainsForDomain: GetAllSubdomainsForDomainUseCase;
  private domain: string;

  /**
   * Create a new SubdomainsViewPresenter instance.
   * @param view the view.
   */
  constructor(private readonly view: SubdomainsView) {
    this.getAllSubdomainsForDomain = container.resolve(
      GetAllSubdomainsForDomainUseCase
    );
  }

  /**
   * Initialize the SubdomainsView.
   */
  initializeView = (): void => {
    if (!this.domain) {
      console.error("You forgot to call setDomain()!");
      return;
    }
    console.log("Getting the subdomains");
    this.getAllSubdomainsForDomain.setRequestParams(this.domain);
    this.getAllSubdomainsForDomain
      .execute()
      .then((subdomains) => this.view.showSubdomains(subdomains))
      .catch((error) => this.view.showError(error?.message));
  };

  /**
   * Set the domain.
   * @param domain the fully qualified domain.
   */
  setDomain = (domain: string): void => {
    this.domain = domain;
  };
}
