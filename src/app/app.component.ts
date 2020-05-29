import { Component } from "@angular/core";
import { Product } from "./shared/models/product";
import { NavigationService } from "./shared/services/navigation/navigation.service";
import { Router } from "@angular/router";
import { ProductsService } from "./shared/services/products/products.service";
import { routes } from "./shared/constants/defines";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  addedProducts: Array<Product>;
  title = "manage-user-products";

  constructor(
    public navigationService: NavigationService,
    private router: Router,
    public productsService: ProductsService
  ) {}
  ngOnInit(): void {}

  onProductAddition = (event: any): void => {
    this.addedProducts = event;
  };

  onStepOneClick = (): void => {
    if (this.navigationService.stepOneActive)
      this.router.navigate([routes.products]);
  };

  onStepTwoClick = (): void => {
    if (this.navigationService.stepTwoActive)
      this.router.navigate([routes.shipping]);
  };

  onStepThreeClick = (): void => {
    if (this.navigationService.stepThreeActive)
      this.router.navigate([routes.payment]);
  };

  onStepFourClick = (): void => {
    if (this.navigationService.stepFourActive)
      this.router.navigate([routes.overview]);
  };

  onStepFiveClick = (): void => {
    if (this.navigationService.stepFourActive) {
      this.router.navigate([routes.success]);
    }
  };
}
