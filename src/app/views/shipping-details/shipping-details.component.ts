import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { ShipmentInfo } from "src/app/shared/models/shippment-info";
import {
  errors,
  formsInfo,
  validators,
  titles,
  routes
} from "../../shared/constants/defines";

@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.css"]
})
export class ShippingDetailsComponent implements OnInit {
  navigateButtonText: string = "";
  enableBtnFullWidth: boolean = false;
  shipmentForm: FormGroup;
  submitted: boolean = false;
  previousShipmentDetails: ShipmentInfo;
  shipping: string = "";
  firstName: string = "";
  firstNameRequired: string = "";
  firstNameLetters: string = "";
  lastNameRequired: string = "";
  lastNameLetters: string = "";
  addressRequired: string = "";
  mobileRequired: string = "";
  mobileMinLength: string = "";
  mobileWrongPattern: string = "";
  lastName: string = "";
  address: string = "";
  mobile: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.configureShippingForm();
    this.configureButton();
    this.createShippingForm();
    this.getPreviousShipmentDetails();
  }

  get f() {
    return this.shipmentForm.controls;
  }

  configureShippingForm = (): void => {
    this.shipping = formsInfo.shipping;
    this.firstName = formsInfo.firstName;
    this.lastName = formsInfo.lastName;
    this.address = formsInfo.address;
    this.mobile = formsInfo.mobile;
    this.firstNameRequired = errors.firstNameRequired;
    this.firstNameLetters = errors.firstNameLetters;
    this.lastNameRequired = errors.lastNameRequired;
    this.lastNameLetters = errors.lastNameLetters;
    this.addressRequired = errors.addressRequired;
    this.mobileRequired = errors.mobileRequired;
    this.mobileMinLength = errors.mobileMinLength;
    this.mobileWrongPattern = errors.mobileWrongPattern;
  };

  onSubmit = () => {
    this.submitted = true;
  };

  configureButton = (): void => {
    this.navigateButtonText = titles.continue;
    this.enableBtnFullWidth = true;
  };

  createShippingForm = () => {
    this.shipmentForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required, Validators.pattern(validators.capitalAndSmall)]
      ],
      lastName: [
        "",
        [Validators.required, Validators.pattern(validators.capitalAndSmall)]
      ],
      address: ["", Validators.required],
      mobile: [
        "",
        [
          Validators.required,
          Validators.pattern(validators.mobileFormat),
          Validators.minLength(13)
        ]
      ]
    });
  };

  onRouteChange = (event: any) => {
    this.submitted = true;
    if (event && this.shipmentForm.valid) {
      this.saveShipmentInfo();
      this.navigateToPaymentRoute();
    }
  };

  saveShipmentInfo = (): void => {
    const shipmentDetails = {
      firstName: this.shipmentForm.get("firstName").value,
      lastName: this.shipmentForm.get("lastName").value,
      address: this.shipmentForm.get("address").value,
      mobile: this.shipmentForm.get("mobile").value
    };
    this.navigationService.saveShipmentDetails(shipmentDetails);
  };

  navigateToPaymentRoute = (): void => {
    this.navigationService.stepTwoActive = true;
    this.router.navigate([routes.payment]);
  };

  getPreviousShipmentDetails = () => {
    if (this.navigationService.stepTwoActive) {
      this.previousShipmentDetails = this.navigationService.getShipmentDetails();
      this.shipmentForm
        .get("firstName")
        .setValue(this.previousShipmentDetails.firstName);
      this.shipmentForm
        .get("lastName")
        .setValue(this.previousShipmentDetails.lastName);
      this.shipmentForm
        .get("address")
        .setValue(this.previousShipmentDetails.address);
      this.shipmentForm
        .get("mobile")
        .setValue(this.previousShipmentDetails.mobile);
    }
  };
}
