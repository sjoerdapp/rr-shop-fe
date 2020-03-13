import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as fromOrderActions from '../actions/order.actions';
import * as fromRouterActions from '../actions/router.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { OrderFacadeService } from '../facades/order-facade.service';
import { OrderStore } from '../../models/order.model';
import { ApiOrderService } from '../../api-services/api-order.service';

@Injectable()
export class OrderEffects {
  public orderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.orderRequest)
      // concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.urlOrderUuid$)))
      // switchMap(([action, urlOrderUuid]) =>
      //   this.apiOrderService.getOrder(urlOrderUuid).pipe(
      //     map((orderStore: OrderStore) => fromOrderActions.orderSuccess({ orderStore })),
      //     catchError((httpErrorResponse: HttpErrorResponse) =>
      //       of(fromOrderActions.orderFailure({ httpErrorResponse }))
      //     )
      //   )
      // )
    )
  );

  public triggerOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.isOnOrderRoute$))),
      filter(([action, isOnOrderRoute]): boolean => isOnOrderRoute),
      map(() => fromOrderActions.orderRequest())
    )
  );

  // ---------------------------------------------------------------------------

  public createOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.createOrderRequest),
      switchMap(action =>
        this.apiOrderService.createOrder().pipe(
          map((orderStore: OrderStore) => fromOrderActions.createOrderSuccess({ orderStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromOrderActions.createOrderFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  // https://stackoverflow.com/questions/50566128/angular-router-navigation-inside-ngrx-effect
  public createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromOrderActions.createOrderSuccess),
        tap(action => {
          this.router.navigate(['/order', action.orderStore.uuid]).then();
        })
      ),
    { dispatch: false }
  );

  // ---------------------------------------------------------------------------

  public potentialOrderProductsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.potentialOrderProductsRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.potentialOrderProductsIds$))),
      switchMap(([action, potentialOrderProductsIds]) =>
        this.apiProductService.getProducts(potentialOrderProductsIds).pipe(
          map(products => fromOrderActions.potentialOrderProductsSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromOrderActions.potentialOrderProductsFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerPotentialOrderProductsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.isOnPotentialOrderRoute$))),
      filter(([action, isOnPotentialOrderRoute]): boolean => isOnPotentialOrderRoute),
      map(() => fromOrderActions.potentialOrderProductsRequest())
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiOrderService: ApiOrderService,
    protected apiProductService: ApiProductService,
    protected orderFacadeService: OrderFacadeService,
    protected router: Router
  ) {}
}