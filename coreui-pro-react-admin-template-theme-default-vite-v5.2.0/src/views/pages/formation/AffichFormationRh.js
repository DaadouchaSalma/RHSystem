import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CCard,  CCardBody , CCardImage,CCardText,CCardTitle,CListGroup,CListGroupItem} from '@coreui/react-pro'
import {
  CButton,
  CCol,

  CRow,
} from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Page404 = () => {
  const [formations, setFormations]=useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const role = localStorage.getItem('role')

    if (!role.includes('RH')) {
      // Redirect to login or another page if the role is not RH
      navigate('/login')  // You can change this to any page
    }
    const token = localStorage.getItem('token');

    // Vérifier si l'utilisateur est connecté
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
      return ;
    }
     // Récupérer les formations depuis le backend Spring Boot
     axios.get('http://localhost:8082/api/form/formations')
          .then(response => {
            console.log(response.data);
            //setFormations(Array.isArray(response.data) ? response.data : []);
            setFormations(response.data);
          })
          .catch(error => {
            console.error('erreur lors recup',error)
          })
  },[]);
  
  const handleCardClick = (idF) => {
    navigate(`/Response/${idF}`); // Navigate to the detailed page
  };
  const handleEditClick = (id) => {
    navigate(`/editformation/${id}`); // Navigate to the edit formation page
  };        

  return (
    <>
  <div className="cards-container">
 
    {formations.length > 0 ? (
      formations.map(formation => ( 
        <CCard className="mb-3 full-card" id='card_card' key={formation.idF} style={{ width: '540px', cursor:'pointer'}} onClick={() => handleCardClick(formation.idF)}>
          <CRow className="g-0 h-100">
            <CCol md={4} className="image--container">
              <CCardImage src={`http://localhost:8082/photoFormateur/${formation.photoPath}`} className="full--height--image" style={{ height: '100%'}} />
            </CCol>
            <CCol md={8} className="d-flex flex-column">
              <CCardBody className="flex-grow-1 d-flex flex-column" >
                <CCardTitle className="card--title">{formation.titre}</CCardTitle>
                <CCardText className="card--text flex-grow-1">
                {formation.description}
                </CCardText>
                </CCardBody>
                 <div className="card--info" >
                    <CListGroup flush  className="mb-auto list-group-fixed-height" >
                      <CListGroupItem >Formateur : {formation.formateur}</CListGroupItem>
                      <CListGroupItem >Date début : {formation.dateDebutF}</CListGroupItem>
                      <CListGroupItem >Date fin : {formation.dateFinF}</CListGroupItem>
                    </CListGroup>
                    
                  </div> 
                  <div className="btn--group mt-auto" style={{ height: '100px' }}>
                  <CButton
                    className="btn--" color="primary" variant="outline" shape="rounded-pill"
                     
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click event
                        handleEditClick(formation.idF);
                      }}
                    >
                      Modifier
                    </CButton>
                    </div>
              </CCol>
            </CRow>
        </CCard>
    ))
  ) : (
    <p>Aucune formation trouvée</p>
  )
  } 
  </div>
    </>
  )
}

export default Page404
