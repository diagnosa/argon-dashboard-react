import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Modal,
  Row,
} from 'reactstrap'
import { baseApi } from 'variables/api'

const UpdateBlog = (props) => {
  const { idRows, modalUbah, setModalUbah, handleFetchData } = props
  const [inputData, setInputData] = useState({
    title: '',
    description: '',
  })

  const handleDefaultData = () => {
    axios
      .get(`${baseApi}/blog/${idRows}`)
      .then((response) => {
        if (response?.status === 200) {
          setInputData(response?.data?.blog)
        }
      })
      .catch((err) => console.log(err))
  }

  const handleInputData = ({ target: { name, value } }) => {
    setInputData({
      ...inputData,
      [name]: value,
    })
  }

  const { image, setImages } = useState([])

  const handleInputChange = ({
    target: {
      file: [imageFile],
    },
  }) => {
    setImages(imageFile)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', inputData.title)
    formData.append('description', inputData.description)
    formData.append('photo', image)
    formData.append('_method', 'PUT')

    axios
      .post(`${baseApi}/blog/${idRows}`, formData)
      .then((response) => {
        if (response?.status === 200) {
          alert('berhasil update...')
          handleFetchData()
          setModalUbah(false)
        }
      })
      .catch((err) => {
        if (err) alert(err?.response?.error)
      })
  }

  useEffect(() => {
    handleDefaultData()
  }, [])

  return (
    <Modal
      isOpen={modalUbah}
      toggle={() => setModalUbah(!modalUbah)}
      className='modal-lg'
    >
      <Form onSubmit={onSubmit}>
        <div className='modal-header'>
          <h5 className='modal-title' id='exampleModalLabel'>
            Modal title
          </h5>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={() => setModalUbah(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='modal-body'>
          <Row>
            <Col md='12'>
              <FormGroup>
                <Input
                  id='title'
                  placeholder='Title'
                  type='text'
                  value={inputData?.title}
                  name='title'
                  onChange={handleInputData}
                />
              </FormGroup>
            </Col>
            <Col md='12'>
              <FormGroup>
                <Input
                  id='description'
                  placeholder='Description'
                  type='textarea'
                  rows={3}
                  value={inputData?.description}
                  name='description'
                  onChange={handleInputData}
                />
              </FormGroup>
            </Col>
            <Col md='12'>
              <CustomInput
                id='photo-1'
                type='file'
                name='photo'
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </div>
        <div className='modal-footer'>
          <Button
            color='secondary'
            data-dismiss='modal'
            type='button'
            onClick={() => setModalUbah(false)}
          >
            Close
          </Button>
          <Button color='primary' type='submit'>
            Ubah
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default UpdateBlog
