import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductsDashboardComponent } from "./views/products-dashboard/products-dashboard.component";
import { PaymentDetailsComponent } from "./views/payment-details/payment-details.component";
import { ShippingDetailsComponent } from "./views/shipping-details/shipping-details.component";
import { CheckoutOverviewComponent } from "./views/checkout-overview/checkout-overview.component";
import { OrderSuccessComponent } from "./views/order-success/order-success.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { ProgressBarComponent } from "./shared/components/progress-bar/progress-bar.component";
import { ProductsTableComponent } from "./shared/components/products-table/products-table.component";
import { NavigateButtonComponent } from "./shared/components/navigate-button/navigate-button.component";
import { ShoppingModalComponent } from "./shared/components/shopping-modal/shopping-modal.component";
import { SearchBarComponent } from "./shared/components/search-bar/search-bar.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { productsReducer } from "./views/products-dashboard/reducer";
import { EffectsModule } from "@ngrx/effects";
import { ProductsEffects } from "./views/products-dashboard/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularIbanModule } from "angular-iban";
import { ProductsService } from "./shared/services/products/products.service";
import { IbanMockPipe } from "./shared/mocks/iban/iban-mock.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ProductsDashboardComponent,
    PaymentDetailsComponent,
    ShippingDetailsComponent,
    CheckoutOverviewComponent,
    OrderSuccessComponent,
    HeaderComponent,
    ProgressBarComponent,
    ProductsTableComponent,
    NavigateButtonComponent,
    ShoppingModalComponent,
    SearchBarComponent,
    IbanMockPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularIbanModule,
    EffectsModule.forRoot([ProductsEffects]),
    StoreModule.forRoot({
      products: productsReducer
    })
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
