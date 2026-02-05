import Hero from '../../containers/user/home/Hero'
import StayNearSUSL from '../../containers/user/home/StayNearSUSL '
import ServicesSection from '../../containers/user/home/SectionServices'
import VehiclesNearSUSL from '../../containers/user/home/VehiclesNearSUSL'
import CampusLife from '../../containers/user/home/CampusLife'

const Home = () => {
  return (
    <div className='bg-[#f6f7f8]'>
      <Hero />
      <ServicesSection />
      <StayNearSUSL />
      <VehiclesNearSUSL />
      <CampusLife />
    </div>)
}

export default Home