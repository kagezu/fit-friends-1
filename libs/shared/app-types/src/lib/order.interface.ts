export interface Order {
  purchaseType: string;
  training: string;
  price: number;
  count: number;
  orderPrice: number;
  paymentMethod: string;
  createdAt?: string;
}
