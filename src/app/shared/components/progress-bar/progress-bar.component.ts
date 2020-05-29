import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NavigationService } from "../../services/navigation/navigation.service";
import { titles } from "../../constants/defines";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.css"]
})
export class ProgressBarComponent implements OnInit {
  @Output() onStepOneClick = new EventEmitter();
  @Output() onStepTwoClick = new EventEmitter();
  @Output() onStepThreeClick = new EventEmitter();
  @Output() onStepFourClick = new EventEmitter();
  @Output() onStepFiveClick = new EventEmitter();
  products: string = "";
  shipping: string = "";
  payment: string = "";
  overview: string = "";
  success: string = "";

  constructor(public navigationService: NavigationService) {}

  ngOnInit(): void {
    this.configureProgressBar();
  }

  configureProgressBar = (): void => {
    this.products = titles.products;
    this.shipping = titles.shipping;
    this.payment = titles.payment;
    this.overview = titles.overview;
    this.success = titles.success;
  };

  stepOneClick = (): void => this.onStepOneClick.emit(true);

  stepTwoClick = (): void => this.onStepTwoClick.emit(true);

  stepThreeClick = (): void => this.onStepThreeClick.emit(true);

  stepFourClick = (): void => this.onStepFourClick.emit(true);

  stepFiveClick = (): void => this.onStepFiveClick.emit(true);
}
