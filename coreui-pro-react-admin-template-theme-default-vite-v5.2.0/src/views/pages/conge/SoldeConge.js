import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCardText,
    CCardTitle,
    CRow,
    CCol,
    CWidgetStatsD,
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableDataCell,
  } from '@coreui/react-pro';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'


const SoldeConge = () => {
    const { matricule } = useParams();
    const [solde, setSolde] = useState(null);
    const [soldeM, setSoldeM] = useState(null);
    const [historiques, setHistorique] = useState([]);
    const navigate = useNavigate() 
  
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
        .get(`http://localhost:8082/api/conges/solde`)
        .then((response) => {
            setSolde(response.data);
        })
        .catch((error) => {
            console.error('Error fetching solde conge:', error);
        });
        axios
        .get(`http://localhost:8082/api/conges/soldeM`)
        .then((response) => {
            setSoldeM(response.data);
        })
        .catch((error) => {
            console.error('Error fetching solde conge :', error);
        });
        axios
        .get(`http://localhost:8082/api/conges/historique`)
        .then((response) => {
            setHistorique(response.data);
            console.log('Historiques response data:', response.data);
        })
        .catch((error) => {
            console.error('Error fetching solde conge:', error);
        });
    }, [matricule]);
    
    return(
        <div>
            <CRow className="justify-content-center">
                <CCol xs={5}>
                    <CWidgetStatsD
                    className="mb-3"
                    icon={<CIcon className="my-4 text-white" icon={cilCalendar} height={52} />}
                    chart={
                        <CChartLine
                        className="position-absolute w-100 h-100"
                        data={{
                            datasets: [
                            {
                                backgroundColor: '#c67e7a',
                                borderColor: 'rgba(255,255,255,.55)',
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                fill: true,
                            },
                            ],
                        }}
                        options={{
                            elements: {
                            line: {
                                tension: 0.4,
                            },
                            point: {
                                radius: 0,
                                hitRadius: 10,
                                hoverRadius: 4,
                                hoverBorderWidth: 3,
                            },
                            },
                            maintainAspectRatio: false,
                            plugins: {
                            legend: {
                                display: false,
                            },
                            },
                            scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                display: false,
                            },
                            },
                        }}
                        />
                    }
                    style={{ '--cui-card-cap-bg': '#c67e7a' }}
                    values={[
                        { title: 'Solde Annuel', value: `${solde} jours` },
                        { title: 'Solde Mensuel', value: `${soldeM} jours` },
                    ]}
                    />
                </CCol>
            </CRow> 
            <br></br>
            <br></br>
            <CRow className="justify-content-center">
                <h2 style={{marginBottom:'30px'}}>Historique des Congés</h2>
                <CCol xs={12}>
                    <CTable className='center-table'>
                        <CTableHead color="dark">
                            <CTableRow style={{textAlign:'center'}}>
                                <CTableDataCell>Type</CTableDataCell>
                                <CTableDataCell>Date Debut</CTableDataCell>
                                <CTableDataCell>Date Fin</CTableDataCell>
                                <CTableDataCell>Cause</CTableDataCell>
                                <CTableDataCell>Statut</CTableDataCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {historiques.map((historique, index) => (
                                <CTableRow key={index} style={{textAlign:'center'}}>
                                    <CTableDataCell>{historique.typeConge}</CTableDataCell>
                                    <CTableDataCell>{historique.dateDebut}</CTableDataCell>
                                    <CTableDataCell>{historique.dateFin}</CTableDataCell>
                                    <CTableDataCell>{historique.cause}</CTableDataCell>
                                    <CTableDataCell 
                                    style={{ 
                                        color: 
                                            historique.statut.toLowerCase() === 'approuve' ? 'green' : 
                                            historique.statut.toLowerCase() === 'refuse' ? 'red' : 'black' 
                                    }}>
                                        {historique.statut}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCol>
            </CRow>
        </div>
    );
};
export default SoldeConge;
