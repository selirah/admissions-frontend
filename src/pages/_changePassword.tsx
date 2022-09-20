import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Layout,
  Row,
  Col,
  Divider,
  Button,
  message,
  Space,
  Upload,
  Form
} from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { changePasswordRequest } from '../store/auth'
import { constants } from '../helpers/constants'
import { User } from '../interfaces'
import { messages } from '../helpers/messages'

const { Content } = Layout

const ChangePassword: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Change Password</title>
      </Helmet>
    </React.Fragment>
  )
}

export default ChangePassword
