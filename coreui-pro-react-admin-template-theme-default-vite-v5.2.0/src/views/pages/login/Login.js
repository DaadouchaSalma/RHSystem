import React, { useState } from 'react'
import {useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8082/api/auth/signin', {
        mail,
        password,
      })

      const { token, roles, refreshToken } = response.data
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('role', roles)
        localStorage.setItem('refreshToken', refreshToken)

        console.log('Login successful:', response.data)
        const role = localStorage.getItem('role')
        // Redirect based on role
        if (role.includes('RH')) {
          navigate('/dashboard') // Redirect to /employe if role is 'RH'
        } else if (role.includes('EMPLOYE')) {
          navigate('/formation') // Redirect to /formation if role is 'EMPLOYE'
        } else {
          console.warn('No matching role found for redirection')
        }
      } else {
        console.error('Login response does not include a token')
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
      alert('Login failed. Please check your credentials and try again.')
    }
  }

  useEffect(() => {
    // Vérifier si un message est présent dans le stockage
    const toastMessage = localStorage.getItem('toastMessage');
    console.log(toastMessage)
    console.log("toast")
    if (toastMessage) {
      
        toast.warning('🔒 Vous devez être connecté pour accéder à cette page.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Supprimer le message pour éviter les répétitions
        localStorage.removeItem('toastMessage');
    }
}, []);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="username"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton  className="px-4" type="submit" style={{ backgroundColor:"#212631 ",color:"white"}}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" style={{ color:"#212631"}}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: '44%' , backgroundColor:"#212631 ",display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CCardBody >
                <CImage  src='src\assets\images\logo_unity-removebg_2.png' height={100}  style={{ display: 'block', marginTop:"50px" }}></CImage>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

