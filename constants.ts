
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Guacamole Tradicional',
    description: 'Fresh Haas avocados, cilantro, onions, lime, and serrano peppers. Made tableside.',
    price: 14.50,
    category: 'Appetizers',
    spicyLevel: 1,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2',
    name: 'Tacos al Pastor',
    description: 'Marinated pork, pineapple, cilantro, and onions on handmade corn tortillas.',
    price: 16.00,
    category: 'Tacos',
    spicyLevel: 1,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '3',
    name: 'Enchiladas Rojas',
    description: 'Three corn tortillas stuffed with shredded chicken, topped with house-made guajillo sauce.',
    price: 18.50,
    category: 'Main Course',
    spicyLevel: 2,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '4',
    name: 'Carne Asada',
    description: 'Char-broiled ribeye steak served with rice, beans, and fresh guacamole.',
    price: 28.00,
    category: 'Main Course',
    spicyLevel: 0,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '5',
    name: 'Churros Con Chocolate',
    description: 'Crispy dough pastry rolled in cinnamon sugar served with warm Mexican chocolate.',
    price: 9.00,
    category: 'Desserts',
    spicyLevel: 0,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '6',
    name: 'Margarita Signature',
    description: 'Premium tequila, fresh lime juice, and agave nectar. Hand-shaken.',
    price: 13.00,
    category: 'Drinks',
    spicyLevel: 0,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1592318963771-08103986427d?auto=format&fit=crop&w=400&q=80'
  }
];
