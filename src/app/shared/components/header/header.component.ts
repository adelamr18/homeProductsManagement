import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../models/app-state";
import { Observable } from "rxjs";
import { Product } from "../../models/product";
import { InteractionService } from "../../services/interaction/interaction.service";
import { NavigationService } from "../../services/navigation/navigation.service";
import { Router } from "@angular/router";
import { ProductsService } from "../../services/products/products.service";
import { PreserveAddedProducts } from "src/app/views/products-dashboard/actions";
import { titles, routes } from "../../constants/defines";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  products$: Observable<Array<Product>>;
  addedProducts: Array<Product>;
  addedProductsCount: number = 0;
  previouslyAddedProducts: Array<Product>;
  headerTitle: string = "";
  @Output() onProductAddition = new EventEmitter();

  constructor(
    public store: Store<ProductsState>,
    public interactionService: InteractionService,
    public navigationService: NavigationService,
    private router: Router,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.configureHeader();
    this.getPreviousAddedProducts();
    this.getAddedProducts();
  }

  configureHeader = (): void => {
    this.headerTitle = titles.header;
  };

  getAddedProducts = (): void => {
    this.interactionService.isProductAdded.subscribe((res: boolean) => {
      if (res) {
        this.products$.subscribe(res => {
          if (!this.previouslyAddedProducts)
            this.addedProducts = res["addedProducts"];
          this.addedProductsCount = this.getProductsCount(this.addedProducts);
          this.onProductAddition.emit(this.addedProducts);
        });
      }
    });
  };

  getProductsCount = (products: Array<Product>): any => {
    return products
      .map((product: Product) => product.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);
  };

  showProductsModal = (): void => {
    this.interactionService.isShoppingCartClicked.next(
      !this.interactionService.isShoppingCartClicked.value
    );
    this.interactionService.confirmHeaderClicked();
  };

  navigateToDashboard = (): void => {
    this.router.navigate([routes.products]);
    this.navigationService.resetActivatedSteps();
  };

  getPreviousAddedProducts = (): void => {
    this.products$ = this.store.select(store => store.products);
    this.previouslyAddedProducts = this.productsService.getPreviousAddedProducts();
    if (this.previouslyAddedProducts) {
      this.store.dispatch(
        new PreserveAddedProducts(this.previouslyAddedProducts)
      );
      this.products$.subscribe(res => {
        this.addedProducts = res["addedProducts"];
        this.addedProductsCount = this.getProductsCount(this.addedProducts);
        this.onProductAddition.emit(this.addedProducts);
      });
    }
  };
}
