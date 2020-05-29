import * as fromReducer from "./reducer";
import {
  AddProductAction,
  DeleteProductAction,
  LoadProductsAction,
  LoadProductsSuccessAction,
  LoadProductsFailureAction,
  UpdateAddedProducts,
  PreserveAddedProducts
} from "./actions";

describe("productsReducer", () => {
  describe("unknown action", () => {
    it("should return the default state", () => {
      const { initialState } = fromReducer;
      const action = {
        type: null
      };
      const state = fromReducer.productsReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe("LOAD_PRODUCTS action", () => {
    it("should set loading to true", () => {
      const { initialState } = fromReducer;
      const action = new LoadProductsAction();
      const state = fromReducer.productsReducer(initialState, action);
      expect(state.loading).toBe(true);
    });
  });

  describe("LOAD_PRODUCTS_FAILURE action", () => {
    it("should set loading to false and return an error object when an error occurs", () => {
      const { initialState } = fromReducer;
      const payload = new Error("Error has occured");
      const action = new LoadProductsFailureAction(payload);
      const state = fromReducer.productsReducer(initialState, action);
      expect(state.error).toBeTruthy();
      expect(state.loading).toEqual(false);
    });
  });

  describe("LOAD_PRODUCTS_SUCCESS action", () => {
    it("should set loading to false and populate products from the array", () => {
      const products = [
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
        }
      ];
      const { initialState } = fromReducer;
      const action = new LoadProductsSuccessAction(products);
      const state = fromReducer.productsReducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.products).toEqual(products);
    });
  });

  describe("ADD_PRODUCT action", () => {
    it("should set loading to false and add one product to the state addedProducts array", () => {
      const addedProduct = {
        id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
        productName: "Board",
        price: 80.23,
        quantity: 2
      };
      const { initialState } = fromReducer;
      const action = new AddProductAction(addedProduct);
      const state = fromReducer.productsReducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.addedProducts).toEqual([addedProduct]);
    });
  });

  describe("DELETE_PRODUCT action", () => {
    it(`should set loading to false,delete a product having a certain id from the addedProducts
    which will result in the addedProducts array state to be empty`, () => {
      const deletedProductId = "e7e6d39e-9a24-11ea-bb37-0242ac130002";
      const productsState = {
        products: [],
        addedProducts: [
          {
            id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
            productName: "Board",
            price: 80.23,
            quantity: 2
          }
        ],
        loading: false,
        error: undefined
      };
      const action = new DeleteProductAction(deletedProductId);
      const state = fromReducer.productsReducer(productsState, action);
      expect(state.loading).toEqual(false);
      expect(state.addedProducts).toEqual([]);
    });
  });

  describe("UPDATE_ADDED_PRODUCTS action", () => {
    it(`should set loading to false and update a product quantity in the addedProducts state array`, () => {
      const editedProduct = {
        id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
        productName: "Board",
        price: 80.23,
        quantity: 4
      };
      const productsState = {
        products: [],
        addedProducts: [
          {
            id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
            productName: "Board",
            price: 80.23,
            quantity: 2
          }
        ],
        loading: false,
        error: undefined
      };
      const action = new UpdateAddedProducts(editedProduct);
      const state = fromReducer.productsReducer(productsState, action);
      expect(state.loading).toEqual(false);
      expect(state.addedProducts).toEqual([
        {
          id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
          productName: "Board",
          price: 80.23,
          quantity: 4
        }
      ]);
    });
  });

  describe("PRESERVE_ADDED_PRODUCTS action", () => {
    it(`should set loading to false and  set save the users selected products to the addedProducts state array
    to remember the users selected product when the app is refreshed again`, () => {
      const savedUserProducts = [
        {
          id: "e7e6d39e-9a24-11ea-bb37-0242ac130002",
          productName: "Board",
          price: 80.23,
          quantity: 2
        },
        {
          id: "dd495e7a-9a24-11ea-bb37-0242ac130002",
          productName: "Chair",
          price: 80.23,
          quantity: 9
        }
      ];
      const productsState = {
        products: [],
        addedProducts: [],
        loading: false,
        error: undefined
      };
      const action = new PreserveAddedProducts(savedUserProducts);
      const state = fromReducer.productsReducer(productsState, action);
      expect(state.loading).toEqual(false);
      expect(state.addedProducts).toEqual(savedUserProducts);
    });
  });
});
