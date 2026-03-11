import React, { useContext, useEffect } from "react";
import Hero from '../../containers/user/home/Hero';
import StayNearSUSL from '../../containers/user/home/StayNearSUSL ';
import ServicesSection from '../../containers/user/home/SectionServices';
import VehiclesNearSUSL from '../../containers/user/home/VehiclesNearSUSL';
import StudentTestimonials from '../../containers/user/home/StudentTestimonials';
import { AccommodationContext } from "../../context/AccommodationContext";
import { VehicleContext } from "../../context/VehicleContext";

const Home = () => {
  const { accommodations, fetchAccommodations } = useContext(AccommodationContext);
  const { vehicles, fetchVehicles } = useContext(VehicleContext);

  useEffect(() => {
    fetchAccommodations();
    fetchVehicles();
  }, []);

  // Top 4 by rating
  const topAccommodations = [...accommodations]
    .sort((a, b) => b.reviews.reduce((acc, r) => acc + r.rating, 0) / (b.reviews.length || 1) -
      a.reviews.reduce((acc, r) => acc + r.rating, 0) / (a.reviews.length || 1))
    .slice(0, 4);

  const topVehicles = [...vehicles]
    .sort((a, b) => b.reviews.reduce((acc, r) => acc + r.rating, 0) / (b.reviews.length || 1) -
      a.reviews.reduce((acc, r) => acc + r.rating, 0) / (a.reviews.length || 1))
    .slice(0, 4);

  return (
    <div className='bg-[#f6f7f8] h-max'>
      <Hero />
      <ServicesSection />
      <StayNearSUSL accommodations={topAccommodations} />
      <VehiclesNearSUSL vehicles={topVehicles} />
      <StudentTestimonials />
    </div>
  );
};

export default Home;