import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ProductsDashboardComponent } from "./products-dashboard.component";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { ProductsMockService } from "src/app/shared/mocks/products/products-mock.service";

describe("ProductsDashboardComponent", () => {
  let component: ProductsDashboardComponent;
  let fixture: ComponentFixture<ProductsDashboardComponent>;
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
      declarations: [ProductsDashboardComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ProductsService, useClass: ProductsMockService },

        MockStore,
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to set searchTerm variable when onSearchChange function is invoked 
  with the searched value that the user has typed  `, () => {
    const event = {
      target: {
        value: "chair"
      }
    };
    component.onSearchChange(event);
    expect(component.searchTerm).toEqual("chair");
  });
});
