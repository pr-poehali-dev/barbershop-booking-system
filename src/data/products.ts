
export interface ProductCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
}

export interface Product {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    title: "Шампуни",
    slug: "shampoos",
    description: "Профессиональные шампуни для различных типов волос"
  },
  {
    id: 2,
    title: "Кондиционеры",
    slug: "conditioners",
    description: "Кондиционеры и бальзамы для ухода за волосами"
  },
  {
    id: 3,
    title: "Маски и сыворотки",
    slug: "masks-serums",
    description: "Интенсивные средства для восстановления и питания волос"
  },
  {
    id: 4,
    title: "Стайлинг",
    slug: "styling",
    description: "Средства для укладки и фиксации прически"
  },
  {
    id: 5,
    title: "Аксессуары",
    slug: "accessories",
    description: "Инструменты и аксессуары для укладки и ухода за волосами"
  }
];

export const products: Product[] = [
  // Категория 1: Шампуни
  {
    id: 101,
    categoryId: 1,
    title: "Шампунь для поврежденных волос",
    description: "Профессиональный шампунь для восстановления структуры поврежденных волос, обогащенный кератином и маслами.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Kerastase",
    rating: 4.8,
    inStock: true,
    isBestseller: true
  },
  {
    id: 102,
    categoryId: 1,
    title: "Шампунь для окрашенных волос",
    description: "Шампунь, сохраняющий яркость цвета и защищающий окрашенные волосы от вымывания пигмента.",
    price: 950,
    image: "https://images.unsplash.com/photo-1626732920642-58d0b9fe89f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "L'Oreal Professional",
    rating: 4.6,
    inStock: true
  },
  {
    id: 103,
    categoryId: 1,
    title: "Увлажняющий шампунь",
    description: "Глубоко увлажняющий шампунь для сухих и обезвоженных волос с гиалуроновой кислотой.",
    price: 850,
    salePrice: 680,
    image: "https://images.unsplash.com/photo-1633383718081-22ac93e3db65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Moroccanoil",
    rating: 4.5,
    inStock: true
  },
  {
    id: 104,
    categoryId: 1,
    title: "Шампунь для объема",
    description: "Шампунь, придающий объем тонким волосам без утяжеления.",
    price: 780,
    image: "https://images.unsplash.com/photo-1619451683277-b48bbf13d516?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Sebastian Professional",
    rating: 4.3,
    inStock: true
  },
  {
    id: 105,
    categoryId: 1,
    title: "Шампунь против перхоти",
    description: "Лечебный шампунь для борьбы с перхотью и зудом кожи головы.",
    price: 920,
    image: "https://images.unsplash.com/photo-1629722231798-b90ffb70a75e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "American Crew",
    rating: 4.7,
    inStock: true
  },

  // Категория 2: Кондиционеры
  {
    id: 201,
    categoryId: 2,
    title: "Восстанавливающий кондиционер",
    description: "Питательный кондиционер для интенсивного восстановления поврежденных и ломких волос.",
    price: 1050,
    image: "https://images.unsplash.com/photo-1631729597135-7fa7dfe5401f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Olaplex",
    rating: 4.9,
    inStock: true,
    isBestseller: true
  },
  {
    id: 202,
    categoryId: 2,
    title: "Кондиционер для окрашенных волос",
    description: "Защитный кондиционер, продлевающий стойкость цвета и придающий блеск окрашенным волосам.",
    price: 890,
    image: "https://images.unsplash.com/photo-1595521969746-7c59a6b941af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "L'Oreal Professional",
    rating: 4.5,
    inStock: true
  },
  {
    id: 203,
    categoryId: 2,
    title: "Увлажняющий бальзам",
    description: "Интенсивно увлажняющий бальзам для сухих и вьющихся волос.",
    price: 750,
    image: "https://images.unsplash.com/photo-1635440972436-48637e9f01de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Davines",
    rating: 4.6,
    inStock: true
  },

  // Категория 3: Маски и сыворотки
  {
    id: 301,
    categoryId: 3,
    title: "Интенсивная восстанавливающая маска",
    description: "Глубоко восстанавливающая маска для сильно поврежденных волос с комплексом протеинов.",
    price: 1450,
    image: "https://images.unsplash.com/photo-1629722231799-42fc79c8caf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Kerastase",
    rating: 4.9,
    inStock: true,
    isNew: true
  },
  {
    id: 302,
    categoryId: 3,
    title: "Питательная сыворотка для кончиков",
    description: "Несмываемая сыворотка для защиты и питания сухих кончиков волос.",
    price: 980,
    salePrice: 780,
    image: "https://images.unsplash.com/photo-1631729372733-d767881a6f78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Moroccanoil",
    rating: 4.7,
    inStock: true,
    isBestseller: true
  },
  {
    id: 303,
    categoryId: 3,
    title: "Маска-уход для окрашенных волос",
    description: "Интенсивная маска для сохранения цвета и восстановления окрашенных волос.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1607604941499-c0ee55ee411a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Wella Professional",
    rating: 4.6,
    inStock: true
  },

  // Категория 4: Стайлинг
  {
    id: 401,
    categoryId: 4,
    title: "Термозащитный спрей",
    description: "Спрей для защиты волос от высоких температур при укладке феном, утюжком или плойкой.",
    price: 850,
    image: "https://images.unsplash.com/photo-1635365349638-c79a5c779077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "GHD",
    rating: 4.8,
    inStock: true,
    isBestseller: true
  },
  {
    id: 402,
    categoryId: 4,
    title: "Лак для волос сильной фиксации",
    description: "Профессиональный лак для стойкой фиксации прически без склеивания волос.",
    price: 680,
    image: "https://images.unsplash.com/photo-1620783637552-20f1cee3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Tigi",
    rating: 4.5,
    inStock: true
  },
  {
    id: 403,
    categoryId: 4,
    title: "Моделирующий крем для укладки",
    description: "Текстурирующий крем для создания естественной укладки с матовым эффектом.",
    price: 720,
    image: "https://images.unsplash.com/photo-1635440973274-1674e4eeb1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "American Crew",
    rating: 4.4,
    inStock: true
  },
  {
    id: 404,
    categoryId: 4,
    title: "Мусс для объема",
    description: "Легкий мусс для создания естественного объема у корней.",
    price: 590,
    salePrice: 470,
    image: "https://images.unsplash.com/photo-1588673562910-6eed7fefe94c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Sebastian Professional",
    rating: 4.3,
    inStock: true
  },

  // Категория 5: Аксессуары
  {
    id: 501,
    categoryId: 5,
    title: "Профессиональный фен",
    description: "Мощный и легкий фен с ионизацией для быстрой сушки и бережной укладки волос.",
    price: 8900,
    image: "https://images.unsplash.com/photo-1522338140236-bcdb8d6050c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Dyson",
    rating: 4.9,
    inStock: true,
    isNew: true
  },
  {
    id: 502,
    categoryId: 5,
    title: "Керамический утюжок",
    description: "Утюжок с керамическими пластинами и регулировкой температуры для выпрямления волос.",
    price: 5600,
    image: "https://images.unsplash.com/photo-1590317801889-17a818608a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "GHD",
    rating: 4.7,
    inStock: true
  },
  {
    id: 503,
    categoryId: 5,
    title: "Массажная щетка для волос",
    description: "Профессиональная щетка для массажа кожи головы и распутывания волос без повреждений.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590317821267-bee28f780ba1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    brand: "Tangle Teezer",
    rating: 4.8,
    inStock: true,
    isBestseller: true
  }
];
