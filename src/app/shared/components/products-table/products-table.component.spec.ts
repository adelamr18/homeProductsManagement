import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductsTableComponent } from "./products-table.component";
import { InteractionService } from "../../services/interaction/interaction.service";
import { InteractionMockService } from "../../mocks/interaction/interaction-mock.service";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AddProductAction } from "src/app/views/products-dashboard/actions";

describe("ProductsTableComponent", () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let storeMock;
  const initialState = {
    products: {
      products: [],
      addedProducts: [{ id: 1, productName: "aaa", quantity: 3, price: 23 }],
      loading: false,
      error: undefined
    }
  };

  const productsData = [
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsTableComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: InteractionService, useClass: InteractionMockService },
        MockStore,
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    component.productsData = productsData;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to set wasProductAdded to false and prevStoredIds to an empty array when
   resetAddedProductsInfo function is invoked `, () => {
    component.resetAddedProductsInfo();
    expect(component.wasProductAdded).toBeFalsy();
    expect(component.prevStoredIds).toEqual([]);
  });

  it(`should expect to set productsData and to call saveProductsData when resetProductsMapping is invoked  `, () => {
    const saveProductsData = spyOn(component, "saveProductsData");
    component.resetProductsMapping();
    expect(component.productsData).toBeTruthy();
    expect(saveProductsData).toHaveBeenCalled();
  });

  it(`should expect to add a product id to the prevStoredIds array,dispatch a new AddProductAction when add
  product function is invoked with a product id that hasnt been added yet to prevStoredIds array   `, () => {
    component.prevStoredIds = [];
    component.wasProductAdded = false;
    spyOn(component.store, "dispatch").and.callThrough();
    const product = {
      id: "1",
      productName: "Chair",
      quantity: 3,
      price: 14.23
    };
    component.addProduct(product);
    expect(component.prevStoredIds).toEqual(["1"]);
    expect(component.store.dispatch).toHaveBeenCalledTimes(1);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new AddProductAction(product)
    );
  });

  it(`should expect to return true when filterProductsByName function is invoked with a searchTerm that equals one of 
  the products names that are displayed on the products table `, () => {
    const product = {
      id: "1",
      productName: "Chair",
      quantity: 3,
      price: 14.23
    };
    const searchTerm = "chair";
    const result = component.filterProductsByName(product, searchTerm);
    expect(result).toBe(true);
  });

  it(`should expect to call resetProductsMapping to display the sorted products by price which are
  displayed on the table when sortColoumnByPrice function is invoked   `, () => {
    const resetProductsMapping = spyOn(component, "resetProductsMapping");
    component.sortColoumnByPrice();
    expect(resetProductsMapping).toHaveBeenCalled();
  });

  it(`should expect to set edited product quantity inside the products array to the products quantity input box
 which is entered by the user when onQuantityChange function is invoked  `, () => {
    const event = {
      target: {
        value: "5"
      }
    };
    const clickedProduct = {
      id: "1",
      productName: "Chair",
      quantity: 2,
      price: 14.23
    };
    component.products = [
      { id: "1", productName: "Chair", quantity: 2, price: 14.23 }
    ];
    component.onQuantityChange(event, clickedProduct);
    expect(component.products).toEqual([
      {
        id: "1",
        productName: "Chair",
        quantity: 5,
        price: 14.23
      }
    ]);
  });
});
