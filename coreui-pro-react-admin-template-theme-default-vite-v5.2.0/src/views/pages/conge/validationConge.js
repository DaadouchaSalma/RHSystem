import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react-pro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const CongeManagement = () => {
  const [demandes, setDemandes] = useState([]);
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, details: {} });
  const [declineModal, setDeclineModal] = useState({ isOpen: false, idConge: null });
  const [cause, setCause] = useState('');
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
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/conges/en-cours');
      const data = response.data || [];
      setDemandes(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('❌ Erreur lors du fetch de demandes de congé.');
    }
  };

  const handleAction = async (idConge, statut) => {
    // Show confirmation dialog before proceeding
    const isConfirmed = window.confirm(
      statut === 'APPROUVE'
        ? 'Êtes-vous sûr de vouloir approuver cette demande de congé ?'
        : 'Êtes-vous sûr de vouloir rejeter cette demande de congé ?'
    );
  
    // If the action is not confirmed, exit early
    if (!isConfirmed) return;
  
    // Proceed if confirmed
    try {
      await axios.put(`http://localhost:8082/api/conges/${idConge}`, null, {
        params: { statut },
      });
      toast.success(`Demande de congé ${statut === 'APPROUVE' ? 'approuvée' : 'rejetée'}.`);
      fetchDemandes();
    } catch (error) {
      toast.error('❌ Erreur lors de la modification de la demande de congé.');
    }
  };
  

  const openDeclineModal = (idConge) => {
    setDeclineModal({ isOpen: true, idConge });
  };

  const openDetailsModal = (details) => {
    setDetailsModal({ isOpen: true, details });
  };

  const handleDecline = async () => {
    if (!cause.trim()) {
      toast.error('Veuillez donner une raison pour le rejet.');
      return;
    }
    try {
      await axios.put(`http://localhost:8082/api/conges/${declineModal.idConge}`, null, {
        params: { statut: 'REJETE', cause },
      });
      toast.success('Demande de congé rejetée.');
      setDeclineModal({ isOpen: false, idConge: null });
      setCause('');
      fetchDemandes();
    } catch (error) {
      toast.error('❌ Erreur lors du rejet de la demande de congé.');
    }
  };

  return (
    <div className="containervalidconge">
      <ToastContainer />
      <h2 style={{marginBottom:'50px'}}>Liste Des Congés</h2>
      <CTable striped hover bordered className="custom-tablevalidconge">
        <CTableHead className="table-headvalidconge">
          <CTableRow>
            <CTableHeaderCell className='tablerows-validconge'>Nom</CTableHeaderCell>
            <CTableHeaderCell className='tablerows-validconge'>Type</CTableHeaderCell>
            <CTableHeaderCell className='tablerows-validconge'>Date Début</CTableHeaderCell>
            <CTableHeaderCell className='tablerows-validconge'>Date Fin</CTableHeaderCell>
            <CTableHeaderCell className='tablerows-validconge'>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {demandes.map((demande) => (
            <CTableRow key={demande.idConge}>
              <CTableDataCell className='tablerows-validconge'>{`${demande.user.nom} ${demande.user.prenom}`}</CTableDataCell>
              <CTableDataCell className='tablerows-validconge'>{demande.typeConge}</CTableDataCell>
              <CTableDataCell className='tablerows-validconge'>{new Date(demande.dateDebut).toLocaleDateString()}</CTableDataCell>
              <CTableDataCell className='tablerows-validconge'>{new Date(demande.dateFin).toLocaleDateString()}</CTableDataCell>
              <CTableDataCell className='ctable-data-cell-buttons'>
                <CButton 
                  onClick={() => openDetailsModal({
                    commentaire: demande.commentaire,
                    poste: demande.user.poste,
                    departement: demande.user.departement,
                  })}
                  className="action-buttonvalidconge-details"
                >
                  Détails
                </CButton>
                <CButton
                  onClick={() => handleAction(demande.idConge, 'APPROUVE')}
                  className="action-buttonvalidconge"
                >
                  Approuver
                </CButton>
                <CButton
                  onClick={() => openDeclineModal(demande.idConge)}
                  className="action-button rejectvalidconge"
                >
                  Rejeter
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal
        visible={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, details: {} })}
      >
        <CModalHeader>Détails</CModalHeader>
        <CModalBody>
          <p><strong>Poste:</strong> {detailsModal.details.poste || 'N/A'}</p>
          <p><strong>Département:</strong> {detailsModal.details.departement || 'N/A'}</p>
          <p><strong>Commentaire:</strong> {detailsModal.details.commentaire || 'Aucun commentaire'}</p>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setDetailsModal({ isOpen: false, details: {} })}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={declineModal.isOpen} onClose={() => setDeclineModal({ isOpen: false, idConge: null })}>
        <CModalHeader>Rejeter la demande</CModalHeader>
        <CModalBody>
          <label>Raison pour rejet:</label>
          <input
            type="text"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            placeholder="Entrer la cause"
            className="form-control"
          />
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setDeclineModal({ isOpen: false, idConge: null })}>
            Annuler
          </CButton>
          <CButton onClick={handleDecline}>
            Rejeter
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CongeManagement;
