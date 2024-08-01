"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLinkIcon, InfoIcon } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { FaWhatsapp } from 'react-icons/fa';
import axiosInstance from '@/components/utils/axiosInstance';

interface User {
  id: number;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  name: string | null;
  surname: string | null;
  age: number | null;
  smallDescription: string | null;
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
}

const ApartmentDetails = ({ params: { id } }: { params: { id: number } }) => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
              throw new Error('No token found');
          }
          const response = await axiosInstance.post('userId-by-token', { token });
          const id = response.data.id;
          const { data } = await axiosInstance.get<User>(`/users/${id}`);
          setUser(data);
      } catch (error) {
          console.error('Error fetching user info:', error);
      } finally {
          setIsLoading(false);
      }
  };

  const checkUserRequirements = () => {
    if(user?.phoneNumber && user?.phoneNumber.replace(/\D/g, '').length == 11 && user?.name && user?.surname && user?.smallDescription) {
      return true
    }
    return false; 
  };

  const handleAutocontact = () => {
    if (apartment?.number.replace(/\D/g, '').length !== 11) {
      setDialogMessage('Арендодатель скрыл номер');
      setIsDialogOpen(true);
    } else if (checkUserRequirements()) {
      console.log("Initiating WhatsApp autocontact");
      axiosInstance.post('/whats/add', { apartment, user })
        .then(response => {
          console.log('WhatsApp contact initiated', response.data);
          setDialogMessage('Сообщение отправлено! Арендодатель получил ваш контакт и свяжется с вами в ближайшее время.');
          setIsDialogOpen(true);
        })
        .catch(error => {
          console.error('Error initiating WhatsApp contact', error);
          setDialogMessage('Произошла ошибка при отправке сообщения. Попробуйте позже.');
          setIsDialogOpen(true);
        });
    } else {
      setDialogMessage('ОШИБКА АВТОКОНТАКТА!<br>Для использования функции автоконтакта необходимо:<br>- Войти в систему<br>- Заполнить все обязательные поля профиля, включая ваш номер телефона на котором у вас зарегистрирован WhatsApp<br><br>Личные данные из профиля нужны для автоконтакта с арендодателем, чтобы он смог связаться с вами позже<br><br>Пожалуйста, выполните эти действия и повторите попытку.');
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    if (apartment && apartment.location) {
      const geocode = async () => {
        try {
          // const query = encodeURIComponent(apartment.location.replace(';', '').trim());
          const response = await fetch('https://backend-production-f116.up.railway.app/api/v1/maps/geocode', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              address: apartment.location,
              characteristics: apartment.characteristics }),
          });
          const data = await response.json();
          console.log(data);
          if (data && data.response && data.response.GeoObjectCollection.featureMember.length > 0) {
            const coordinatesStr = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            const coordinatesArray = coordinatesStr.split(' ').map(Number);
            setCoordinates([coordinatesArray[1], coordinatesArray[0]]); // Yandex returns [long, lat], we need [lat, long]
          } else {
            console.error('No results found for the location');
          }
        } catch (error) {
          console.error('Error geocoding the location:', error);
        }
      };

      geocode();
    }
  }, [apartment]);

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
              <Link href={apartment.link} passHref target="_blank" className="">
              <button 
                className="bg-[#FF7024] text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center gap-2 mx-auto w-full justify-center"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                Страница с оригиналом
                </button>
              </Link>
              <div className="relative">
              <button 
                onClick={handleAutocontact} 
                className="bg-[#25D366] hover:bg-green-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center gap-2 mx-auto w-full justify-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <FaWhatsapp className="mr-2 w-4" />
                Автоконтакт по WhatsApp
                {/* <InfoIcon className="w-4 h-4" /> */}
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-[#FFFFFF] text-white text-sm rounded shadow-lg">
                  Автоматически отправляет сообщение владельцу квартиры через WhatsApp
                </div>
              )}
              </div>
              
            </div>
          </div>
        </section>
        <section className="container mx-auto py-12">
          {coordinates ? (
            <YMaps>
              <Map
                defaultState={{ center: coordinates, zoom: 18 }}
                width="100%"
                height="400px"
              >
                <Placemark geometry={coordinates} />
              </Map>
            </YMaps>
          ) : (
            <p className="text-center">Координаты для этого адреса не найдены.</p>
          )}
        </section>
      </div>
      <Footer />
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center" style={{backgroundColor: 'rgba(222, 221, 221, 0.95)'}}>
          <div className="p-6 rounded-lg" style={{backgroundColor: '#ffffff', maxWidth: '500px'}}>
            <h2 className="text-xl font-bold mb-4" style={{color: '#333333'}}>Информация</h2>
            <p dangerouslySetInnerHTML={{ __html: dialogMessage }}></p>
            <button 
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 px-4 py-2 rounded-lg"
              style={{backgroundColor: '#FF7024', color: '#ffffff', cursor: 'pointer'}}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#CB5200'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF7024'}
            >
              Закрыть
            </button>
          </div>
        </div>
        )}
    </div>
  );
};

