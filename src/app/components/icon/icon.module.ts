import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle as farCheckCircle,
  faCircle as farCircle,
  faTimesCircle as farTimesCircle,
  faTrashAlt as farTrashAlt
} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDoubleDown as fasAngleDoubleDown,
  faAngleDoubleUp as fasAngleDoubleUp,
  faArrowCircleLeft as fasArrowCircleLeft,
  faArrowCircleRight as fasArrowCircleRight,
  faChevronDown as fasChevronDown,
  faChevronUp as fasChevronUp,
  faMinus as fasMinus,
  faPlus as fasPlus,
  faSearch as fasSearch,
  faShoppingBasket as fasShoppingBasket
} from '@fortawesome/free-solid-svg-icons';

import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [FontAwesomeModule]
})
export class IconModule {
  public constructor(library: FaIconLibrary) {
    library.addIcons(
      farCheckCircle,
      farCircle,
      farTimesCircle,
      farTrashAlt,
      fasAngleDoubleDown,
      fasAngleDoubleUp,
      fasArrowCircleLeft,
      fasArrowCircleRight,
      fasChevronDown,
      fasChevronUp,
      fasMinus,
      fasPlus,
      fasSearch,
      fasShoppingBasket
    );
  }
}
