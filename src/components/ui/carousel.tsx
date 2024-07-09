import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Apartment {
  id: number;
  link: string;
  price: string;
  location: string;
  photos: string[];
}

interface CarouselComponentProps {
  apartments: Apartment[];
}

export function CarouselComponent({ apartments }: CarouselComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? Math.max(apartments.length - itemsPerPage, 0) : currentIndex - itemsPerPage;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex >= apartments.length - itemsPerPage;
    const newIndex = isLastSlide ? 0 : currentIndex + itemsPerPage;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative">
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)` }}
        >
          {apartments.map((apartment) => (
            <Card key={apartment.id} className="inline-block w-1/5">
              <div className="flex items-center justify-center bg-gray-300">
                {apartment.photos.length > 0 && (
                  <img
                    src={apartment.photos[0]}
                    alt={apartment.location}
                    className="w-full h-32 object-cover"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <div className="text-sm font-bold text-[#222]">{apartment.price} ₸</div>
                <div className="text-xs text-[#333] mb-4">{apartment.location}</div>
                <div className="mt-2 text-right">
                  <a href={apartment.link} target="_blank" className="text-[#007bff] hover:underline">
                    Подробнее <ChevronRight className="inline h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
