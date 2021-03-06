import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryStore } from '../../models/category.model';
import { API_URL_CATEGORIES } from '../endpoints';

import { CategoryDto } from './api-category.dtos';
import { fromDto } from './api-category.mappers';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  public constructor(protected http: HttpClient) {}

  public getCategoriesAtInit(): Observable<CategoryStore[]> {
    return this.http
      .get<CategoryDto[]>(API_URL_CATEGORIES)
      .pipe(
        map((dtos: CategoryDto[]): CategoryStore[] =>
          dtos.map((categoryDto: CategoryDto): CategoryStore => fromDto(categoryDto))
        )
      );
  }
}
