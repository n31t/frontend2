'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BathIcon, BedIcon, ChevronDown, ChevronDownIcon, ChevronRight, DollarSignIcon, JapaneseYen, RulerIcon } from "lucide-react";
import { Button2 } from "./ui/button2";
import CustomButton from "./customButton";
import { SearchBar } from "./search-bar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { CarouselComponent } from "./carousel-component";
import HintComponent from "./hint-component";

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

export function SearchComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [apartments, setApartments] = useState<Apartment[]>([]);
  // const [smallApartments, setSmallApartments] = useState<Apartment[]>([]);
  const [type, setType] = useState("buy");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [displayMaxPrice, setDisplayMaxPrice] = useState('');
  const [displayMinPrice, setDisplayMinPrice] = useState('');
  const [rooms, setRooms] = useState("1-4 комн.");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  
  const [dots, setDots] = useState('');

useEffect(() => {
  const interval = setInterval(() => {
    setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
  }, 500); // Change dots every 500ms

  return () => clearInterval(interval); // Clean up on component unmount
}, []);
  const handleSearch = async () => {
    console.log(minPrice, maxPrice);
    setIsLoading(true);
    try {
      const response = await fetch("https://backend-production-f116.up.railway.app/api/v1/apartments/lc/reccomendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: searchInput,
          classify: type,
          minPrice: minPrice,
          maxPrice: maxPrice,
          rooms: rooms,
        }),
      });

      if (response.ok) {
        const recommendations = await response.json();
        const detailedApartments = await Promise.all(
          recommendations.map(async ({ link, reason } : {link: string, reason : string}) => {
            const detailResponse = await fetch("https://backend-production-f116.up.railway.app/api/v1/apartments/find/link", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ link }),
            });

            if (detailResponse.ok) {
              const apartmentDetails = await detailResponse.json();
              return { ...apartmentDetails, reason };
            } else {
              console.error(`Failed to fetch details for link: ${link}`);
              return null;
            }
          })
        );

        setApartments(detailedApartments.filter(apartment => apartment !== null));
      } else {
        console.error("Failed to fetch apartment recommendations");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false after fetch
    }
  };
  
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU').format(Number(price));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#FFFFFF] text-[#ffffff]">
      <main>
      <section 
        className="w-full flex flex-col items-center justify-center gap-8"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(https://cdn.pixabay.com/photo/2017/08/06/18/01/city-2594707_1280.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed'
        }}
      >
          <div className="w-full max-w-7xl mx-auto p-4">
            <div className="text-left mb-4 mt-0 md:mt-20">
              <h1 className="text-3xl font-bold drop-shadow-lg">Найдите первым выгодную недвижимость в Алматы</h1>
              <p className="text-[#d7d7d7]">Делайте запросы более конкретными для лучших результатов</p>
            </div>
            <div className="bg-white">
              <Tabs defaultValue="buy">
                <TabsList className="flex space-x-2  rounded-t-[16px] rounded-b-[0px]" style={{ backgroundColor: 'rgba(32, 32, 32, 0.7)' }}>
                  <TabsTrigger value="buy" onClick={() => setType("buy")}>Купить</TabsTrigger>
                  <TabsTrigger value="rent" onClick={() => setType("rent")}>Снять</TabsTrigger>
                  <TabsTrigger value="daily" onClick={() => setType("daily")}>Посуточно</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="p-4 bg-[#F9F9F9] #8C8C8C py-6  px-4 rounded-b-[16px] text-[#202020]">
                <div className="flex flex-wrap gap-4">
                  <Select onValueChange={value => setType(value)}>
                    <SelectTrigger className="w-full sm:w-auto border-[0px]">
                      <SelectValue placeholder="Квартиру" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Квартиру</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={value => setRooms(value)}>
                    <SelectTrigger className="w-full sm:w-auto border-[0px]">
                      <SelectValue placeholder="1-4 комн." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 комн.</SelectItem>
                      <SelectItem value="2">2 комн.</SelectItem>
                      <SelectItem value="3">3 комн.</SelectItem>
                      <SelectItem value="4">4 комн.</SelectItem>
                      <SelectItem value="1-4 комн.">1-4 комн.</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full sm:w-auto">
                      <div className="flex h-10 w-full items-center justify-between rounded-md border-[0px] border-[#CCCCCC] bg-white px-3 py-2 text-sm ring-offset-[#FFFFFF] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#7D40E7] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                        <span>Цена</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] md:w-[400px]">
                      <div className="grid gap-4 p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">От:</label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <Input
                                type="text"
                                value={displayMinPrice}
                                placeholder="от"
                                className="w-full pr-10"
                                onChange={e => {
                                  const value2 = Number(e.target.value.replace(/\D/g,'')); // remove non-digits
                                  setMinPrice(value2);
                                  setDisplayMinPrice(formatPrice(value2.toString()));
                                }}
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">〒</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">До:</label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                            <Input
                              type="text"
                              value={displayMaxPrice}
                              placeholder="до"
                              className="w-full pr-10"
                              onChange={e => {
                                const value = Number(e.target.value.replace(/\D/g,'')); // remove non-digits
                                setMaxPrice(value);
                                setDisplayMaxPrice(formatPrice(value.toString()));
                              }}
                            />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">〒</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    type="text"
                    placeholder="Улица, квартиры для большой семьи, со стиральной машиной, возле метро"
                    className="w-full flex-1 border-[0px] border-l-[1px] rounded-[0px] "
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-right mb-0 py-4">
            <Link href="#apartamentsList">
            <Button onClick={handleSearch} className="px-8 py-4 w-full sm:w-auto ml-auto md:ml-2 text-[15px] bg-[#FF7024] hover:bg-[#CB5200]">
            {isLoading ? 'Загрузка...' : 'Найти'}
            </Button></Link>
            <div className="w-full flex justify-start items-center">
              <div className="my-10 md:my-0 flex items-center justify-start gap-6 overflow-x-auto">
                <div className="flex items-center justify-start">
                  <img
                    src="https://krisha.kz/static/frontend/images/landing/mobile/krisha-logo.png"
                    width={35}
                    height={35}
                    alt="Krisha.kz Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://habrastorage.org/getpro/moikrug/uploads/company/100/007/101/9/logo/medium_a5416a751f7e73c461761b458b50c5d0.jpg"
                    width={35}
                    height={35}
                    alt="Moikrug Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://www.kn.kz/favicon/android-chrome-256x256.png"
                    width={35}
                    height={35}
                    alt="Kn.kz Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://nedvizhka.kz/static/interface/logo_ned.svg"
                    width={70}
                    height={35}
                    alt="Nedvizhka.kz Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdF6IDT4UFuXAFD4IF-iVJCRGk7hRnxvdP5Q&s"
                    width={35}
                    height={35}
                    alt="Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65e2d2f2ad51546e2aa11191_65e2da3b25136a1f45a25642/scale_1200"
                    width={70}
                    height={35}
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="w-full text-[12px] text-[#d7d7d7] text-left">
          Мы получаем информацию о заявках на продажу и предложениях квартир из доверенных ресурсов. Мы не несем ответственности за точность размещенной информации на этих платформах.
          </p>
          <div className="w-full md:flex mt-4 gap-8">
            <HintComponent hintImage="https://www.svgrepo.com/show/533732/party-horn.svg" hintText="Квартира для тусовки с джигами" setInputValue={setSearchInput}/>
            <HintComponent hintImage="https://www.svgrepo.com/show/532390/users.svg" hintText="Квартира для большой семьи" setInputValue={setSearchInput} />
            <HintComponent hintImage="https://www.svgrepo.com/show/532081/water.svg" hintText="Квартира в Бостандыкском районе со стиралкой" setInputValue={setSearchInput} />
            <HintComponent hintImage="https://www.svgrepo.com/show/533033/bags-shopping.svg" hintText="Уютная квартира возле Меги" setInputValue={setSearchInput} />
          </div>
          </div>

          <div className="space-y-6 max-w-md lg:max-w-5xl text-center">
          </div>
        </section>
        
        {isLoading ? (
            <div id="apartamentsList" className="mt-10 mx-auto">
               <div className="loader mx-auto mt-40"></div>
               <h1 className="text-[#F36202] text-center">Загрузка{dots}</h1>
            </div>
          ) : (
        <section className="container mx-auto pt-12 py-24 px-4 md:px-6 grid grid-cols-1 md:grid-cols-1 gap-8 ">
          <div className="w-full mx-auto  text-[#202020]">
            <h1 className="text-2xl font-bold mb-6 ">Предложенный ряд квартир:</h1>
            <p className="text-sm text-[#838383]">Найдено {apartments.length} объявлений</p>
          </div>
          
          {apartments.map(apartment => (
            
            <Card key={apartment.link} className="w-full border-[#CFCFCF] border-0 border-b-[0.5px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 p-6 sm:p-8 md:p-10 rounded-xl"
            style={{ marginLeft: '0', paddingLeft: '0' }}>
              <div className="relative overflow-hidden rounded-lg" style={{ height: '200px', width: '400px' }}>
              <Link href={`/apartments/${apartment.id}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={apartment.photos[1]}
                  alt="Property Image"
                  className="w-full h-full object-cover"
                />
                </Link>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <div>
                  <Link href={`/apartments/${apartment.id}`} target="_blank" rel="noopener noreferrer">
                    <h2 className="text-xl font-bold text-[#382AAF] mb-4">{apartment.floor}</h2>
                    <p className="text-[#646464] text-sm mb-4">
                      <span>{apartment.location}</span>
                    </p>
                    <div className="text-xl font-bold text-[#202020] mb-4">
                      {formatPrice(apartment.price)} 〒
                    </div>
                    <p className="text-[#8D8D8D] text-sm mb-6">
                    {apartment.description.substring(0, 139)}...
                      </p>
                    </Link>
                    <div className="relative group">
                      <h2 className="text-l font-bold text-[#FF7024] mb-4 cursor-pointer">
                        Оценка от ИИ <ChevronDown className="inline-block ml-0 mb-1" /> {/* Added ChevronRight icon */}
                      </h2>
                      {/* <div className="absolute left-0 top-full mt-2 hidden group-hover:block p-4 bg-[#FFFFFFF] border border-[#FF7024] rounded-lg">
                        <p className="text-[#8D8D8D] text-sm mb-6">{apartment.reason}</p>
                      </div> */}
                      <div className="border border-[#FF7024] rounded-lg">
                        <p className="text-[#646464] text-sm m-3">{apartment.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col items-start gap-4">
                  <div className="flex justify-end w-full">
                    <Button>Посмотреть подробнее</Button>
                  </div>
                </div> */}
              </div>
              
            </Card>
            
          ))}
        </section>
          )}
         {/* <section className="container mx-auto py-24 px-4 md:px-6">
          <div className="w-full mx-auto  text-[#202020]">
            <h1 className="text-2xl font-bold mb-6">Может заинтересовать:</h1>
          </div>
          <div className="relative"> 
            <CarouselComponent apartments={smallApartments} /> 
          </div> 
        </section> */}

      </main>
      <style jsx>{`
  .loader {
    width: 85px;
    height: 50px;
    --g1:conic-gradient(from  90deg at left   3px top   3px,#0000 90deg,#FF7024 0);
    --g2:conic-gradient(from -90deg at bottom 3px right 3px,#0000 90deg,#FF7024 0);
    background: var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
    background-position: left,center,right;
    background-repeat: no-repeat;
    animation: l10 1s infinite alternate;
  }
  @keyframes l10 {
    0%,
    2%   {background-size:25px 50% ,25px 50% ,25px 50%}
    20%  {background-size:25px 25% ,25px 50% ,25px 50%}
    40%  {background-size:25px 100%,25px 25% ,25px 50%}
    60%  {background-size:25px 50% ,25px 100%,25px 25%}
    80%  {background-size:25px 50% ,25px 50% ,25px 100%}
    98%,
    100% {background-size:25px 50% ,25px 50% ,25px 50%}
  }
`}</style>
    </div>
  );
}
