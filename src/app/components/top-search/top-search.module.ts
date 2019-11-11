import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSearchComponent } from './top-search.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TopSearchComponent],
  exports: [TopSearchComponent],
  imports: [CommonModule, IconModule]
})
export class TopSearchModule {}
