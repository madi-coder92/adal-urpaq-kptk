import Header from "../components/Header";
import Hero from "../components/Hero";
import Quiz from "../components/Quiz";
import Report from "../components/Report";
import Rights from "../components/Rights";
import Pilot from "../components/Pilot";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Quiz />
        <Report />
        <Rights />
        <Pilot />
      </main>
      <Footer />
    </>
  );
}