export default ApartmentDetails;


// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { ExternalLinkIcon } from 'lucide-react';
// import mapboxgl from 'mapbox-gl';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.toString() || '';

// interface Apartment {
//   id: number;
//   link: string;
//   price: string;
//   location: string;
//   floor: string;
//   number: string;
//   photos: string[];
//   characteristics: { [key: string]: string };
//   description: string;
//   site: string;
//   type: string;
// }

// const ApartmentDetails = ({ params: { id } }: { params: { id: number } }) => {
//   const [apartment, setApartment] = useState<Apartment | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

//   const testApartment: Apartment = {
//     id: 11219923,
//     link: 'https://almaty.etagi.com/realty_rent/11219923/',
//     price: '250000',
//     location: 'Розыбакиева',
//     floor: '2-комн. квартира, 40м², 2/4 этаж',
//     number: '+7 771 193 9134',
//     photos: ['https://static.maps.2gis.com/1.0?s=450,450&pt=43.242411,76.927616~b:iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM%2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANLSURBVHgBxZi%2Fb9NAFMe%2FttMfkFakC6ypGKnUdGJgSaF0Q3JYYIG2bAyoYmBuECOiLWKBiVawMGHWqjT%2BD2glGFHzHzSUFgSJfbyXH5Xt2M6dnYSP5MS5e%2Bf75s53773TkJAjs5gDMssGxKyAVqCiPF25dnWNrqpGlwP3E%2BDaU5ZdRQI0KHJkLhQNYE0ARZV21JFNYrenrL0txXaywooFA5kNVWEhXe67qJdkR1SXMToxb67qyFTSi2NEgZ51%2BNNcWJOx7jmC%2FCAXKGMA0OiUJ63dp3E2sQIHKa5DL5GRAnlaHYhNDAEahMdT1m5oX6ECaUHk%2BT3B8Ki5aMyFLZzQRWLA2MBwydEO8TasomsEeZ8j1RUkYGR%2Bsfldr%2BwgCTTV8zTVtrcsEzQiz7Ak1PdvjN29j7E795r3%2BsVL%2BPPhHVQhB7BKX7a3rGuKSdwyFBl%2F8PBMHOMVqwLvsy0XGiGQpxcKaNkszj16gtFbt7vqWOQ41SnC%2BfG6k8%2FVq%2BWLzobOaR4IQ%2BdmDtEYB59mYVOWriMe0sIS3UsCLZzAPFgfBGTuvT1e5YiwI%2BxwhK4L6CXN5fRQJOqxGqU6rgThCEGyMSIfDNq1erXZwKDJQwaCvK2gmnzyLCNFKZJhKg8Og2NdbzYpVCYOzS3%2BQySNZfiNlhHJ9n1fb67%2FcYZ0LxRCqzL6n6T8KL9gjO8iO0VL%2BxsEBk6SyYtF06zwyTVPmbUb9oHEHKoI2bFqiA6B5qPAXHqKTdUuUNszm5QZt4hdjHEf9YLnvPd2FrrVd8ZfbwJNo9na8X19nX42N2Hjc0%2BNzdyA7pWwLi5%2BZ%2FZqFw6NjaVlk%2BD5xi9N5cWprx9eDje31vbG53A9%2BzJkW3A4lm5eq%2FdDvF07OgNgeHV2VpZm0jsG0q1YdjGCdAekDaosL7BhOPrCIidbiQ1RABOAsY0mGMwn3OACdwQ6IDBC3BCRQThtczn7f0lF4vwkLvLFBrXl0H8rAhHoFnB6CfoZ6lK8ZTtAb4uzWyH8yYNYhjsBUwv1CFERha3ffBhdfPC9wf12%2FVOXHtseXz5b2ClAf9SVa4LtE5f5o0Rbht5IF2oNThOPyNztR2pFNgteQ5JziayhFw0MF9Cq%2BaXgTpZP65EomnlGgBZ9SKuFyXj8Jrf6e7h9jTD8jSB%2F84NAAAAAElFTkSuQmCC'],
//     characteristics: {
//       'Общая площадь': '40м²',
//       'Этаж': '2 из 4',
//       'Тип строения': 'кирпич',
//       'Год постройки': '1965',
//       'Количество комнат': '2',
//       'Санузел': 'раздельный',
//       'Мебель': 'частично',
//       'Бытовая техника': 'есть',
//       'Балкон': 'нет',
//       'Ремонт': 'косметический',
//     },
//     description: 'Сдается 2-комнатная квартира на длительный срок. Хорошее расположение, все необходимое в шаговой доступности. Частично меблирована, есть бытовая техника.',
//     site: 'Etagi.com',
//     type: 'rent'
//   };

