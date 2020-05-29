import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../../constants/routes-config";
import { delay } from "rxjs/operators";
import { Product } from "../../models/product";
import { BehaviorSubject, Subject, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  addedProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  previouslyAddedProducts: Array<Product>;

  constructor(private http: HttpClient) {}

  getAllProducts = (): Observable<Product[]> => {
    return this.http
      .get<Product[]>(API.products.availableProducts)
      .pipe(delay(1000));
  };

  setPreviousAddedProducts = (addedProducts: Array<Product>) => {
    this.previouslyAddedProducts = addedProducts;
    localStorage.setItem(
      "addedProductsValues",
      JSON.stringify(this.previouslyAddedProducts)
    );
  };

  getPreviousAddedProducts() {
    return JSON.parse(localStorage.getItem("addedProductsValues"));
  }

  deletePreviousAddedProducts(): void {
    localStorage.setItem("addedProductsValues", JSON.stringify([]));
  }
}
