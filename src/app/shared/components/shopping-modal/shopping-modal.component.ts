import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Product } from "../../models/product";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../models/app-state";
import {
  DeleteProductAction,
  UpdateAddedProducts
} from "src/app/views/products-dashboard/actions";
import { Router } from "@angular/router";
import { InteractionService } from "../../services/interaction/interaction.service";
import { NavigationService } from "../../services/navigation/navigation.service";
import { ProductsService } from "../../services/products/products.service";
import { titles, routes } from "../../constants/defines";

@Component({
  selector: "shopping-modal",
  templateUrl: "./shopping-modal.component.html",
  styleUrls: ["./shopping-modal.component.css"]
})
export class ShoppingModalComponent implements OnInit {
  showProductsCart: boolean = false;
  isHeaderClickedForFirstTime: boolean = false;
  @Input() addedProducts: Array<Product>;
  selectedProducts: Array<Product>;
  quantity: string = "";
  totalPrice: number = 0;
  navigateButtonText: string = "";
  basket: string = "";
  addProducts: string = "";
  total: string = "";

  constructor(
    public interactionService: InteractionService,
    public store: Store<ProductsState>,
    private router: Router,
    public navigationService: NavigationService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.configureShoppingModal();
    this.toggleShoppingModal();
  }

  configureShoppingModal = (): void => {
    this.navigateButtonText = titles.order;
    this.basket = titles.basket;
    this.addProducts = titles.addProducts;
    this.total = titles.total;
  };

  toggleShoppingModal = (): void => {
    this.interactionService.isShoppingCartClicked.subscribe(res => {
      this.showProductsCart = res;
    });
    this.interactionService.isHeaderClicked.subscribe(res => {
      this.isHeaderClickedForFirstTime = res;
    });
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addedProducts.currentValue && changes.addedProducts) {
      this.selectedProducts = JSON.parse(
        JSON.stringify([...changes.addedProducts.currentValue])
      );
      this.calculateProductPrice();
    }
  }

  calculateProductPrice = (): void => {
    this.selectedProducts = this.selectedProducts.map((product: Product) =>
      Object.assign({}, product, {
        price: Math.ceil(product.quantity * product.price * 100) / 100
      })
    );
    this.calulateTotalPrice();
  };

  deleteProduct = (id: string): void => {
    this.store.dispatch(new DeleteProductAction(id));
    if (this.addedProducts.length === 1) {
      this.totalPrice = 0;
      this.productsService.deletePreviousAddedProducts();
      this.productsService.setPreviousAddedProducts([]);
    }
    this.calulateTotalPrice();
  };

  calculatePriceOnChange = (event: any, product: any): void => {
    const typedQuantity = event.target.value;
    if (typedQuantity) {
      let selectedProduct = this.selectedProducts.find(
        (product: Product) => product.id === product.id
      );
      selectedProduct.quantity = parseInt(product.quantity);
      selectedProduct.price =
        Math.ceil(selectedProduct.quantity * selectedProduct.price * 100) / 100;
      this.store.dispatch(new UpdateAddedProducts(selectedProduct));
    }
    if (!typedQuantity) product.price = 0;
    this.calulateTotalPrice();
  };

  calulateTotalPrice = (): void => {
    this.totalPrice = this.selectedProducts
      .map((product: Product) => product.price)
      .reduce((a, b) => {
        return Math.ceil(a + b);
      }, 0);
  };

  onRouteChange = (event: boolean) => {
    if (event) {
      this.router.navigate([routes.shipping]);
      this.navigationService.stepOneActive = true;
    }
  };
}
