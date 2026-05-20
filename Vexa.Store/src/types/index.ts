export type Category = 'game-keys' | 'accounts' | 'boosts' | 'cosmetics' | 'currency';

export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  category: Category;
  tags: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  platform?: string;
  deliveryTime: string;
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CheckoutStep = 'cart' | 'checkout' | 'confirmation';
