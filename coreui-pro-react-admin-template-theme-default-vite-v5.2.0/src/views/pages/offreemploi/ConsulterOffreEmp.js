import React, { useEffect, useState } from 'react'
import {
  CCard,
  CContainer,
  CCollapse,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,CNavbarNav,
  CNavbarToggler,
  CNavbar,
  CLink,
  CFooter,
  CNavbarBrand,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { cilMagnifyingGlass } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
const ConsulterOffreEmp = () => {
  const [visible, setVisible] = useState(false)
  const [offres, setOffres] = useState([]);
  

  useEffect(() => {
    axios.post("http://localhost:8082/api/offre-emploi/consulterOffre", {}, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {setOffres(response.data)
    console.log(response.data);}
  )
    .catch(error => console.error("Error fetching offres:", error));
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  
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
                      <CNavLink href="#/services">Services</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink href="#/ConsulterOffreEmp" active>Offres d'emploi</CNavLink>
                    </CNavItem>
                  </CNavbarNav>
                </CCollapse>
              </CContainer>
            </CNavbar>

        {/* Image Section */}
  
    </div>
    <div className="container-2  ">
    <div className="image-section-2">
      <img src="src\assets\images\vecteezy_illustration-of-hr-people-looking-for-the-best-employee_13192651.jpg" alt="Banner" className="banner-image" />
    </div>
    <div className="breadcrumb-nav">
       <a href='#/accueil' className='--a'>ACCUEIL</a>  | <a href='#/ConsulterOffreEmp'><span>OFFRES</span></a>
      </div>
      {/* Titre principal centré */}
      <div className="row mb-4 text-center">
        <h5 className="card-title-2 text-primary display-5 fw-bold">
          Consulter Nos Offres 
        </h5>
      </div>
    </div>
    <div className="card-container">
        <style>
         
        </style>
      {offres.map((offre, index) => (
        <CCard key={index} style={{ width: '18rem' }} className='card--emploi'>
          <CCardImage orientation="top" src="src\assets\images\Capture d'écran 2024-12-08 182111.png" />
          <CCardBody>
            <CCardTitle>{offre.titre}</CCardTitle>
            <CCardText>
              {truncateText(offre.description || "Default description text", 190)}
            </CCardText>
            <Link to={`/OffreEmpD/${offre.idOffre}`}>
              <CButton className='btn-' >Voir Plus</CButton>
            </Link>
          </CCardBody>
        </CCard>
      ))}
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
  );
};

export default ConsulterOffreEmp;