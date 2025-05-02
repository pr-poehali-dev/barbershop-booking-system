
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-xl flex items-center gap-2 mb-4">
              <Icon name="Scissors" size={24} />
              <span>СТИЛЬ</span>
            </div>
            <p className="text-gray-600 mb-4">
              Профессиональный салон красоты с опытными мастерами и качественной косметикой.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">Главная</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">Услуги</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary">Магазин</Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-600 hover:text-primary">Контакты</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Контактная информация</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <Icon name="MapPin" size={18} />
                <span>ул. Пушкина, д. 10, Москва</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Icon name="Phone" size={18} />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Icon name="Mail" size={18} />
                <span>info@salon-style.ru</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Icon name="Clock" size={18} />
                <span>Пн-Вс: 9:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Салон красоты "СТИЛЬ". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
