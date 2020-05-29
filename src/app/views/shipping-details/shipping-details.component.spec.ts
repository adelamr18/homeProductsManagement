import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { NavigationMockService } from "src/app/shared/mocks/navigation/navigation-mock.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShippingDetailsComponent } from "./shipping-details.component";

describe("ShippingDetailsComponent", () => {
  let component: ShippingDetailsComponent;
  let fixture: ComponentFixture<ShippingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingDetailsComponent],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        { NavigationService, useClass: NavigationMockService }
      ],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to set submitted to true when onSubmit`, inject([], () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  }));

  it(`should expect to set submitted to true when onRouteChange is invoked with an event`, inject(
    [],
    () => {
      const event = true;
      component.onRouteChange(event);
      expect(component.submitted).toEqual(true);
    }
  ));

  it(`should expect to navigate to payment route ,set stepTwoActive to true when navigateToPaymentRoute 
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      component.navigateToPaymentRoute();
      expect(router.navigate).toHaveBeenCalledWith(["payment"]);
      expect(navigationService.stepTwoActive).toEqual(true);
    }
  ));
});
