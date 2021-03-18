import { Presenter } from "./Presenter";
import { HomeView } from "../view/HomeView";
import {container} from "tsyringe";
import { GetAllDomainsUseCase } from "../../domain/usecase/domain/GetAllDomainsUseCase";

export class HomeViewPresenter implements Presenter {

  private readonly getAllDomains: GetAllDomainsUseCase;

  /**
   * Create a new HomeViewPresenter instance.
   * @param view the HomeView.
   */
  constructor(
    private readonly view: HomeView
  ) {
    // build the use cases
    this.getAllDomains = container.resolve(GetAllDomainsUseCase);
  }

  /**
   * Initialize the view.
   */
  initializeView(): void {
    // get the domains
    this.getAllDomains.execute().then(domains => this.view.showDomains(domains));
  }
}
