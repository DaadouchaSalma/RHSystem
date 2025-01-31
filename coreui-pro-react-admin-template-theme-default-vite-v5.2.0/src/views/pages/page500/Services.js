import React,{ useState} from 'react'
import {
  CNavLink,
  CNavItem,
  CContainer,
  CCollapse,
  CCarousel,
  CCarouselItem,
  CImage,
  CNavbarNav,
  CNavbarToggler,
  CNavbar,
  CLink,
  CFooter,
  CNavbarBrand,
  
} from '@coreui/react-pro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Services = () => {
const [visible, setVisible] = useState(false)
  return (
    <>
    <body className='body-interface'>
  <div className="page-container">
  <CNavbar expand="lg" className="custom-navbar">
    <CContainer fluid>
      <CNavbarBrand className='img-nav' href="#/accueil"><img src="src\assets\images\logo_interface_user_2.jpg"/></CNavbarBrand>
      <CNavbarToggler onClick={() => setVisible(!visible)} />
      <CCollapse className="navbar-collapse justify-content-center" visible={visible}>
        <CNavbarNav className="nav-links">
          <CNavItem>
            <CNavLink href="#/accueil" >
              Accueil
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/services" active>Services</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href='#/ConsulterOffreEmp'>Offres d'emploi</CNavLink>
          </CNavItem>
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>

  {/* Image Section */}
  
</div>
  <div className="image-section">
    <img src="src\assets\images\2007.i105.013.isometric sysadmin design concept.jpg" alt="Banner" className="banner-image" />
  </div>

<div className="container-2 my-5 ">
  <div className="breadcrumb-nav">
       <a href='#/accueil' className='--a'>ACCUEIL</a>  | <a href='#/services'><span>SERVICES</span></a>
      </div>
      {/* Titre principal centré */}
      <div className="row mb-4 text-center">
        <h5 className="card-title-2 text-primary display-5 fw-bold">
          Explorez Nos Services
        </h5>
      </div>

      <section className="services-section">
      
      <div className="services-container">
        {/* Service 1 */}
        <div className="service-card">
          <img
            src="src\assets\images\hebergement.jpg"
            alt="INTÉGRATION"
            className="service-image"
          />
          <h3 className="service-title">Hébergement sites web</h3>
          <p className="service-description">
          BDSI met à disposition des espaces de stockage sur des serveurs. Dès lors que les fichiers qui constituent le site internet sont déposés sur un serveur, 24h/24h, 7j/7j votre site internet connecté et securisé à un serveur web.
          </p>
          
        </div>

        {/* Service 2 */}
        <div className="service-card">
          <img
            src="src\assets\images\saisie_donnees.jpg"
            alt="SERVICES MANAGÉS"
            className="service-image"
          />
          <h3 className="service-title">Saisie des données</h3>
          <p className="service-description">
          Notre société vous propose la réalisation de vos projets de saisie de données dans le respect total du délai et des exigences de qualité.
          </p>
        
        </div>

        {/* Service 3 */}
        <div className="service-card">
          <img
            src="src\assets\images\dev_info.jpg"
            alt="SERVICES CLOUD"
            className="service-image"
          />
          <h3 className="service-title">Développement informatique</h3>
          <p className="service-description">
          Vous avez besoin de solutions technologiques pour mieux gérer et organiser vos affaires, BDSI vous offre les meilleures solutions informatique façonnées à vos meusures.
          </p>
          
        </div>
      </div>
    </section>
</div>
    

    <CFooter className="custom-footer">
  <div className="footer-container">
    {/* Section Description et Réseaux Sociaux */}
    <div className="footer-about">
      <h5>À propos de notre société</h5>
      <p>
        Notre société se consacre à fournir des solutions innovantes et des services personnalisés pour répondre aux besoins uniques de nos clients. 
        <br/>Ensemble, construisons un avenir meilleur.
      </p>
      <div className="social-icons">
  <CLink href="https://facebook.com" target="_blank" className="social-link">
    <FontAwesomeIcon icon={faFacebookF} />
  </CLink>
  <CLink href="https://linkedin.com" target="_blank" className="social-link">
    <FontAwesomeIcon icon={faLinkedinIn} />
  </CLink>
  <CLink href="https://instagram.com" target="_blank" className="social-link">
    <FontAwesomeIcon icon={faInstagram} />
  </CLink>
</div>
    </div>

    {/* Section Services */}
    <div className="footer-services">
      <h5>Nos Services</h5>
      <ul>
        <li><CLink href="#">Hébergement sites web</CLink></li>
        <li><CLink href="#">Saisie des données</CLink></li>
        <li><CLink href="#">Développement informatique</CLink></li>
        <li><CLink href="#">Support Technique</CLink></li>
      </ul>
    </div>

    {/* Section Liens Utiles */}
    <div className="footer-links">
      <h5>Liens Utiles</h5>
      <ul>
        <li><CLink href="#/accueil">Accueil</CLink></li>
        <li><CLink href="#/ConsulterOffreEmp">Offres d'emploi</CLink></li>
        <li><CLink href="#/services">Services</CLink></li>
      </ul>
    </div>
  </div>

  {/* Section Bas de page */}
  <div className="footer-bottom">
    <span>&copy; 2024 Soft Logic. Tous droits réservés.</span>
   
  </div>
</CFooter>

</body>
  </>
  )
}

export default Services