import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';

import * as fromCategoryActions from '../actions/category.actions';
import * as fromCategorySelectors from '../selectors/category.selectors';
import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
import { State } from '../reducers';
import { selectCategoryLength, selectIsListCollapsed } from '../selectors/category-core.selectors';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  public activeCategory$: Observable<CategoryStore>;
  public activeCategoryAndItsChildren$: Observable<CategoryStore[]>;
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<CategoryStore[]>;
  public categoryLength$: Observable<number>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;
  public isOnCategoryRoute$: Observable<boolean>;

  public constructor(protected store: Store<State>) {
    this.activeCategory$ = this.store.pipe(select(fromCategorySelectors.selectActiveCategory));
    this.activeCategoryAndItsChildren$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveCategoryAndItsChildren)
    );
    this.activeLevelUpdateEntriesBasedOnRoute$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveLevelUpdateEntriesBasedOnRoute)
    );
    this.categoriesWithActiveLevelSorted$ = this.store.pipe(
      select(fromCategorySelectors.selectCategoriesWithActiveLevelSorted)
    );
    this.categoryLength$ = this.store.pipe(select(selectCategoryLength));
    this.isCollapseExpandButtonVisible$ = this.store.pipe(
      select(fromCategorySelectors.selectIsCollapseExpandButtonVisible)
    );
    this.isListCollapsed$ = this.store.pipe(select(selectIsListCollapsed));
    this.isOnCategoryRoute$ = this.store.pipe(select(fromCategorySelectors.selectIsOnCategoryRoute));
  }

  public categoryByStructuralNode$(structuralNode: StructuralNode): Observable<CategoryStore> {
    return this.store.pipe(select(fromCategorySelectors.selectCategory, { structuralNode }));
  }

  public categoryById$(id: number): Observable<CategoryStore> {
    return this.store.pipe(select(fromCategorySelectors.selectCategory, { id }));
  }

  public categoriesByStructuralNode$(structuralNode: StructuralNode): Observable<CategoryStore[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoriesBy, { structuralNode }));
  }

  public categoriesByParentId$(parentId: number): Observable<CategoryStore[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoriesBy, { parentId }));
  }

  public getCategoryById(id: number): CategoryStore {
    let result: CategoryStore = null;

    this.store
      .pipe(
        select(fromCategorySelectors.selectCategory, { id }),
        take(1),
        tap((category: CategoryStore): void => {
          result = category;
        })
      )
      .subscribe();

    return result;
  }

  public setIsCollapsed(newValue: boolean): void {
    this.store.dispatch(fromCategoryActions.setIsListCollapsed({ newValue }));
  }
}
