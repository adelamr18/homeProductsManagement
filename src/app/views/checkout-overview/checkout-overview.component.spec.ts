import { CheckoutOverviewComponent } from "./checkout-overview.component";
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import {
  DeleteProductAction,
  UpdateAddedProducts
} from "src/app/views/products-dashboard/actions";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { NavigationMockService } from "src/app/shared/mocks/navigation/navigation-mock.service";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { ProductsMockService } from "src/app/shared/mocks/products/products-mock.service";
import { InteractionService } from "src/app/shared/services/interaction/interaction.service";
import { InteractionMockService } from "src/app/shared/mocks/interaction/interaction-mock.service";

describe("CheckoutOverviewComponent", () => {
  let component: CheckoutOverviewComponent;
  let fixture: ComponentFixture<CheckoutOverviewComponent>;
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
      declarations: [CheckoutOverviewComponent],
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
    fixture = TestBed.createComponent(CheckoutOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to navigate to success route ,set stepFourActive and stepFiveActive  to true when onRouteChange 
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const event = true;
      component.onRouteChange(event);
      expect(router.navigate).toHaveBeenCalledWith(["success"]);
      expect(navigationService.stepFourActive).toEqual(true);
      expect(navigationService.stepFiveActive).toEqual(true);
    }
  ));

  it(`should expect to dispatch a new UpdateAddedProducts action containing the user edited product
  when onRouteChange function is invoked  `, inject([], () => {
    const event = true;
    component.editedProduct = {
      id: "1",
      productName: "Chair",
      quantity: 1,
      price: 10
    };
    spyOn(component.store, "dispatch").and.callThrough();
    component.areProductsEdited = true;
    component.onRouteChange(event);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new UpdateAddedProducts(component.editedProduct)
    );
  }));

  it(`should expect to dispatch a new DeleteProductAction when deleteProduct is invoked with an
  id that needs to be deleted `, () => {
    const id = "2";
    spyOn(component.store, "dispatch").and.callThrough();
    component.addedProducts = [
      {
        id: "1",
        productName: "Chair",
        quantity: 3,
        price: 14.23
      }
    ];
    component.deleteProduct(id);
    expect(component.store.dispatch).toHaveBeenCalledTimes(1);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new DeleteProductAction(id)
    );
  });

  it(`should expect to set totalPrice to 0 if addedProducts array length is 0
  when deleteProduct function is invoked  `, () => {
    const id = "2";
    spyOn(component.store, "dispatch").and.callThrough();
    component.addedProducts = [];
    component.deleteProduct(id);
    expect(component.totalPrice).toEqual(0);
  });
});
