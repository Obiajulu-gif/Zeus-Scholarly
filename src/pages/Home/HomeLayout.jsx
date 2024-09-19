import React from 'react'
import HeroSection from './HeroesSection'
import InfoSection from './InfoSection'
import FindScholarshipSection from './FindScholarshipSection'

const HomeLayout = () => {
  return (
		<>
      <HeroSection />
      <FindScholarshipSection/>
      <InfoSection />
		</>
	);
}

export default HomeLayout