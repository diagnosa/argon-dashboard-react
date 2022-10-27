import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, CustomInput, Form, Modal, Row } from 'reactstrap'
import { baseApi } from 'variables/api'

const Upload = (props) => {
  const { idRows, modalUpload, setModalUpload, handleFetchData } = props

  const [image, setImages] = useState([])

  const handleInputChange = ({
    target: {
      files: [imageFile],
    },
  }) => {
    setImages(imageFile)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', image)
    // formData.append('_method', 'PUT')

    axios
      .post(`${baseApi}/blog/${idRows}/upload-photo`, formData)
      .then((response) => {
        if (response?.status === 200) {
          alert('berhasil upload...')
          handleFetchData()
          setModalUpload(false)
        }
      })
      .catch((err) => {
        if (err) alert(err?.response?.error)
      })
  }

  return (
    <Modal
      isOpen={modalUpload}
      toggle={() => setModalUpload(!modalUpload)}
      className='modal-lg'
    >
      <Form onSubmit={onSubmit}>
        <div className='modal-header'>
          <h5 className='modal-title' id='uploadModalLabel'>
            Upload Photo
          </h5>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={() => setModalUpload(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='modal-body'>
          <Row>
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
            onClick={() => setModalUpload(false)}
          >
            Close
          </Button>
          <Button color='primary' type='submit'>
            Upload
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default Upload
