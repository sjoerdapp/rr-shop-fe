import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { metaReducers, reducers } from '../store/reducers';
import { environment } from '../../environments/environment';
import { routerStateConfig } from '../store/reducers/router.reducers';
import { BasketEffects } from '../store/effects/basket-effects.service';
import { CategoryEffects } from '../store/effects/category-effects.service';
import { ProductsEffects } from '../store/effects/products-effects.service';
import { ViewportEffects } from '../store/effects/viewport-effects.service';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
    EffectsModule.forRoot([BasketEffects, CategoryEffects, ProductsEffects, ViewportEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class CoreModule {}
