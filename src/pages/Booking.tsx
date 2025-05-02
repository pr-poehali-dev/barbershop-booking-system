
import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { serviceCategories, serviceItems, type ServiceItem } from "@/data/services";
import { stylists, type Stylist } from "@/data/stylists";
import { getAvailableSlotsForStylist, getAvailableDates, type TimeSlot } from "@/data/timeSlots";

const Booking = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });
  
  // Получение услуг выбранной категории
  const categoryServices = selectedCategory 
    ? serviceItems.filter(service => service.categoryId === selectedCategory)
    : serviceItems;
  
  // Получение мастеров, специализирующихся на выбранной услуге
  const availableStylists = selectedService 
    ? stylists.filter(stylist => 
        stylist.available && 
        stylist.specialization.some(spec => 
          selectedService.title.toLowerCase().includes(spec.toLowerCase())
        )
      )
    : stylists.filter(stylist => stylist.available);
  
  // Получение доступных дат для записи
  const availableDates = getAvailableDates();
  
  // Получение доступных временных слотов для выбранного мастера и даты
  const availableTimeSlots = selectedStylist && selectedDate 
    ? getAvailableSlotsForStylist(
        selectedStylist.id, 
        format(selectedDate, "yyyy-MM-dd")
      )
    : [];
  
  // Обработчик выбора услуги
  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
    if (activeStep === 1) {
      setActiveStep(2);
    }
  };
  
  // Обработчик выбора мастера
  const handleStylistSelect = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    if (activeStep === 2) {
      setActiveStep(3);
    }
  };
  
  // Обработчик выбора времени
  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTime(timeSlot);
    if (activeStep === 3) {
      setActiveStep(4);
    }
  };
  
  // Обработчик изменения данных формы
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ваша запись успешно создана! Мы свяжемся с вами для подтверждения.");
    // Здесь будет логика отправки данных на сервер
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-16">
          <div 
            className="absolute inset-0 bg-black opacity-40"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay"
            }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Онлайн-запись</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Запишитесь на услугу к нашим профессиональным мастерам в удобное для вас время
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Booking Steps */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <Step 
                  number={1} 
                  title="Выберите услугу" 
                  isActive={activeStep === 1} 
                  isCompleted={activeStep > 1}
                  onClick={() => setActiveStep(1)}
                />
                <StepConnector />
                <Step 
                  number={2} 
                  title="Выберите мастера" 
                  isActive={activeStep === 2} 
                  isCompleted={activeStep > 2}
                  onClick={() => selectedService ? setActiveStep(2) : null}
                  isDisabled={!selectedService}
                />
                <StepConnector />
                <Step 
                  number={3} 
                  title="Выберите дату и время" 
                  isActive={activeStep === 3} 
                  isCompleted={activeStep > 3}
                  onClick={() => selectedStylist ? setActiveStep(3) : null}
                  isDisabled={!selectedStylist}
                />
                <StepConnector />
                <Step 
                  number={4} 
                  title="Ваши данные" 
                  isActive={activeStep === 4} 
                  isCompleted={false}
                  onClick={() => selectedTime ? setActiveStep(4) : null}
                  isDisabled={!selectedTime}
                />
              </div>
            </div>
            
            {/* Step 1: Select Service */}
            <div className={`${activeStep === 1 ? 'block' : 'hidden'}`}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Выберите услугу</h2>
                <p className="text-gray-600">Выберите категорию и услугу, на которую хотите записаться</p>
              </div>
              
              <Tabs defaultValue="all" onValueChange={val => setSelectedCategory(val === "all" ? null : parseInt(val))}>
                <div className="mb-8 flex justify-center">
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <TabsTrigger value="all">Все услуги</TabsTrigger>
                    {serviceCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id.toString()}>
                        {category.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <TabsContent value={selectedCategory?.toString() || "all"} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryServices.map((service) => (
                      <Card 
                        key={service.id} 
                        className={`cursor-pointer hover:shadow-md transition-shadow duration-300 ${
                          selectedService?.id === service.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{service.title}</h3>
                              {service.popular && (
                                <Badge variant="secondary" className="mt-1">
                                  Популярная услуга
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <p className="font-bold text-lg">{service.price}</p>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                {service.duration}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                          <Button 
                            variant={selectedService?.id === service.id ? "default" : "outline"} 
                            className="w-full"
                          >
                            {selectedService?.id === service.id ? "Выбрано" : "Выбрать услугу"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-center mt-8">
                <Button 
                  disabled={!selectedService} 
                  onClick={() => selectedService && setActiveStep(2)}
                  size="lg"
                >
                  Продолжить
                  <Icon name="ArrowRight" />
                </Button>
              </div>
            </div>
            
            {/* Step 2: Select Stylist */}
            <div className={`${activeStep === 2 ? 'block' : 'hidden'}`}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Выберите мастера</h2>
                <p className="text-gray-600">
                  {selectedService && (
                    <>Выбранная услуга: <strong>{selectedService.title}</strong> ({selectedService.price})</>
                  )}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableStylists.map((stylist) => (
                  <Card 
                    key={stylist.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow duration-300 ${
                      selectedStylist?.id === stylist.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleStylistSelect(stylist)}
                  >
                    <CardContent className="p-0 flex flex-col">
                      <div className="relative aspect-[3/2]">
                        <img 
                          src={stylist.photo} 
                          alt={stylist.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-1">{stylist.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{stylist.position}</p>
                        <div className="flex items-center mb-3">
                          <Icon name="Star" className="text-yellow-400 mr-1" size={16} />
                          <span className="font-medium">{stylist.rating.toFixed(1)}</span>
                          <span className="text-gray-500 mx-2">|</span>
                          <span className="text-gray-500 text-sm">Опыт: {stylist.experience}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {stylist.specialization.map((spec, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant={selectedStylist?.id === stylist.id ? "default" : "outline"} 
                          className="w-full"
                        >
                          {selectedStylist?.id === stylist.id ? "Выбрано" : "Выбрать мастера"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep(1)}
                >
                  <Icon name="ArrowLeft" />
                  Назад
                </Button>
                <Button 
                  disabled={!selectedStylist} 
                  onClick={() => selectedStylist && setActiveStep(3)}
                >
                  Продолжить
                  <Icon name="ArrowRight" />
                </Button>
              </div>
            </div>
            
            {/* Step 3: Select Date and Time */}
            <div className={`${activeStep === 3 ? 'block' : 'hidden'}`}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Выберите дату и время</h2>
                <p className="text-gray-600">
                  {selectedService && selectedStylist && (
                    <>
                      Услуга: <strong>{selectedService.title}</strong> | 
                      Мастер: <strong>{selectedStylist.name}</strong>
                    </>
                  )}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Выберите дату</h3>
                  <div className="bg-white rounded-md shadow p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={ru}
                      disabled={(date) => {
                        // Отключаем прошедшие даты и даты, недоступные для записи
                        const dateStr = format(date, "yyyy-MM-dd");
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || !availableDates.includes(dateStr);
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Выберите время</h3>
                  {selectedDate ? (
                    availableTimeSlots.length > 0 ? (
                      <div className="bg-white rounded-md shadow p-6">
                        <h4 className="font-medium mb-4">
                          {format(selectedDate, "d MMMM yyyy", { locale: ru })}
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {availableTimeSlots.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={selectedTime?.id === slot.id ? "default" : "outline"}
                              className="w-full"
                              onClick={() => handleTimeSelect(slot)}
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-md shadow p-6 text-center">
                        <Icon name="Calendar" size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">
                          На выбранную дату нет доступных временных слотов
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="bg-white rounded-md shadow p-6 text-center">
                      <Icon name="Calendar" size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">
                        Пожалуйста, сначала выберите дату
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep(2)}
                >
                  <Icon name="ArrowLeft" />
                  Назад
                </Button>
                <Button 
                  disabled={!selectedTime} 
                  onClick={() => selectedTime && setActiveStep(4)}
                >
                  Продолжить
                  <Icon name="ArrowRight" />
                </Button>
              </div>
            </div>
            
            {/* Step 4: Contact Information */}
            <div className={`${activeStep === 4 ? 'block' : 'hidden'}`}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Ваши данные</h2>
                <p className="text-gray-600">
                  Заполните форму для завершения записи
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="name" className="mb-2 block">Имя</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="Введите ваше имя"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="mb-2 block">Телефон</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="+7 (___) ___-__-__"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <Label htmlFor="email" className="mb-2 block">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="mb-6">
                      <Label htmlFor="comment" className="mb-2 block">Комментарий</Label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleFormChange}
                        placeholder="Дополнительная информация или пожелания"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Способ оплаты</h4>
                      <RadioGroup defaultValue="cash">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash">Наличными в салоне</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card">Картой в салоне</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online">Онлайн-оплата (скидка 5%)</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setActiveStep(3)}
                      >
                        <Icon name="ArrowLeft" />
                        Назад
                      </Button>
                      <Button type="submit">
                        Завершить запись
                        <Icon name="Check" />
                      </Button>
                    </div>
                  </form>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Детали записи</h3>
                      {selectedService && (
                        <div className="mb-4 pb-4 border-b">
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Услуга</h4>
                          <p className="font-medium">{selectedService.title}</p>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-600">Стоимость:</span>
                            <span className="font-bold">{selectedService.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Длительность:</span>
                            <span>{selectedService.duration}</span>
                          </div>
                        </div>
                      )}
                      
                      {selectedStylist && (
                        <div className="mb-4 pb-4 border-b">
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Мастер</h4>
                          <div className="flex items-center gap-3">
                            <img 
                              src={selectedStylist.photo} 
                              alt={selectedStylist.name} 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{selectedStylist.name}</p>
                              <p className="text-sm text-gray-500">{selectedStylist.position}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedDate && selectedTime && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Дата и время</h4>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Calendar" size={16} />
                            <span className="font-medium">
                              {format(selectedDate, "d MMMM yyyy", { locale: ru })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={16} />
                            <span className="font-medium">{selectedTime.time}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Step компонент
interface StepProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

const Step = ({ number, title, isActive, isCompleted, isDisabled = false, onClick }: StepProps) => {
  return (
    <div 
      className={`flex flex-col items-center ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
          ${isActive ? 'bg-primary' : 
            isCompleted ? 'bg-green-500' : 
            'bg-gray-300'
          }`}
      >
        {isCompleted ? <Icon name="Check" size={18} /> : number}
      </div>
      <span className={`mt-2 text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-600'}`}>
        {title}
      </span>
    </div>
  );
};

// StepConnector компонент
const StepConnector = () => {
  return (
    <div className="hidden md:block w-16 h-[2px] bg-gray-300" />
  );
};

export default Booking;
