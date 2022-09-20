import React from 'react'
import { Quill } from 'react-quill'
import { Tag, Popover } from 'antd'

const placeholders = {
  app_number: '[app_number]',
  name: '[name]',
  date: '[date]',
  programme: '[programme]',
  phone: '[phone]',
  fee: '[fee]',
  hall: '[hall]',
  academic_year: '[academic_year]',
  acceptance_header: '[acceptance_header]'
}

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
)

const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
)

const AppNumber = () => (
  <Popover
    title="Application Number"
    content="If you want the student application number to appear."
  >
    <Tag color="blue" style={{ cursor: 'pointer', fontWeight: 700 }}>
      app
    </Tag>
  </Popover>
)

const AcademicYear = () => (
  <Popover title="Academic Year" content="Academic year of student admission">
    <Tag color="green" style={{ cursor: 'pointer', fontWeight: 700 }}>
      aca
    </Tag>
  </Popover>
)

const Name = () => (
  <Popover title="Name" content="Name of the student.">
    <Tag color="geekblue" style={{ cursor: 'pointer', fontWeight: 700 }}>
      nam
    </Tag>
  </Popover>
)

const Date = () => (
  <Popover title="Date" content="Date the student will print the letter.">
    <Tag color="purple" style={{ cursor: 'pointer', fontWeight: 700 }}>
      dat
    </Tag>
  </Popover>
)

const Programme = () => (
  <Popover title="Programme" content="Programme of the student.">
    <Tag color="error" style={{ cursor: 'pointer', fontWeight: 700 }}>
      pro
    </Tag>
  </Popover>
)

const Phone = () => (
  <Popover title="Phone" content="Phone number of the student.">
    <Tag color="orange" style={{ cursor: 'pointer', fontWeight: 700 }}>
      pho
    </Tag>
  </Popover>
)

const Fee = () => (
  <Popover
    title="Fee"
    content="Fees of the student. This is not compulsory as fees can be fixed for all students."
  >
    <Tag color="success" style={{ cursor: 'pointer', fontWeight: 700 }}>
      fee
    </Tag>
  </Popover>
)

const Hall = () => (
  <Popover title="Hall" content="Hall of the student">
    <Tag color="magenta" style={{ cursor: 'pointer', fontWeight: 700 }}>
      hal
    </Tag>
  </Popover>
)

function undoChange() {
  this.quill.history.undo()
}

function redoChange() {
  this.quill.history.redo()
}

function insertAppNumber() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.app_number)
  this.quill.setSelection(cursorPosition + placeholders.app_number.length)
}

function insertAcademicYear() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.academic_year)
  this.quill.setSelection(cursorPosition + placeholders.academic_year.length)
}

function insertName() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.name)
  this.quill.setSelection(cursorPosition + placeholders.name.length)
}

function insertDate() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.date)
  this.quill.setSelection(cursorPosition + placeholders.date.length)
}

function insertProgramme() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.programme)
  this.quill.setSelection(cursorPosition + placeholders.programme.length)
}

function insertPhone() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.phone)
  this.quill.setSelection(cursorPosition + placeholders.phone.length)
}

function insertFee() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.fee)
  this.quill.setSelection(cursorPosition + placeholders.fee.length)
}

function insertHall() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, placeholders.hall)
  this.quill.setSelection(cursorPosition + placeholders.hall.length)
}

const Size = Quill.import('formats/size')
Size.whitelist = ['extra-small', 'small', 'medium', 'large']
Quill.register(Size, true)

const Font = Quill.import('formats/font')
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida'
]
Quill.register(Font, true)

export const formats2 = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block'
]

export const modules2 = {
  toolbar: {
    container: '#toolbar2',
    handlers: {
      undo: undoChange,
      redo: redoChange,
      insertAppNumber: insertAppNumber,
      insertAcademicYear: insertAcademicYear,
      insertName: insertName,
      insertDate: insertDate,
      insertProgramme: insertProgramme,
      insertPhone: insertPhone,
      insertFee: insertFee,
      insertHall: insertHall
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
}

export const QuillToolbar = () => (
  <div id="toolbar2">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    {/* <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span> */}
    {/* <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span> */}
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertAppNumber">
        <AppNumber />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertAcademicYear">
        <AcademicYear />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertName">
        <Name />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertDate">
        <Date />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertProgramme">
        <Programme />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertPhone">
        <Phone />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertFee">
        <Fee />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertHall">
        <Hall />
      </button>
    </span>
  </div>
)

export default QuillToolbar
