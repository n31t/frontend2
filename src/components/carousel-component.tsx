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

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? apartments.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === apartments.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
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
          className="whitespace-nowrap transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {apartments.map((apartment, index) => (
            <Card key={apartment.id} className="inline-block w-full">
              <div className="flex items-center justify-center bg-gray-300">
                {apartment.photos.length > 0 && (
                  <img
                    src={apartment.photos[0]}
                    alt={apartment.location}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bold text-[#222]">{apartment.price} ₸</div>
                </div>
                <div className="text-sm text-[#333] mb-4">{apartment.location}</div>
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
