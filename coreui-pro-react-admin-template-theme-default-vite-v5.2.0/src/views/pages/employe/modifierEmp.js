import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
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
} from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom';
const UpdateEmploye = () => {
    const navigate = useNavigate();
  const [employe, setEmploye] = useState({
    nom: '',
    prenom: '',
    mail: '',
    password: '',
    adresse: '',
    numTelephone: '',
    numUrgence: '',
    dateDeNaissance: null,
    maladie: '',
    departement: '',
    poste: '',
    dateofjoining: '',
    cvPath: '',
    contratDeTravailPath: '',
    baseSalary:'',
    hourlyRate:''
  });
  const postes = {
    "Ressources Humaines": [
      { value: "Assistant RH", label: "Assistant RH" },
      { value: "Chargé de Recrutement", label: "Chargé de Recrutement" },
      { value: "Responsable Formation", label: "Responsable Formation" }
    ],
    "Développement Informatique": [
      { value: "Ingénieur DevOps", label: "Ingénieur DevOps" },
      { value: "Chef de Projet IT", label: "Chef de Projet IT" },
      { value: "Développeur Full Stack", label: "Développeur Full Stack" },
      { value: "Architecte Logiciel", label: "Architecte Logiciel" }
    ],
    "Finance et Comptabilité": [
      { value: "Directeur Financier", label: "Directeur Financier" },
      { value: "Comptable", label: "Comptable" }
    ],
    "Marketing": [
      { value: "Community Manager", label: "Community Manager" },
      { value: "Responsable Marketing", label: "Responsable Marketing" }
    ],
    "Juridique": [
      { value: "Avocat d'Entreprise", label: "Avocat d'Entreprise" }
    ]
  };
  const handleDepartementChange = (e) => {
    const departement = e.target.value;
    setEmploye((prev) => ({
      ...prev,
      departement,
      poste: "" // Réinitialiser le poste
    }));
  };
  const handleDateChange = (key, date) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null; // Formate en chaîne ou null
    setEmploye((prev) => ({
      ...prev,
      [key]: formattedDate, // Met à jour dynamiquement la date
    }));
  };
  const [cvFileName, setCvFileName] = useState('');
  const [contratFileName, setContratFileName] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [contratDeTravailFile, setContratDeTravailFile] = useState(null);
  const {id } = useParams();
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
    // Récupérer les détails de l'employé à partir de l'API
    axios.get(`http://localhost:8082/api/employees/${id}`)
      .then(response => {
        console.log('Réponse de l\'API:', response.data);
        const data = response.data;
        console.log('Date de naissance:', data.dateDeNaissance);
        
        const formattedDate = data.dateDeNaissance
          ? new Date(data.dateDeNaissance)
          : null;
          
        setEmploye({
          ...data,
          dateDeNaissance: formattedDate, // Assurez-vous que c'est bien un objet Date
        });

        // Mettre à jour les chemins complets
        setCvFileName(data.cvPath || null);
        setContratFileName(data.contratDeTravailPath || null);

        // Mise à jour des fichiers
        setCvFile(data.cvPath || null);
        setContratDeTravailFile(data.contratDeTravailPath || null);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données de l'employé:", error);
      });
  }, [id,navigate]);


      

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploye({
      ...employe,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "cvPath") {
      setCvFileName(files[0]?.name || '');
      setCvFile(files[0] || null);
    } else if (name === "contratDeTravailPath") {
      setContratFileName(files[0]?.name || '');
      setContratDeTravailFile(files[0] || null);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employe', JSON.stringify(employe));
    if (cvFile) {
      formData.append('cvPath', cvFile);
    }
    if (contratDeTravailFile) {
      formData.append('contratDeTravailPath', contratDeTravailFile);
    }

    axios.put(`http://localhost:8082/api/employees/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      toast.success('Employé mis à jour avec succès'); // Toast de succès
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l\'employé:', error);
      toast.error('Erreur lors de la mise à jour de l\'employé'); // Toast d'erreur
    });
  };
  console.log('Valeur pour CDatePicker :', employe.dateDeNaissance);
console.log('Type de la valeur :', typeof employe.dateDeNaissance);

  
  return (
    <CRow>
      <CContainer>
      <ToastContainer />
        <CRow >
          <CCol md={6}>
          <p className="h3">Modifier les informations d'un employé</p>            
          </CCol>
          <CCard className="mb-4">
          <CCardHeader>
            <strong>Informations Personnelles</strong> 
          </CCardHeader>
          <CCardBody>
          
             
          <CForm className="row g-3">
              <CFormLabel >Nom & Prénom</CFormLabel>
              <CCol xs={6} >
                  <CFormInput name="nom"  placeholder="Nom" aria-label="First name"  onChange={handleChange} value={employe.nom} required />
                </CCol>
                <CCol xs={6}>
                  <CFormInput name="prenom" placeholder="Prénom"  onChange={handleChange} aria-label="Last name" value={employe.prenom} required />
                </CCol>
                <CFormLabel >Email & Mot de passe</CFormLabel>
                <CCol xs={6}>
                  <CFormInput name="mail" type="email"   onChange={handleChange} placeholder="user@example.com" value={ employe.mail}  required />
                </CCol>                
                <CCol xs={6}>                 
                  <CFormInput name="password" type="password"  onChange={handleChange} placeholder='Mot de passe ' value={employe.password} required />
                </CCol>
                <CFormLabel >Adresse</CFormLabel>
                <CCol xs={8} >                  
                  <CFormInput  name="adresse" placeholder="1234 Main St"  onChange={handleChange} value={employe.adresse} required />
                </CCol>
                <CFormLabel >Numéro de Téléphone</CFormLabel>
                <CCol xs={8}>                 
                  <CFormInput   name='numTelephone'   onChange={handleChange} type='number' value={employe.numTelephone} required />
                </CCol>
                
                <CCol xs={8}>
                <CFormLabel >Numéro de téléphone d'urgence</CFormLabel>
                  <CFormInput name='numUrgence' type="number"    onChange={handleChange} value={employe.numUrgence} required/>
                </CCol>
                <CCol xs={12}>
                <CFormLabel>Date de naissance</CFormLabel>
<CCol lg={4}>
  <div className="custom-date-picker">
    <DatePicker
      selected={employe.dateDeNaissance}
      onChange={(date) => handleDateChange('dateDeNaissance', date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Sélectionnez une date"
      className="styled-date-picker"
    />
    <i className="calendar-icon fa fa-calendar"></i>
  </div>
</CCol>

                 </CCol>
                 <CFormLabel >Antécédents médicaux (facultatif)</CFormLabel>
                  <CCol xs={6}>
                  <CFormTextarea  name='maladie'  onChange={handleChange} rows="3" placeholder="Saisissez des informations médicales importantes" value={employe.maladie} />
                  </CCol>
              </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Informations Professionnelles</strong> 
          </CCardHeader>
          <CCardBody>
          
             
              <CForm className="row g-3">
              <CFormLabel >Département</CFormLabel>
                    <CCol xs={6}>
                    <CFormSelect name='departement'aria-label="Default select example" /*className={invalidFields.includes("departement") ? "is-invalid" : ""} */ onChange={handleDepartementChange} value={employe.departement} required >
                      <option>Selectionner un département</option>
                      <option value="Ressources Humaines">Ressources Humaines </option>
                      <option value="Développement Informatique">Développement Informatique</option>
                      <option value="Finance et Comptabilité">Finance et Comptabilité</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Juridique">Juridique</option>                    
                    </CFormSelect>                 
            </CCol>
            <CFormLabel >Postes</CFormLabel>
                    <CCol xs={6}>
                    <CFormSelect
        name="poste"
        value={employe.poste}
        onChange={(e) =>
          setEmploye((prev) => ({ ...prev, poste: e.target.value }))
        }
        required
      >        
        {postes[employe.departement]?.map((poste, index) => (
          <option key={index} value={poste.value}>
            {poste.label}
          </option>
        ))}
      </CFormSelect>                
            </CCol>
             <CCol xs={8} >
                              <CFormLabel >Salaire de Base</CFormLabel>
              
                              <CFormInput   name='baseSalary'  onChange={handleChange} type='number' value={employe.baseSalary} required />
                              
                            </CCol>
                            <CCol xs={8} >
                              <CFormLabel >Taux Horaire</CFormLabel>
                           
                              <CFormInput   name='hourlyRate' onChange={handleChange} type='number' value={employe.hourlyRate} required />
                             
                            </CCol>
                <CCol xs={8} >
                  <CFormLabel >Date de début de contrat </CFormLabel>
                  <CCol lg={4}>
  <div className="custom-date-picker">
    <DatePicker
      selected={employe.dateofjoining}
      onChange={(date) => handleDateChange('dateofjoining', date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Sélectionnez une date"
      className="styled-date-picker"
    />
    <i className="calendar-icon fa fa-calendar"></i>
  </div>
</CCol>
                </CCol>
                
              </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Documents à Joindre</strong> 
          </CCardHeader>
          <CCardBody>            
              <CForm className="row g-3">
                <CCol xs={8} >
                <CFormLabel>Contrat de travail</CFormLabel>
                <div className="file-input-wrapper">
  <input
    type="text"
    className="file-name-display"
    value={contratFileName || "Sélectionnez un fichier"}
    readOnly
    onClick={() => document.getElementById("contratDeTravailFile").click()}
  />
  <CFormInput
    id="contratDeTravailFile"
    name="contratDeTravailPath"
    type="file"
    className="hidden-file-input"
    onChange={(e) => {
      handleFileChange(e);
      const fileName = e.target.files[0] ? e.target.files[0].name : null;
      setContratFileName(fileName);
    }}
    required
  />
</div>

<CFormLabel>CV</CFormLabel>
<div className="file-input-wrapper">
  <input
    type="text"
    className="file-name-display"
    value={cvFileName || "Sélectionnez un fichier"}
    readOnly
    onClick={() => document.getElementById("cvFile").click()}
  />
  <CFormInput
    id="cvFile"
    name="cvPath"
    type="file"
    className="hidden-file-input"
    onChange={(e) => {
      handleFileChange(e);
      const fileName = e.target.files[0] ? e.target.files[0].name : null;
      setCvFileName(fileName);
    }}
    required
  />
</div>
                </CCol>
              </CForm>
          </CCardBody>
        </CCard>
        <div className="d-grid gap-2 col-6 mx-auto">
                <CButton className='btn-' onClick={handleSubmit}>Modifier </CButton>               
              </div>
        </CRow>
        </CContainer>
        
    </CRow>
  )
  
}

export default UpdateEmploye;
