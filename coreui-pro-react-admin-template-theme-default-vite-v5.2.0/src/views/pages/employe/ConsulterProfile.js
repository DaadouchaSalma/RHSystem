import React, { useEffect, useState } from 'react';
import { freeSet } from '@coreui/icons' ;
import {
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
  CButton,
  CCardImage,
  CFormInput
} from '@coreui/react-pro';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons';

const ConsulterProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const [editField, setEditField] = useState(null); // To track the field being edited
  const [editedValue, setEditedValue] = useState(""); // To track the new value for the field
  const navigate = useNavigate();
  const role = localStorage.getItem('role')

  
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!role.includes('EMPLOYE') && !role.includes('RH')) {
        // Redirect to login or another page if the role is not RH
        navigate('/login')  
        return;
      }
      if (!token) {
        console.log(token)
        localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
        navigate('/login'); // Redirige vers la page de login
      }
    axios
      .get(`http://localhost:8082/api/user/profileEmp`)
      .then((response) => {
        setProfile(response.data);
        setError(false);
      })
      .catch((error) => {
        console.error('Error fetching employee profile:', error);
        setError(true);
      });
  }, [navigate]);

  const handleEdit = (field) => {
    setEditField(field);
    setEditedValue(profile[field] || "");
  };

  const handleSave = (field) => {
    axios
      .put(`http://localhost:8082/api/user/updateProfile`, { [field]: editedValue })
      .then((response) => {
        setProfile((prev) => ({ ...prev, [field]: editedValue }));
        setEditField(null);
        console.log("Field updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating field:", error);
      });
  };

  if (error) {
    return <div>Erreur: Impossible de charger le profil de l'employé.</div>;
  }

  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  const renderField = (field, label) => {
    return (
      <CListGroupItem>
        <strong>{label}: </strong>
        {editField === field ? (
          <>
            <CFormInput
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              style={{ width: '60%', display: 'inline-block', marginRight: '10px' }}
            />
            <CButton className="btn-consulter" color="primary" variant="outline" shape="rounded-pill" style={{ marginLeft:'10px' , marginRight :'10px' , marginTop :'10px'}} onClick={() => handleSave(field)}><CIcon icon={freeSet.cilSave} className="mr-2" /></CButton>
          </>
        ) : (
          <>
            {profile[field] || 'Non spécifié'}
            <CButton className="btn-consulter" color="primary" variant="outline" shape="rounded-pill" style={{ marginLeft:'10px' , marginRight :'10px' , marginTop :'10px'}} onClick={() => handleEdit(field)}>
              <CIcon icon={freeSet.cilPen} size="lg" />
            </CButton>
          </>
        )}
      </CListGroupItem>
    );
  };

  return (
    <>
      <h3>{profile.nom} {profile.prenom}</h3>
      <CRow>
        <CCol md="6">
          <CListGroup flush>
            <CListGroupItem><strong>Mail: </strong>{profile.mail || 'Non spécifié'}</CListGroupItem>
            {renderField("numTelephone", "Numéro Téléphone")}
            {renderField("adresse", "Adresse")}
            <CListGroupItem><strong>Poste: </strong>{profile.poste || 'Non spécifié'}</CListGroupItem>
            <CListGroupItem><strong>Département: </strong>{profile.departement || 'Non spécifié'}</CListGroupItem>
          </CListGroup>
        </CCol>

        <CCol md="6">
          <CListGroup flush>
            <CListGroupItem><strong>Date de Début de Contrat: </strong>{profile.dateofjoining || 'Non spécifié'}</CListGroupItem>
            {renderField("maladie", "Maladie")}
            {renderField("numUrgence", "N° Urgence")}
            <CListGroupItem><strong>Date De Naissance: </strong>{profile.dateDeNaissance || 'Non spécifié'}</CListGroupItem>
            <CListGroupItem><strong>Cv: </strong>{profile.cvPath ? (<CButton color="primary" href={`http://localhost:8082/uploads/${profile.cvPath}`} download target="_blank">Télécharger le CV</CButton>) : ('Aucun CV disponible')}</CListGroupItem>
          </CListGroup>
        </CCol>
      </CRow>
      <br />
      <div>
        <strong>Contrat De Travail: </strong>
        <br />
        <iframe
          src={`http://localhost:8082/uploads/${profile.contratDeTravailPath}`}
          title="contrat"
          style={{ width: '70%', height: '800px', display: 'block', margin: '0 auto' }}
        ></iframe>
      </div>
      
    </>
  );
};

export default ConsulterProfile;
