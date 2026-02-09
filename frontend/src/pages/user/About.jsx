import React from 'react'
import HeroSection from '../../containers/user/about/HeroSection'
import MissionSection from '../../containers/user/about/MissionSection'
import WhyChooseCampusEase from '../../containers/user/about/WhyChooseCampusEase'
import OurAffiliations from '../../containers/user/about/OurAffiliations'
import JoinCommunity from '../../containers/user/about/JoinCommunity'

const About = () => {
    return (
        <div>
            <HeroSection />
            <MissionSection />
            <WhyChooseCampusEase />
            <OurAffiliations />
            <JoinCommunity />
        </div>
    )
}

export default About