export interface ProductInterface {
  idProduct?: number;
  name: string;
  description?: string | null;
  affiliationsActive?: Boolean | null;
  enableProvider?: Boolean | null;
  urlConversionPage?: string | null;
  basePrice: number;
  urlFunnel?: string | null;
  temperature?: number | null;
  rating?: number | null;
  affOnlyMembers?: Boolean | null;
  tagAccount?: string | null;
  orderProduct?: number | null;
  urlImageProduct?: string | null;
  stock?: number | null;
  baseCurrencyPrice?: string | null;
  warrantyPeriod?: number | null;
  idTypeProduct: number;
  idState?: number;
  urlCheckoutBaseOffer?: string | null;
}
