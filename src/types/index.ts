export type MenuCategory = '토핑' | '면/당면' | '소스' | '사이드' | '음료';

export interface BaseMenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  isPopular?: boolean;
}

export interface PricedMenuItem extends BaseMenuItem {
  type: 'priced';
  price: number;
}

export interface WeightMenuItem extends BaseMenuItem {
  type: 'weight';
  pricePerUnit: number;
  unit: string;
}

export type MenuItem = PricedMenuItem | WeightMenuItem;

export type StoreRegion = '서울' | '경기' | '인천' | '부산' | '대구' | '대전' | '광주' | '기타';

export interface Store {
  id: string;
  name: string;
  region: StoreRegion;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  hours: string;
  image: string;
}

export interface PartnershipForm {
  name: string;
  phone: string;
  email: string;
  region: string;
  budget: string;
  experience: string;
  message: string;
}
