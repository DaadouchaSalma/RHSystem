import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBeachAccess,
  cilBell,
  cilBriefcase,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCreditCard,
  cilCursor,
  cilDrop,
  cilEducation,
  cilEnvelopeOpen,
  cilGrid,
  cilLayers,
  cilMap,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilUser,
  cilUserFollow,
  cilWallet,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'
const userRole = localStorage.getItem('role');
console.log("role",userRole);

let _nav = [];

// Construire le menu pour les employés
if (userRole.includes('EMPLOYE')) {
  _nav.push({
    component: CNavGroup,
    name: <Translation>{(t) => t('Formation')}</Translation>,
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Liste Des Formations')}</Translation>,
        to: '/formation',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('Paiement')}</Translation>,
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Consulter Fiche de Paie')}</Translation>,
        to: '/ConsulterFichePaie',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('Congé')}</Translation>,
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Demander Un Congé')}</Translation>,
        to: '/DemandeConge',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Consulter Mon Solde')}</Translation>,
        to: '/ConsulterSolde',
      },
    ],
  },
);
}

if (userRole.includes('RH')) {
  _nav.push(
    {
      component: CNavItem,
      name: <Translation>{(t) => t('Tableau De Bord')}</Translation>,
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: <Translation>{(t) => t('Formation')}</Translation>,
      icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Ajouter Une Formation')}</Translation>,
          to: '/addformation',
        },
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Liste Des Formations')}</Translation>,
          to: '/afficherFormation',
        },
      ],
    },
    {
      component: CNavGroup,
      name: <Translation>{(t) => t('Employé')}</Translation>,
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Liste Des Employés')}</Translation>,
          to: '/employe',
        },
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Ajouter Un Employé')}</Translation>,
          to: '/addemploye',
        },
      ],
    },
    {
      component: CNavGroup,
      name: <Translation>{(t) => t('Offre D\'Emploi')}</Translation>,
      icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Publier Offre D\'Emploi')}</Translation>,
          to: '/PubOffreEmp',
        },
        /*{
          component: CNavItem,
          name: <Translation>{(t) => t('Consulter Offre D\'Emploi')}</Translation>,
          to: '/ConsulterOffreEmp',
        },*/
      ],
    },
    {
      component: CNavGroup,
      name: <Translation>{(t) => t('Congé')}</Translation>,
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Valider Les Congés')}</Translation>,
          to: '/ValidationConge',
        },
      ],
    },
    {
      component: CNavGroup,
      name: <Translation>{(t) => t('Paiement')}</Translation>,
      icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Calcul Paie')}</Translation>,
          to: '/PaieRH',
        },
      ],
    },{
      component: CNavGroup,
      name: <Translation>{(t) => t('Candidats')}</Translation>,
      icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: <Translation>{(t) => t('Consulter Les Candidatures')}</Translation>,
          to: '/ConsulterCandidat',
        },
      ],
    },
    {
      component: CNavItem,
      name: <span style={{ color: '#fff', fontWeight: 'bold' }}>
        <Translation>{(t) => t('Visiter Notre Site Web')}</Translation>
      </span>,
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      to: '/accueil',
      target: '_blank', // Ouvre le lien dans un nouvel onglet
      className: 'nav-item-external', // Classe pour un style personnalisé
    },
  );
}

export default _nav
