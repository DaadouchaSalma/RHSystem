import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  CCard, 
  CCardBody, 
  CCardText, 
  CCardTitle, 
  CTable, 
  CTableBody, 
  CTableDataCell, 
  CTableHead, 
  CTableHeaderCell, 
  CTableRow 
} from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const FormationDetails = () => {
    const navigate = useNavigate(); 
  const { idF } = useParams(); // Extract formation ID from URL
  const [formation, setFormation] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
  
        if (!role.includes('RH')) {
          // Redirect to login or another page if the role is not RH
          navigate('/login')  // You can change this to any page
        }
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
      return ;
    }
    axios
  .get(`http://localhost:8082/api/form/Response/${idF}`)
  .then((response) => {
    const formationData = response.data;

    // Check if responses exist; if not, initialize it
    if (!formationData.responses) {
      formationData.responses = {};
    }

    // Add 'No response' for employees without a response
    formationData.employes.forEach((employee) => {
      if (!formationData.responses[employee.id]) {
        formationData.responses[employee.id] = 'Aucune réponse';
      }
    });

    console.log('Updated Formation Data:', formationData);
    setFormation(formationData);
  })
  .catch((error) => {
    console.error('Error fetching formation data:', error);
  });

  }, [idF]);

  if (!formation) {
    return <p>En cours de Chargement...</p>;
  }

  return (
    <div className="formation-details">
      {/* Formation Details */}
      <CCard className="mb-3">
        <CCardBody>
          <CCardTitle>{formation.titre}</CCardTitle>
          <CCardText>
            <strong>Description:</strong> {formation.description}
          </CCardText>
          <CCardText>
            <strong>Formateur:</strong> {formation.formateur}
          </CCardText>
          <CCardText>
            <strong>Date Début:</strong> {new Date(formation.dateDebutF).toLocaleDateString()}
          </CCardText>
          <CCardText>
            <strong>Date Fin:</strong> {new Date(formation.dateFinF).toLocaleDateString()}
          </CCardText>
        </CCardBody>
      </CCard>

      {/* Employee List */}
      <h3>Liste Des Employés</h3>
      <CTable striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nom</CTableHeaderCell>
            <CTableHeaderCell>Matricule</CTableHeaderCell>
            <CTableHeaderCell>Reponse</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {formation.employes.map((employee) => (
          <CTableRow key={employee.id}>
            <CTableDataCell>{employee.nom}</CTableDataCell>
            <CTableDataCell>{employee.id}</CTableDataCell>
            <CTableDataCell>
              {formation.responses && formation.responses[employee.id]
                ? formation.responses[employee.id]
                : 'Aucune Réponse'}
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
      </CTable>
    </div>
  );
};

export default FormationDetails;
