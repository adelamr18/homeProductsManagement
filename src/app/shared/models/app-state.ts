import { Product } from "../models/product";

export interface ProductsState {
  products: Product[];
  addedProducts: Product[];
  loading: boolean;
  error: Error;
}
