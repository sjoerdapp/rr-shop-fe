import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { IconType } from '../../icon/icon.models';
import { ProductBoxAbstractComponent } from '../product-box-abstract.component';

@Component({
  selector: 'rr-shop-product-box-compact',
  templateUrl: './product-box-compact.component.html',
  styleUrls: ['./product-box-compact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductBoxCompactComponent extends ProductBoxAbstractComponent implements OnInit {
  public readonly IconType = IconType;

  public ngOnInit(): void {
    // console.log('ProductBoxCompactComponent nginit', this.product.name);
  }
}
