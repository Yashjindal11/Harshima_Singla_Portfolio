import React from 'react'
import Navigationbar from './Components/NavigationBar/NavigationBar'
import About from './Components/About/About'
import Services from './Components/Services/services'
import WorkExperience from './Components/WorkEx/WorkEx'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contacts/Contacts'
import ServicesPro from './Components/ServicesPro/ServicesPro'
import Blogs from './Components/Blogs/Blogs'

const App = () => {
  return (
    <div className="main-container">
      <Navigationbar/>
      <About/>
      <Services/>
      <ServicesPro/>
      <WorkExperience/>
      <Testimonials/>
      <Blogs/>
      <Contact/>
    </div>
  )
}
export default App