import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/shared/services/navigation/navigation.service";
import { ValidatorService, ɵb } from "angular-iban";
import { IbanPipe } from "../../shared/pipes/iban.pipe";
import { PaymentDetails } from "src/app/shared/models/payment-details";
import {
  errors,
  formsInfo,
  validators,
  titles,
  routes
} from "../../shared/constants/defines";
@Component({
  selector: "app-payment-details",
  templateUrl: "./payment-details.component.html",
  styleUrls: ["./payment-details.component.css"],
  providers: [IbanPipe]
})
export class PaymentDetailsComponent implements OnInit {
  navigateButtonText: string = "";
  enableBtnFullWidth: boolean = false;
  paymentForm: FormGroup;
  public ibanReactive: FormControl;
  ibanValue: string = "";
  submitted = false;
  previousPaymentDetails: PaymentDetails;
  payment: string = "";
  cardHolder: string = "";
  iban: string = "";
  cardHolderRequired: string = "";
  cardHolderLetters: string = "";
  ibanRequired: string = "";
  ibanInvalid: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public navigationService: NavigationService,
    private ibanPipe: IbanPipe
  ) {}

  ngOnInit(): void {
    this.configurePaymentForm();
    this.configureButton();
    this.createPaymentForm();
    this.getPreviousPaymentDetails();
  }

  configurePaymentForm = (): void => {
    this.payment = formsInfo.payment;
    this.cardHolder = formsInfo.cardHolder;
    this.cardHolderRequired = errors.cardHolderRequired;
    this.cardHolderLetters = errors.cardHolderLetters;
    this.iban = formsInfo.iban;
    this.ibanRequired = errors.ibanRequired;
    this.ibanInvalid = errors.ibanInvalid;
  };

  //this function is used to enable form accessing from the payment-details.component.html file
  //to display errors users when an error occurs
  get f() {
    return this.paymentForm.controls;
  }

  onSubmit = () => {
    this.submitted = true;
  };

  configureButton = (): void => {
    this.navigateButtonText = titles.continue;
    this.enableBtnFullWidth = true;
  };

  createPaymentForm = () => {
    this.ibanReactive = new FormControl(null, [
      Validators.required,
      ValidatorService.validateIban
    ]);
    this.paymentForm = this.formBuilder.group({
      cardHolder: [
        "",
        [Validators.required, Validators.pattern(validators.capitalAndSmall)]
      ],
      iban: this.ibanReactive
    });
  };

  onRouteChange = (event: any) => {
    this.submitted = true;
    if (event && this.paymentForm.valid) {
      this.savePaymentDetails();
      this.navigateToOverview();
    }
  };

  onIbanChange = (event: any): void => {
    const typedIban = event.target.value;
    this.ibanValue = this.ibanPipe.transform(typedIban);
  };

  savePaymentDetails = (): void => {
    const paymentDetails = {
      cardHolder: this.paymentForm.get("cardHolder").value,
      iban: this.paymentForm.get("iban").value
    };
    this.navigationService.savePaymentDetails(paymentDetails);
  };

  navigateToOverview = (): void => {
    this.navigationService.stepThreeActive = true;
    this.router.navigate([routes.overview]);
  };

  getPreviousPaymentDetails = () => {
    if (this.navigationService.stepThreeActive) {
      this.previousPaymentDetails = this.navigationService.getPaymentDetails();
      this.paymentForm.get("iban").setValue(this.previousPaymentDetails.iban);
      this.paymentForm
        .get("cardHolder")
        .setValue(this.previousPaymentDetails.cardHolder);
    }
  };
}
