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
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-prev-button">
        <ChevronLeft className="carousel-chevron" />
      </button>
      <button onClick={nextSlide} className="carousel-next-button">
        <ChevronRight className="carousel-chevron" />
      </button>
      <div className="carousel-content">
        <div
          className="carousel-items"
          style={{ transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)` }}
        >
          {apartments.map((apartment) => (
            <Card key={apartment.id} className="carousel-card">
              <div className="carousel-card-image-container">
                {apartment.photos.length > 0 && (
                  <img
                    src={apartment.photos[0]}
                    alt={apartment.location}
                    className="carousel-card-image"
                  />
                )}
              </div>
              <CardContent className="carousel-card-content">
                <div className="carousel-card-price">{apartment.price} ₸</div>
                <div className="carousel-card-location">{apartment.location}</div>
                <div className="carousel-card-link-container">
                  <a href={apartment.link} target="_blank" className="carousel-card-link">
                    Подробнее <ChevronRight className="carousel-chevron-small" />
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