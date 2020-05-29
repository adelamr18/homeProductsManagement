import { Action } from "@ngrx/store";
import { Product } from "../../shared/models/product";

export enum ProductsActionsTypes {
  ADD_PRODUCT = "[PRODUCTS] Add Product",
  DELETE_PRODUCT = "[PRODUCTS] Delete Product",
  LOAD_PRODUCTS = "[PRODUCTS] Load Products",
  LOAD_PRODUCTS_SUCCESS = "[PRODUCTS] Load Products Success",
  LOAD_PRODUCTS_FAILURE = "[PRODUCTS] Load Products Failure",
  UPDATE_ADDED_PRODUCTS = "[PRODUCTS] Update Added Products",
  PRESERVE_ADDED_PRODUCTS = "[PRODUCTS] Preserve Added Products"
}

export class AddProductAction implements Action {
  readonly type = ProductsActionsTypes.ADD_PRODUCT;
  constructor(public payload: Product) {}
}

export class DeleteProductAction implements Action {
  readonly type = ProductsActionsTypes.DELETE_PRODUCT;
  constructor(public payload: string) {}
}

export class LoadProductsAction implements Action {
  readonly type = ProductsActionsTypes.LOAD_PRODUCTS;
}

export class LoadProductsSuccessAction implements Action {
  readonly type = ProductsActionsTypes.LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Array<Product>) {}
}

export class LoadProductsFailureAction implements Action {
  readonly type = ProductsActionsTypes.LOAD_PRODUCTS_FAILURE;
  constructor(public payload: Error) {}
}

export class UpdateAddedProducts implements Action {
  readonly type = ProductsActionsTypes.UPDATE_ADDED_PRODUCTS;
  constructor(public payload: Product) {}
}

export class PreserveAddedProducts implements Action {
  readonly type = ProductsActionsTypes.PRESERVE_ADDED_PRODUCTS;
  constructor(public payload: Array<Product>) {}
}

export type ProductAction =
  | AddProductAction
  | DeleteProductAction
  | LoadProductsAction
  | LoadProductsFailureAction
  | LoadProductsSuccessAction
  | UpdateAddedProducts
  | PreserveAddedProducts;
