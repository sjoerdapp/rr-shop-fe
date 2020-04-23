import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../models/product.model';
import { ClickableActionTheme } from '../../clickable-action/clickable-action.model';
import { OrderFacadeService } from '../../../store/facades/order-facade.service';
import { IconType } from '../../icon/icon.models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-delivery-overview-item]',
  templateUrl: './delivery-overview-item.component.html',
  styleUrls: ['./delivery-overview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryOverviewItemComponent implements OnInit {
  @Input()
  public product: Product;

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public chooseDelivery(productId: number): void {
    this.orderFacadeService.chooseDelivery(productId);
  }
}
