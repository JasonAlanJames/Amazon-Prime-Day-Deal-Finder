
export interface ProductDeal {
  productName: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  description: string;
  productUrl: string;
  imageUrl?: string;
}

export interface DealCategory {
  categoryName: string;
  deals: ProductDeal[];
}