import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  CTable, 
  CTableBody, 
  CTableHeaderCell, 
  CTableRow, 
  CTableDataCell, 
  CTableHead,
  CRow,
  CCol,
  CButton,
} from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';

const ConsulterCandidat = () => {
  const [candidats, setCandidats] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem('role')

    if (!role.includes('RH')) {
      navigate('/login')  // You can change this to any page
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
    }
  }, [navigate]);
  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://localhost:8082/candidat/all')
      .then((response) => {
        setCandidats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidats:', error);
      });
  }, []);

  return (
    <div>
      <CRow className="justify-content-center">
        <h2 style={{marginBottom:'30px'}}>Liste des Candidats</h2>
        <CCol xs={12}>
          <CTable className='center-table'>
            <CTableHead color="dark">
              <CTableRow style={{textAlign:'center'}}>
                <CTableHeaderCell>Titre de l'Offre</CTableHeaderCell>
                <CTableHeaderCell>Nom</CTableHeaderCell>
                <CTableHeaderCell>Prénom</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Téléphone</CTableHeaderCell>
                <CTableHeaderCell>Cv</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {candidats.map((candidat, index) => (
                <CTableRow key={index} style={{textAlign:'center'}}>
                  <CTableDataCell>{candidat.offreTitre}</CTableDataCell>
                  <CTableDataCell>{candidat.candidat.nom}</CTableDataCell>
                  <CTableDataCell>{candidat.candidat.prenom}</CTableDataCell>
                  <CTableDataCell>{candidat.candidat.mail}</CTableDataCell>
                  <CTableDataCell>{candidat.candidat.numTelephone}</CTableDataCell>
                  <CTableDataCell>{candidat.candidat.cvPath ? (<CButton style={{backgroundColor:'#4b6f9d', color:'white'}} href={`http://localhost:8082/uploads/${candidat.candidat.cvPath}`} download target="_blank">Télécharger le CV</CButton>) : ('Aucun CV disponible')}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </div>
  )
}

export default ConsulterCandidat;
