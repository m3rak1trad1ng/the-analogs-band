import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Lineup from "./components/Lineup";
import Range from "./components/Range";
import Shows from "./components/Shows";
import Live from "./components/Live";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import Reveal from "./components/Reveal";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <Lineup />
        <Range />
        <Shows />
        <Live />
        <Booking />
      </main>
      <Footer />
      <StructuredData />
      <Reveal />
    </>
  );
}
