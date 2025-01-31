import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CCard, CCardHeader, CCardBody , CCardImage,CCardText,CCardTitle,CListGroup,CListGroupItem} from '@coreui/react-pro'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import { useParams} from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import ReactImg from 'src/assets/images/react.jpg'
import React400Img from 'src/assets/images/react.jpg'
import ReactFormateur from 'src/assets/images/avatars/1.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate(); 
  const { id } = useParams(); // Extract the employee ID from the URL
  const [formations, setFormations] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    const role = localStorage.getItem('role')

    if (!role.includes('EMPLOYE')) {
      // Redirect to login or another page if the role is not RH
      navigate('/login')  // You can change this to any page
    }
    const token = localStorage.getItem('token');
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
      return;
    }
    console.log("token :",token)
    axios
      .get('http://localhost:8082/api/form/formation')
      .then((response) => {
        console.log(response.data);
        setFormations((prevFormations) => {
          // Prevent unnecessary state updates to avoid re-renders
          if (JSON.stringify(prevFormations) !== JSON.stringify(response.data)) {
            return response.data;
          }
          return prevFormations;
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des formations', error);
      });
  }, []); // Ensure the dependency array remains empty


  const handleStatusChange = (formationId, status) => {
    if (isProcessing) return;

    const isConfirmed = window.confirm(
      status === 'accepter'
        ? 'Êtes-vous sûr de vouloir accepter cette formation?'
        : 'Êtes-vous sûr de vouloir refuser cette formation?'
    );

    if (!isConfirmed) return;

    const endpoint = `http://localhost:8082/api/form/formations/${formationId}/${status.toLowerCase()}`;

    setIsProcessing(true);
    axios.put(endpoint)
      .then(() => {
        toast.success(`🎉 Formation ${status === 'accepter' ? 'acceptée' : 'refusée'} avec succès!`);
        setFormations(prev => prev.map(f => f.idF === formationId ? { ...f, status } : f));
      })
      .catch(() => toast.error('❌ Une erreur est survenue lors de la mise à jour.'))
      .finally(() => setIsProcessing(false));
  };
  

  return (
    <div className="cards-container">
      <ToastContainer />
      {formations.length > 0 ? (
        formations.map((formation) => (
          <CCard
            className="mb-3 full-card"
            id="card_card"
            key={formation.idF}
            style={{ width: '540px' }}
          >
            <CRow className="g-0 h-100">
              <CCol md={4} className="image--container">
                <CCardImage
                  src={`http://localhost:8082/photoFormateur/${formation.photoPath}`}
                  className="full--height--image"
                  style={{ height: '100%' }}
                />
              </CCol>
              <CCol md={8} className="d-flex flex-column">
                <CCardBody className="flex-grow-1 d-flex flex-column">
                  <CCardTitle className="card--title">{formation.titre}</CCardTitle>
                  <CCardText className="card--text flex-grow-1">
                    {formation.description}
                  </CCardText>
                </CCardBody>
                <div className="card--info">
                  <CListGroup flush className="mb-auto list-group-fixed-height">
                    <CListGroupItem>
                      Formateur: {formation.formateur}
                    </CListGroupItem>
                    <CListGroupItem>
                      Date début: {formation.dateDebutF}
                    </CListGroupItem>
                    <CListGroupItem>
                      Date fin: {formation.dateFinF}
                    </CListGroupItem>
                  </CListGroup>
                </div>
                <div className="btn--group mt-auto" style={{ height: '100px' }}>
                  <CButton
                    className="btn--"
                    onClick={() => handleStatusChange(formation.idF, 'accepter')}
                  >
                    Accepter
                  </CButton>
                  <CButton
                    className="btn-- reject"
                    onClick={() => handleStatusChange(formation.idF, 'refuser')}
                  >
                    Refuser
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCard>
        ))
      ) : (
        <p>Aucune formation trouvée</p>
      )}
    </div>
  );
};

export default Page404
