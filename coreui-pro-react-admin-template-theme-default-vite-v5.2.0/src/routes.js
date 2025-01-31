import React from 'react'
import { Translation } from 'react-i18next'
//import Register from './views/pages/register/register'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const LoadingButtons = React.lazy(() => import('./views/buttons/loading-buttons/LoadingButtons'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const DatePicker = React.lazy(() => import('./views/forms/date-picker/DatePicker'))
const DateRangePicker = React.lazy(() => import('./views/forms/date-range-picker/DateRangePicker'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const MultiSelect = React.lazy(() => import('./views/forms/multi-select/MultiSelect'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const TimePicker = React.lazy(() => import('./views/forms/time-picker/TimePicker'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const SmartTable = React.lazy(() => import('./views/smart-table/SmartTable'))

// Plugins
const Calendar = React.lazy(() => import('./views/plugins/calendar/Calendar'))
const Charts = React.lazy(() => import('./views/plugins/charts/Charts'))
const GoogleMaps = React.lazy(() => import('./views/plugins/google-maps/GoogleMaps'))

//formation
const Formation = React.lazy(() => import('./views/pages/formation/formation'))
const AddFormation = React.lazy(() => import('./views/pages/formation/FormationAssigner'))
const EditFormation = React.lazy(() => import('./views/pages/formation/FormationEdit'))
const FormationDetails= React.lazy(() => import('./views/pages/formation/formationDetails'))
const AffichFormation= React.lazy(() => import('./views/pages/formation/AffichFormationRh'))
//employe
const Employe=React.lazy(() => import('./views/pages/employe/Employe'))
const Addemploye=React.lazy(() => import('./views/pages/employe/addemploye'))
const Profile=React.lazy(() => import('./views/pages/employe/ConsulterProfile'))
const Modifier=React.lazy(() => import('./views/pages/employe/modifierEmp'))

//offreemploi
const PubOffreEmp = React.lazy(() => import('./views/pages/offreemploi/PubOffreEmp'))
const ConsulterOffreEmp = React.lazy(() => import('./views/pages/offreemploi/ConsulterOffreEmp'))
const OffreEmpD = React.lazy(() => import('./views/pages/offreemploi/OffreEmpD'))
const Postuler = React.lazy(() => import('./views/pages/offreemploi/Postuler'))
const ConsulterC = React.lazy(() => import('./views/pages/offreemploi/ConsulterCandidat'))

//paiement
const ConsulterPaie=React.lazy(() => import('./views/pages/paiement/consulterFichePaie'))
const paieRH=React.lazy(() => import('./views/pages/paiement/paieRH'))

//conge 
const validConge=React.lazy(() => import('./views/pages/conge/validationConge'))
const demConge=React.lazy(() => import('./views/pages/conge/demandeConge'))
const soldeC=React.lazy(() => import('./views/pages/conge/SoldeConge'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))

const routes = [
  /*{ path: '/', exact: true, name: <Translation>{(t) => t('home')}</Translation> },*/
  {
    path: '/dashboard',
    name: <Translation>{(t) => t('Tableau De Bord')}</Translation>,
    element: Dashboard,
  },
  {
    path: '/theme',
    name: <Translation>{(t) => t('theme')}</Translation>,
    element: Colors,
    exact: true,
  },
  { path: '/theme/colors', name: <Translation>{(t) => t('colors')}</Translation>, element: Colors },
  {
    path: '/theme/typography',
    name: <Translation>{(t) => t('typography')}</Translation>,
    element: Typography,
  },
  {
    path: '/base',
    name: <Translation>{(t) => t('base')}</Translation>,
    element: Cards,
    exact: true,
  },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  {
    path: '/buttons',
    name: <Translation>{(t) => t('buttons')}</Translation>,
    element: Buttons,
    exact: true,
  },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', element: LoadingButtons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/forms',
    name: <Translation>{(t) => t('forms')}</Translation>,
    element: FormControl,
    exact: true,
  },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/multi-select', name: 'Multi Select', element: MultiSelect },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/date-picker', name: 'Date Picker', element: DatePicker },
  { path: '/forms/date-range-picker', name: 'Date Range Picker', element: DateRangePicker },
  { path: '/forms/time-picker', name: 'Time Picker', element: TimePicker },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  {
    path: '/icons',
    exact: true,
    name: <Translation>{(t) => t('icons')}</Translation>,
    element: CoreUIIcons,
  },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: <Translation>{(t) => t('notifications')}</Translation>,
    element: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  {
    path: '/plugins',
    name: <Translation>{(t) => t('plugins')}</Translation>,
    element: Calendar,
    exact: true,
  },
  {
    path: '/plugins/calendar',
    name: <Translation>{(t) => t('calendar')}</Translation>,
    element: Calendar,
  },
  {
    path: '/plugins/charts',
    name: <Translation>{(t) => t('charts')}</Translation>,
    element: Charts,
  },
  { path: '/plugins/google-maps', name: 'GoogleMaps', element: GoogleMaps },
  { path: '/smart-table', name: 'Smart Table', element: SmartTable },
  { path: '/widgets', name: <Translation>{(t) => t('widgets')}</Translation>, element: Widgets },

  //formation
  { path: '/formation', name: 'Formation', element: Formation },
  { path: '/addformation', name: 'Ajouter Formation', element: AddFormation },
  { path: '/editformation/:formationId', name: 'Modifier Formation', element: EditFormation },
  {path: '/afficherFormation', name: 'Afficher Formation', element: AffichFormation  },
  {path: '/Response/:idF', name: 'Formation Details', element: FormationDetails  },

  //employe
  { path: '/employe', name: 'Employe', element: Employe },
  { path: '/addemploye', name: 'Ajouter Employe', element: Addemploye },
  { path: '/ConsulterProfile', name: 'Profile', element: Profile },
  { path: '/ModifEmp/:id', name: 'Modifier', element: Modifier },

  // PubOffreEmp
  { path: '/PubOffreEmp', name: 'Publier Offre D\'Emploi', element: PubOffreEmp },
  { path: '/ConsulterOffreEmp', name: 'Consulter Offre D\'Emploi', element: ConsulterOffreEmp },
  { path: '/OffreEmpD/:id', name: 'Consulter Offre D\'Emploi details', element: OffreEmpD },
  { path: '/Postuler/:idOffre', name: 'Postuler Pou Un emploi', element: Postuler },
  { path: '/ConsulterCandidat', name: 'Consulter Les Candidats', element: ConsulterC },

  // Paiement
  { path: '/ConsulterFichePaie', name: 'Consulter Fiche de Paie', element: ConsulterPaie },
  { path: '/PaieRH', name: 'Calcul Paie', element: paieRH },

  //conge
  { path: '/ValidationConge', name: 'Validation Congé', element: validConge },
  { path: '/DemandeConge', name: 'Demande Congé', element: demConge },
  { path: '/ConsulterSolde', name: 'Demande Congé', element: soldeC },
  

  {
    path: '/apps',
    name: <Translation>{(t) => t('apps')}</Translation>,
    element: Invoice,
    exact: true,
  },
  { path: '/apps/invoicing', name: 'Invoice', element: Invoice, exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', element: Invoice },
  { path: '/apps/email', name: 'Email', exact: true },
  { path: '/apps/email/inbox', name: 'Inbox', exact: true },
  { path: '/apps/email/compose', name: 'Compose', exact: true },
  { path: '/apps/email/message', name: 'Message', exact: true },
]

export default routes
