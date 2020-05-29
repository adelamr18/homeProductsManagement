import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsDashboardComponent } from "./views/products-dashboard/products-dashboard.component";
import { ShippingDetailsComponent } from "./views/shipping-details/shipping-details.component";
import { PaymentDetailsComponent } from "./views/payment-details/payment-details.component";
import { CheckoutOverviewComponent } from "./views/checkout-overview/checkout-overview.component";
import { OrderSuccessComponent } from "./views/order-success/order-success.component";

const routes: Routes = [
  { path: "products", component: ProductsDashboardComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" }, // redirect to `first-component`
  { path: "shipping", component: ShippingDetailsComponent },
  { path: "payment", component: PaymentDetailsComponent },
  { path: "overview", component: CheckoutOverviewComponent },
  { path: "success", component: OrderSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
