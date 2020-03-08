import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderComponent implements OnInit {
  public potentialOrderProductsIds$: Observable<number[]>;

  public constructor(protected basketService: BasketService) {
    this.potentialOrderProductsIds$ = basketService.potentialOrderProductsIds$;
  }

  public ngOnInit() {}
}