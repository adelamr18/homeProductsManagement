import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InteractionMockService {
  isProductAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isShoppingCartClicked: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  isHeaderClicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  confirmHeaderClicked = (): void => this.isHeaderClicked.next(true);

  toggleShoppingCartModal = (): void =>
    this.isShoppingCartClicked.next(!this.isShoppingCartClicked.value);

  confirmProductAddition = (): void => this.isProductAdded.next(true);
}
