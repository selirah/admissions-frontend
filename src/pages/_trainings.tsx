import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Layout, Row, Divider, Button, message, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import { Spinner } from '../components/common/Spinner'
import { EmptyBox } from '../components/common/EmptyBox'
import {
  getTrainingsRequest,
  createTrainingRequest,
  updateTrainingRequest,
  deleteTrainingRequest,
  clearBooleanStates,
  getTrainingListsRequest,
  exportRequest
} from '../store/trainings'
import { Training, TrainingList as TL } from '../interfaces'
import { years } from '../helpers/constants'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { TrainingPane } from '../components/trainings/TrainingPane'
import { TrainingForm } from '../components/trainings/TrainingForm'
import { TrainingList } from '../components/trainings/TrainingList'
import { Lists } from '../components/trainings/Lists'
import { Reps } from '../components/trainings/Reps'
import moment from 'moment'

const currentYear = new Date().getFullYear()
const { Content } = Layout

const Trainings: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const trainingsStore = appSelector((state) => state.trainingsStore)
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(false)
  const [addTraining, setAddTraining] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [year, setYear] = useState(`${currentYear}`)
  const [form] = Form.useForm()
  const [showTrainingFormModal, setShowTrainingFormModal] = useState(false)
  const [values] = useState<Training>({
    created_at: '',
    date_time: '',
    id: 0,
    list_total: 0,
    location: '',
    updated_at: '',
    year: year,
    date: '',
    key: 0
  })
  const [showListModal, setShowListModal] = useState(false)
  const [lists, setLists] = useState<TL[]>([])
  const [listsLoading, setListsLoading] = useState(false)
  const [showRepsModal, setShowRepsModal] = useState(false)
  const [list, setList] = useState<TL | null>(null)
  const [id, setId] = useState(0)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const { trainings, loading } = trainingsStore
    if (isEmpty(trainings) && !loading) {
      dispatch(getTrainingsRequest(values))
    }
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const {
      trainings,
      loading,
      isSubmitting,
      success,
      deleteSuccess,
      failure,
      page,
      error,
      listsLoading,
      lists,
      exporting
    } = trainingsStore
    setTrainings(trainings)
    setLoading(loading)
    setIsSubmit(isSubmitting)
    setListsLoading(listsLoading)
    setLists(lists)
    setExporting(exporting)

    if (success && page === constants.trainings) {
      switch (addTraining) {
        case true:
          message.success(messages.trainingCreated, 5)
          form.resetFields()
          dispatch(clearBooleanStates())
          break
        case false:
          message.success(messages.trainingUpdated, 5)
          dispatch(clearBooleanStates())
          break
      }
    }
    if (deleteSuccess && page === constants.trainings) {
      message.success(messages.trainingDeleted, 5)
      dispatch(clearBooleanStates())
    }

    if (failure && page === constants.trainings) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }
  }, [trainingsStore, addTraining, dispatch, form])

  const handleChange = (value: string) => {
    setYear(value)
    values.year = value
    dispatch(getTrainingsRequest(values))
  }

  const dispatchRefresh = (values: Training) => {
    dispatch(getTrainingsRequest(values))
  }

  const onShowFormModal = (
    isAddTraining: boolean,
    training: Training = values
  ) => {
    setShowTrainingFormModal(true)
    setAddTraining(isAddTraining)
    form.setFieldsValue(training)
  }

  const onCloseModal = () => {
    dispatch(clearBooleanStates())
    setShowTrainingFormModal(false)
  }

  const onDateSearch = (value: any) => {
    const date = moment(value._d).format('YYYY-MM-DD')
    let filtered: Training[] = []
    if (value) {
      trainingsStore.trainings.map((t) => {
        const d = moment(t.date_time).format('YYYY-MM-DD')
        if (d === date) {
          filtered.push(t)
        }
        return filtered
      })
    } else {
      filtered = trainingsStore.trainings
    }
    setTrainings(filtered)
  }

  const onSearch = (value: string) => {
    let filtered: Training[] = []
    if (value) {
      filtered = trainingsStore.trainings.filter((t) => {
        const location = t.location.toLowerCase()
        return location.includes(value)
      })
    } else {
      filtered = trainingsStore.trainings
    }
    setTrainings(filtered)
  }

  const onSubmit = (values: Training) => {
    if (addTraining) {
      values.date_time = moment(values.date._d).format('YYYY-MM-DD HH:mm:ss')
      dispatch(createTrainingRequest(values))
    } else {
      values.date_time = moment(values.date._d).format('YYYY-MM-DD HH:mm:ss')
      dispatch(updateTrainingRequest(values))
    }
  }

  const deleteTraining = (training: Training) => {
    dispatch(deleteTrainingRequest(training.id))
  }

  const handleTrainingAction = (training: Training, action: string) => {
    setId(training.id)
    const payload = {
      training_id: training.id,
      year: training.year,
      type: action
    }
    dispatch(exportRequest(payload))
  }

  const onShowListModal = (training: Training) => {
    setShowListModal(true)
    dispatch(getTrainingListsRequest(training))
  }

  const onCloseListModal = () => {
    setShowListModal(false)
  }

  const onShowRepsModal = (list: TL) => {
    setList(list)
    setShowRepsModal(true)
  }

  const onCloseRepsModal = () => {
    setShowRepsModal(false)
  }

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }

  if (!loading && isEmpty(trainingsStore.trainings)) {
    content = (
      <EmptyBox
        header="Trainings"
        description="Trainings is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onShowFormModal(true)}
        >
          Create Training
        </Button>
      </EmptyBox>
    )
  }

  if (!loading && !isEmpty(trainingsStore.trainings)) {
    content = (
      <TrainingList
        deleteTraining={deleteTraining}
        handleTrainingAction={handleTrainingAction}
        onShowFormModal={onShowFormModal}
        trainings={trainings}
        onShowListModal={onShowListModal}
        exporting={exporting}
        id={id}
      />
    )
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Trainings</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <TrainingPane
                dispatchRefresh={dispatchRefresh}
                handleChange={handleChange}
                onDateSearch={onDateSearch}
                onSearch={onSearch}
                onShowFormModal={onShowFormModal}
                values={values}
                year={year}
                years={years}
              />
              <Divider />
              <TrainingForm
                addTraining={addTraining}
                isSubmit={isSubmit}
                onCloseModal={onCloseModal}
                onSubmit={onSubmit}
                showTrainingFormModal={showTrainingFormModal}
                values={values}
                Form={Form}
                form={form}
              />
              <Lists
                lists={lists}
                loading={listsLoading}
                onCloseListModal={onCloseListModal}
                showListModal={showListModal}
                onShowRepsModal={onShowRepsModal}
              />
              {list ? (
                <Reps
                  list={list}
                  onCloseRepsModal={onCloseRepsModal}
                  showRepsModal={showRepsModal}
                />
              ) : null}
            </Row>
            {content}
          </div>
        </Content>
      </div>
    </React.Fragment>
  )
}

export default Trainings
