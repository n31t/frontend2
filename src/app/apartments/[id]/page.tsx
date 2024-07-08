"use client"
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
}

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LocateIcon, TagIcon, ExternalLinkIcon } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const ApartmentDetails = ({ params: { id } }: { params: { id: number } }) => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await fetch(`https://backend-production-f116.up.railway.app/api/v1/apartments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setApartment(data);
        } else {
          console.error('Failed to fetch apartment details');
        }
      } catch (error) {
        console.error('Error fetching apartment details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApartmentDetails();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  const characteristics = apartment.characteristics;

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU').format(Number(price));
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-[100dvh]">
        <section className="mx-auto grid grid-cols-1 md:grid-cols-[1fr_650px] gap-4 md:gap-6 py-12 md:pt-8 lg:pt-10 container px-4 md:px-6">
          <div className="grid gap-2">
            <img
              src={apartment.photos[1]}
              width={500}
              height={600}
              alt="Apartment"
              className="rounded-xl object-cover aspect-video"
            />
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">{formatPrice(apartment.price)} 〒</span>
              </div>
              <div className="flex items-center gap-2">
                <LocateIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">{apartment.location}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h2 className="text-3xl font-bold">{apartment.floor}</h2>
              <p className="text-muted-foreground">{apartment.description}</p>
            </div>
            <div className="grid gap-2 grid-cols-2 ">
              {Object.entries(characteristics).map(([key, value], index) => (
                <div className="grid grid-cols-2 gap-2" key={index}>
                  <div className="grid gap-1">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href={apartment.link} passHref
                target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 text-[#0468ff]">
                  <ExternalLinkIcon className="w-4 h-4 " />
                  Страница с оригиналом
   
              </Link>
            </div>
          </div>
        </section>
        <section className="ml-20 mr-auto bg-muted pb-4 md:pb-10 lg:pb-8">
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 px-4 md:px-6">
            {apartment.photos.slice(0).map((photo, index) => (
              <Link
                key={index}
                href="#"
                className="relative overflow-hidden rounded-xl transition-all after:opacity-0 after:absolute after:inset-0 after:bg-black hover:after:opacity-20 focus:after:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                prefetch={false}
              >
                <img
                  src={photo || '/placeholder.svg'}
                  width={150}
                  height={300}
                  alt="Apartment"
                  className="object-cover aspect-square"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ApartmentDetails;
