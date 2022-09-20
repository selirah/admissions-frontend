import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Layout, Row, Col, Divider, Button, message, Space, Upload } from 'antd'
import { useHistory } from 'react-router-dom'
import { LetterForm } from '../components/letter/LetterForm'
import { LetterBox } from '../components/letter/LetterBox'
import { NoticeForm } from '../components/letter/NoticeForm'
import {
  SyncOutlined,
  LoadingOutlined,
  UploadOutlined,
  EditOutlined,
  NotificationOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { path } from '../helpers/path'
import { AdmissionLetter } from '../interfaces'
import { Spinner } from '../components/common/Spinner'
import {
  getLetterRequest,
  getDocsRequest,
  createRequest,
  updateRequest,
  clearBooleanStates,
  uploadLetterHeadRequest,
  uploadDocsRequest,
  createNoticeRequest,
  uploadLetterFooterRequest,
  removeLetterFooterRequest
} from '../store/letter'
import { EmptyBox } from '../components/common/EmptyBox'

const { Content } = Layout
const Letter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { school } = appSelector((state) => state.schoolStore)
  const {
    letter,
    loading,
    isSubmitting,
    success,
    page,
    docs,
    isUploadingLetterHead,
    isUploadingDocs,
    docSuccess,
    letterHeadSuccess,
    error,
    letterHeadFailure,
    docFailure,
    noticeError,
    noticeSuccess,
    submitNotice,
    noticeFailure,
    letterFooterSuccess,
    letterFooterFailure,
    isUploadingLetterFooter,
    isRemovingFooter
  } = appSelector((state) => state.letterStore)
  const [values, setValues] = useState<AdmissionLetter>({
    id: letter ? letter.id : '',
    school_id: school !== null ? parseInt(`${school.id}`) : 0,
    admission: letter ? letter.admission : '',
    notice: null,
    acceptance: letter ? letter.acceptance : '',
    created_at: letter ? letter.created_at : '',
    updated_at: letter ? letter.updated_at : ''
  })
  const history = useHistory()
  const [addLetter, setAddLetter] = useState(true)
  const [action, setAction] = useState('list')
  const [admissionLetter, setAdmissionLetter] = useState(
    letter && letter.admission ? letter.admission : ''
  )
  const [acceptanceLetter, setAcceptanceLetter] = useState(
    letter && letter.acceptance ? letter.acceptance : ''
  )
  const [notice, setNotice] = useState(
    letter && letter.notice ? letter.notice : ''
  )
  const [showNoticeModal, setShowNoticeModal] = useState(false)

  useEffect(() => {
    if (isEmpty(school)) {
      message.info(messages.setUpSchool)
      history.push(path.school)
    }
    dispatch(getLetterRequest(parseInt(`${school!.id}`)))
    dispatch(getDocsRequest(parseInt(`${school!.id}`)))
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (success && page === constants.letter) {
      switch (addLetter) {
        case true:
          message.success(messages.addAdmissionLetterSuccess, 5)
          dispatch(clearBooleanStates())
          dispatch(getLetterRequest(parseInt(`${school!.id}`)))
          setAction('list')
          break
        case false:
          message.success(messages.updateAdmissionLetterSuccess, 5)
          setAddLetter(true)
          dispatch(clearBooleanStates())
          setAction('list')
          break
      }
    }
    if (error && page === constants.letter) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }
    if (letterHeadSuccess && page === constants.letter) {
      message.success(messages.uploadLetterHeadSuccess, 5)
    } else if (letterHeadFailure && page === constants.letter) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }
    if (letterFooterSuccess && page === constants.letter) {
      message.success(messages.uploadLetterFooterSuccess, 5)
    } else if (letterFooterFailure && page === constants.letter) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }
    if (docSuccess && page === constants.letter) {
      message.success(messages.uploadDocsSuccess, 5)
    } else if (docFailure && page === constants.letter) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }

    if (noticeSuccess && page === constants.letter) {
      message.success(messages.noticeCreated, 5)
      dispatch(clearBooleanStates())
    }

    if (noticeFailure && page === constants.letter) {
      message.error(JSON.stringify(noticeError), 5)
      dispatch(clearBooleanStates())
    }
    setNotice(letter ? letter.notice : '')
  }, [
    dispatch,
    addLetter,
    docFailure,
    docSuccess,
    error,
    letterHeadFailure,
    letterHeadSuccess,
    page,
    success,
    noticeSuccess,
    noticeError,
    noticeFailure,
    letter,
    letterFooterSuccess,
    letterFooterFailure,
    school
  ])

  const beforeUpload = (file: File): boolean => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJPGorPNG) {
      message.error(messages.imagePNGorJPG, 5)
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2
    if (!isLessThan2MB) {
      message.error(messages.image2MB, 5)
    }

    return isJPGorPNG && isLessThan2MB
  }

  const onUploadLetterHead = (info: any): void => {
    const { file } = info
    const fd = new FormData()
    fd.append('letter_head', file, file.name)
    dispatch(uploadLetterHeadRequest(fd))
  }

  const onUploadLetterFooter = (info: any): void => {
    const { file } = info
    const fd = new FormData()
    fd.append('letter_footer', file, file.name)
    dispatch(uploadLetterFooterRequest(fd))
  }

  const onRemoveLetterFooter = (): void => {
    dispatch(removeLetterFooterRequest())
  }

  const onUploadDocs = (info: any): void => {
    const { fileList } = info
    const fd = new FormData()
    for (let file of fileList) {
      fd.append('documents[]', file.originFileObj, file.originFileObj.name)
    }
    dispatch(uploadDocsRequest(fd))
  }

  const onSubmit = () => {
    if (isEmpty(admissionLetter)) {
      message.error(messages.admissionLetter, 5)
    } else {
      values.admission = admissionLetter
      values.acceptance = acceptanceLetter
      if (addLetter) {
        dispatch(createRequest(values))
      } else {
        dispatch(updateRequest(values))
      }
    }
  }

  const onChange = (value: any) => {
    setAdmissionLetter(value)
  }

  const onChangeAcceptance = (value: any) => {
    setAcceptanceLetter(value)
  }

  const editLetter = () => {
    setAdmissionLetter(letter!.admission)
    setAcceptanceLetter(letter!.acceptance)
    setValues(letter!)
    setAddLetter(false)
    setAction('edit')
  }

  const onCancelClick = () => {
    setAddLetter(true)
    setAction('list')
  }

  const onToggleNoticeModal = () => {
    setShowNoticeModal(!showNoticeModal)
  }

  const onChangeNotice = (value: any) => {
    setNotice(value)
  }

  const onSubmitNotice = () => {
    if (isEmpty(notice)) {
      message.error(messages.admissionLetter, 5)
    } else {
      values.notice = notice
      dispatch(createNoticeRequest(values))
    }
  }

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }

  if (!loading && !letter && action === 'list') {
    content = (
      <EmptyBox
        header="Admission Letter"
        description="Admission Letter is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAction('add')}
        >
          Add Letter
        </Button>
      </EmptyBox>
    )
  } else if (action === 'add' && !loading) {
    content = (
      <LetterForm
        letter={admissionLetter}
        onChange={onChange}
        isSubmit={isSubmitting}
        onSubmit={onSubmit}
        onCancelClick={onCancelClick}
        acceptance={acceptanceLetter}
        onChangeAcceptance={onChangeAcceptance}
      />
    )
  } else if (action === 'edit') {
    content = (
      <LetterForm
        letter={admissionLetter}
        onChange={onChange}
        isSubmit={isSubmitting}
        onSubmit={onSubmit}
        onCancelClick={onCancelClick}
        acceptance={acceptanceLetter}
        onChangeAcceptance={onChangeAcceptance}
      />
    )
  } else if (letter && action === 'list') {
    content = (
      <LetterBox
        letter={letter!}
        docs={docs}
        onRemove={onRemoveLetterFooter}
        isRemove={isRemovingFooter}
      />
    )
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Letter</title>
      </Helmet>
      <Content className="site-layout-background site-content">
        <Row>
          <Col span={24} md={24} xs={24} sm={24}>
            <Space>
              <Upload
                name="file"
                className="file-uploader"
                beforeUpload={beforeUpload}
                customRequest={onUploadLetterHead}
                showUploadList={false}
                accept={'.jpg, .png'}
              >
                <Button
                  type="primary"
                  disabled={isUploadingLetterHead}
                  icon={
                    isUploadingLetterHead ? (
                      <LoadingOutlined />
                    ) : (
                      <UploadOutlined />
                    )
                  }
                >
                  {isUploadingLetterHead
                    ? 'Uploading..'
                    : 'Upload Letter Head (< 2MB)'}
                </Button>
              </Upload>
              <Upload
                name="file"
                className="file-uploader"
                beforeUpload={beforeUpload}
                customRequest={onUploadLetterFooter}
                showUploadList={false}
                accept={'.jpg, .png'}
              >
                <Button
                  type="default"
                  disabled={isUploadingLetterHead}
                  icon={
                    isUploadingLetterHead ? (
                      <LoadingOutlined />
                    ) : (
                      <UploadOutlined />
                    )
                  }
                >
                  {isUploadingLetterFooter
                    ? 'Uploading..'
                    : 'Upload Letter Footer (< 2MB)'}
                </Button>
              </Upload>
              <Upload
                name="file"
                className="file-uploader"
                onChange={onUploadDocs}
                showUploadList={false}
                accept={'*'}
                multiple
              >
                <Button
                  type="primary"
                  disabled={isUploadingDocs}
                  icon={
                    isUploadingDocs ? <LoadingOutlined /> : <UploadOutlined />
                  }
                  danger
                >
                  {isUploadingDocs ? 'Uploading..' : 'Upload Other Docs'}
                </Button>
              </Upload>
              {letter ? (
                <Button
                  type="ghost"
                  icon={<EditOutlined />}
                  onClick={() => editLetter()}
                >
                  Edit Letter
                </Button>
              ) : null}
              {letter && school!.fee_payment === 1 ? (
                <Button
                  type="primary"
                  icon={<NotificationOutlined />}
                  onClick={() => onToggleNoticeModal()}
                  className="success"
                >
                  Add Fee Notice Letter
                </Button>
              ) : null}
            </Space>
            <Button
              type="default"
              icon={<SyncOutlined />}
              style={{ float: 'right' }}
              onClick={() =>
                dispatch(getLetterRequest(parseInt(`${school!.id}`)))
              }
            >
              Refresh
            </Button>
          </Col>
          <Divider />
          <Col span={24}>{content}</Col>
          <NoticeForm
            isSubmit={submitNotice}
            notice={notice}
            onChange={onChangeNotice}
            onSubmit={onSubmitNotice}
            onToggleNoticeModal={onToggleNoticeModal}
            showNoticeModal={showNoticeModal}
          />
        </Row>
      </Content>
    </React.Fragment>
  )
}

export default Letter
