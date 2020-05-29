import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { OrderSuccessComponent } from "./order-success.component";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { NavigationMockService } from "src/app/shared/mocks/navigation/navigation-mock.service";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { ProductsMockService } from "src/app/shared/mocks/products/products-mock.service";

describe("OrderSuccessComponent", () => {
  let component: OrderSuccessComponent;
  let fixture: ComponentFixture<OrderSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSuccessComponent],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        { provide: NavigationService, useClass: NavigationMockService },
        { provide: ProductsService, useClass: ProductsMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to navigate to products route and call resetActivatedSteps  when onRouteChange 
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const event = true;
      const resetActivatedSteps = spyOn(
        navigationService,
        "resetActivatedSteps"
      );
      component.onRouteChange(event);
      expect(router.navigate).toHaveBeenCalledWith(["products"]);
      expect(resetActivatedSteps).toHaveBeenCalled();
    }
  ));
});
