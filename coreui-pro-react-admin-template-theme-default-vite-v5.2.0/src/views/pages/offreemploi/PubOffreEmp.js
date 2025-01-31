import React, { useState,useEffect } from 'react'
import {
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSmartTable,
  CAvatar,
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react-pro'

import axios from'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { cilMagnifyingGlass } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
const PubOffreEmp = () => {
  const navigate = useNavigate() // Initialisation de useNavigate
  const [titre, setTitre] = useState('')
  const [minimumQualifications, setMinimumQualifications] = useState('')
  const [preferredQualifications, setPreferredQualifications] = useState('')
  const [description, setDescription] = useState('')
  const [responsibilities, setResponsibilities] = useState('')  
  const [alert, setAlert] = useState('')
 

  // Vérifier si l'utilisateur est connecté au chargement de la page
  useEffect(() => {
    const role = localStorage.getItem('role')

    if (!role.includes('RH')) {
      // Redirect to login or another page if the role is not RH
      navigate('/login')  // You can change this to any page
    }
    const token = localStorage.getItem('token')
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
    }
  }, [navigate,history])

  const handleSubmit = async (e) => {
    e.preventDefault() 
    const offreData = {
      titre: titre,
      minimumQualifications,
      preferredQualifications,
      description: description,
      responsibilities: responsibilities,
      datePublication: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    }

    try {
      const response = await axios.post('http://localhost:8082/api/offre-emploi/create', offreData)
      toast.success('🎉 Offre d\'emploi ajouté avec succès!', { position: "top-right", autoClose: 3000 });
      console.log('Offre saved:', response.data)
      //setAlert('success')
      //setTitre('') 
      //setDescription('')
    } catch (error) {
      console.error('Error saving offre:', error)
      toast.error('❌ Une erreur est survenue lors de l\'ajout de l\'offre ', { position: "top-right", autoClose: 3000 });
      //setAlert('error')
    }
  }

  return (
    <>
      {/*alert === 'error' && (
        <CAlert color="danger" dismissible onClose={() => setAlert('')}>
          Erreur lors de la publication de l'offre. Veuillez réessayer !
        </CAlert>
      )}
      {alert === 'success' && (
        <CAlert color="success" dismissible onClose={() => setAlert('')}>
          <CIcon icon={freeSet.cilCheckCircle} size="lg" />
          &nbsp;&nbsp;L'offre a été publiée avec succès !
        </CAlert>
      )*/}
      <ToastContainer />
      <CForm onSubmit={handleSubmit}>
        <h2 style={{marginBottom:'30px'}}>Publier une nouvelle offre d'emploi</h2>
        <div className="mb-3">
          <CFormLabel htmlFor="titre">Titre</CFormLabel>
          <CFormInput
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
        <CFormLabel htmlFor="description">Description</CFormLabel>
          <CFormTextarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <CFormLabel htmlFor="minimumQualifications">Compétences requise:</CFormLabel>
          <CFormTextarea
            id="minimumQualifications"
            rows={3}
            value={minimumQualifications}
            onChange={(e) => setMinimumQualifications(e.target.value)}
            required
          />
          <CFormLabel htmlFor="preferredQualifications">Expérience souhaitée:</CFormLabel>
          <CFormTextarea
            id="preferredQualifications"
            rows={3}
            value={preferredQualifications}
            onChange={(e) => setPreferredQualifications(e.target.value)}
            required
          />
          <CFormLabel htmlFor="responsibilities">Salaire proposé:</CFormLabel>
          <CFormTextarea
            id="responsibilities"
            type="text"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <CButton className='btn-' type="submit"  >
            Publier
          </CButton>
        </div>
      </CForm>
    </>

  )
}

export default PubOffreEmp