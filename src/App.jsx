import Stage from "./components/Stage.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import { SECTION2_H } from "./data.js";

export default function App() {
  return (
    <>
      {/* SECTION 1 : hero */}
      <Stage>
        <Navbar />
        <Hero />
      </Stage>

      {/* SECTION 2 : services */}
      <Stage
        id="services"
        height={SECTION2_H}
        bg="linear-gradient(180deg, #0d0d10 0%, #050506 100%)"
      >
        <Services />
      </Stage>
    </>
  );
}
