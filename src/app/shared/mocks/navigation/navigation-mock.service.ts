import { Injectable } from "@angular/core";
import { PaymentDetails } from "../../models/payment-details";
import { ShipmentInfo } from "../../models/shippment-info";

@Injectable({
  providedIn: "root"
})
export class NavigationMockService {
  stepOneActive: boolean = false;
  stepTwoActive: boolean = false;
  stepThreeActive: boolean = false;
  stepFourActive: boolean = false;
  stepFiveActive: boolean = false;
  shipmentDetails: ShipmentInfo;
  paymentDetails: PaymentDetails;

  constructor() {}

  saveShipmentDetails = (shipmentDetails: ShipmentInfo): void => {
    this.shipmentDetails = shipmentDetails;
  };

  getShipmentDetails = (): ShipmentInfo => {
    return this.shipmentDetails;
  };

  savePaymentDetails = (paymentDetails: PaymentDetails): void => {
    this.paymentDetails = paymentDetails;
  };

  getPaymentDetails = (): PaymentDetails => {
    return this.paymentDetails;
  };

  resetActivatedSteps = (): void => {
    this.stepOneActive = false;
    this.stepTwoActive = false;
    this.stepThreeActive = false;
    this.stepFourActive = false;
    this.stepFiveActive = false;
  };
}
