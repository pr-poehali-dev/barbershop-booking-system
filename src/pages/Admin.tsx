
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { serviceCategories, serviceItems, type ServiceItem, type ServiceCategory } from "@/data/services";
import { stylists, type Stylist } from "@/data/stylists";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("services");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Settings" className="text-primary" size={24} />
            <h1 className="text-xl font-bold">Административная панель</h1>
          </div>
          <Button variant="outline" asChild>
            <a href="/">Вернуться на сайт</a>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="services">
                <Icon name="Scissors" className="mr-2" />
                Услуги
              </TabsTrigger>
              <TabsTrigger value="stylists">
                <Icon name="Users" className="mr-2" />
                Мастера
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Icon name="Calendar" className="mr-2" />
                Записи
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          
          <TabsContent value="stylists">
            <StylistsTab />
          </TabsContent>
          
          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Вкладка управления услугами
const ServicesTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  
  // Фильтрация услуг
  const filteredServices = serviceItems.filter(service => {
    // Фильтр по категории
    if (selectedCategory !== "all" && service.categoryId !== parseInt(selectedCategory)) return false;
    
    // Фильтр по поисковому запросу
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  // Обработчик редактирования услуги
  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
    setShowAddDialog(true);
  };
  
  // Обработчик для кнопки "Добавить услугу"
  const handleAddNew = () => {
    setEditingService(null);
    setShowAddDialog(true);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Управление услугами</h2>
        <Button onClick={handleAddNew}>
          <Icon name="Plus" className="mr-2" />
          Добавить услугу
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search-services" className="mb-2 block">Поиск услуги</Label>
              <div className="relative">
                <Input
                  id="search-services"
                  placeholder="Введите название услуги"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Icon 
                  name="Search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={18} 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category-filter" className="mb-2 block">Категория</Label>
              <select 
                id="category-filter" 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Все категории</option>
                {serviceCategories.map(category => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.id}</TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>
                    {serviceCategories.find(cat => cat.id === service.categoryId)?.title}
                  </TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>
                    {service.popular ? (
                      <Badge variant="secondary">Популярная</Badge>
                    ) : (
                      <Badge variant="outline">Обычная</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Icon name="Edit" size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Trash2" size={18} className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Услуги не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Диалог добавления/редактирования услуги */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Редактирование услуги" : "Добавление новой услуги"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="service-name">Название услуги</Label>
              <Input 
                id="service-name" 
                defaultValue={editingService?.title || ""}
                placeholder="Введите название услуги"
              />
            </div>
            <div>
              <Label htmlFor="service-category">Категория</Label>
              <select 
                id="service-category" 
                defaultValue={editingService?.categoryId || ""}
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled>Выберите категорию</option>
                {serviceCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service-price">Цена</Label>
                <Input 
                  id="service-price" 
                  defaultValue={editingService?.price || ""}
                  placeholder="Пример: 1000 ₽"
                />
              </div>
              <div>
                <Label htmlFor="service-duration">Длительность</Label>
                <Input 
                  id="service-duration" 
                  defaultValue={editingService?.duration || ""}
                  placeholder="Пример: 60 мин"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="service-description">Описание</Label>
              <textarea 
                id="service-description" 
                rows={4}
                defaultValue={editingService?.description || ""}
                placeholder="Введите описание услуги"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="service-popular" 
                defaultChecked={editingService?.popular || false} 
              />
              <Label htmlFor="service-popular">Отметить как популярную услугу</Label>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit">{editingService ? "Сохранить" : "Добавить"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Вкладка управления мастерами
const StylistsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null);
  
  // Фильтрация мастеров
  const filteredStylists = stylists.filter(stylist => {
    // Фильтр по поисковому запросу
    if (searchQuery && !stylist.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  // Обработчик редактирования мастера
  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist);
    setShowAddDialog(true);
  };
  
  // Обработчик для кнопки "Добавить мастера"
  const handleAddNew = () => {
    setEditingStylist(null);
    setShowAddDialog(true);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Управление мастерами</h2>
        <Button onClick={handleAddNew}>
          <Icon name="Plus" className="mr-2" />
          Добавить мастера
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              placeholder="Поиск по имени мастера"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18} 
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStylists.map(stylist => (
          <Card key={stylist.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative pt-[75%]">
              <img 
                src={stylist.photo} 
                alt={stylist.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-3 right-3 ${stylist.available ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {stylist.available ? 'Доступен' : 'Недоступен'}
              </Badge>
            </div>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold mb-1">{stylist.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{stylist.position}</p>
              <div className="flex items-center mb-3">
                <Icon name="Star" className="text-yellow-400 mr-1" size={16} />
                <span className="font-medium">{stylist.rating.toFixed(1)}</span>
                <span className="text-gray-500 mx-2">|</span>
                <span className="text-gray-500 text-sm">Опыт: {stylist.experience}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {stylist.specialization.map((spec, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {spec}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(stylist)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredStylists.length === 0 && (
        <div className="text-center py-16 bg-white rounded-md shadow">
          <Icon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold">Мастера не найдены</h3>
          <p className="text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
        </div>
      )}
      
      {/* Диалог добавления/редактирования мастера */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingStylist ? "Редактирование мастера" : "Добавление нового мастера"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="stylist-name">Имя</Label>
              <Input 
                id="stylist-name" 
                defaultValue={editingStylist?.name || ""}
                placeholder="Введите имя мастера"
              />
            </div>
            <div>
              <Label htmlFor="stylist-position">Должность</Label>
              <Input 
                id="stylist-position" 
                defaultValue={editingStylist?.position || ""}
                placeholder="Например: Стилист-колорист"
              />
            </div>
            <div>
              <Label htmlFor="stylist-photo">Фото (URL)</Label>
              <Input 
                id="stylist-photo" 
                defaultValue={editingStylist?.photo || ""}
                placeholder="Укажите ссылку на фото"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stylist-experience">Опыт работы</Label>
                <Input 
                  id="stylist-experience" 
                  defaultValue={editingStylist?.experience || ""}
                  placeholder="Например: 5 лет"
                />
              </div>
              <div>
                <Label htmlFor="stylist-rating">Рейтинг (1-5)</Label>
                <Input 
                  id="stylist-rating" 
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  defaultValue={editingStylist?.rating || "4.5"}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="stylist-specialization">Специализация</Label>
              <Input 
                id="stylist-specialization" 
                defaultValue={editingStylist?.specialization.join(", ") || ""}
                placeholder="Введите через запятую: Стрижки, Окрашивание"
              />
            </div>
            <div>
              <Label htmlFor="stylist-bio">Биография</Label>
              <textarea 
                id="stylist-bio" 
                rows={4}
                defaultValue={editingStylist?.bio || ""}
                placeholder="Кратко о мастере"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="stylist-available" 
                defaultChecked={editingStylist?.available || true} 
              />
              <Label htmlFor="stylist-available">Мастер доступен для записи</Label>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit">{editingStylist ? "Сохранить" : "Добавить"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Вкладка управления записями
const BookingsTab = () => {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Фиктивные данные для демонстрации
  const bookings = [
    { 
      id: 1, 
      client: "Елена Иванова", 
      service: "Женская стрижка (средняя длина)", 
      stylist: "Анна Петрова", 
      date: "2025-05-03", 
      time: "10:00", 
      status: "confirmed" 
    },
    { 
      id: 2, 
      client: "Александр Смирнов", 
      service: "Мужская стрижка", 
      stylist: "Дмитрий Козлов", 
      date: "2025-05-03", 
      time: "11:30", 
      status: "confirmed" 
    },
    { 
      id: 3, 
      client: "Мария Кузнецова", 
      service: "Окрашивание в один тон (средние волосы)", 
      stylist: "Александр Иванов", 
      date: "2025-05-03", 
      time: "14:00", 
      status: "pending" 
    },
    { 
      id: 4, 
      client: "Ольга Петрова", 
      service: "SPA-уход за волосами", 
      stylist: "Мария Сидорова", 
      date: "2025-05-04", 
      time: "09:30", 
      status: "cancelled" 
    },
    { 
      id: 5, 
      client: "Дмитрий Николаев", 
      service: "Мужская стрижка", 
      stylist: "Дмитрий Козлов", 
      date: "2025-05-04", 
      time: "16:00", 
      status: "confirmed" 
    }
  ];
  
  // Фильтрация записей по статусу
  const filteredBookings = statusFilter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);
  
  // Функция для отображения статуса
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Подтверждено</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Ожидает</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Отменено</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Управление записями</h2>
        <div className="flex gap-4">
          <div className="flex items-center rounded-md border overflow-hidden">
            <Button 
              variant={view === "list" ? "default" : "outline"} 
              size="sm"
              onClick={() => setView("list")}
              className="rounded-r-none"
            >
              <Icon name="List" size={18} className="mr-1" />
              Список
            </Button>
            <Button 
              variant={view === "calendar" ? "default" : "outline"} 
              size="sm"
              onClick={() => setView("calendar")}
              className="rounded-l-none"
            >
              <Icon name="Calendar" size={18} className="mr-1" />
              Календарь
            </Button>
          </div>
          <Button>
            <Icon name="Plus" className="mr-2" />
            Новая запись
          </Button>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date-filter" className="mb-2 block">Дата</Label>
              <Input type="date" id="date-filter" defaultValue="2025-05-03" />
            </div>
            <div>
              <Label htmlFor="stylist-filter" className="mb-2 block">Мастер</Label>
              <select 
                id="stylist-filter" 
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Все мастера</option>
                {stylists.map(stylist => (
                  <option key={stylist.id} value={stylist.id}>
                    {stylist.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="status-filter" className="mb-2 block">Статус</Label>
              <select 
                id="status-filter" 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Все статусы</option>
                <option value="confirmed">Подтверждено</option>
                <option value="pending">Ожидает</option>
                <option value="cancelled">Отменено</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {view === "list" && (
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Мастер</TableHead>
                <TableHead>Дата и время</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.client}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.stylist}</TableCell>
                    <TableCell>
                      {new Date(booking.date).toLocaleDateString('ru-RU')} в {booking.time}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit" size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Trash2" size={18} className="text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Записи не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      {view === "calendar" && (
        <div className="bg-white rounded-md shadow p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold">Май 2025</h3>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
              <div key={index} className="text-center font-medium py-2">
                {day}
              </div>
            ))}
            {/* Пример дней календаря */}
            {Array.from({ length: 31 }).map((_, index) => (
              <div 
                key={index} 
                className={`min-h-24 border rounded-md p-2 ${index === 2 || index === 3 ? 'bg-blue-50' : ''}`}
              >
                <div className="font-medium mb-2">{index + 1}</div>
                {/* Показываем записи для определенных дней (для примера) */}
                {index === 2 && (
                  <div className="space-y-1">
                    <div className="text-xs p-1 bg-green-100 rounded">10:00 - Елена И.</div>
                    <div className="text-xs p-1 bg-green-100 rounded">11:30 - Александр С.</div>
                    <div className="text-xs p-1 bg-yellow-100 rounded">14:00 - Мария К.</div>
                  </div>
                )}
                {index === 3 && (
                  <div className="space-y-1">
                    <div className="text-xs p-1 bg-red-100 rounded">09:30 - Ольга П.</div>
                    <div className="text-xs p-1 bg-green-100 rounded">16:00 - Дмитрий Н.</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
