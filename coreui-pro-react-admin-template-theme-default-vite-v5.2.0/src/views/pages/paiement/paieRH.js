import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
} from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';
const Paie = () => {
  const [employees, setEmployees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    bonus: "",
    deductions: "",
    overtimeHours: "",
    month: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterYear, setFilterYear] = useState(""); // Filtre par année
  const [filterMonth, setFilterMonth] = useState(""); // Filtre par mois
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

  // Fetch employees with axios
  useEffect(() => {
    axios.get("http://localhost:8082/api/paiement/employees")
      .then((response) => {
        setEmployees(response.data);
        console.log("recu",response.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the employees:", error);
      });
  }, []);

  // Fetch payment data with axios
  // Fetch payment data
const fetchPayments = () => {
  axios.get("http://localhost:8082/api/paiement/payments")
    .then((response) => {
      setPayments(Array.isArray(response.data) ? response.data : []);
    })
    .catch((error) => {
      console.error("There was an error fetching the payments:", error);
    });
};
useEffect(() => {
  fetchPayments();
}, []);

const handleYearChange = (e) => {
  setFilterYear(e.target.value);
};

const handleMonthChange = (e) => {
  setFilterMonth(e.target.value);
};
const filteredPayments = payments.filter((payment) => {
  const paymentYear = new Date(payment.month).getFullYear(); // Remplacez `date` par le champ contenant la date
  const paymentMonth = new Date(payment.month).getMonth() + 1; // Les mois sont indexés à partir de 0
  return (
    (filterYear ? paymentYear === parseInt(filterYear) : true) &&
    (filterMonth ? paymentMonth === parseInt(filterMonth) : true)
  );
});

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const resetForm = () => {
    setFormData({
      bonus: "",
      deductions: "",
      overtimeHours: "",
      month: "",
    });
    setSelectedEmployee(null);
    setErrors({});
  };
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
  
    // Étape 1: Vérification uniquement pour l'employé
    if (!selectedEmployee) {
      newErrors.selectedEmployee = "Veuillez sélectionner un employé.";
      isValid = false;
    }
  
    // Étape 2: Si l'employé est sélectionné, valider les autres champs
    if (selectedEmployee) {
      if (formData.bonus === "" || isNaN(formData.bonus)) {
        newErrors.bonus = "Prime invalide.";
        isValid = false;
      }
  
      if (formData.deductions === "" || isNaN(formData.deductions)) {
        newErrors.deductions = "Déductions invalides.";
        isValid = false;
      }
  
      if (formData.overtimeHours === "" || isNaN(formData.overtimeHours)) {
        newErrors.overtimeHours = "Heures invalides.";
        isValid = false;
      }
  
      if (!formData.month) {
        newErrors.month = "Choisissez un mois.";
        isValid = false;
      }
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  
  // Handle salary calculation
  const calculateSalary = () => {
    if (validateForm()) {
    axios.post(`http://localhost:8082/api/paiement/calculateSalary/${selectedEmployee.id}`, formData)
      .then((response) => {
        setShowModal(false);
        fetchPayments();
      })
      .catch((error) => {
        console.error("There was an error calculating the salary:", error);
      });
    }
  };
  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };
  

  return (
    <>
    <h2 style={{marginBottom:'50px'}}>Liste Des Paiements</h2>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
    {/* Bouton Nouveau Paiement */}
    <CButton className="custom-button" color="primary" onClick={() => {resetForm(); setShowModal(true);}}>
        Nouveau Paiement
    </CButton>



    {/* Filtres alignés à droite */}
    <div style={{ display: "flex", gap: "15px" }}>
      <div>
        <label style={{ marginRight: "10px" }}>
          
          <select 
            value={filterYear} 
            onChange={handleYearChange} 
            className="select-filter"
          >
            <option value="">Toutes les années</option>
            {Array.from(new Set(payments.map((p) => new Date(p.month).getFullYear())))
              .sort()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div>
        <label style={{ marginRight: "10px" }}>
         
          <select 
            value={filterMonth} 
            onChange={handleMonthChange} 
            className="select-filter"
          >
            <option value="">Tous les mois</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  </div>

 

  <CTable className="ctable">
  <CTableRow>
    <CTableHeaderCell className="table-header">Nom</CTableHeaderCell>
    <CTableHeaderCell className="table-header">Prénom</CTableHeaderCell>
    <CTableHeaderCell className="table-header">Poste</CTableHeaderCell>
    <CTableHeaderCell className="table-header">Mois</CTableHeaderCell>
    <CTableHeaderCell className="table-header">Salaire Net</CTableHeaderCell>
    <CTableHeaderCell className="table-header">Action</CTableHeaderCell>
  </CTableRow>
  <CTableBody>
    {filteredPayments.map((payment) => (
      <CTableRow key={payment.id_paiement}>
        <CTableDataCell className="table-cell">{payment.user.nom}</CTableDataCell>
        <CTableDataCell className="table-cell">{payment.user.prenom}</CTableDataCell>
        <CTableDataCell className="table-cell">{payment.user.poste}</CTableDataCell>
        <CTableDataCell className="table-cell">{payment.month}</CTableDataCell>
        <CTableDataCell className="table-cell">{payment.salaireNet}</CTableDataCell>        
        <CTableDataCell className="table-cell">
          <CButton color="info" className="cbutton" onClick={() => handleViewDetails(payment)}>
            Voir Détails
          </CButton>
        </CTableDataCell>
      </CTableRow>
    ))}
  </CTableBody>
</CTable>

{selectedPayment && (
  <CModal visible={true} onClose={() => setSelectedPayment(null)}>
    <CModalHeader className="modal-header" closeButton>
      <CModalTitle className="modal-title">Détails du Paiement</CModalTitle>
    </CModalHeader>
    <CModalBody className="modal-body">
      <p>
        Salaire de base: <span>{selectedPayment.user.baseSalary} DT</span>
      </p>
      <p>
        Heures Supplémentaires: <span>{selectedPayment.overtimeHours || 0} DT</span>
      </p>
      <p>
        Prime: <span>{selectedPayment.bonus || 0} DT</span>
      </p>
      <p>
        Déductions: <span>{selectedPayment.deductions || 0} DT</span>
      </p>
      <p>
        Salaire Net: <span>{selectedPayment.salaireNet || 0} DT</span>
      </p>
    </CModalBody>
    <CModalFooter className="modal-footer">
      <CButton className="cbutton" color="secondary" onClick={() => setSelectedPayment(null)}>
        Fermer
      </CButton>
    </CModalFooter>
  </CModal>
)}

<CModal visible={showModal} onClose={() => setShowModal(false)}>
    <CModalHeader>
      <CModalTitle>Nouveau Paiement</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm className="custom-form">
        <div className="form-group">
          <CFormLabel>Employé</CFormLabel>
          <CFormSelect
            onChange={(e) => {
              const employee = employees.find((emp) => emp.id === parseInt(e.target.value));
              setSelectedEmployee(employee);
              setErrors({ ...errors, selectedEmployee: "" }); 
            }}
          >
            <option value="">Sélectionnez un employé</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nom}
              </option>
            ))}
          </CFormSelect>
          {errors.selectedEmployee && (
            <p className="error-message">{errors.selectedEmployee}</p>
          )}
        </div>

        {selectedEmployee && (
          <div className="input-group--">
            <CFormInput
              className="input-paie"
              type="number"
              name="bonus"
              placeholder="Prime"
              onChange={handleFormChange}
              value={formData.bonus}
            />
            {errors.bonus && <p className="error-message">{errors.bonus}</p>}

            <CFormInput
              className="input-paie"
              type="number"
              name="deductions"
              placeholder="Déductions"
              onChange={handleFormChange}
              value={formData.deductions}
            />
            {errors.deductions && (
              <p className="error-message">{errors.deductions}</p>
            )}

            <CFormInput
              className="input-paie"
              type="number"
              name="overtimeHours"
              placeholder="Heures Supplémentaires"
              onChange={handleFormChange}
              value={formData.overtimeHours}
            />
            {errors.overtimeHours && (
              <p className="error-message">{errors.overtimeHours}</p>
            )}

            <CFormInput
              className="input-paie"
              type="month"
              name="month"
              min={new Date().toISOString().slice(0, 7)}
              onChange={handleFormChange}
              value={formData.month}
            />
            {errors.month && <p className="error-message">{errors.month}</p>}
          </div>
        )}
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="primary"
        style={{ backgroundColor: "#4b6f9d", color: "white" }}
        onClick={calculateSalary}
      >
        Valider
      </CButton>

      <CButton color="secondary" onClick={() => setShowModal(false)}>
        Annuler
      </CButton>
    </CModalFooter>
  </CModal>
    </>
  );
};

export default Paie;
