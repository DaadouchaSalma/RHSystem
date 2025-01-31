import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CMultiSelect,
} from '@coreui/react-pro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';
const EditFormationForm = () => {
  const navigate = useNavigate();
  const [formation, setFormation] = useState({
    titre: '',
    description: '',
    formateur: '',
    dateDebutF: '',
    dateFinF: '',
    formUrl: '',
    employes: [],
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState(null);
  const { formationId } = useParams();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!role.includes('RH')) {
      // Redirect to login or another page if the role is not RH
      navigate('/login'); // You can change this to any page
    }
    const token = localStorage.getItem('token');
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
      return ;
    }

    // Fetch formation details using axios
    axios
      .get(`http://localhost:8082/api/form/${formationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('Données de la formation:', response.data);
        const employeesData = response.data.employees || [];
        const formattedData = {
          ...response.data,
          employes: employeesData,
          dateDebutF: response.data.dateDebutF || '',
          dateFinF: response.data.dateFinF || '',
          formUrl: response.data.formUrl || '',
        };
        setFormation(formattedData);

        const initialSelectedEmployees = employeesData.map((emp) => ({
          label: `${emp.nom} (${emp.id})`,
          value: emp.id,
        }));
        setSelectedEmployees(initialSelectedEmployees);
      })
      .catch((error) => setError(error));

    // Fetch all employees using axios
    axios
      .get('http://localhost:8082/api/form/employe', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setEmployees(response.data || []);
      })
      .catch((error) => setError(error));
  }, [formationId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      alert('Veuillez télécharger une image!');
      e.target.value = null; // Reset the file input
      setPhotoFile(null);
    } else {
      setPhotoFile(file);
    }
  };

  const handleEmployeeSelection = (selectedList) => {
    setSelectedEmployees(selectedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Date validation
    const startDate = new Date(formation.dateDebutF);
    const endDate = new Date(formation.dateFinF);

    if (endDate <= startDate) {
      toast.error('❌ La date de fin doit être après la date de début.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const formattedFormation = {
      ...formation,
      employes: selectedEmployees.length > 0
        ? selectedEmployees.map((option) => ({ id: option.value }))
        : formation.employes,
    };

    const formData = new FormData();
    formData.append('formation', new Blob([JSON.stringify(formattedFormation)], { type: 'application/json' }));

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    // Send updated formation data using axios
    axios
      .put(`http://localhost:8082/api/form/edit/${formationId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('Response:', response);
        if (response.status === 200) {
          toast.success('🎉 Formation mise à jour avec succès!', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          throw new Error('Échec de la mise à jour de la formation.');
        }
      })
      .catch((error) => {
        toast.error('❌ Échec de la mise à jour de la formation.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setError(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Immediate date validation
    if (name === 'dateDebutF' || name === 'dateFinF') {
      const startDate = name === 'dateDebutF' ? new Date(value) : new Date(formation.dateDebutF);
      const endDate = name === 'dateFinF' ? new Date(value) : new Date(formation.dateFinF);

      if (endDate <= startDate) {
        toast.warning('⚠️ La date de fin doit être après la date de début.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }

    setFormation((prevFormation) => ({ ...prevFormation, [name]: value }));
  };

  return (
    <CContainer>
      <CRow>
        <CCol md={6}>
          <p className="h3">Modifier Une Formation</p>            
        </CCol>
      <CCard>
        <CCardBody>
          <CForm onSubmit={handleSubmit} className="row g-3">
            {/*<CRow>*/}
              <CFormLabel htmlFor="titre">Titre</CFormLabel>
                <CCol xs={8}>
                  <CFormInput
                    type="text"
                    id="titre"
                    name="titre"
                    value={formation.titre}
                    onChange={handleChange}
                  />
              </CCol>
            {/*</CRow>*/}
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CCol xs={8}>
              <CFormTextarea
                id="description"
                name="description"
                value={formation.description}
                onChange={handleChange}
              />
            </CCol> 
                <CFormLabel htmlFor="formateur">Formateur</CFormLabel>
                <CCol xs={8}>
                <CFormInput
                  type="text"
                  id="formateur"
                  name="formateur"
                  value={formation.formateur}
                  onChange={handleChange}
                />
              </CCol>
              
          {/*}  <CRow>*/}
            
  <CCol md={6}>
    <CFormLabel htmlFor="dateDebutF">Date de Début</CFormLabel>
    <CFormInput
      type="date"
      id="dateDebutF"
      name="dateDebutF"
      value={formation.dateDebutF || ''} // Ensure fallback to empty string
      onChange={handleChange}
      required
    />
  </CCol>
  
  <CCol md={6}>
    <CFormLabel htmlFor="dateFinF">Date de Fin</CFormLabel>
    <CFormInput
      type="date"
      id="dateFinF"
      name="dateFinF"
      value={formation.dateFinF || ''} // Ensure fallback to empty string
      onChange={handleChange}
      required
    />
  </CCol>
{/*</CRow>*/}


            <CFormLabel htmlFor="photo">Photo Du Formateur</CFormLabel>
            <CCol xs={8}>
              <CFormInput type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
            </CCol>
            <CFormLabel htmlFor="employes">Sélectionner Les Employés</CFormLabel>
            <CCol xs={8}>
            <CMultiSelect
              id="employes"
              name="employes"
              options={employees.map((emp) => ({
                label: `${emp.nom} (${emp.id})`,
                value: emp.id,
              }))}
              value={selectedEmployees}
              onChange={handleEmployeeSelection}
            />
            </CCol>
            <CFormLabel htmlFor="formUrl">Link du formulaire</CFormLabel>
            <CCol xs={8}>
              <CFormInput
                type="text"
                id="formUrl"
                name="formUrl"
                value={formation.formUrl || 'uhh'} // Ajoutez || '' pour éviter des erreurs si formUrl est null ou undefined
                onChange={handleChange}
              />
            </CCol>
            <CRow className="mt-3">
              <CCol md={6}>
                <CButton type="submit" className='btn-'>
                  Enregistrer
                </CButton>
              </CCol>
              <CCol md={6}>
                <CButton type="button" className='btn-annuler' >
                  Annuler
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <ToastContainer /> {/* ToastContainer to display toasts */}
      </CRow>
    </CContainer>
  );
};

export default EditFormationForm;
