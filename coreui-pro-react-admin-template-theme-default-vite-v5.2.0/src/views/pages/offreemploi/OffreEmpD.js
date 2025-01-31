import React, { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
const OffreEmpD = () => {
  const [visible, setVisible] = useState(false)
  const { id } = useParams();
  const [offre, setOffre] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8082/api/offre-emploi/consulterOffre/${id}`)
      .then(response => setOffre(response.data))
      .catch(error => console.error("Error fetching offer details:", error));
  }, [id]);

  const formatTxt = (text) => {
    if (!text) return <span>Aucune information disponible.</span>; // Handle null or undefined text
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  if (!offre) {
    return <div>Offre introuvable.</div>;
  }

  return (
<>
<body className='body-interface'>
        <div className="page-container">
        <CNavbar expand="lg" className="custom-navbar">
          <CContainer fluid>
            <CNavbarBrand className='img-nav' href="#"><img src="src\assets\images\logo_interface_user_2.jpg"/></CNavbarBrand>
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
    
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: 'black' }}>
      <div
        style={{
          border: '1px black',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f7f9fa',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#4b6f9d', marginBottom: '20px' }}>{offre.titre}</h1>
        <p>
          <strong>Date de publication:</strong> {offre.datePublication}
        </p>
        <div style={{ marginTop: '15px' }}>
          <p>
            <strong style={{ color: '#517e7a' }}>Description:</strong>
          </p>
          <div>{formatTxt(offre.description)}</div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <p>
            <strong style={{ color: '#517e7a' }}>Compétences requise:</strong>
          </p>
          <div>{formatTxt(offre.minimumQualifications)}</div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <p>
            <strong style={{ color: '#517e7a' }}>Expérience souhaitée:</strong>
          </p>
          <div>{formatTxt(offre.preferredQualifications)}</div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <p>
            <strong style={{ color: '#517e7a' }}>Salaire proposé:</strong>
          </p>
          <div>{formatTxt(offre.responsibilities)}</div>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Link to={`/Postuler/${id}`}>
            <CButton
              style={{
                backgroundColor: '#4b6f9d',
                border: 'none',
                color: '#fff',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#243b5d')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4b6f9d')}
            >
              Postuler
            </CButton>
          </Link>
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
  );
}

export default OffreEmpD;