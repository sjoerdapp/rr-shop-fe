import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductBoxFullComponent } from './product-box-full/product-box-full.component';
import { ProductBoxCompactComponent } from './product-box-compact/product-box-compact.component';
import { PipesModule } from '../../pipes/pipes.module';
import { BasketService } from '../../services/basket.service';

@NgModule({
  declarations: [ProductBoxFullComponent, ProductBoxCompactComponent],
  exports: [ProductBoxFullComponent, ProductBoxCompactComponent],
  imports: [CommonModule, PipesModule, RouterModule],
  providers: [BasketService]
})
export class ProductBoxModule {}