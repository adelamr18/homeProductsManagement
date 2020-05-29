import { Component, OnInit } from "@angular/core";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { ShipmentInfo } from "src/app/shared/models/shippment-info";
import { PaymentDetails } from "src/app/shared/models/payment-details";
import { Observable } from "rxjs";
import { Product } from "src/app/shared/models/product";
import { Store } from "@ngrx/store";
import { ProductsState } from "src/app/shared/models/app-state";
import { Router } from "@angular/router";
import {
  DeleteProductAction,
  UpdateAddedProducts
} from "../products-dashboard/actions";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { formsInfo, titles, routes } from "../../shared/constants/defines";

@Component({
  selector: "app-checkout-overview",
  templateUrl: "./checkout-overview.component.html",
  styleUrls: ["./checkout-overview.component.css"]
})
export class CheckoutOverviewComponent implements OnInit {
  shipmentDetails: ShipmentInfo;
  paymentDetails: PaymentDetails;
  products$: Observable<Array<Product>>;
  addedProducts: Array<Product>;
  totalPrice: number = 0;
  navigateButtonText: string = "";
  enableBtnFullWidth: boolean = false;
  editedProduct: Product;
  originalProducts: Array<Product>;
  areProductsEdited: boolean = false;
  previouslyAddedProducts: Array<Product>;
  shipping: string = "";
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  mobile: string = "";
  payment: string = "";
  cardHolder: string = "";
  iban: string = "";
  overview: string = "";
  products: string = "";
  total: string = "";

  constructor(
    public navigationService: NavigationService,
    public store: Store<ProductsState>,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.configureOverview();
    this.getShipmentDetails();
    this.getPaymentDetails();
    this.getProductsInformation();
    this.configureButton();
    this.calculateProductPrice();
  }

  configureOverview = (): void => {
    this.overview = formsInfo.overview;
    this.shipping = titles.shipping;
    this.firstName = formsInfo.firstName;
    this.lastName = formsInfo.lastName;
    this.address = formsInfo.address;
    this.mobile = formsInfo.mobile;
    this.payment = formsInfo.payment;
    this.cardHolder = formsInfo.cardHolder;
    this.iban = formsInfo.iban;
    this.products = titles.products;
    this.total = titles.total;
  };

  getShipmentDetails = (): void => {
    this.shipmentDetails = this.navigationService.getShipmentDetails();
  };

  getPaymentDetails = (): void => {
    this.paymentDetails = this.navigationService.getPaymentDetails();
  };

  getProductsInformation = (): void => {
    this.products$ = this.store.select(store => store.products);
    this.products$.subscribe(res => {
      this.addedProducts = JSON.parse(
        JSON.stringify([...res["addedProducts"]])
      );
      this.originalProducts = JSON.parse(JSON.stringify([...res["products"]]));
    });
  };

  calculatePriceOnChange = (event: any, product: any): void => {
    const typedQuantity = event.target.value;
    this.areProductsEdited = true;
    if (typedQuantity) {
      const originalProduct = this.originalProducts.find(
        (res: Product) => res.id === product.id
      );
      let selectedProduct = this.addedProducts.find(
        (res: Product) => res.id === product.id
      );
      selectedProduct.quantity = parseInt(product.quantity);
      selectedProduct.price =
        Math.ceil(selectedProduct.quantity * originalProduct.price * 100) / 100;
      this.editedProduct = selectedProduct;
    }
    if (!typedQuantity) product.price = 0;
    this.calulateTotalPrice();
  };

  calulateTotalPrice = (): void => {
    this.totalPrice = this.addedProducts
      .map((product: Product) => product.price)
      .reduce((a, b) => {
        return Math.ceil(a + b);
      }, 0);
  };

  onRouteChange = (event: boolean) => {
    if (event) {
      this.router.navigate([routes.success]);
      this.navigationService.stepFourActive = true;
      this.navigationService.stepFiveActive = true;
      if (this.areProductsEdited)
        this.store.dispatch(new UpdateAddedProducts(this.editedProduct));
      this.productsService.setPreviousAddedProducts(
        JSON.parse(JSON.stringify([...this.addedProducts]))
      );
    }
  };

  configureButton = (): void => {
    this.navigateButtonText = titles.submit;
    this.enableBtnFullWidth = true;
  };

  deleteProduct = (id: string): void => {
    this.store.dispatch(new DeleteProductAction(id));
    if (this.addedProducts.length === 0) {
      this.totalPrice = 0;
      this.productsService.setPreviousAddedProducts([]);
    }
    this.calulateTotalPrice();
  };

  calculateProductPrice = (): void => {
    this.addedProducts = this.addedProducts.map((product: Product) =>
      Object.assign({}, product, {
        price: Math.ceil(product.quantity * product.price * 100) / 100
      })
    );
    this.calulateTotalPrice();
  };
}
