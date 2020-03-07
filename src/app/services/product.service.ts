import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductFacadeService } from '../store/facades/product-facade.service';
import { Product, ProductEnriched } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public activeProductEnriched$: Observable<ProductEnriched>;
  public productsEnrichedFromActiveCategoryAndItsChildren$: Observable<ProductEnriched[]>;

  public constructor(protected productFacadeService: ProductFacadeService) {
    this.activeProductEnriched$ = productFacadeService.activeProductEnriched$;
    this.productsEnrichedFromActiveCategoryAndItsChildren$ =
      productFacadeService.productsEnrichedFromActiveCategoryAndItsChildren$;
  }

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.productFacadeService.productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId);
  }
}
