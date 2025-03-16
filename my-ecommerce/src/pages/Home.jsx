import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Home = () => {
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  // Function to scroll to products
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to contact
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with scroll functions passed as props */}
      <Navbar scrollToProducts={scrollToProducts} scrollToContact={scrollToContact} />

      {/* Main Content */}
      <div className="pt-20 flex-grow">
        {/* Product Section */}
        <section ref={productsRef}>
          <ProductList />
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="mt-10">
          <ContactForm />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
