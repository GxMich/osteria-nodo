import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Restaurant } from "@/components/Restaurant";
import { Menu } from "@/components/Menu";
import { Ingredients } from "@/components/Ingredients";
import { Seasonality } from "@/components/Seasonality";
import { Kitchen } from "@/components/Kitchen";
import { Wine } from "@/components/Wine";
import { DiningExperience } from "@/components/DiningExperience";
import { Reservation } from "@/components/Reservation";
import { Location } from "@/components/Location";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Pagina() {
  return (
    <>
      <Header />
      <main id="contenuto">
        <Hero />
        <Intro />
        <Restaurant />
        <Menu />
        <Ingredients />
        <Seasonality />
        <Kitchen />
        <Wine />
        <DiningExperience />
        <Reservation />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
