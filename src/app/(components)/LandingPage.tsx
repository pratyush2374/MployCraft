"use client"

import About from "./About";
import Contact from "./Contact";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const LandingPage : React.FC = () => {
  return (
    <>
      <Navbar />  
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default LandingPage;