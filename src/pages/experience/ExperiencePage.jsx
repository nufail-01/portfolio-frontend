import Navbar from '../../components/layout/navbar/Navbar'
import Footer from '../../components/layout/footer/Footer'
import Experience from '../../components/features/experience/Experience'
import Contact from '../../components/features/contact/Contact'
// import BackLink from '../../components/ui/navigation/BackLink'
import Container from '../../components/ui/layout-primitives/Container'


const ExperiencePage = () => {
  return (
    <>
      <Navbar />

      <div  >
        <Container>
          {/* <BackLink to="/" label="Back" /> */}
        </Container>
      </div>

      <Experience />
      <Contact />
      <Footer />
    </>
  )
}

export default ExperiencePage