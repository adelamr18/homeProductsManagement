import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { Router } from "@angular/router";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { Product } from "src/app/shared/models/product";
import { routes, formsInfo, titles } from "../../shared/constants/defines";
@Component({
  selector: "app-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.css"]
})
export class OrderSuccessComponent implements OnInit {
  navigateButtonText: string = "";
  enableBtnFullWidth: boolean = false;
  products$: Observable<Array<Product>>;
  addedProducts: Array<Product>;
  success: string = "";
  purchaseSuccess: string = "";
  continueShopping: string = "";

  constructor(
    public navigationService: NavigationService,
    private router: Router,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.configureOrderSuccess();
    this.configureButton();
  }

  configureOrderSuccess = (): void => {
    this.success = formsInfo.success;
    this.purchaseSuccess = formsInfo.purchaseSuccess;
    this.continueShopping = titles.continueShopping;
  };

  configureButton = (): void => {
    this.navigateButtonText = titles.continueShopping;
    this.enableBtnFullWidth = false;
  };

  onRouteChange = (event: any) => {
    if (event) {
      this.router.navigate([routes.products]);
      this.navigationService.resetActivatedSteps();
    }
  };
}
