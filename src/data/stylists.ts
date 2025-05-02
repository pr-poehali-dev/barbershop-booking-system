
export interface Stylist {
  id: number;
  name: string;
  position: string;
  photo: string;
  experience: string;
  rating: number;
  specialization: string[];
  bio: string;
  available: boolean;
}

export const stylists: Stylist[] = [
  {
    id: 1,
    name: "Анна Петрова",
    position: "Ведущий стилист",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    experience: "7 лет",
    rating: 4.9,
    specialization: ["Окрашивание", "Стрижки", "Укладки"],
    bio: "Анна — профессионал с богатым опытом в создании уникальных образов. Регулярно повышает квалификацию на международных мастер-классах и является победителем городских конкурсов парикмахерского искусства.",
    available: true
  },
  {
    id: 2,
    name: "Александр Иванов",
    position: "Стилист-колорист",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    experience: "5 лет",
    rating: 4.8,
    specialization: ["Сложное окрашивание", "Мужские стрижки"],
    bio: "Александр специализируется на сложных техниках окрашивания и креативных мужских стрижках. Создает образы, подчеркивающие индивидуальность каждого клиента.",
    available: true
  },
  {
    id: 3,
    name: "Мария Сидорова",
    position: "Мастер по уходовым процедурам",
    photo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
    experience: "6 лет",
    rating: 4.7,
    specialization: ["Уход за волосами", "Лечение", "Восстановление"],
    bio: "Мария — эксперт по восстановлению и лечению волос. Владеет всеми современными техниками ухода и помогает клиентам вернуть здоровье и красоту волосам.",
    available: true
  },
  {
    id: 4,
    name: "Дмитрий Козлов",
    position: "Стилист",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    experience: "3 года",
    rating: 4.5,
    specialization: ["Стрижки", "Детские стрижки", "Укладки"],
    bio: "Дмитрий — молодой и талантливый стилист, который отлично чувствует современные тренды. Особенно хорошо работает с детьми, создавая для них комфортную атмосферу.",
    available: true
  },
  {
    id: 5,
    name: "Екатерина Новикова",
    position: "Ведущий стилист-колорист",
    photo: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    experience: "9 лет",
    rating: 5.0,
    specialization: ["Сложное окрашивание", "Стрижки", "Прически"],
    bio: "Екатерина — признанный эксперт в области колористики с опытом работы более 9 лет. Постоянно следит за трендами и внедряет новые техники в свою работу.",
    available: false
  }
];
