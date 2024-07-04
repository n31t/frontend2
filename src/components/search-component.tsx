import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { BathIcon, BedIcon, ChevronDownIcon, DollarSignIcon, JapaneseYen, RulerIcon } from "lucide-react"
import { Button2 } from "./ui/button2"
import CustomButton from "./customButton"
import { SearchBar } from "./search-bar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function SearchComponent() {
  const [searchInput, setSearchInput] = useState("")
  const [apartments, setApartments] = useState([])
  const [type, setType] = useState("buy")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(60000000)
  const [rooms, setRooms] = useState("3 комн")

  const handleSearch = async () => {
    const response = await fetch("http://localhost:3838/api/v1/apartments/lc/reccomendation", {
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
    })

    if (response.ok) {
      const fetchedApartments = await response.json()
      setApartments(fetchedApartments)
    } else {
      console.error("Failed to fetch apartments")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6640ac] to-[#6640ac] text-[#ffffff]">
      <main>
        <section className="container mx-auto py-28 px-4 md:px-6 flex flex-col items-center justify-center gap-8">
          <div className="w-full max-w-7xl mx-auto p-4">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">Найдите первым выгодную недвижимость в Алматы</h1>
            </div>
            <div className="bg-white shadow-md rounded-xl">
              <Tabs defaultValue="buy">
                <TabsList className="flex space-x-2">
                  <TabsTrigger value="buy" onClick={() => setType("buy")}>Купить</TabsTrigger>
                  <TabsTrigger value="rent" onClick={() => setType("rent")}>Снять</TabsTrigger>
                  <TabsTrigger value="daily" onClick={() => setType("daily")}>Посуточно</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="p-4">
                <div className="flex flex-wrap gap-4">
                  <Select onValueChange={value => setType(value)}>
                    <SelectTrigger className="w-full sm:w-auto">
                      <SelectValue placeholder="Квартиру" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Квартиру</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={value => setRooms(value)}>
                    <SelectTrigger className="w-full sm:w-auto">
                      <SelectValue placeholder="1-4 комн." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 комн.</SelectItem>
                      <SelectItem value="2">2 комн.</SelectItem>
                      <SelectItem value="3">3 комн.</SelectItem>
                      <SelectItem value="4">4 комн.</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full sm:w-auto">
                      <div className="flex items-center justify-between">
                        <span>Цена</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px]">
                      <div className="grid gap-4 p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            value={minPrice}
                            placeholder="От"
                            className="w-full"
                            onChange={e => setMinPrice(Number(e.target.value))}
                          />
                          <Input 
                            type="number" 
                            value={maxPrice}
                            placeholder="До" 
                            className="w-full" 
                            onChange={e => setMaxPrice(Number(e.target.value))} 
                          />
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    type="text"
                    placeholder="Город, улица, квартиры для большой семьи"
                    className="w-full flex-1"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-right mb-4 p-4">
              <Button onClick={handleSearch} className="px-4 py-2 w-full sm:w-auto mx-2 bg-[#ff851a] hover:bg-[#ce792e]">
                Найти
              </Button>
            </div>
          </div>
          <div className="space-y-6 max-w-md lg:max-w-5xl text-center">
          </div>
        </section>
        <section className="container mx-auto py-24 px-4 md:px-6 grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="w-full mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold mb-6">Преложенный ряд квартир:</h1>
            <p className="text-sm">Найдено {apartments.length} объявлений</p>
          </div>
          {apartments.map(apartment => (
            <Card key={apartment.link} className="w-full border-0 border-t-[0.5px] border-b-[0.5px] mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 p-6 sm:p-8 md:p-10 rounded-xl">
              <div className="relative overflow-hidden rounded-lg" style={{ height: '200px' }}>
                <img
                  src="/placeholder.svg"
                  alt="Property Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#ff851a] mb-4">{apartment.title}</h2>
                    <p className="text-[#ffffff] text-sm mb-4">
                      <span>{apartment.location}</span>
                    </p>
                    <div className="text-xl font-bold text-[#FFFFFF] mb-4">
                      {apartment.price} 〒
                    </div>
                    <p className="text-[#cdcdcd] text-sm mb-6">{apartment.description}</p>
                    <div className="relative group">
                      <h2 className="text-l font-bold text-[#ff851a] mb-4 cursor-pointer">Оценка от ИИ</h2>
                      <div className="absolute left-0 top-full mt-2 hidden group-hover:block p-4 bg-[#2a2a2a] border border-[#ff851a] rounded-lg">
                        <p className="text-[#cdcdcd] text-sm mb-6">{apartment.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex justify-end w-full">
                    <Button>View Details</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
