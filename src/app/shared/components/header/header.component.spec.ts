import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HeaderComponent } from "./header.component";
import { Router } from "@angular/router";
import { InteractionService } from "../../services/interaction/interaction.service";
import { InteractionMockService } from "../../mocks/interaction/interaction-mock.service";
import { NavigationService } from "../../services/navigation/navigation.service";
import { NavigationMockService } from "../../mocks/navigation/navigation-mock.service";
import { ProductsService } from "../../services/products/products.service";
import { ProductsMockService } from "../../mocks/products/products-mock.service";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { PreserveAddedProducts } from "src/app/views/products-dashboard/actions";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: MockStore;
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
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule],
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
    fixture = TestBed.createComponent(HeaderComponent);
    mockStore = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to dispatch a new PreserveAddedProducts action if previouslyAddedProducts were retrieved from local storage 
  and component executes ngOnInit lifecycle hook `, () => {
    spyOn(component.store, "dispatch").and.callThrough();
    component.previouslyAddedProducts = [
      {
        productName: "Chair",
        id: "1",
        price: 34,
        quantity: 3
      }
    ];
    component.ngOnInit();
    expect(component.store.dispatch).toHaveBeenCalledTimes(1);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new PreserveAddedProducts(component.previouslyAddedProducts)
    );
  });

  it(`should expect to invoke function resetActivatedSteps  and 
  it should navigate to products route when navigateToDashboard function is called`, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const resetActivatedSteps = spyOn(
        navigationService,
        "resetActivatedSteps"
      );
      component.navigateToDashboard();
      expect(router.navigate).toHaveBeenCalledWith(["products"]);
      expect(resetActivatedSteps).toHaveBeenCalled();
    }
  ));

  it(`should expect to invoke function confirmHeaderClicked when showProductsModal function is called`, inject(
    [InteractionService],
    (interactionService: InteractionMockService) => {
      const confirmHeaderClicked = spyOn(
        interactionService,
        "confirmHeaderClicked"
      );
      component.showProductsModal();
      expect(confirmHeaderClicked).toHaveBeenCalled();
    }
  ));
});
