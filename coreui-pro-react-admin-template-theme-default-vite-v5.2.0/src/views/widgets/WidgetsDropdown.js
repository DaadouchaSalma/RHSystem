import React, { useEffect, useRef,useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import axios from "axios";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsC,
} from '@coreui/react-pro'
import { cilBriefcase, cilBuilding, cilChartPie,cilGroup,cilLayers,cilPeople,cilUser } from '@coreui/icons'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const { t } = useTranslation()
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const [statistics, setStatistics] = useState({
    numberOfEmployees: 0,
    numberOfJobOffers: 0,
    numberOfDepartments: 0,
  })

  useEffect(() => {
    // Récupérer les statistiques depuis l'API
    axios.get('http://localhost:8082/api/statistics')
      .then((response) => {
        setStatistics(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des statistiques:', error)
      })
  }, [])

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={7} xl={5} xxl={4}>
        <CWidgetStatsC
          className="mb-3 widgetkpi_2"
          icon={<CIcon icon={cilGroup} height={36} />}
          color="primary"
          inverse
          progress={{ value: statistics.numberOfEmployees }}
          title="Employés"
          value={<><h3>Nombre d'Employés</h3>{statistics.numberOfEmployees}</>}
        />
      </CCol>
      <CCol sm={7} xl={5} xxl={4}>
        <CWidgetStatsC
          className="mb-3 widgetkpi"
          icon={<CIcon icon={cilBriefcase} height={36} />}
          color="primary"
          inverse
          progress={{ value: statistics.numberOfJobOffers }}
          title="Offres d'Emploi"
          value={<><h3>Nombre d'Offre d'Emploi</h3>{statistics.numberOfJobOffers}</>}
        />
      </CCol>
      <CCol sm={7} xl={5} xxl={4}>
        <CWidgetStatsC
          className="mb-3 widgetkpi_3"
          icon={<CIcon icon={cilBuilding} height={36} />}
          color="primary"
          inverse
          progress={{ value: 5 }}
          value={<><h3>Nombre de Départements</h3> 5</>}
          title="Départements"
        />
      </CCol>
     {/* <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger-gradient"
          value={
            <>
              44K{' '}
              <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title={t('sessions')}
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>{t('action')}</CDropdownItem>
                <CDropdownItem>{t('anotherAction')}</CDropdownItem>
                <CDropdownItem>{t('somethingElseHere')}</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  t('january'),
                  t('february'),
                  t('march'),
                  t('april'),
                  t('may'),
                  t('june'),
                  t('july'),
                  t('august'),
                  t('september'),
                  t('october'),
                  t('november'),
                  t('december'),
                  t('january'),
                  t('february'),
                  t('march'),
                  t('april'),
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>*/}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
