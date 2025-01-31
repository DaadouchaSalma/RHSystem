import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { CSpinner, useColorModes } from '@coreui/react-pro'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import Services from './views/pages/page500/Services'
import OffreEmpD from './views/pages/offreemploi/OffreEmpD'
import Accueil from './views/pages/page500/Accueil'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/register'))
//const Page404 = React.lazy(() => import('./views/pages/formation/formation'))
const ConsulterOffreEmp = React.lazy(() => import('./views/pages/offreemploi/ConsulterOffreEmp'))
const Postuler = React.lazy(() => import('./views/pages/offreemploi/Postuler'))
//
const Page500 = React.lazy(() => import('./views/pages/page500/Services'))

// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))

const App = () => {
  
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const { isColorModeSet, setColorMode } = useColorModes(
    'coreui-pro-react-admin-template-theme-default',
  )
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
         {/*} <Route exact path="/register" name="Register Page" element={<Register />} /> */}
          <Route path="/register" name="Register Page" element={<Register />} />
          {/* Route pour la page 404
          <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          <Route exact path="/services" name="Page 500" element={<Services />} />
          <Route exact path='/ConsulterOffreEmp' name='ConsulterOffreEmp' element={<ConsulterOffreEmp/>} />
          <Route exact path='/OffreEmpD/:id' name='OffreEmp' element={<OffreEmpD/>} />
          <Route exact path='/accueil' name='Accueil' element={<Accueil/>} />
          <Route exact path='/Postuler/:idOffre' name='Postuler' element={<Postuler/>} />
          <Route path="/apps/email/*" name="Email App" element={<EmailApp />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
