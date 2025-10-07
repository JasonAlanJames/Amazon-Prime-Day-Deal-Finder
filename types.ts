
export interface ProductDeal {
  productName: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  description: string;
  productUrl: string;
}

export interface DealCategory {
  categoryName: string;
  deals: ProductDeal[];
}
