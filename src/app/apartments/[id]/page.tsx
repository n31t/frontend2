"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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

const ApartmentDetails = ({ params: { id } }: { params: { id: number } }) => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await fetch(`https://backend-production-f116.up.railway.app/api/v1/apartments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setApartment(data);

          if (data.photos && data.photos.length > 0) {
            setSelectedPhoto(data.photos[0]);
          }
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
    return (
      <div>
    <Header />
    <div id="apartamentsList" className="mt-10 mx-auto">
    <div className="loader mx-auto mt-40"></div>
    <h1 className="text-[#F36202] text-center h-screen">Загрузка...</h1>
 </div>
    <Footer />
 </div>
  )
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
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-12">
          <div className="lg:col-span-2">
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-lg h-[500px] w-full md:h-[600px] md:w-[800px]">
                <img
                  src={selectedPhoto || ''}
                  alt="Apartment"
                  className="absolute inset-0 object-cover w-full h-full blur-sm scale-105"
                />
                <img
                  src={selectedPhoto || ''}
                  alt="Apartment"
                  className="relative object-contain w-full h-full"
                />
              </div>
              <div className="md:w-[800px] flex overflow-x-auto py-2 gap-2">
                {apartment.photos.map((photo, index) => (
                  <div key={index} className="flex-none">
                    <img
                      src={photo}
                      alt="Apartment"
                      className={`w-20 h-20 rounded-md cursor-pointer object-cover ${selectedPhoto === photo ? 'border-4 border-blue-600' : ''}`}
                      onClick={() => setSelectedPhoto(photo)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold">{apartment.floor}</h1>
              <span className="text-4xl font-bold">{formatPrice(apartment.price)} 〒{apartment.type === 'rent' ? '/мес.' : apartment.type === 'daily' ? '/сутки' : ''}</span>
              <div className="flex items-center gap-2">
                <span>{apartment.location}</span>
              </div>
              <div className="grid gap-2">
                {Object.entries(characteristics).map(([key, value], index) => (
                  <div key={index} className="flex justify-between text-gray-600 gap-24">
                    <span className="text-[#8C8C8C]">{key}</span>
                    <span className="font-medium max-w-1/2 text-right">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600">{apartment.description}</p>
              <Link href={apartment.link} passHref target="_blank" className="text-[#FF7024] hover:underline flex items-center gap-1">
                <ExternalLinkIcon className="w-4 h-4" />
                Страница с оригиналом
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ApartmentDetails;
