import React,{ useState,useRef,useEffect } from 'react'

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
  CFormCheck,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { DocsExample } from 'src/components'

const Addemploye = () => {
  const navigate = useNavigate();
  const [departement, setDepartement] = useState('');
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
  const [formKey, setFormKey] = useState(0);
  const [employe, setEmploye] = useState({
    nom: '',
    prenom: '',
    mail: '',
    numTelephone: '',
    password: '',
    adresse:'',
    dateDeNaissance:'',
    poste: '',
    departement: '',
    dateofjoining: '',
    maladie: "Rien",
    numUrgence: '',
    baseSalary:'',
    hourlyRate:'',
    cvPath:null,
    img:null,
    contratDeTravailPath:null
  });
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')

  useEffect(() => {
    
    if (!role.includes('RH')) {
      
      // Redirect to login or another page if the role is not RH
      navigate('/login')  // You can change this to any page
    }
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
    }
  }, [navigate]);
  console.log("token :",token)

  const cvFileRef = useRef(null);
  const imgFileRef = useRef(null);
  const contratFileRef = useRef(null);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format YYYY-MM-DD
    setEmploye({
      ...employe,
      dateofjoining: formattedDate,
       // Assurez-vous d'utiliser le même nom de clé que dans votre base
    });
  };
  const handleDateChangeNai = (date) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format ou chaîne vide
    setEmploye({
      ...employe,
      dateDeNaissance: formattedDate, // Assurez-vous d'utiliser le même nom de clé que dans votre base
    });
  };

  const handleDepartementChange = (e) => {
    const departementNom = e.target.options[e.target.selectedIndex].text; // Récupère le nom du département
    setDepartement(departementNom);
    const postesPourDepartement = postes[departementNom] || [];
    const posteParDefaut = postesPourDepartement.length > 0 ? postesPourDepartement[0].value : "";
    setEmploye({
      ...employe,
      departement: departementNom,
      poste: posteParDefaut,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploye({
      ...employe,
      [name]: value,
    });
  };
  
  const handlePosteChange = (e) => {
    setEmploye({
      ...employe,
      poste: e.target.value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
      const requiredFields = [
        "nom",
        "prenom",
        "mail",
        "password",
        "adresse",
        "dateDeNaissance",
        "numTelephone",
        "departement",
        "poste",
        "dateofjoining",
        "numUrgence",
        "contratDeTravailPath",
        "cvPath",
        "img",
        "baseSalary",
        "hourlyRate"
    ];
  
    // Identifier les champs vides
    const emptyFields = requiredFields.filter(field => !employe[field]);
  
    if (emptyFields.length > 0) {
        setInvalidFields(emptyFields); // Mettre à jour les champs vides dans l'état
  
        // Message d'erreur général
        toast.error('❌ Veuillez remplir tous les champs obligatoires.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return;
    
    }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(employe.mail)) {
        toast.error(' Entrez un e-mail valide, ex : user@example.com.', {
            position: "top-right",
            autoClose: 3000,
        });
        return;
    }
   
    const formData = new FormData();
  
    // Create the Employe object and convert it to JSON
    const employeData = {
      nom: employe.nom,
      prenom: employe.prenom,
      mail: employe.mail,
      password: employe.password,
      adresse:employe.adresse,
      dateDeNaissance:employe.dateDeNaissance,
      numTelephone: employe.numTelephone,
      numUrgence: employe.numUrgence,
      dateofjoining: employe.dateofjoining,
      departement: employe.departement,
      poste: employe.poste,
      maladie: employe.maladie || "Rien",
      baseSalary:employe.baseSalary,
      hourlyRate:employe.hourlyRate
    };
  
    // Add the JSON object as a string under the "employe" key
    formData.append("employe", JSON.stringify(employeData));
  
    formData.append("cvPath", employe.cvPath);
    formData.append("img", employe.img);
    formData.append("contratDeTravailPath", employe.contratDeTravailPath);

    try {
      const response = await axios.post('http://localhost:8082/api/employees/add', formData/*,
        {headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Add token to headers
        }}*/
      );
      
      toast.success('🎉 Employé ajouté avec succès!', { position: "top-right", autoClose: 3000 });
      console.log(response.data);
      setEmploye({
        nom: '',
        prenom: '',
        mail: '',
        numTelephone: '',
        password: '',
        adresse:'',
        dateDeNaissance:'',
        poste: '',
        departement: '',
        dateofjoining: '',
        maladie: 'Rien',
        numUrgence: '',
        baseSalary:'',
        hourlyRate:'',
        cvPath: null,
        img:null,
        contratDeTravailPath: null
      });
      if (cvFileRef.current) cvFileRef.current.value = null;
      if (imgFileRef.current) imgFileRef.current.value = null;
      if (contratFileRef.current) contratFileRef.current.value = null;
      
      setDepartement('');
  } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'employé', error);
      toast.error('❌ Une erreur est survenue lors de l\'ajout de l\'employé', { position: "top-right", autoClose: 3000 });
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized! Redirecting to login page...', localStorage.getItem('token'));
        localStorage.removeItem('token'); // Optionally, clear the token
        navigate('/login'); // Redirect to login page
      }
  }
};

// Mise à jour de la gestion des fichiers dans le `onChange`
const handleFileChange = (e) => {
  const { name, files } = e.target;
  setEmploye({
    ...employe,
    [name]: files[0], // Directly using the input's name to update the corresponding field
  });
  setFormKey((prevKey) => prevKey + 1);
};
const [invalidFields, setInvalidFields] = useState([]);
  

  return (
    <CRow>
      <CContainer>
      <ToastContainer />
        <CRow >
          <CCol md={6}>
          <p className="h3">Ajouter un Nouvel Employé</p>            
          </CCol>
          <CCard className="mb-4">
          <CCardHeader>
            <strong>Informations Personnelles</strong> 
          </CCardHeader>
          <CCardBody>
          
             
          <CForm className="row g-3">
              <CFormLabel >Nom & Prénom</CFormLabel>
              <CCol xs={6} >
                  <CFormInput name="nom"  placeholder="Nom" aria-label="First name" className={invalidFields.includes("nom") ? "is-invalid" : ""} onChange={handleChange} value={employe.nom} required />
                </CCol>
                <CCol xs={6}>
                  <CFormInput name="prenom" placeholder="Prénom" className={invalidFields.includes("prenom") ? "is-invalid" : ""}  onChange={handleChange} aria-label="Last name" value={employe.prenom} required />
                </CCol>
                <CFormLabel >Email & Mot de passe</CFormLabel>
                <CCol xs={6}>
                  <CFormInput name="mail" type="email" className={invalidFields.includes("mail") ? "is-invalid" : ""}    onChange={handleChange} placeholder="user@example.com" value={ employe.mail}  required />
                </CCol>                
                <CCol xs={6}>                 
                  <CFormInput name="password" type="password" className={invalidFields.includes("password") ? "is-invalid" : ""}  onChange={handleChange} placeholder='Mot de passe ' value={employe.password} required />
                </CCol>
                <CFormLabel >Adresse</CFormLabel>
                <CCol xs={8} >                  
                  <CFormInput  name="adresse" placeholder="1234 Main St" className={invalidFields.includes("adresse") ? "is-invalid" : ""} onChange={handleChange} value={employe.adresse} required />
                </CCol>
                <CFormLabel >Numéro de Téléphone</CFormLabel>
                <CCol xs={8}>                 
                  <CFormInput   name='numTelephone' className={invalidFields.includes("numTelephone") ? "is-invalid" : ""}  onChange={handleChange} type='number' value={employe.numTelephone} required />
                </CCol>
                
                <CCol xs={8}>
                <CFormLabel >Numéro de téléphone d'urgence</CFormLabel>
                  <CFormInput name='numUrgence' type="number" className={invalidFields.includes("numUrgence") ? "is-invalid" : ""}   onChange={handleChange} value={employe.numUrgence} required/>
                </CCol>
                <CCol xs={12}>
                <CFormLabel >Date de naissance</CFormLabel>
                   <CCol lg={4}>
                      <CDatePicker key={formKey} locale="en-US" name='dateDeNaissance' className={invalidFields.includes("dateDeNaissance") ? "is-invalid" : ""} onDateChange={handleDateChangeNai } value={employe.dateDeNaissance || ""}  required />
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
                    <CFormSelect name='departement'aria-label="Default select example" className={invalidFields.includes("departement") ? "is-invalid" : ""}  onChange={handleDepartementChange} value={employe.departement} required >
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
                    <CFormSelect aria-label="Default select example" name='poste' className={invalidFields.includes("poste") ? "is-invalid" : ""}  onChange={handlePosteChange} value={employe.poste} required >
                    {postes[departement]?.map((poste) => (
                        <option key={poste.value} value={poste.value}>{poste.label}</option>
                    ))}
                    </CFormSelect>                 
            </CCol>
                  <CCol xs={8} >
                  <CFormLabel >Salaire de Base</CFormLabel>
  
                  <CFormInput   name='baseSalary' className={invalidFields.includes("baseSalary") ? "is-invalid" : ""}  onChange={handleChange} type='number' value={employe.baseSalary} required />
                  
                </CCol>
                <CCol xs={8} >
                  <CFormLabel >Taux Horaire</CFormLabel>
               
                  <CFormInput   name='hourlyRate' className={invalidFields.includes("hourlyRate") ? "is-invalid" : ""}  onChange={handleChange} type='number' value={employe.hourlyRate} required />
                 
                </CCol>
                <CCol xs={8} >
                  <CFormLabel >Date de début de contrat </CFormLabel>
                  <CCol lg={4}>
                      <CDatePicker key={formKey} name='dateofjoining' className={invalidFields.includes("dateofjoining") ? "is-invalid" : ""} locale="en-US" onDateChange={handleDateChange } value={employe.dateofjoining || ""} required/>
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
                  <CFormLabel >Contrat de travail</CFormLabel>
                  <div className="mb-3">               
                    <CFormInput name="contratDeTravailPath"  type="file" className={invalidFields.includes("contratDeTravailPath") ? "is-invalid" : ""}  onChange={handleFileChange} ref={contratFileRef} required/>
                  </div>
                </CCol>
                <CCol xs={8}>
                  <CFormLabel >CV</CFormLabel>
                  <div className="mb-3">
                    <CFormInput  name="cvPath"  type="file" className={invalidFields.includes("cvPath") ? "is-invalid" : ""}  onChange={handleFileChange} ref={cvFileRef} required />
                  </div>
                </CCol>
                <CCol xs={8}>
                  <CFormLabel >Photo De Profil</CFormLabel>
                  <div className="mb-3">
                    <CFormInput  name="img"  type="file" className={invalidFields.includes("img") ? "is-invalid" : ""}  onChange={handleFileChange} ref={imgFileRef} required />
                  </div>
                </CCol>
              </CForm>
          </CCardBody>
        </CCard>
        <div className="d-grid gap-2 col-6 mx-auto">
                <CButton className='btn-' onClick={handleSubmit}>Ajouter</CButton>               
              </div>
        </CRow>
        </CContainer>
        
    </CRow>
  )
  
}

export default Addemploye
