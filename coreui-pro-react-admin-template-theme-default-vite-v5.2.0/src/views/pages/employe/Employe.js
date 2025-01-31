
import React, { useState, useEffect } from "react";
import { freeSet } from '@coreui/icons' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CSmartTable,
  CListGroup,
  CListGroupItem,
  CAvatar,
  CBadge,
  CCollapse,
  CFormSelect,

} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 const [selectedDepartment, setSelectedDepartment] = useState("");
 const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem('role')

    if (!role.includes('RH')) {
      // Redirect to login or another page if the role is not RH
      navigate('/login')  // You can change this to any page
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(token)
      localStorage.setItem('toastMessage', '🔒 Vous devez être connecté pour accéder à cette page.');
      navigate('/login'); // Redirige vers la page de login
    }
  }, [navigate]);
  //combinée
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const queryParams = [];
      
      if (searchTerm) {
        queryParams.push(`name=${searchTerm}`);
      }
      if (selectedDepartment) {
        queryParams.push(`department=${selectedDepartment}`);
      }
      
      const url = `http://localhost:8082/api/employees/search?${queryParams.join('&')}`;
      
      axios.get(url)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setEmployees(response.data);
          } else {
            console.error("API response is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error searching employees:", error);
        });
    }, 500); // 500ms delay for debouncing
  
    return () => clearTimeout(delayDebounceFn); // Cleanup
  }, [searchTerm, selectedDepartment]);

  //combinée
  const handleDepartmentChange = (event) => {
  setSelectedDepartment(event.target.value);
};

  

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'Matricule', label: 'Matricule', _style: { width: '2%' } },
    { key: 'Nom', label: 'Nom', _style: { width: '10%' } },
    { key: 'Prénom', label: 'Prénom', _style: { width: '10%' } },
    { key: 'Email', label: 'Email', _style: { width: '10%' } },
    { key: 'N_téléphone', label: 'N° téléphone', _style: { width: '10%' } },
    { key: 'show_details', label: '', _style: { width: '1%' }, sorter: false, filter: false },
  ]
    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...details, index]
      }
      setDetails(newDetails)
    }
    const deleteEmployee = async (id) => {
      // Afficher un toast pour demander la confirmation
      const confirmToast = toast(
        <div>
          <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
          <button
            onClick={async () => {
              try {
                // Effectuer la requête de suppression
                await axios.delete(`http://localhost:8082/api/employees/delete/${id}`);
    
                // Mettre à jour la liste des employés après la suppression
                setEmployees(employees.filter((emp) => emp.id !== id));
    
                // Afficher un toast de succès
                toast.success('🎉 Employé supprimé avec succès!', {
                  position: "top-right",
                  autoClose: 3000,
                });
                toast.dismiss(confirmToast) ;// Fermer le toast si l'utilisateur annule
              } catch (error) {
                console.error("Error deleting the employee!", error);
                // Afficher un toast d'erreur en cas de problème
                toast.error('❌ Une erreur est survenue lors de la suppression', {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            }}
            style={{ margin: '0 5px' }}
            
            
          >
            Oui
          </button>
          <button
            onClick={() => toast.dismiss(confirmToast)} // Fermer le toast si l'utilisateur annule
            style={{ margin: '0 5px' }}
          >
            Non
          </button>
        </div>,
        {
          position: "top-center",
          autoClose: false, // Ne se ferme pas automatiquement
          closeOnClick: false,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    
    <div>
      <h2>Liste Des Employés</h2>
      <ToastContainer />
      <CRow className="align-items-center mb-3">
          <CCol xs={4}  className="inputSearch">
            <CFormInput type="text" placeholder="Rechercher par nom" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            
          </CCol>
          <CCol xs={4}  className="inputSearch">
                    <CFormSelect value={selectedDepartment}  onChange={handleDepartmentChange} >
                      <option value="">Tous les départements</option>
                      <option value="Ressources Humaines">Ressources Humaines</option>
                      <option value="Développement Informatique">Développement Informatique</option>
                      <option value="Finance et Comptabilité">Finance et Comptabilité</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Juridique">Juridique</option>
                    </CFormSelect>
   
            </CCol>
       </CRow>
              <CSmartTable
                activePage={2}
                columns={columns}
                items={employees}
                pagination
                scopedColumns={{
                  Nom: (item) => (
                    <td>{item.nom}</td>
                  ),
                  Prénom: (item) => (
                    <td>{item.prenom}</td>
                  ),
                  Matricule: (item) => (
                    <td>{item.id}</td>
                  ),
                  Email: (item) => (
                    <td>{item.mail}</td>
                  ),
                  N_téléphone: (item) => (
                    <td>{item.numTelephone}</td>
                  ),
                  show_details: (item) => (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(item.id)
                        }}
                      >
                        {details.includes(item.id) ? 'Cacher' : 'Afficher'}
                      </CButton>
                    </td>
                  ),
                  details: (item) => (
                    <CCollapse visible={details.includes(item.id)}>
                      <CCardBody className="p-3">
                        <h4>{item.nom} {item.prenom}</h4>
                        <CRow>
                          <CCol md="6">
                            <CListGroup flush>
                              <CListGroupItem><strong>Département: </strong> {item.departement}</CListGroupItem>
                              <CListGroupItem><strong>Poste: </strong>{item.poste}</CListGroupItem>
                              <CListGroupItem><strong>Date de Début de Contrat: </strong> {item.dateofjoining}</CListGroupItem>
                            </CListGroup>
                          </CCol>

                          <CCol md="6"> 
                            <CListGroup flush>
                              <CListGroupItem><strong>Maladie: </strong> {item.maladie}</CListGroupItem>
                              <CListGroupItem><strong>N° Urgence: </strong> {item.numUrgence}</CListGroupItem>
                              <CListGroupItem><strong>Date De Naissance: </strong> {item.dateDeNaissance}</CListGroupItem>
                            </CListGroup>
                          </CCol>
                        </CRow>
                        <CButton className="btn-consulter" color="primary"  variant="outline" shape="rounded-pill" style={{ marginLeft:'10px' , marginRight :'10px' , marginTop :'10px'}} onClick={() => navigate(`/ModifEmp/${item.id}`)}  >
                          <CIcon icon={freeSet.cilPen} size="lg" />
                        </CButton>
                        <CButton className="btn-consulter" color="danger" variant="outline" shape="rounded-pill" onClick={() => deleteEmployee(item.id)} style={{ marginTop :'10px'}}>
                          <CIcon icon={freeSet.cilTrash} size="lg" />
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  ),
                }}
              />
    </div>
  );
};

export default Register
