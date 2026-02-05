import Hero from '../../containers/user/home/Hero'
import StayNearSUSL from '../../containers/user/home/StayNearSUSL '
import ServicesSection from '../../containers/user/home/SectionServices'
import VehiclesNearSUSL from '../../containers/user/home/VehiclesNearSUSL'
import StudentTestimonials from '../../containers/user/home/StudentTestimonials'

const Home = () => {
  return (
    <div className='bg-[#f6f7f8]'>
      <Hero />
      <ServicesSection />
      <StayNearSUSL />
      <VehiclesNearSUSL />
      <StudentTestimonials />
    </div>)
}

export default Home