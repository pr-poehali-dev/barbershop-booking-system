
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { serviceCategories, serviceItems, type ServiceItem } from "@/data/services";

const Services = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredServices = activeTab === "all" 
    ? serviceItems 
    : serviceItems.filter(service => service.categoryId === parseInt(activeTab));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div 
            className="absolute inset-0 bg-black opacity-40"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay"
            }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Доверьтесь профессионалам салона "СТИЛЬ" - предлагаем широкий спектр услуг
              по уходу за волосами от опытных мастеров
            </p>
          </div>
        </section>

        {/* Services Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {serviceCategories.map((category) => (
                <Card key={category.id} className="group hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                      <Icon name={category.icon} className="text-primary" size={24} />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="aspect-video relative overflow-hidden rounded-md">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:text-primary transition-colors"
                      onClick={() => setActiveTab(category.id.toString())}
                    >
                      Смотреть услуги
                      <Icon name="ArrowRight" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
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

                <TabsContent value={activeTab} className="mt-0">
                  <div className="space-y-6">
                    {serviceCategories.map((category) => {
                      // Фильтрация услуг по текущей категории
                      const categoryServices = filteredServices.filter(
                        service => service.categoryId === category.id || activeTab === "all"
                      );

                      // Если в текущей категории нет услуг, не отображаем её
                      if (categoryServices.length === 0) return null;

                      return (
                        <div key={category.id} className="mb-12">
                          {activeTab === "all" && (
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <Icon name={category.icon} className="text-primary" size={24} />
                                {category.title}
                              </h2>
                              <p className="text-gray-600">{category.description}</p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {categoryServices.map((service) => (
                              <ServiceCard key={service.id} service={service} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Готовы записаться на услугу?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Наши мастера ждут вас! Запишитесь онлайн и получите скидку 10% на первое посещение
            </p>
            <Button size="lg" variant="outline" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/book">
                Записаться сейчас
                <Icon name="Calendar" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow p-6">
          <div className="flex justify-between items-start mb-2">
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
          <Button variant="outline" asChild className="w-full mt-auto">
            <Link to="/book">Записаться</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Services;
