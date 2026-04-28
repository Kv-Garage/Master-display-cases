export interface Product {
  id: string;
  shopifyId?: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  priceFormatted?: string;
  compareAtPrice?: number | null;
  image?: string;
  images: ProductImage[];
  variants: Variant[];
  variantId?: string;
  minPrice?: number;
  maxPrice?: number;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  options?: ProductOption[];
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface Variant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
  sku?: string;
  inventoryQuantity?: number;
  optionValues?: OptionValue[];
  image?: ProductImage;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface OptionValue {
  name: string;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: CollectionImage;
  productsCount?: number;
  updatedAt?: string;
}

export interface CollectionImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface CartItem {
  id: string;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
      altText?: string;
    };
  };
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  handle: string;
  excerpt?: string;
  content: string;
  author: {
    name: string;
  };
  publishedAt: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  tags: string[];
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface ShopInfo {
  name: string;
  description?: string;
  currencyCode: string;
  moneyFormat: string;
}

export interface ShopifyError {
  errors: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
}

export interface FilterOption {
  id: string;
  label: string;
  type: 'price' | 'color' | 'size' | 'material' | 'lighting' | 'type';
  values: FilterValue[];
}

export interface FilterValue {
  value: string;
  label: string;
  count: number;
}

export interface SortOption {
  value: string;
  label: string;
}