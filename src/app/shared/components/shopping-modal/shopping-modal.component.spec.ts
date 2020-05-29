import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { Router } from "@angular/router";
import { InteractionService } from "../../services/interaction/interaction.service";
import { InteractionMockService } from "../../mocks/interaction/interaction-mock.service";
import { NavigationService } from "../../services/navigation/navigation.service";
import { NavigationMockService } from "../../mocks/navigation/navigation-mock.service";
import { ProductsService } from "../../services/products/products.service";
import { ProductsMockService } from "../../mocks/products/products-mock.service";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import {
  DeleteProductAction,
  UpdateAddedProducts
} from "src/app/views/products-dashboard/actions";
import { ShoppingModalComponent } from "./shopping-modal.component";

describe("ShoppingModalComponent", () => {
  let component: ShoppingModalComponent;
  let fixture: ComponentFixture<ShoppingModalComponent>;
  let storeMock;
  const initialState = {
    products: {
      products: [],
      addedProducts: [{ id: 1, productName: "aaa", quantity: 3, price: 23 }],
      loading: false,
      error: undefined
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingModalComponent],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        { provide: Store, useValue: storeMock },
        { provide: InteractionService, useClass: InteractionMockService },
        { provide: NavigationService, useClass: NavigationMockService },
        { provide: ProductsService, useClass: ProductsMockService },

        MockStore,
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to dispatch a new DeleteProductAction when deleteProduct is invoked with an
   id that needs to be deleted having 2 or more products in the addedProducts array  `, () => {
    const id = "2";
    spyOn(component.store, "dispatch").and.callThrough();
    component.addedProducts = [
      {
        id: "1",
        productName: "Chair",
        quantity: 3,
        price: 14.23
      },
      {
        id: "2",
        productName: "Table",
        quantity: 1,
        price: 14.23
      }
    ];
    component.selectedProducts = [
      {
        id: "1",
        productName: "Chair",
        quantity: 3,
        price: 14.23
      },
      {
        id: "2",
        productName: "Table",
        quantity: 1,
        price: 14.23
      }
    ];
    component.deleteProduct(id);
    expect(component.store.dispatch).toHaveBeenCalledTimes(1);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new DeleteProductAction(id)
    );
  });

  it(`should expect to navigate to shipping route and set stepOneActive to true when onRouteChange 
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const event = true;
      component.onRouteChange(event);
      expect(router.navigate).toHaveBeenCalledWith(["shipping"]);
      expect(navigationService.stepOneActive).toEqual(true);
    }
  ));

  it(`should expect to dispatch a new UpdateAddedProducts action changing the products 
  price and quantity when calculatePriceOnChange function is invoked with a new quantity that 
  the user has typed `, () => {
    const event = {
      target: {
        value: "5"
      }
    };
    const product = {
      id: "1",
      productName: "Chair",
      quantity: 4,
      price: 56.92
    };
    component.selectedProducts = [
      { id: "1", productName: "Chair", quantity: 2, price: 14.23 }
    ];
    spyOn(component.store, "dispatch").and.callThrough();
    component.calculatePriceOnChange(event, product);
    expect(component.store.dispatch).toHaveBeenCalledTimes(1);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new UpdateAddedProducts(product)
    );
  });
});
