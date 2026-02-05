import React from 'react'
import Hero from '../../containers/user/home/Hero'
import StayNearSUSL from '../../containers/user/home/StayNearSUSL '
import ServicesSection from '../../containers/user/home/SectionServices'

const Home = () => {
  return (
    <div >
      <Hero />
      <ServicesSection />
      <StayNearSUSL />
    </div>)
}

export default Home