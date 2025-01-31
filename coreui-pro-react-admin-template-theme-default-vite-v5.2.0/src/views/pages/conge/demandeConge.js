import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCard,
  CCardBody,
} from '@coreui/react-pro';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DemandeConge = () => {
  const [formData, setFormData] = useState({
    dateDebut: '',
    dateFin: '',
    typeConge: '',
    commentaire: '',
  });
  const navigate = useNavigate();
    useEffect(() => {
      const role = localStorage.getItem('role')
  
      if (!role.includes('EMPLOYE')) {
        navigate('/login')  // You can change this to any page
      }
      const token = localStorage.getItem("token");
      if (!token) {
        console.log(token)
        localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
        navigate('/login'); // Redirige vers la page de login
      }
    }, [navigate]);

  const today = new Date().toISOString().split('T')[0];

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the leave request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for dates
    if (new Date(formData.dateFin) <= new Date(formData.dateDebut)) {
      toast.error('❌ La date de fin doit être après la date de début.', {
        position: "top-center",
      });
      return;
    }
    const finalData = {
      ...formData,
      typeConge: formData.typeConge || 'VACANCES', // Default to "VACANCES" if empty
    };
    try {
      const response = await axios.post('http://localhost:8082/api/conges/createConge', finalData);
      toast.success('🎉 Demande de congé créée avec succès!', {
        position: "top-right",
      });
      setTimeout(() => navigate('/ConsulterSolde'), 2000); // Redirect to leave list page after 2 seconds
    } catch (error) {
      toast.error('❌ Erreur lors de la création de la demande de congé.', {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardBody>
          <h3>Demande de Congé</h3>
          <form onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="dateDebut">Date de Début</CFormLabel>
                <CFormInput
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="dateFin">Date de Fin</CFormLabel>
                <CFormInput
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  value={formData.dateFin}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="typeConge">Type de Congé</CFormLabel>
                <CFormSelect
                  id="typeConge"
                  name="typeConge"
                  value={formData.typeConge}
                  onChange={handleChange}
                  required
                >
                  <option value="VACANCES" selected="true">Vacances</option>
                  <option value="MALADIE">Maladie</option>
                  <option value="MATERNITE">Maternité</option>
                  <option value="URGENCE">Urgence</option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="commentaire">Commentaire (Optionnel)</CFormLabel>
                <CFormInput
                  type="text"
                  id="commentaire"
                  name="commentaire"
                  value={formData.commentaire}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>

            <CButton className="btn--"
                    color="primary"
                    variant="outline"
                    shape="rounded-pill" type="submit">
              Soumettre la Demande
            </CButton>
          </form>
        </CCardBody>
      </CCard>
    </>
  );
};

export default DemandeConge;
