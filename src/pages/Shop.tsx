
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { productCategories, products, type Product } from "@/data/products";

const Shop = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<string>("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [brandsFilter, setBrandsFilter] = useState<string[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyBestsellers, setShowOnlyBestsellers] = useState(false);
  const [showOnlyNewProducts, setShowOnlyNewProducts] = useState(false);

  // Получить список всех брендов
  const allBrands = Array.from(new Set(products.map(product => product.brand)));

  // Фильтрация продуктов
  const filteredProducts = products.filter(product => {
    // Фильтр по категории
    if (activeTab !== "all" && product.categoryId !== parseInt(activeTab)) return false;
    
    // Фильтр по поисковому запросу
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Фильтр по цене
    const productPrice = product.salePrice || product.price;
    if (productPrice < priceRange.min || productPrice > priceRange.max) return false;
    
    // Фильтр по брендам
    if (brandsFilter.length > 0 && !brandsFilter.includes(product.brand)) return false;
    
    // Фильтр по наличию
    if (showOnlyInStock && !product.inStock) return false;
    
    // Фильтр по бестселлерам
    if (showOnlyBestsellers && !product.isBestseller) return false;
    
    // Фильтр по новинкам
    if (showOnlyNewProducts && !product.isNew) return false;
    
    return true;
  });

  // Сортировка продуктов
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case "price-asc":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-desc":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Обработчик изменения фильтра по брендам
  const handleBrandFilterChange = (brand: string) => {
    if (brandsFilter.includes(brand)) {
      setBrandsFilter(brandsFilter.filter(b => b !== brand));
    } else {
      setBrandsFilter([...brandsFilter, brand]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div 
            className="absolute inset-0 bg-black opacity-40"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay"
            }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Магазин для волос</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Профессиональные средства для ухода, стайлинга и восстановления волос
              от ведущих мировых брендов
            </p>
          </div>
        </section>

        {/* Shop Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Categories Tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="mb-8 flex justify-center">
                <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  <TabsTrigger value="all">Все товары</TabsTrigger>
                  {productCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id.toString()}>
                      {category.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h3 className="text-lg font-bold mb-4">Фильтры</h3>
                    
                    <div className="mb-6">
                      <Label htmlFor="search" className="block mb-2">Поиск</Label>
                      <div className="relative">
                        <Input
                          id="search"
                          placeholder="Найти товар..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                        <Icon 
                          name="Search" 
                          size={18} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Label className="block mb-3">Цена</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          type="number" 
                          placeholder="От" 
                          min={0}
                          value={priceRange.min} 
                          onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})} 
                        />
                        <Input 
                          type="number" 
                          placeholder="До" 
                          min={0}
                          value={priceRange.max} 
                          onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 10000})} 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Label className="block mb-3">Бренды</Label>
                      <div className="space-y-2 max-h-48 overflow-auto pr-2">
                        {allBrands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`brand-${brand}`} 
                              checked={brandsFilter.includes(brand)}
                              onCheckedChange={() => handleBrandFilterChange(brand)}
                            />
                            <Label 
                              htmlFor={`brand-${brand}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Label className="block mb-3">Дополнительно</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="in-stock" 
                            checked={showOnlyInStock}
                            onCheckedChange={(checked) => setShowOnlyInStock(!!checked)}
                          />
                          <Label 
                            htmlFor="in-stock"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Только в наличии
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="bestsellers" 
                            checked={showOnlyBestsellers}
                            onCheckedChange={(checked) => setShowOnlyBestsellers(!!checked)}
                          />
                          <Label 
                            htmlFor="bestsellers"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Бестселлеры
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="new-products" 
                            checked={showOnlyNewProducts}
                            onCheckedChange={(checked) => setShowOnlyNewProducts(!!checked)}
                          />
                          <Label 
                            htmlFor="new-products"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Новинки
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setPriceRange({ min: 0, max: 10000 });
                        setBrandsFilter([]);
                        setShowOnlyInStock(false);
                        setShowOnlyBestsellers(false);
                        setShowOnlyNewProducts(false);
                        setSortType("default");
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                </div>
                
                {/* Products Grid */}
                <div className="md:col-span-3">
                  <TabsContent value={activeTab} className="mt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                      <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                        Найдено товаров: <span className="font-medium">{sortedProducts.length}</span>
                      </div>
                      <div className="flex items-center">
                        <Label htmlFor="sort" className="mr-2 text-sm whitespace-nowrap">Сортировать по:</Label>
                        <Select value={sortType} onValueChange={setSortType}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Сортировка" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">По умолчанию</SelectItem>
                            <SelectItem value="price-asc">Цена (по возрастанию)</SelectItem>
                            <SelectItem value="price-desc">Цена (по убыванию)</SelectItem>
                            <SelectItem value="name-asc">Название (А-Я)</SelectItem>
                            <SelectItem value="name-desc">Название (Я-А)</SelectItem>
                            <SelectItem value="rating-desc">По рейтингу</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {sortedProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <Icon name="SearchX" size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold">Товары не найдены</h3>
                        <p className="text-gray-500 mt-2">Попробуйте изменить параметры фильтрации</p>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-primary">Новинка</Badge>
        )}
        {product.isBestseller && (
          <Badge className="absolute top-3 right-3 bg-orange-500">Хит продаж</Badge>
        )}
        {product.salePrice && (
          <Badge className="absolute bottom-3 left-3 bg-red-500">
            Скидка {Math.round((1 - product.salePrice / product.price) * 100)}%
          </Badge>
        )}
      </div>
      <CardContent className="flex-grow pt-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500">{product.brand}</span>
        </div>
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon 
                key={i} 
                name="Star" 
                size={14} 
                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{product.description}</p>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold">{product.salePrice} ₽</span>
              <span className="text-sm text-gray-500 line-through">{product.price} ₽</span>
            </>
          ) : (
            <span className="text-lg font-bold">{product.price} ₽</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full mt-auto">
          В корзину
          <Icon name="ShoppingCart" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Shop;
