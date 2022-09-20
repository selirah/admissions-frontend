import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Divider, Button, message, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import { Spinner } from '../components/common/Spinner'
import {
  getTransfersRequest,
  createRequest,
  deleteRequest,
  clearBooleanStates,
  transferActionRequest,
  exportTransfersRequest
} from '../store/transfers'
import { getProgrammesRequest } from '../store/programmes'
import { EmptyBox } from '../components/common/EmptyBox'
import { Programme, Transfer } from '../interfaces'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { path } from '../helpers/path'
import { academicYears } from '../helpers/constants'
import { getCurrentAcademicYears } from '../helpers/functions'
import { TransferPane } from '../components/transfers/TransferPane'
import { TransferForm } from '../components/transfers/TransferForm'
import { TransfersList } from '../components/transfers/TransfersList'

const { currentYear, nextYear } = getCurrentAcademicYears()

const { Content } = Layout

const Transfers = () => {
  const dispatch: AppDispatch = useDispatch()
  const transfersStore = appSelector((state) => state.transfersStore)
  const { programmes } = appSelector((state) => state.programmesStore)
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(false)
  const [showTransferFormModal, setShowTransferFormModal] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const { school } = appSelector((state) => state.schoolStore)
  const [academicYear, setAcademicYear] = useState(currentYear + '-' + nextYear)
  const [form] = Form.useForm()
  const history = useHistory()
  const [performAction, setPerformAction] = useState(false)
  const values = {
    application_number: '',
    programme_id: '',
    school_id: school!.id,
    academic_year: academicYear
  }
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    if (isEmpty(school)) {
      message.info(messages.setUpSchool)
      history.push(path.school)
    }
    const payload = {
      school_id: school!.id,
      academic_year: academicYear
    }
    dispatch(getTransfersRequest(payload))
    if (isEmpty(programmes)) {
      const values: Programme = {
        id: '',
        school_id: school!.id,
        programme: '',
        academic_year: academicYear,
        total: '',
        created_at: '',
        updated_at: '',
        key: ''
      }
      dispatch(getProgrammesRequest(values))
    }
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const {
      transfers,
      loading,
      isSubmitting,
      success,
      deleteSuccess,
      failure,
      page,
      error,
      performAction,
      actionSuccess,
      actionFailure,
      exporting,
      exportFailure
    } = transfersStore
    setTransfers(transfers)
    setLoading(loading)
    setIsSubmit(isSubmitting)
    setPerformAction(performAction)
    setExporting(exporting)

    if (success && page === constants.transfers) {
      message.success(messages.addTransferSuccess, 5)
      form.resetFields()
      dispatch(clearBooleanStates())
    }

    if (deleteSuccess && page === constants.transfers) {
      message.success(messages.deleteTransferSuccess, 5)
      dispatch(clearBooleanStates())
    }

    if (failure && page === constants.transfers) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }

    if (actionSuccess && page === constants.transfers) {
      message.success(messages.transferAction, 5)
      dispatch(clearBooleanStates())
      const payload = {
        school_id: school!.id,
        academic_year: academicYear
      }
      dispatch(getTransfersRequest(payload))
    }

    if (actionFailure && page === constants.transfers) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }

    if (exportFailure && page === constants.transfers) {
      message.error(JSON.stringify(error), 10)
      dispatch(clearBooleanStates())
    }
  }, [transfersStore, dispatch, form, academicYear, school])

  const toggleModal = () => {
    dispatch(clearBooleanStates())
    setShowTransferFormModal(!showTransferFormModal)
  }

  const dispatchRefresh = () => {
    const payload = {
      school_id: school!.id,
      academic_year: academicYear
    }
    dispatch(getTransfersRequest(payload))
  }

  const handleAction = (transfer: Transfer, action: string) => {
    const payload = {
      id: transfer.id,
      action: action
    }
    dispatch(transferActionRequest(payload))
  }

  const handleChange = (value: string) => {
    setAcademicYear(value)
    const payload = {
      school_id: school!.id,
      academic_year: value
    }
    dispatch(getTransfersRequest(payload))
  }

  const onSubmit = (values: any) => {
    dispatch(createRequest(values))
  }

  const onDeleteTransfer = (transfer: Transfer) => {
    dispatch(deleteRequest(transfer.id))
  }

  const onSearch = (value: string) => {
    let filtered: Transfer[] = []
    if (value) {
      filtered = transfersStore.transfers.filter((s) => {
        const surname = s.surname.toLowerCase()
        const othernames = s.other_names.toLowerCase()
        const appNo = s.application_number
        const phone = s.phone
        const currentSchool = s.source_school_name.toLowerCase()
        const destinationSchool = s.destination_school_name.toLowerCase()
        const currentProgramme = s.source_programme_name.toLowerCase()
        const destinationProgramme = s.destination_programme_name.toLowerCase()
        return (
          surname.includes(value) ||
          othernames.includes(value) ||
          appNo.includes(value) ||
          phone.includes(value) ||
          currentSchool.includes(value) ||
          destinationSchool.includes(value) ||
          currentProgramme.includes(value) ||
          destinationProgramme.includes(value)
        )
      })
    } else {
      filtered = transfersStore.transfers
    }
    setTransfers(filtered)
  }

  const onStatusSearch = (value: number) => {
    let filtered: Transfer[] = []
    if (value) {
      transfersStore.transfers.map((t) => {
        if (t.status === value) {
          filtered.push(t)
        }
        return filtered
      })
    } else {
      filtered = transfersStore.transfers
    }
    setTransfers(filtered)
  }

  const onRequestSearch = (value: string) => {
    let filtered: Transfer[] = []
    if (value) {
      if (value === 'mine') {
        transfersStore.transfers.map((t) => {
          if (t.destination_school === school!.id) {
            filtered.push(t)
          }
          return filtered
        })
      }
      if (value === 'others') {
        transfersStore.transfers.map((t) => {
          if (t.destination_school !== school!.id) {
            filtered.push(t)
          }
          return filtered
        })
      }
    } else {
      filtered = transfersStore.transfers
    }
    setTransfers(filtered)
  }

  const handleExport = () => {
    const payload = {
      academic_year: academicYear,
      school_id: school!.id
    }
    dispatch(exportTransfersRequest(payload))
  }

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }
  if (!loading && isEmpty(transfersStore.transfers)) {
    content = (
      <EmptyBox
        header="Transfers"
        description="Transfers is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => toggleModal()}
        >
          Add Transfer Request
        </Button>
      </EmptyBox>
    )
  }

  if (!loading && !isEmpty(transfersStore.transfers)) {
    content = (
      <TransfersList
        deleteTransfer={onDeleteTransfer}
        handleAction={handleAction}
        transfers={transfers}
        schoolId={school!.id}
        performAction={performAction}
      />
    )
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Transfers</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <TransferPane
                academicYear={academicYear}
                academicYears={academicYears}
                dispatchRefresh={dispatchRefresh}
                handleChange={handleChange}
                toggleModal={toggleModal}
                onSearch={onSearch}
                onStatusSearch={onStatusSearch}
                onRequestSearch={onRequestSearch}
                handleExport={handleExport}
                exporting={exporting}
                transfers={transfers}
                school={school!}
              />
              <Divider />
              <TransferForm
                Form={Form}
                form={form}
                isSubmit={isSubmit}
                onSubmit={onSubmit}
                programmes={programmes}
                showTransferFormModal={showTransferFormModal}
                toggleModal={toggleModal}
                values={values}
              />
            </Row>
            {content}
          </div>
        </Content>
      </div>
    </React.Fragment>
  )
}

export default Transfers
