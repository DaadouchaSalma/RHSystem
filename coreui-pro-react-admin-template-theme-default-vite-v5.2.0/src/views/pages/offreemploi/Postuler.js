import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CContainer,
  CDatePicker,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CCollapse,
  CNavbarNav,
  CNavbarToggler,
  CNavbar,
  CFooter,
  CNavbarBrand,
  CNavLink,
  CNavItem,
  CLink,
} from '@coreui/react-pro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const Postuler = () => {
  const [visible, setVisible] = useState(false)
  const { idOffre } = useParams();
  const [candidat, setCandidat] = useState({
    nom: '',
    prenom: '',
    mail: '',
    numTelephone: '',
    cvPath: null,
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const cvFileRef = useRef(null);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidat({
      ...candidat,
      [name]: value,
    });
  };

  // Handle file input changes for CV upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCandidat({
      ...candidat,
      [name]: files[0], // Update the state with the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['nom', 'prenom', 'mail', 'numTelephone', 'cvPath'];
    const emptyFields = requiredFields.filter((field) => !candidat[field]);

    if (emptyFields.length > 0) {
      setInvalidFields(emptyFields); 
      toast.error('❌ Veuillez remplir tous les champs obligatoires.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(candidat.mail)) {
      toast.error('Entrez un e-mail valide, ex : user@example.com.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    const candidatData = {
      nom: candidat.nom,
      prenom: candidat.prenom,
      mail: candidat.mail,
      numTelephone: candidat.numTelephone,
    };

    // Append the candidat data and files to the FormData object
    formData.append('candidat', JSON.stringify(candidatData));
    formData.append('idOffre', idOffre);
    formData.append('cvPath', candidat.cvPath);

    try {
      const response = await axios.post('http://localhost:8082/candidat/add', formData);

      toast.success('🎉 Candidature envoyée avec succès !', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Reset form after submission
      setCandidat({
        nom: '',
        prenom: '',
        mail: '',
        numTelephone: '',
        cvPath: null,
      });

      if (cvFileRef.current) cvFileRef.current.value = null;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé", error);
      toast.error("❌ Une erreur est survenue lors de la soumission de votre candidature.", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

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
          {/* Titre principal centré */}
          <div className="row mb-4 text-center">
            <h5 className="card-title-2 text-primary display-5 fw-bold">
            Postuler pour un Emploi
            </h5>
          </div>
       </div>
       <div className="breadcrumb-nav">
        <a href='#/accueil' className='--a'>ACCUEIL</a>  | <a href='#/ConsulterOffreEmp'><span>OFFRES</span></a>
      </div>
    <CRow>
      <CContainer style={{width:'90%', marginTop:'50px'}}>
        <ToastContainer />
        <CRow>
          <CCard className="mb-4" >
            <CCardBody>
              <CForm className="row g-3">
                <CFormLabel>Nom</CFormLabel>
                <CCol xs={8}>
                  <CFormInput
                    name="nom"
                    placeholder="Nom"
                    className={invalidFields.includes('nom') ? 'is-invalid' : ''}
                    onChange={handleChange}
                    value={candidat.nom}
                    required
                  />
                </CCol>
                <CFormLabel>Prénom</CFormLabel>
                <CCol xs={8}>
                  <CFormInput
                    name="prenom"
                    placeholder="Prénom"
                    className={invalidFields.includes('prenom') ? 'is-invalid' : ''}
                    onChange={handleChange}
                    value={candidat.prenom}
                    required
                  />
                </CCol>

                <CFormLabel>Email</CFormLabel>
                <CCol xs={8}>
                  <CFormInput
                    name="mail"
                    type="mail"
                    className={invalidFields.includes('mail') ? 'is-invalid' : ''}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    value={candidat.mail}
                    required
                  />
                </CCol>

                <CFormLabel>Numéro de Téléphone</CFormLabel>
                <CCol xs={8}>
                  <CFormInput
                    name="numTelephone"
                    type="number"
                    className={invalidFields.includes('numTelephone') ? 'is-invalid' : ''}
                    onChange={handleChange}
                    value={candidat.numTelephone}
                    required
                  />
                </CCol>

                <CFormLabel>CV</CFormLabel>
                <CCol xs={8}>
                  <CFormInput
                    name="cvPath"
                    type="file"
                    className={invalidFields.includes('cvPath') ? 'is-invalid' : ''}
                    onChange={handleFileChange}
                    ref={cvFileRef}
                    required
                  />
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>

          <div className="d-grid gap-2 col-6 mx-auto" style={{marginBottom:'50px', marginTop:'30px'}}>
            <CButton className="btn-" onClick={handleSubmit}>
              Postuler
            </CButton>
          </div>
        </CRow>
      </CContainer>
    </CRow>
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

export default Postuler;

