import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { NavigationMockService } from "src/app/shared/mocks/navigation/navigation-mock.service";
import { PaymentDetailsComponent } from "./payment-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IbanMockPipe } from "src/app/shared/mocks/iban/iban-mock.pipe";

describe("PaymentDetailsComponent", () => {
  let component: PaymentDetailsComponent;
  let fixture: ComponentFixture<PaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDetailsComponent, IbanMockPipe],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        }
      ],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should expect to navigate to overview route ,set stepThreeActive to true when navigateToOverview 
  function is invoked  `, inject(
    [NavigationService, Router],
    (navigationService: NavigationMockService, router: Router) => {
      component.navigateToOverview();
      expect(router.navigate).toHaveBeenCalledWith(["overview"]);
      expect(navigationService.stepThreeActive).toEqual(true);
    }
  ));

  it(`should expect to set submitted to true when onRouteChange is invoked with an event`, inject(
    [],
    () => {
      const event = true;
      component.onRouteChange(event);
      expect(component.submitted).toEqual(true);
    }
  ));

  it(`should expect to set submitted to true when onSubmit`, inject([], () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  }));
});
