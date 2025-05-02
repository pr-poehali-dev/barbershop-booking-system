
export interface ServiceCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface ServiceItem {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    title: "Стрижки и укладки",
    description: "Профессиональные стрижки и укладки для женщин, мужчин и детей разной длины волос",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    icon: "Scissors"
  },
  {
    id: 2,
    title: "Окрашивание волос",
    description: "Широкий выбор техник окрашивания с использованием профессиональных красителей",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    icon: "Palette"
  },
  {
    id: 3,
    title: "Уход за волосами",
    description: "Восстанавливающие и увлажняющие процедуры для всех типов волос",
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    icon: "Droplets"
  },
  {
    id: 4,
    title: "Лечение волос и кожи головы",
    description: "Специальные процедуры для лечения и восстановления поврежденных волос",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    icon: "HeartPulse"
  }
];

export const serviceItems: ServiceItem[] = [
  // Категория 1: Стрижки и укладки
  {
    id: 101,
    categoryId: 1,
    title: "Женская стрижка (короткие волосы)",
    description: "Профессиональная стрижка включает консультацию, мытье головы, стрижку и укладку",
    price: "1000 ₽",
    duration: "45 мин",
    popular: true
  },
  {
    id: 102,
    categoryId: 1,
    title: "Женская стрижка (средняя длина)",
    description: "Профессиональная стрижка включает консультацию, мытье головы, стрижку и укладку",
    price: "1500 ₽",
    duration: "60 мин",
    popular: true
  },
  {
    id: 103,
    categoryId: 1,
    title: "Женская стрижка (длинные волосы)",
    description: "Профессиональная стрижка включает консультацию, мытье головы, стрижку и укладку",
    price: "2000 ₽",
    duration: "75 мин"
  },
  {
    id: 104,
    categoryId: 1,
    title: "Мужская стрижка",
    description: "Стрижка машинкой и ножницами, включает мытье головы и укладку",
    price: "1000 ₽",
    duration: "45 мин",
    popular: true
  },
  {
    id: 105,
    categoryId: 1,
    title: "Детская стрижка (до 12 лет)",
    description: "Стрижка для мальчиков и девочек, включает мытье головы",
    price: "800 ₽",
    duration: "30 мин"
  },
  {
    id: 106,
    categoryId: 1,
    title: "Укладка волос (стайлинг)",
    description: "Укладка волос с использованием фена, утюжка или плойки",
    price: "1000 ₽",
    duration: "45 мин"
  },
  {
    id: 107,
    categoryId: 1,
    title: "Праздничная прическа",
    description: "Создание праздничной прически для особых случаев",
    price: "от 3000 ₽",
    duration: "90 мин"
  },

  // Категория 2: Окрашивание волос
  {
    id: 201,
    categoryId: 2,
    title: "Окрашивание в один тон (короткие волосы)",
    description: "Окрашивание волос в один тон профессиональной краской",
    price: "2500 ₽",
    duration: "90 мин",
    popular: true
  },
  {
    id: 202,
    categoryId: 2,
    title: "Окрашивание в один тон (средние волосы)",
    description: "Окрашивание волос в один тон профессиональной краской",
    price: "3500 ₽",
    duration: "120 мин"
  },
  {
    id: 203,
    categoryId: 2,
    title: "Окрашивание в один тон (длинные волосы)",
    description: "Окрашивание волос в один тон профессиональной краской",
    price: "4500 ₽",
    duration: "150 мин"
  },
  {
    id: 204,
    categoryId: 2,
    title: "Мелирование",
    description: "Частичное окрашивание прядей для создания эффекта осветленных солнцем волос",
    price: "от 3500 ₽",
    duration: "120-180 мин",
    popular: true
  },
  {
    id: 205,
    categoryId: 2,
    title: "Омбре/балаяж",
    description: "Техника окрашивания с плавным переходом от темных корней к светлым кончикам",
    price: "от 5000 ₽",
    duration: "180-240 мин",
    popular: true
  },
  {
    id: 206,
    categoryId: 2,
    title: "Шатуш",
    description: "Техника окрашивания с растяжкой цвета для создания естественного эффекта",
    price: "от 4500 ₽",
    duration: "180 мин"
  },
  {
    id: 207,
    categoryId: 2,
    title: "Тонирование волос",
    description: "Щадящее окрашивание для придания оттенка и блеска волосам",
    price: "от 2000 ₽",
    duration: "60 мин"
  },

  // Категория 3: Уход за волосами
  {
    id: 301,
    categoryId: 3,
    title: "Глубокое увлажнение волос",
    description: "Процедура глубокого увлажнения с использованием профессиональных масок",
    price: "1500 ₽",
    duration: "40 мин",
    popular: true
  },
  {
    id: 302,
    categoryId: 3,
    title: "Питательная маска для волос",
    description: "Насыщение волос питательными веществами для восстановления структуры",
    price: "1800 ₽",
    duration: "45 мин"
  },
  {
    id: 303,
    categoryId: 3,
    title: "Экспресс-ламинирование",
    description: "Создание защитной пленки вокруг волоса для гладкости и блеска",
    price: "2500 ₽",
    duration: "60 мин",
    popular: true
  },
  {
    id: 304,
    categoryId: 3,
    title: "Кератиновое выпрямление",
    description: "Процедура для выпрямления волос и устранения пушистости",
    price: "от 5000 ₽",
    duration: "180-240 мин"
  },
  {
    id: 305,
    categoryId: 3,
    title: "SPA-уход за волосами",
    description: "Комплексный уход включающий массаж головы, маски и сыворотки",
    price: "3000 ₽",
    duration: "90 мин"
  },

  // Категория 4: Лечение волос и кожи головы
  {
    id: 401,
    categoryId: 4,
    title: "Диагностика состояния волос и кожи головы",
    description: "Профессиональная оценка состояния волос и кожи головы с рекомендациями по уходу",
    price: "500 ₽",
    duration: "30 мин"
  },
  {
    id: 402,
    categoryId: 4,
    title: "Лечение выпадения волос",
    description: "Комплекс процедур для укрепления волосяных фолликулов и уменьшения выпадения волос",
    price: "3500 ₽",
    duration: "60 мин",
    popular: true
  },
  {
    id: 403,
    categoryId: 4,
    title: "Лечение секущихся кончиков",
    description: "Процедура восстановления и запаивания секущихся кончиков волос",
    price: "2000 ₽",
    duration: "45 мин"
  },
  {
    id: 404,
    categoryId: 4,
    title: "Пилинг кожи головы",
    description: "Очищение кожи головы от омертвевших клеток для улучшения кровообращения",
    price: "1800 ₽",
    duration: "40 мин"
  },
  {
    id: 405,
    categoryId: 4,
    title: "Комплексное восстановление поврежденных волос",
    description: "Многоэтапная процедура для глубокого восстановления структуры поврежденных волос",
    price: "от 4000 ₽",
    duration: "90 мин",
    popular: true
  }
];
