
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">О нашем салоне</h2>
            <p className="text-gray-600 mb-6">
              Салон красоты "СТИЛЬ" - это место, где искусство создания красоты встречается с профессионализмом. Мы предлагаем широкий спектр услуг для волос, выполняемых командой опытных мастеров.
            </p>
            <p className="text-gray-600 mb-6">
              Наши стилисты постоянно совершенствуют свои навыки, следят за последними трендами и используют только качественные материалы и косметику.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Опытные мастера</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Современное оборудование</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Качественная косметика</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-primary" />
                <span>Комфортная атмосфера</span>
              </div>
            </div>
            <Button asChild>
              <Link to="/contacts">
                Узнать больше
                <Icon name="ArrowRight" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Салон красоты" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Процесс работы" 
                className="rounded-lg h-64 w-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1614609819116-eee9c271a928?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Стрижка" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Инструменты" 
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
