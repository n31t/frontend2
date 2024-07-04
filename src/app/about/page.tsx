import { HomeComponent } from "@/components/home-component";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header/>
      <HomeComponent/>
      
      <Footer/>
    </div>
  );
}
