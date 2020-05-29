import { environment } from "src/environments/environment";

export const API = {
  products: {
    availableProducts: environment.apiBaseUrl + "/api/products"
  }
};
