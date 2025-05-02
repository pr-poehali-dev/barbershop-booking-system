
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Стрижка и укладка",
    description: "Профессиональные стрижки и укладки для женщин, мужчин и детей",
    icon: "Scissors",
    price: "от 1000 ₽"
  },
  {
    id: 2,
    title: "Окрашивание волос",
    description: "Широкий выбор техник окрашивания с использованием профессиональных красителей",
    icon: "Palette",
    price: "от 2500 ₽"
  },
  {
    id: 3,
    title: "Уход за волосами",
    description: "Восстанавливающие и увлажняющие процедуры для всех типов волос",
    icon: "Droplets",
    price: "от 1500 ₽"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Предлагаем широкий спектр услуг по уходу за волосами, выполняемых опытными мастерами с использованием профессиональной косметики
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <Icon name={service.icon} className="text-primary" size={24} />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-lg">{service.price}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <Link to="/book">Записаться</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="default" size="lg">
            <Link to="/services">
              Смотреть все услуги
              <Icon name="ArrowRight" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
