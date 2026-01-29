import Preloader from "../components/common/Preloader";
import Hero from "../components/home/Hero";
import Service from "../components/home/Service";
import About from "../components/home/About";
import Menu from "../components/home/Menu";
import Reservation from "../components/home/Reservation";

const Home = () => {
  return (
    <main id="top">
      <section id="home">
        <Hero />
      </section>

      <section id="services">
        <Service />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="menu">
        <Menu />
      </section>

      <section id="reservation">
        <Reservation />
      </section>
    </main>
  );
};

export default Home;
