
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div 
        className="absolute inset-0 bg-black opacity-50"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}
      />
      <div className="container mx-auto relative px-4 py-24 md:py-32 z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Создайте свой идеальный образ
          </h1>
          <p className="text-xl mb-8">
            Доверьтесь профессионалам нашего салона красоты и получите безупречный результат
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/book">Записаться на услугу</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">Наши услуги</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
