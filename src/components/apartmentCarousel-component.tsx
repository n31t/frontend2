import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface ApartmentCarouselProps {
    apartments: Apartment[];
  }

  interface Apartment {
    id: number;
    link: string;
    price: string;
    location: string;
    floor: string;
    number: string;
    photos: string[];
    characteristics: { [key: string]: string };
    description: string;
    site: string;
    type: string;
    reason ?: string;
  }

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5 // This will make it step 5 apartments at a time
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU').format(Number(price));
  };

// const apartments = Array(40).fill({
//   id: 1,
//   image: 'https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/scale_1200.jpeg',
//   location: 'р-н Медеуский, ул. Аль-Фараби проспект (2.6 км до центра)"',
//   floor: '2-комн. квартира, 55м², 13/21 этаж',
//   price: '80 504 240 ₸',
// });

const ApartmentCarousel = ({ apartments }: ApartmentCarouselProps) => {
    return (
      <div className="w-full max-w-7xl mx-auto ">
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={true}
          swipeable={true}
          draggable={true}
          keyBoardControl={true}
          customTransition="all 0.5s ease-in"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {apartments.map((apartment, index) => (
            <div key={index} className="p-2 bg-white rounded-lg shadow-md flex flex-col justify-between mx-2 h-64">
            <Link href={`/apartments/${apartment.id}`} target="_blank" rel="noopener noreferrer">
              <img src={apartment.photos[0]} alt={`Apartment ${index + 1}`} className="w-full h-32 object-cover rounded-t-lg" />
              <div className="p-2">
                <p className="text-xl font-semibold text-[#202020] truncate">{formatPrice(apartment.price)} ₸{apartment.type === 'rent' ? '/мес.' : apartment.type === 'daily' ? '/сутки' : ''}</p>
                <p className="text-[14px] mt-1 text-[#828282] line-clamp-3">{apartment.floor}</p>
                <p className="text-[12px] mt-1 text-[#8C8C8C] line-clamp-3">{apartment.location}</p>
              </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    );
  };
  

export default ApartmentCarousel;