//   // useEffect(() => {
//   //   const fetchApartmentDetails = async () => {
//   //     try {
//   //       const response = await fetch(`https://backend-production-f116.up.railway.app/api/v1/apartments/${id}`);
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setApartment(data);

//   //         if (data.photos && data.photos.length > 0) {
//   //           setSelectedPhoto(data.photos[0]);
//   //         }
//   //       } else {
//   //         console.error('Failed to fetch apartment details');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching apartment details:', error);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   if (id) {
//   //     fetchApartmentDetails();
//   //   }
//   // }, [id]);
//   useEffect(() => {
//     setApartment(testApartment);
//     setSelectedPhoto(testApartment.photos[0]);
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     if (apartment && apartment.location) {
//       const geocode = async () => {
//         try {
//           const query = encodeURIComponent(apartment.location.replace(';', '').trim());
//          const bbox = '75.83064,42.81043,77.97484,43.65696'; // Almaty bounding box
//          const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&bbox=75.87541,42.75272,77.92112,43.56138&language=ru&worldview=ru&access_token=${mapboxgl.accessToken}`);
//          console.log(response);
//          const data = await response.json();

//           if (data && data.features && data.features.length > 0) {
//             const coordinates = data.features[0].geometry.coordinates;
//             const map = new mapboxgl.Map({
//               container: 'map',
//               style: 'mapbox://styles/mapbox/streets-v11',
//               center: coordinates,
//               zoom: 12
//             });

//             new mapboxgl.Marker({ color: '#FF7024' })
//               .setLngLat(coordinates)
//               .addTo(map);
//           } else {
//             console.error('No results found for the location');
//           }
//         } catch (error) {
//           console.error('Error geocoding the location:', error);
//         }
//       };

//       geocode();
//     }
//   }, [apartment]);

//   if (isLoading) {
//     return (
//       <div>
//         <Header />
//         <div id="apartmentsList" className="mt-10 mx-auto">
//           <div className="loader mx-auto mt-40"></div>
//           <h1 className="text-[#F36202] text-center h-screen">Загрузка...</h1>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!apartment) {
//     return <div>Apartment not found</div>;
//   }

//   const characteristics = apartment.characteristics;

//   const formatPrice = (price: string) => {
//     return new Intl.NumberFormat('ru-RU').format(Number(price));
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col min-h-[100dvh]">
//         <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-12">
//           <div className="lg:col-span-2">
//             <div className="grid gap-4">
//               <div className="relative overflow-hidden rounded-lg h-[500px] w-full md:h-[600px] md:w-[800px]">
//                 <img
//                   src={selectedPhoto || ''}
//                   alt="Apartment"
//                   className="absolute inset-0 object-cover w-full h-full blur-sm scale-105"
//                 />
//                 <img
//                   src={selectedPhoto || ''}
//                   alt="Apartment"
//                   className="relative object-contain w-full h-full"
//                 />
//               </div>
//               <div className="md:w-[800px] flex overflow-x-auto py-2 gap-2">
//                 {apartment.photos.map((photo, index) => (
//                   <div key={index} className="flex-none">
//                     <img
//                       src={photo}
//                       alt="Apartment"
//                       className={`w-20 h-20 rounded-md cursor-pointer object-cover ${selectedPhoto === photo ? 'border-4 border-blue-600' : ''}`}
//                       onClick={() => setSelectedPhoto(photo)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="grid gap-4">
//               <h1 className="text-3xl font-bold">{apartment.floor}</h1>
//               <span className="text-4xl font-bold">{formatPrice(apartment.price)} 〒{apartment.type === 'rent' ? '/мес.' : apartment.type === 'daily' ? '/сутки' : ''}</span>
//               <div className="flex items-center gap-2">
//                 <span>{apartment.location}</span>
//               </div>
//               <div className="grid gap-2">
//                 {Object.entries(characteristics).map(([key, value], index) => (
//                   <div key={index} className="flex justify-between text-gray-600 gap-24">
//                     <span className="text-[#8C8C8C]">{key}</span>
//                     <span className="font-medium max-w-1/2 text-right">{value}</span>
//                   </div>
//                 ))}
//               </div>
//               <p className="text-gray-600">{apartment.description}</p>
//               <Link href={apartment.link} passHref target="_blank" className="text-[#FF7024] hover:underline flex items-center gap-1">
//                 <ExternalLinkIcon className="w-4 h-4" />
//                 Страница с оригиналом
//               </Link>
//             </div>
//             <div id="map" className="w-full h-80 rounded-md mt-4" style={{ backgroundColor: '#FF7024' }}></div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ApartmentDetails;


// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { ExternalLinkIcon } from 'lucide-react';
// import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { InfoIcon } from 'lucide-react';
// import { FaWhatsapp } from 'react-icons/fa';
// import axiosInstance from '@/components/utils/axiosInstance';


// interface Apartment {
//   id: number;
//   link: string;
//   price: string;
//   location: string;
//   floor: string;
//   number: string;
//   photos: string[];
//   characteristics: { [key: string]: string };
//   description: string;
//   site: string;
//   type: string;
// }

// interface User {
//   id: number;
//   email: string;
//   username: string | null;
//   phoneNumber: string | null;
//   name: string | null;
//   surname: string | null;
//   age: number | null;
//   smallDescription: string | null;
// }

// const ApartmentDetails = ({ params: { id } }: { params: { id: number } }) => {
//   const [apartment, setApartment] = useState<Apartment | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
//   const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState('');

//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//       fetchUserInfo();
//   }, []);

//   const fetchUserInfo = async () => {
//       setIsLoading(true);
//       try {
//           const token = localStorage.getItem('accessToken');
//           if (!token) {
//               throw new Error('No token found');
//           }
//           const response = await axiosInstance.post('userId-by-token', { token });
//           const id = response.data.id;
//           const { data } = await axiosInstance.get<User>(`/users/${id}`);
//           setUser(data);
//       } catch (error) {
//           console.error('Error fetching user info:', error);
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   const checkUserRequirements = () => {
//     if(user?.phoneNumber && user?.phoneNumber.replace(/\D/g, '').length !== 11 && user?.name && user?.surname && user?.smallDescription) {
//       return true
//     }
//     return false; // For demonstration, always return false
//   };

//   const handleAutocontact = () => {
//     if (apartment?.number.replace(/\D/g, '').length !== 11) {
//       setDialogMessage('Арендодатель скрыл номер');
//       setIsDialogOpen(true);
//     } else if (checkUserRequirements()) {
//       console.log("Initiating WhatsApp autocontact");
//       axiosInstance.post('/whats/add', { apartment, user })
//         .then(response => {
//           console.log('WhatsApp contact initiated', response.data);
//           setDialogMessage('Сообщение отправлено! Арендодатель получил ваш контакт и свяжется с вами в ближайшее время.');
//           setIsDialogOpen(true);
//         })
//         .catch(error => {
//           console.error('Error initiating WhatsApp contact', error);
//           setDialogMessage('Произошла ошибка при отправке сообщения. Попробуйте позже.');
//           setIsDialogOpen(true);
//         });
//     } else {
//       setDialogMessage('ОШИБКА АВТОКОНТАКТА!<br>Для использования функции автоконтакта необходимо:<br>- Войти в систему<br>- Заполнить все обязательные поля профиля, включая ваш номер телефона на котором у вас зарегистрирован WhatsApp<br><br>Личные данные из профиля нужны для автоконтакта с арендодателем, чтобы он смог связаться с вами позже<br><br>Пожалуйста, выполните эти действия и повторите попытку.');
//       setIsDialogOpen(true);
//     }
//   };

//   const testApartment: Apartment = {
//     id: 11219923,
//     link: 'https://almaty.etagi.com/realty_rent/11219923/',
//     price: '250000',
//     location: 'Гагарина 35 — Карасай батыра',
//     floor: '2-комн. квартира, 40м², 2/4 этаж',
//     number: '+7 771 193 9134',
//     photos: ['https://static.maps.2gis.com/1.0?s=450,450&pt=43.242411,76.927616~b:iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM%2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANLSURBVHgBxZi%2Fb9NAFMe%2FttMfkFakC6ypGKnUdGJgSaF0Q3JYYIG2bAyoYmBuECOiLWKBiVawMGHWqjT%2BD2glGFHzHzSUFgSJfbyXH5Xt2M6dnYSP5MS5e%2Bf75s53773TkJAjs5gDMssGxKyAVqCiPF25dnWNrqpGlwP3E%2BDaU5ZdRQI0KHJkLhQNYE0ARZV21JFNYrenrL0txXaywooFA5kNVWEhXe67qJdkR1SXMToxb67qyFTSi2NEgZ51%2BNNcWJOx7jmC%2FCAXKGMA0OiUJ63dp3E2sQIHKa5DL5GRAnlaHYhNDAEahMdT1m5oX6ECaUHk%2BT3B8Ki5aMyFLZzQRWLA2MBwydEO8TasomsEeZ8j1RUkYGR%2Bsfldr%2BwgCTTV8zTVtrcsEzQiz7Ak1PdvjN29j7E795r3%2BsVL%2BPPhHVQhB7BKX7a3rGuKSdwyFBl%2F8PBMHOMVqwLvsy0XGiGQpxcKaNkszj16gtFbt7vqWOQ41SnC%2BfG6k8%2FVq%2BWLzobOaR4IQ%2BdmDtEYB59mYVOWriMe0sIS3UsCLZzAPFgfBGTuvT1e5YiwI%2BxwhK4L6CXN5fRQJOqxGqU6rgThCEGyMSIfDNq1erXZwKDJQwaCvK2gmnzyLCNFKZJhKg8Og2NdbzYpVCYOzS3%2BQySNZfiNlhHJ9n1fb67%2FcYZ0LxRCqzL6n6T8KL9gjO8iO0VL%2BxsEBk6SyYtF06zwyTVPmbUb9oHEHKoI2bFqiA6B5qPAXHqKTdUuUNszm5QZt4hdjHEf9YLnvPd2FrrVd8ZfbwJNo9na8X19nX42N2Hjc0%2BNzdyA7pWwLi5%2BZ%2FZqFw6NjaVlk%2BD5xi9N5cWprx9eDje31vbG53A9%2BzJkW3A4lm5eq%2FdDvF07OgNgeHV2VpZm0jsG0q1YdjGCdAekDaosL7BhOPrCIidbiQ1RABOAsY0mGMwn3OACdwQ6IDBC3BCRQThtczn7f0lF4vwkLvLFBrXl0H8rAhHoFnB6CfoZ6lK8ZTtAb4uzWyH8yYNYhjsBUwv1CFERha3ffBhdfPC9wf12%2FVOXHtseXz5b2ClAf9SVa4LtE5f5o0Rbht5IF2oNThOPyNztR2pFNgteQ5JziayhFw0MF9Cq%2BaXgTpZP65EomnlGgBZ9SKuFyXj8Jrf6e7h9jTD8jSB%2F84NAAAAAElFTkSuQmCC'],
//     characteristics: {
//       'Общая площадь': '40м²',
//       'Этаж': '2 из 4',
//       'Тип строения': 'кирпич',
//       'Год постройки': '1965',
//       'Количество комнат': '2',
//       'Санузел': 'раздельный',
//       'Мебель': 'частично',
//       'Бытовая техника': 'есть',
//       'Балкон': 'нет',
//       'Ремонт': 'косметический',
//     },
//     description: 'Сдается 2-комнатная квартира на длительный срок. Хорошее расположение, все необходимое в шаговой доступности. Частично меблирована, есть бытовая техника.',
//     site: 'Etagi.com',
//     type: 'rent'
//   };

//   useEffect(() => {
//     setApartment(testApartment);
//     setSelectedPhoto(testApartment.photos[0]);
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     if (apartment && apartment.location) {
//       const geocode = async () => {
//         try {
//           // const query = encodeURIComponent(apartment.location.replace(';', '').trim());
//           const response = await fetch('https://backend-production-f116.up.railway.app/api/v1/maps/geocode', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ address: apartment.location }),
//           });
//           const data = await response.json();
//           if (data && data.response && data.response.GeoObjectCollection.featureMember.length > 0) {
//             const coordinatesStr = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
//             const coordinatesArray = coordinatesStr.split(' ').map(Number);
//             setCoordinates([coordinatesArray[1], coordinatesArray[0]]); // Yandex returns [long, lat], we need [lat, long]
//           } else {
//             console.error('No results found for the location');
//           }
//         } catch (error) {
//           console.error('Error geocoding the location:', error);
//         }
//       };

//       geocode();
//     }
//   }, [apartment]);

//   if (isLoading) {
//     return (
//       <div>
//         <Header />
//         <div id="apartmentsList" className="mt-10 mx-auto">
//           <div className="loader mx-auto mt-40"></div>
//           <h1 className="text-[#F36202] text-center h-screen">Загрузка...</h1>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!apartment) {
//     return <div>Apartment not found</div>;
//   }

//   const characteristics = apartment.characteristics;

//   const formatPrice = (price: string) => {
//     return new Intl.NumberFormat('ru-RU').format(Number(price));
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col min-h-[100dvh]">
//         <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-12">
//           <div className="lg:col-span-2">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {apartment.photos.map((photo) => (
//                 <img
//                   key={photo}
//                   src={photo}
//                   alt="Apartment"
//                   className="w-full h-full object-cover cursor-pointer"
//                   onClick={() => setSelectedPhoto(photo)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div>
//             <h1 className="text-3xl font-semibold mb-2">{apartment.location}</h1>
//             <p className="text-gray-600 mb-4">{apartment.floor}</p>
//             <p className="text-2xl text-[#F36202] mb-4">{formatPrice(apartment.price)} ₸</p>
//             <Link href={apartment.link} passHref>
//               <p className="inline-flex items-center text-[#F36202] hover:underline">
//                 Перейти к объявлению <ExternalLinkIcon className="ml-1 w-4 h-4" />
//               </p>
//             </Link>
//             <div className="relative">
//               <button 
//                 onClick={handleAutocontact} 
//                 className="bg-[#25D366] hover:bg-green-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center gap-2"
//                 onMouseEnter={() => setShowTooltip(true)}
//                 onMouseLeave={() => setShowTooltip(false)}
//               >
//                 <FaWhatsapp className="mr-2 w-4" />
//                 Автоконтакт по WhatsApp
//                 {/* <InfoIcon className="w-4 h-4" /> */}
//               </button>
//               {showTooltip && (
//                 <div className="absolute bottom-full left-0 mb-2 p-2 bg-[#FFFFFF] text-white text-sm rounded shadow-lg">
//                   Автоматически отправляет сообщение владельцу квартиры через WhatsApp
//                 </div>
//               )}
//             </div>
//             <div className="mt-4">
//               <h2 className="text-lg font-medium mb-2">Характеристики:</h2>
//               <ul className="list-disc list-inside space-y-1">
//                 {Object.entries(characteristics).map(([key, value]) => (
//                   <li key={key}>
//                     <span className="font-semibold">{key}:</span> {value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-4">
//               <h2 className="text-lg font-medium mb-2">Описание:</h2>
//               <p>{apartment.description}</p>
//             </div>
//             <div className="mt-4">
//               <h2 className="text-lg font-medium mb-2">Контактный номер:</h2>
//               <Link href={`tel:${apartment.number}`} className="text-[#F36202] hover:underline">{apartment.number}</Link>
//             </div>
//           </div>
//         </section>
//         <section className="container mx-auto py-12">
//           {coordinates ? (
//             <YMaps>
//               <Map
//                 defaultState={{ center: coordinates, zoom: 18 }}
//                 width="100%"
//                 height="400px"
//               >
//                 <Placemark geometry={coordinates} />
//               </Map>
//             </YMaps>
//           ) : (
//             <p className="text-center">Координаты для этого адреса не найдены.</p>
//           )}
//         </section>
//       </div>
//       <Footer />
//       {isDialogOpen && (
//   <div className="fixed inset-0 flex items-center justify-center" style={{backgroundColor: 'rgba(222, 221, 221, 0.95)'}}>
//     <div className="p-6 rounded-lg" style={{backgroundColor: '#ffffff', maxWidth: '500px'}}>
//       <h2 className="text-xl font-bold mb-4" style={{color: '#333333'}}>Информация</h2>
//       <p dangerouslySetInnerHTML={{ __html: dialogMessage }}></p>
//       <button 
//         onClick={() => setIsDialogOpen(false)}
//         className="mt-4 px-4 py-2 rounded-lg"
//         style={{backgroundColor: '#FF7024', color: '#ffffff', cursor: 'pointer'}}
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#CB5200'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF7024'}
//       >
//         Закрыть
//       </button>
//     </div>
//   </div>
//   )}
//     </div>
//   );
// };

// export default ApartmentDetails;
