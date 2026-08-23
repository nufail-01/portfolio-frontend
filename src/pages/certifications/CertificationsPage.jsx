import Navbar from '../../components/layout/navbar/Navbar'
import Footer from '../../components/layout/footer/Footer'
import Certifications from '../../components/features/certifications/Certifications'
import Contact from '../../components/features/contact/Contact'
// import BackLink from '../../components/ui/navigation/BackLink'
import Container from '../../components/ui/layout-primitives/Container'


const CertificationsPage = () => {
  return (
    <>
      <Navbar />

      <div  >
        <Container>
          {/* <BackLink to="/" label="Back" /> */}
        </Container>
      </div>

      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default CertificationsPage