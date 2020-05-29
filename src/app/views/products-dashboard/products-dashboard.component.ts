import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { Observable } from "rxjs";
import { Product } from "src/app/shared/models/product";
import { Store } from "@ngrx/store";
import { ProductsState } from "src/app/shared/models/app-state";
import { LoadProductsAction } from "./actions";

@Component({
  selector: "app-products-dashboard",
  templateUrl: "./products-dashboard.component.html",
  styleUrls: ["./products-dashboard.component.css"]
})
export class ProductsDashboardComponent implements OnInit {
  products$: Observable<Array<Product>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  allProducts: Array<Product>;
  isLoading: boolean = true;
  searchTerm: string;
  @Output() onProductAddition = new EventEmitter(false);

  constructor(
    public productsService: ProductsService,
    private store: Store<ProductsState>
  ) {}

  ngOnInit(): void {
    this.initiateStoreSelectors();
    this.dispatchLoadProductsAction();
    this.getAllProducts();
  }

  initiateStoreSelectors = (): void => {
    this.products$ = this.store.select(store => store.products);
  };

  dispatchLoadProductsAction = (): void => {
    this.store.dispatch(new LoadProductsAction());
  };

  getAllProducts = (): void => {
    this.products$.subscribe(res => {
      if (res["products"].length > 0) {
        this.allProducts = res["products"];
        this.isLoading = false;
      }
    });
  };

  onSearchChange = (event: any) => {
    this.searchTerm = event.target.value;
  };
}
