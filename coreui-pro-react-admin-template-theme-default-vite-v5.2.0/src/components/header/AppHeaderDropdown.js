import React ,{ useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post('http://localhost:8082/api/auth/logout', { refreshToken });
      console.log('Logout successful:', response.data);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    axios
      .get('http://localhost:8082/api/employees/profileEmp')
      .then((response) => {
        setProfile(response.data);
        setError(false);
      })
      .catch((error) => {
        console.error('Error fetching employee profile:', error);
        setError(true);
      });
  }, [navigate]);

  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar 
          src={profile?.img ? `http://localhost:8082/uploads/${profile.img}` : avatar8} 
          size="md" 
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary text-body-secondary fw-semibold my-2">
          {t('Account')}
        </CDropdownHeader>
        <CDropdownItem href="/#/ConsulterProfile">
          <CIcon icon={cilUser} className="me-2" />
          {t('profile')}
        </CDropdownItem>
        <CDropdownItem href="#" onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          {t('logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;