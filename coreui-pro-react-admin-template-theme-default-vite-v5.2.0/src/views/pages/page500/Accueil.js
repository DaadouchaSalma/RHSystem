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

const Accueil = () => {
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
            <CNavLink href="#/accueil" active>
              Accueil
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/services" >Services</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href='#/ConsulterOffreEmp'>Offres d'emploi</CNavLink>
          </CNavItem>
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>
      
    </div>
    <CCarousel controls indicators dark interval={5000} className="custom-carousel">
      {/* Slide 1 */}
      <CCarouselItem>
        <div className="carousel-overlay">
          <strong><h1 className="carousel-title">L'Innovation <br/> au Cœur de Votre<br/> Transformation</h1></strong>
          
        </div>
        <CImage className="d-block w-100" src="src\assets\images\innovation.jpg" alt="Innovation slide" />
      </CCarouselItem>

      {/* Slide 2 */}
      <CCarouselItem>
        <div className="carousel-overlay-2">
          <h2 className="carousel-title-2">Des Solutions Digitales Pionnières</h2><br/>
          <p className="carousel-description-2">
            De la conception au déploiement, notre expertise garantit des résultats exceptionnels pour chaque projet.
          </p>
        </div>
        <CImage className="d-block w-100" src="src\assets\images\solution.jpg" alt="Digital Solutions slide" />
      </CCarouselItem>

      {/* Slide 3 */}
      <CCarouselItem>
        <div className="carousel-overlay">
          <h2 className="carousel-title">Une Équipe<br/> Dédiée à <br/>Votre Réussite</h2>
          <p className="carousel-description">
            Travaillez avec des experts passionnés, engagés à faire briller vos idées sur le marché.
          </p>
        </div>
        <CImage className="d-block w-100" src="src\assets\images\team1.jpg" alt="Team slide" />
      </CCarouselItem>
    </CCarousel>
    <div className="container-2 my-5 ">
  {/* Titre principal centré */}
  <div className="row mb-4 text-center">
    <h5 className="card-title-2 text-primary display-5 fw-bold">
      Rejoignez l'univers de l'innovation avec <strong>Soft Logic</strong>
    </h5>
  </div>

  {/* Contenu principal */}
  <div className="row align-items-center">
    {/* Image à gauche */}
    <div className="col-md-5">
      <div className="card border-0 ">
        <div className="card-body text-center">
          <img
            src="src/assets/images/accueil.jpg"
            alt="Innovation chez Soft Logic"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>

    {/* Présentation à droite */}
    <div className="col-md-7">
      <div className="card border-0">
        <div className="card-body-2">
          <p className="card-text">
            Chez <strong>Soft Logic</strong>, nous transformons vos idées en solutions technologiques révolutionnaires. En tant que leader de l'innovation, notre mission est de vous accompagner dans chaque étape de votre transformation digitale.
          </p>
          <h5><strong>Pourquoi choisir Soft Logic ?</strong></h5>
          <p className="card-text">
            Nous proposons des logiciels sur mesure, des sites web modernes, des applications mobiles intuitives et des solutions cloud innovantes. Chaque projet reflète notre engagement envers la qualité, la performance et l'originalité.
          </p>
          <p className="card-text">
            Notre équipe de passionnés combine expertise et créativité pour offrir des résultats exceptionnels. Rejoignez-nous et vivez une expérience unique dans le domaine de l'innovation technologique.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Bouton au centre */}
  <div className="row mt-4">
    <div className="col text-center">
      <a href="#/ConsulterOffreEmp" className="btn btn-success btn-lg px-5 py-3 shadow-lg">
        Découvrez nos offres et propulsez votre carrière !
      </a>
    </div>
  </div>
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

export default Accueil