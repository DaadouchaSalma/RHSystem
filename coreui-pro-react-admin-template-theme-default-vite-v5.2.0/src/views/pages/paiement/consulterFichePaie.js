
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from 'date-fns';
import { cilColorBorder, freeSet } from '@coreui/icons' ;
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
const ConsulterPaie = () => {
    const navigate = useNavigate();
    const [paiements, setPaiements] = useState([]);
    const [employe, setEmploye] = useState(null);
    const [loading, setLoading] = useState(true);
    const generatePDF = (paiement) => {
      const doc = new jsPDF();

      // Add images and text to the PDF
    const imageUrl = "src/assets/images/logo_unity_2.jpeg";
    doc.addImage(imageUrl, 'JPEG', 10, 5, 60, 12);
    doc.setFontSize(10);
    doc.setFont('custom', 'bold');
    //doc.text('REQUEST FOR QUOTATION', 150, 12);

    // Line width in units (you can adjust this)
    doc.setLineWidth(0.7);
    // Line color (RGB)
    /*doc.setDrawColor(200, 200, 200);
    doc.line(10, 18, 200, 18)*/



      
      // Define frame dimensions and position
      const frameWidth = 75; 
      const frameHeight = 15; 
      const frameX = 10;
      const frameY = 29;

      // Draw the frame
      doc.rect(frameX, frameY, frameWidth, frameHeight);
      // En-tête
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("BULLETIN DE PAIE", 35, 35, { align: "center" });
      doc.setFontSize(10);
      doc.text(`Mois: ${paiement.month}`, 12, 41);

      // Define frame dimensions and position
      const frameWidth_2 = 75; 
      const frameHeight_2 = 35; 
      const frameX_2 = 10;
      const frameY_2 = 44;

      // Draw the frame
      doc.rect(frameX_2, frameY_2, frameWidth_2, frameHeight_2);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Employé: ${employe.nom} ${employe.prenom}`, 12, 50);
      doc.text(`Département: ${employe.departement}`, 12, 57);
      doc.text(`Poste: ${employe.poste}`, 12, 64);
      doc.text(`Date Début De Contrat: ${employe.dateofjoining}`, 12, 71);
      
      // Define frame dimensions and position
      const frameWidth_3 = 75; 
      const frameHeight_3 = 28; 
      const frameX_3 = 130;
      const frameY_3 = 29;

      // Draw the frame
      doc.rect(frameX_3, frameY_3, frameWidth_3, frameHeight_3);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Entreprise: UNITY HR`, 132, 38);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Adresse: Immeuble Harbour ,Avenue De La`, 132, 45);
      doc.text("Bourse , Tunis 1053", 132, 52);
     
      // Define frame dimensions and position
      /*const frameWidth_4 = 75; 
      const frameHeight_4 = 18; 
      const frameX_4 = 130;
      const frameY_4 = 60;

      // Draw the frame
      doc.rect(frameX_4, frameY_4, frameWidth_4, frameHeight_4);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Entreprise: UNITY HR`, 132, 65);*/


     
      
      // Tableau
      const tableData = [
        [
          { content: "Libellé", styles: { halign: "center", fillColor: "#f2f2f2" } },
          /*{ content: "Base", styles: { halign: "center", fillColor: "#f2f2f2" } },*/
          { content: "Taux", styles: { halign: "center", fillColor: "#f2f2f2" } },
          { content: "Montant", styles: { halign: "center", fillColor: "#f2f2f2" } },
        ],
        ["Salaire De Base", "-", employe.baseSalary+"DT"],
        ["Prime", "-", paiement.bonus+" DT"],
        ["Heures Supplémentaires", "-", employe.hourlyRate * paiement.overtimeHours+"DT"],
        [
          { 
            content: "Total Salaire Brut", 
            colSpan: 2, 
            styles: { halign: "center", fontStyle: "bold",fontSize:15,lineColor: "black",lineWidth: 0.7 } 
          },
          { 
            content:paiement.salaireBrut+" DT",
            styles: { halign: "center", fontStyle: "bold",fontSize:15,lineColor: "black",lineWidth: 0.7 } 
          },
          
        ],
        ["Déduction", "-",paiement.deductions+" DT"],
        ["CNSS","9%", paiement.salaireBrut*0.09+" DT"],
        ["Impots","15%", paiement.salaireBrut*0.15+" DT"],
        [
          { 
            content: "Salaire Net", 
            colSpan: 2, 
            styles: { halign: "center", fontStyle: "bold",fontSize:15,lineColor: "black",lineWidth: 0.7 } 
          },
          { 
            content: paiement.salaireNet+" DT",
            styles: { halign: "center", fontStyle: "bold",fontSize:15,lineColor: "black",lineWidth: 0.7 } 
          },
          
        ],
      ];
       // Define table styles
        const headerStyles = {
          fillColor: [240, 240, 240],
          textColor: [0],
          fontFamily: 'Newsreader',
          fontStyle: 'bold',
        };
  
      doc.autoTable({
        startY: 100,
        head: tableData.slice(0, 1),
        body: tableData.slice(1),
        theme: "grid",
        styles: {
          fontSize: 12,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: headerStyles.fillColor,
            textColor: headerStyles.textColor,
            fontStyle: headerStyles.fontStyle,
            fontSize: 12, 
            font: 'Newsreader',
            halign: 'left',
        },
        bodyStyles: {
          fontSize: 12, // Adjust the font size for the body
          font: 'Newsreader', // Set the font family for the body
          cellPadding: { top: 1, right: 5, bottom: 1, left: 2 }, // Adjust cell padding
          textColor: [0, 0, 0], // Set text color for the body
          rowPageBreak: 'avoid', // Avoid row page breaks
      },
      margin: { top: 10, left: 5, right :5 },
        columnStyles: {
          0: { halign: "center" },
          1: { halign: "center" },
          2: { halign: "center" },
          3: { halign: "center" },
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
      });
      doc.setFontSize(10);
      // Pied de page
      doc.setFontSize(10);
      doc.text("Généré par UnityHR | Ce document est confidentiel.", 105, 290, { align: "center" });
  
      // Télécharger le fichier PDF
      doc.save(`Fiche_Paie_${paiement.id_paiement}.pdf`);
    };

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
      
    useEffect(() => {
      
      axios
        .get("http://localhost:8082/api/paiement/Consulterfiche")
        .then((response) => {
          console.log("Réponse brute de l'API :", response.data);
          setEmploye({
            id: response.data.id,
            nom: response.data.nom,
            prenom: response.data.prenom,
            poste: response.data.poste,
            departement: response.data.departement,
            dateofjoining: response.data.dateofjoining,
            baseSalary: response.data.baseSalary,
            hourlyRate:response.data.hourlyRate,
          });
          setPaiements(response.data.paiements); // Récupérer les paiements
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
          setLoading(false);
        });
    }, [navigate]);

    return (
        <>
      <CCol md={6}>
        <p className="h3">Fiche De Paie</p>
      </CCol>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <CTable style={{ textAlign : "center"}}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mois</CTableHeaderCell>
              <CTableHeaderCell scope="col">Salaire Total</CTableHeaderCell>
             
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody >
            {paiements.map((paiement) => (
              <CTableRow key={paiement.id_paiement}>
                {/*<CTableHeaderCell scope="row">{paiement.id}</CTableHeaderCell>*/}
                <CTableDataCell>{paiement.id_paiement}</CTableDataCell>
                <CTableDataCell>{paiement.month}</CTableDataCell>
                <CTableDataCell>{paiement.salaireNet} DT</CTableDataCell>
                
                
                <CTableDataCell><CButton
                    className="btn--"
                    color="primary"
                    variant="outline"
                    shape="rounded-pill"
                    style={{ padding: "5px 9px" }}
                    onClick={() => generatePDF(paiement)}
                  >
                    <CIcon icon={freeSet.cilDataTransferDown}  />
                    Télécharger
                  </CButton></CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </>
)
}

export default ConsulterPaie