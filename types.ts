
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Course' | 'Tacos' | 'Drinks' | 'Desserts';
  spicyLevel: 0 | 1 | 2 | 3;
  isVegetarian: boolean;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type OrderStatus = 'processing' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  timestamp: number;
}

export interface Reservation {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}
