import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../../models/product";
import { of } from "rxjs/internal/observable/of";

@Injectable({
  providedIn: "root"
})
export class ProductsMockService {
  addedProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  previouslyAddedProducts: Array<Product>;
  constructor() {}

  productsData = [
    {
      id: "dd495e7a-9a24-11ea-bb37-0242ac130002",
      productName: "Chair",
      price: 40.32,
      quantity: 1
    },
    {
      id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
      productName: "Board",
      price: 80.23,
      quantity: 2
    },
    {
      id: "f4791de2-9a24-11ea-bb37-0242ac130002",
      productName: "Table",
      price: 90.23,
      quantity: 1
    },
    {
      id: "18aa97fe-9a25-11ea-bb37-0242ac130002",
      productName: "Bed",
      price: 150.34,
      quantity: 3
    },
    {
      id: "21a2603a-9a25-11ea-bb37-0242ac130002",
      productName: "Closet",
      price: 67.89,
      quantity: 3
    }
  ];

  getAllProducts = (): Observable<Product[]> => {
    return of(this.productsData);
  };

  getPreviousAddedProducts() {
    return [
      {
        productName: "Chair",
        id: "1",
        price: 34,
        quantity: 3
      }
    ];
  }
  deletePreviousAddedProducts(): void {
    localStorage.setItem("addedProductsValues", JSON.stringify([]));
  }

  setPreviousAddedProducts = (addedProducts: Array<Product>) => {
    this.previouslyAddedProducts = addedProducts;
    localStorage.setItem(
      "addedProductsValues",
      JSON.stringify(this.previouslyAddedProducts)
    );
  };
}
