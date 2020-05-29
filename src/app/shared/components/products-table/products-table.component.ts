import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Product } from "../../models/product";
import { AddProductAction } from "../../../views/products-dashboard/actions";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../models/app-state";
import { Observable } from "rxjs";
import { InteractionService } from "../../services/interaction/interaction.service";
import { titles, errors } from "../../constants/defines";

@Component({
  selector: "products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.css"]
})
export class ProductsTableComponent implements OnInit {
  @Input() productsData: Array<Product>;
  @Input() searchTerm: string;
  products: Array<Product> = [];
  isDescendingOrder: boolean = false;
  showShoppingModal: boolean = false;
  prevStoredIds: Array<string> = [];
  wasProductAdded: boolean = false;
  products$: Observable<Array<Product>>;
  addedProducts: Array<Product> = [];
  tableId: string = "";
  productName: string = "";
  price: string = "";
  quantity: string = "";
  alreadyAdded: string = "";

  constructor(
    public store: Store<ProductsState>,
    public interactionService: InteractionService
  ) {}

  ngOnInit(): void {
    this.configureTable();
    this.saveProductsData();
  }

  configureTable = (): void => {
    this.tableId = titles.tableId;
    this.productName = titles.productName;
    this.price = titles.price;
    this.quantity = titles.quantity;
    this.alreadyAdded = errors.alreadyAdded;
  };

  saveProductsData = (): void => {
    this.products = JSON.parse(JSON.stringify([...this.productsData]));
  };

  onQuantityChange = (event: any, clickedProduct: Product): void => {
    const typedQuantity = event.target.value;
    if (typedQuantity) {
      this.products = this.products.map((product: Product) => {
        if (product.id === clickedProduct.id) {
          product.quantity = parseInt(typedQuantity);
        }
        return product;
      });
      this.resetProductsMapping();
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchTerm) {
      const searchTerm = changes.searchTerm.currentValue;
      if (searchTerm) {
        this.productsData = this.productsData.filter((product: Product) => {
          const filterByName = this.filterProductsByName(product, searchTerm);
          return filterByName;
        });
      }
      if (searchTerm === "") this.resetProductsMapping();
    }
  }

  filterProductsByName = (product: Product, searchTerm: string): boolean => {
    return product.productName.toLowerCase().includes(searchTerm);
  };

  sortColoumnByPrice = (): void => {
    const sortTerm = "price";
    this.products = this.products.sort((a: Product, b: Product) => {
      if (a[sortTerm] < b[sortTerm]) return -1;
      if (a[sortTerm] > b[sortTerm]) return 1;
      return 0;
    });
    if (this.isDescendingOrder) this.products.reverse();
    this.isDescendingOrder = !this.isDescendingOrder;
    this.resetProductsMapping();
  };

  addProduct = (product: Product): void => {
    this.checkIfProductWasAdded(product);
    if (!this.wasProductAdded) {
      this.prevStoredIds = this.prevStoredIds.concat(product.id);
      this.store.dispatch(new AddProductAction(product));
      this.interactionService.confirmProductAddition();
    }
  };

  resetProductsMapping = (): void => {
    this.productsData = this.products;
    this.saveProductsData();
  };

  checkIfProductWasAdded = (product: Product): void => {
    this.wasProductAdded = this.prevStoredIds.includes(product.id);
    this.products$ = this.store.select(store => store.products);
    this.products$.subscribe(res => {
      this.addedProducts = res["addedProducts"];
      if (this.addedProducts.length === 0) this.resetAddedProductsInfo();
    });
  };

  resetAddedProductsInfo = (): void => {
    this.wasProductAdded = false;
    this.prevStoredIds = [];
  };
}
