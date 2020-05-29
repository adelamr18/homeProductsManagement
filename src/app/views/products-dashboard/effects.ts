import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import {
  LoadProductsAction,
  ProductsActionsTypes,
  LoadProductsSuccessAction,
  LoadProductsFailureAction
} from "./actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { of } from "rxjs";

@Injectable()
export class ProductsEffects {
  @Effect() loadProducts = this.actions$.pipe(
    ofType<LoadProductsAction>(ProductsActionsTypes.LOAD_PRODUCTS),
    mergeMap(() =>
      this.productsService.getAllProducts().pipe(
        map(data => new LoadProductsSuccessAction(data)),
        catchError(error => of(new LoadProductsFailureAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
