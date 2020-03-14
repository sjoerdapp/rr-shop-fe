export enum StructuralNode {
  Delivery = 'Delivery',
  Footer = 'Footer',
  FooterMap = 'FooterMap',
  Header = 'Header',
  Payment = 'Payment',
  ShopCategories = 'ShopCategories'
}

export interface ActiveLevelUpdateEntry {
  activeLevel: number;
  id: number;
}

// -----------------------------------------------------------------------------

export interface CategoryStore {
  activeLevel?: number;
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}

// -----------------------------------------------------------------------------

// TODO reduce number of data from the backend in simple DTO
export interface CategorySimpleDto {
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}
