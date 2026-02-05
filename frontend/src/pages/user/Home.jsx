import React from 'react'
import Hero from '../../containers/user/home/Hero'
import StayNearSUSL from '../../containers/user/home/StayNearSUSL '
import ServicesSection from '../../containers/user/home/SectionServices'
import VehiclesNearSUSL from '../../containers/user/home/VehiclesNearSUSL'

const Home = () => {
  return (
    <div >
      <Hero />
      <ServicesSection />
      <StayNearSUSL />
      <VehiclesNearSUSL />
    </div>)
}

export default Home