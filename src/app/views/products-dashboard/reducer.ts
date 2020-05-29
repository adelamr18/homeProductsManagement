import { ProductsState } from "../../shared/models/app-state";
import { Product } from "../../shared/models/product";
import { ProductAction, ProductsActionsTypes } from "./actions";

export const initialState: ProductsState = {
  products: [],
  addedProducts: [],
  loading: false,
  error: undefined
};
export const productsReducer = (
  state = initialState,
  action: ProductAction
) => {
  switch (action.type) {
    case ProductsActionsTypes.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true
      };
    }

    case ProductsActionsTypes.LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload
      };
    }

    case ProductsActionsTypes.LOAD_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case ProductsActionsTypes.ADD_PRODUCT: {
      return {
        ...state,
        addedProducts: state.addedProducts.concat(action.payload),
        loading: false
      };
    }

    case ProductsActionsTypes.DELETE_PRODUCT:
      const productsAdded = JSON.parse(
        JSON.stringify([...state.addedProducts])
      );
      const deletedProduct = state.addedProducts.findIndex(
        (res: Product) => res.id === action.payload
      );
      productsAdded.splice(deletedProduct, 1);
      return {
        ...state,
        addedProducts: productsAdded,
        loading: false
      };

    case ProductsActionsTypes.UPDATE_ADDED_PRODUCTS:
      const editedProduct = action.payload;
      const addedProducts = JSON.parse(
        JSON.stringify([...state.addedProducts])
      );
      addedProducts.map((product: Product) => {
        if (product.id === editedProduct.id) {
          product.quantity = editedProduct.quantity;
          return product;
        }
        return product;
      });
      return {
        ...state,
        addedProducts
      };

    case ProductsActionsTypes.PRESERVE_ADDED_PRODUCTS:
      return {
        ...state,
        addedProducts: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
