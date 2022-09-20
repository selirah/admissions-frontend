import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Divider, message } from 'antd'
import {
  getClientsRequest,
  impersonateRequest,
  clearBooleanStates,
  switchMenu
} from '../store/admin'
import { clearFees } from '../store/fees'
import { clearLetter } from '../store/letter'
import { clearProgrammes } from '../store/programmes'
import { clearSchool } from '../store/school'
import { clearStudents } from '../store/students'
import { clearTransfers } from '../store/transfers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import { Spinner } from '../components/common/Spinner'
import { getCurrentAcademicYears } from '../helpers/functions'
import { academicYears } from '../helpers/constants'
import { EmptyBox } from '../components/common/EmptyBox'
import { Client } from '../interfaces'
import { AdminPane } from '../components/admin/AdminPane'
import { ClientsLists } from '../components/admin/ClientsLists'
import { constants } from '../helpers/constants'
import { path } from '../helpers/path'

const { currentYear, nextYear } = getCurrentAcademicYears()

const { Content } = Layout

const Admin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const adminStore = appSelector((state) => state.adminStore)
  const { user } = appSelector((state) => state.auth)
  const [clients, setClients] = useState<Client[]>([])
  const [academicYear, setAcademicYear] = useState(currentYear + '-' + nextYear)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const { clients, loading } = adminStore
    if (isEmpty(clients) && !loading) {
      dispatch(getClientsRequest(academicYear))
    }
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const {
      clients,
      loading,
      impersonateSuccess,
      impersonateFailure,
      page,
      error
    } = adminStore
    setClients(clients)
    setLoading(loading)
    if (impersonateSuccess && page === constants.admin) {
      dispatch(clearSchool())
      dispatch(clearProgrammes())
      dispatch(clearLetter())
      dispatch(clearFees())
      dispatch(clearStudents())
      dispatch(clearTransfers())
      dispatch(clearBooleanStates())
      dispatch(switchMenu(path.home))
      history.push(path.home)
    }
    if (impersonateFailure && page === constants.admin) {
      message.error(JSON.stringify(error))
      dispatch(clearBooleanStates())
    }
  }, [adminStore, dispatch, history])

  const handleChange = (value: string) => {
    setAcademicYear(value)
    dispatch(getClientsRequest(value))
  }

  const dispatchRefresh = () => {
    dispatch(getClientsRequest(academicYear))
  }

  const onSearch = (value: string) => {
    let filtered: Client[] = []
    if (value) {
      filtered = adminStore.clients.filter((s) => {
        const name = s.school_name.toLowerCase()
        const region = s.region.toLowerCase()
        const town = s.region.toLowerCase()
        const phone = s.phone
        const category = s.category.toLowerCase()
        return (
          name.includes(value) ||
          region.includes(value) ||
          town.includes(value) ||
          phone.includes(value) ||
          category.includes(value)
        )
      })
    } else {
      filtered = adminStore.clients
    }
    setClients(filtered)
  }

  const impersonateClient = (client: Client) => {
    const payload = {
      id: client.user_id,
      admin_id: user!.id,
      action: 'client'
    }
    dispatch(impersonateRequest(payload))
  }

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }

  if (!loading && isEmpty(adminStore.clients)) {
    content = (
      <EmptyBox
        header="Clients"
        description="Clients is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      />
    )
  }

  if (!loading && !isEmpty(adminStore.clients)) {
    content = (
      <ClientsLists clients={clients} impersonateClient={impersonateClient} />
    )
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Clients</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <AdminPane
                academicYear={academicYear}
                academicYears={academicYears}
                dispatchRefresh={dispatchRefresh}
                handleChange={handleChange}
                onSearch={onSearch}
              />
              <Divider />
            </Row>
            {content}
          </div>
        </Content>
      </div>
    </React.Fragment>
  )
}

export default Admin
