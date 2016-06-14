import { Product } from './Product';

export type Category = {
  id?: number;
  name: string;
};

export type CategoryView = {
  id?: number;
  name: string;
  productCount: number;
};
