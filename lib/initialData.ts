export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  isVegan?: boolean;
  isOatMilk?: boolean;
  isSpecialty?: boolean;
  isCold?: boolean;
  categoryId: string;
  category: Category;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Кофе & Эспрессо', order: 1 },
  { id: 'cat-2', name: 'Авторские Напитки', order: 2 },
  { id: 'cat-3', name: 'Альтернатива / V60', order: 3 },
  { id: 'cat-4', name: 'Чай & Матча', order: 4 },
  { id: 'cat-5', name: 'Выпечка & Десерты', order: 5 },
  { id: 'cat-6', name: 'Завтраки', order: 6 },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Эспрессо Двойной (Specialty)',
    description: '100% Спешелти Арабика эфиопской обжарки с яркими нотами цитрусов и бергамота.',
    price: 22000,
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isSpecialty: true,
    categoryId: 'cat-1',
    category: { id: 'cat-1', name: 'Кофе & Эспрессо', order: 1 },
  },
  {
    id: 'item-2',
    name: 'Капучино на Овсяном Молоке',
    description: 'Классический капучино с плотной эластичной пенкой на растительном овсяном молоке.',
    price: 32000,
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isOatMilk: true,
    isVegan: true,
    categoryId: 'cat-1',
    category: { id: 'cat-1', name: 'Кофе & Эспрессо', order: 1 },
  },
  {
    id: 'item-3',
    name: 'Флэт Уайт Double Shot',
    description: 'Насыщенный кофейный напиток с двойной порцией эспрессо и бархатистой микропенкой.',
    price: 28000,
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isSpecialty: true,
    categoryId: 'cat-1',
    category: { id: 'cat-1', name: 'Кофе & Эспрессо', order: 1 },
  },
  {
    id: 'item-4',
    name: 'Ташкентский Пряный Раф',
    description: 'Фирменный раф со сливками, натуральной ванилью, горным миндалем и щепоткой корицы.',
    price: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isSpecialty: true,
    categoryId: 'cat-2',
    category: { id: 'cat-2', name: 'Авторские Напитки', order: 2 },
  },
  {
    id: 'item-5',
    name: 'Айс Латте Солёная Карамель',
    description: 'Освежающий двойной эспрессо, сливки, домашняя солёная карамель и кубики льда.',
    price: 36000,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isCold: true,
    categoryId: 'cat-2',
    category: { id: 'cat-2', name: 'Авторские Напитки', order: 2 },
  },
  {
    id: 'item-6',
    name: 'Фильтр-кофе Эфиопия Иргачефф',
    description: 'Яркий чистый вкус альтернативного заваривания с оттенками персика, жасмина и черники.',
    price: 26000,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isSpecialty: true,
    categoryId: 'cat-3',
    category: { id: 'cat-3', name: 'Альтернатива / V60', order: 3 },
  },
  {
    id: 'item-7',
    name: 'V60 Колумбия Каука',
    description: 'Ручное заваривание пуровер V60. Нотки красного яблока, тростникового сахара и какао.',
    price: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isSpecialty: true,
    categoryId: 'cat-3',
    category: { id: 'cat-3', name: 'Альтернатива / V60', order: 3 },
  },
  {
    id: 'item-8',
    name: 'Матча Латте на Овсяном Молоке',
    description: 'Японский зеленый чай матча высшего грейда А с нежным растительным молоком.',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isOatMilk: true,
    isVegan: true,
    categoryId: 'cat-4',
    category: { id: 'cat-4', name: 'Чай & Матча', order: 4 },
  },
  {
    id: 'item-9',
    name: 'Круассан с Миндальным Кремом',
    description: 'Хрустящий французский круассан на сливочном масле с миндальной начинкой и лепестками.',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    categoryId: 'cat-5',
    category: { id: 'cat-5', name: 'Выпечка & Десерты', order: 5 },
  },
  {
    id: 'item-10',
    name: 'Чизкейк Сан-Себастьян',
    description: 'Нежнейший обожжённый баскский чизкейк с шелковистой кремовой текстурой.',
    price: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    categoryId: 'cat-5',
    category: { id: 'cat-5', name: 'Выпечка & Десерты', order: 5 },
  },
  {
    id: 'item-11',
    name: 'Авокадо Тост с Яйцом Пашот',
    description: 'Поджаренный тартин на закваске, свежий спелый авокадо, яйцо пашот и семена кунжута.',
    price: 42000,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    categoryId: 'cat-6',
    category: { id: 'cat-6', name: 'Завтраки', order: 6 },
  },
  {
    id: 'item-12',
    name: 'Сырники с Малиновым Кули',
    description: 'Нежные пышные сырники из фермерского творога со сметаной и домашним малиновым соусом.',
    price: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    categoryId: 'cat-6',
    category: { id: 'cat-6', name: 'Завтраки', order: 6 },
  },
];
