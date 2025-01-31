import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
  CMultiSelect
} from '@coreui/react-pro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const FormationForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [formateur, setFormateur] = useState('');
  const [dateDebutF, setDateDebutF] = useState('');
  const [dateFinF, setDateFinF] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [photo, setPhotoPath] = useState(null);
  const [formUrl, setFormURL] = useState('');
  const fileInputRef = useRef(null); // Ref for the file input
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem('role')

    if (!role.includes('RH')) {
      // Redirect to login or another page if the role is not RH
      navigate('/login')  // You can change this to any page
    }
    const token = localStorage.getItem('token');
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
    } else {
    axios.get('http://localhost:8082/api/form/employe')
      .then((response) => {
        const options = response.data.map((employee) => ({
          value: employee.id,
          label: `${employee.nom} (${employee.mail})`,
        }));
        setEmployees(options);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });}
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDate = new Date(dateDebutF);
    const endDate = new Date(dateFinF);

    // Date validation
    if (endDate <= startDate) {
      toast.error('❌ La date de fin doit être après la date de début.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const formationData = {
      titre,
      description,
      formateur,
      dateDebutF,
      dateFinF,
      formUrl,
      employes: selectedEmployees.map((employee) => ({ id: employee.value })),
    };

    const formData = new FormData();
    formData.append('formation', new Blob([JSON.stringify(formationData)], { type: 'application/json' }));
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.post('http://localhost:8082/api/form', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('🎉 Formation créée avec succés!', {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form fields
      setTitre('');
      setDescription('');
      setFormateur('');
      setDateDebutF('');
      setDateFinF('');
      setSelectedEmployees([]);
      setPhotoPath(null);
      setFormURL('');

      // Clear the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        
      }
    } catch (error) {
      toast.error('❌ Erreur lors de la création de la formation!', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Erreur lors de la création de la formation:', error);
    }
  };
  const handleDateChange = (field, value) => {
    if (field === 'dateDebutF') {
      setDateDebutF(value);

      // Immediate validation
      if (new Date(value) >= new Date(dateFinF)) {
        toast.warning('⚠️ La date de début doit être avant la date de fin.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } else if (field === 'dateFinF') {
      setDateFinF(value);

      // Immediate validation
      if (new Date(value) <= new Date(dateDebutF)) {
        toast.warning('⚠️ La date de fin doit être après la date de début.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      alert('Veuillez télécharger une image!');
      e.target.value = null; // Reset the file input
      setPhotoPath(null);
    } else {
      setPhotoPath(file);
    }
  };

  return (
    <CContainer className="mt-4">
      <ToastContainer />
      <CRow >
        {/*<CCol md={8}>*/}
           <CCol md={6}>
           <h3 className="mb-4">Créer Une Formation</h3>
           </CCol>
          <CCard >
            <CCardBody>
              
              <CForm onSubmit={handleSubmit} className="row g-3">
                <CFormLabel htmlFor="titre">Titre:</CFormLabel>
                <CCol xs={8}>
                <CFormInput
                  type="text"
                  id="titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                  className="mb-3"
                />
                </CCol>
                <CFormLabel htmlFor="description">Description:</CFormLabel>
                <CCol xs={8}>
                <CFormTextarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mb-3"
                />
                </CCol>
                <CFormLabel htmlFor="formateur">Formateur:</CFormLabel>
                <CCol xs={8}>
                <CFormInput
                  type="text"
                  id="formateur"
                  value={formateur}
                  onChange={(e) => setFormateur(e.target.value)}
                  required
                  className="mb-3"
                />
                </CCol>
                <CFormLabel htmlFor="photo">Photo Du Formateur:</CFormLabel>
                <CCol xs={8}>
                <CFormInput
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef} // Attach ref to file input
                  className="mb-3"
                />
                </CCol>
                <CFormLabel htmlFor="dateDebut">Date de début:</CFormLabel>
                
                <CCol xs={8}>
                <CFormInput
                  type="date"
                  id="dateDebut"
                  value={dateDebutF}
                  onChange={(e) => handleDateChange('dateDebutF', e.target.value)}
                  required
                  className="mb-3"
                />
                </CCol>
                <CFormLabel htmlFor="dateFin">Date de fin:</CFormLabel>
                <CCol xs={8}>
                <CFormInput
                  type="date"
                  id="dateFin"
                  value={dateFinF}
                  onChange={(e) => handleDateChange('dateFinF', e.target.value)}
                  required
                  className="mb-3"
                />
                </CCol>
                <CFormLabel>Assigner Les Employés:</CFormLabel>
                <CCol xs={8}>
                <CMultiSelect
                  options={employees}
                  value={selectedEmployees}
                  onChange={(selected) => setSelectedEmployees(selected)}
                  selectionType="tags"
                  multiple
                  className="mb-3"
                />
                </CCol>
                <CFormLabel htmlFor="formulaire">Formulaire:</CFormLabel>
                <CCol xs={8}>
                <CFormInput
                  type="text"
                  id="formulaire"
                  value={formUrl}  // Change this to formUrl
                  onChange={(e) => setFormURL(e.target.value)}  // Keep the onChange as is
                  required
                  className="mb-3"
                />
                </CCol>
                <CCol xs={8}>
                <CButton  type="submit" className='btn-'>
                  Créer
                </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        {/*</CCol>*/}
      </CRow>
    </CContainer>
  );
};

export default FormationForm;
