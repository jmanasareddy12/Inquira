import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import TechStack from "../components/layout/TechStack";
import Features from "../components/layout/Features";
import Workflow from "../components/layout/Workflow";
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
      <Features />
      <Workflow />
      <Footer />
    </>
  );
}