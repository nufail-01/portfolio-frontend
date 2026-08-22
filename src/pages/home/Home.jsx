import Navbar from '../../components/layout/navbar/Navbar'
import Hero from '../../components/features/hero/Hero'
import Marquee from '../../components/features/marquee/Marquee'
import Skills from '../../components/features/skills/Skills'
import Projects from '../../components/features/projects/Projects'
import About from '../../components/features/about/About'
import Experience from '../../components/features/experience/Experience'
import Contact from '../../components/features/contact/Contact'
import Footer from '../../components/layout/footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Skills />
      <Projects />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

export default Home