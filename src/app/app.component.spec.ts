import {
  TestBed,
  async,
  inject,
  ComponentFixture
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Router, Routes, RouterModule } from "@angular/router";
import { NavigationService } from "./shared/services/navigation/navigation.service";
import { NavigationMockService } from "./shared/mocks/navigation/navigation-mock.service";
import { ProductsService } from "./shared/services/products/products.service";
import { ProductsMockService } from "./shared/mocks/products/products-mock.service";
import { ProductsDashboardComponent } from "./views/products-dashboard/products-dashboard.component";
import { ShippingDetailsComponent } from "./views/shipping-details/shipping-details.component";
import { PaymentDetailsComponent } from "./views/payment-details/payment-details.component";
import { CheckoutOverviewComponent } from "./views/checkout-overview/checkout-overview.component";
import { OrderSuccessComponent } from "./views/order-success/order-success.component";
import { provideRoutes } from "@angular/router";

const appRoutes: Routes = [
  { path: "products", component: ProductsDashboardComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "shipping", component: ShippingDetailsComponent },
  { path: "payment", component: PaymentDetailsComponent },
  { path: "overview", component: CheckoutOverviewComponent },
  { path: "success", component: OrderSuccessComponent }
];

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, RouterModule],
      providers: [
        provideRoutes(appRoutes),
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        { provide: NavigationService, useClass: NavigationMockService },
        { provide: ProductsService, useClass: ProductsMockService }
      ]
    });
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'manage-user-products'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("manage-user-products");
  });

  it(`should expect to navigate to products route if stepOneActive is set to true when onStepOneClick
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.navigationService.stepOneActive = true;
      app.onStepOneClick();
      expect(router.navigate).toHaveBeenCalledWith(["products"]);
    }
  ));

  it(`should expect to navigate to shipping route if stepTwoActive is set to true when onStepTwoClick
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.navigationService.stepTwoActive = true;
      app.onStepTwoClick();
      expect(router.navigate).toHaveBeenCalledWith(["shipping"]);
    }
  ));

  it(`should expect to navigate to payment route if stepThreeActive is set to true when onStepThreeClick
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.navigationService.stepThreeActive = true;
      app.onStepThreeClick();
      expect(router.navigate).toHaveBeenCalledWith(["payment"]);
    }
  ));

  it(`should expect to navigate to overview route if stepFourActive is set to true when onStepFourClick
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.navigationService.stepFourActive = true;
      app.onStepFourClick();
      expect(router.navigate).toHaveBeenCalledWith(["overview"]);
    }
  ));

  it(`should expect to navigate to success route if stepFourActive is set to true when onStepFiveClick
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.navigationService.stepFourActive = true;
      app.onStepFiveClick();
      expect(router.navigate).toHaveBeenCalledWith(["success"]);
    }
  ));
});
