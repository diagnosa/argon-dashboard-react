import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from 'reactstrap'
import { baseApi } from 'variables/api'
import ListBlog from './ListBlog'

const App = () => {
  const [listBlog, setListBlog] = useState([])
  const [, setLoading] = useState(false)

  const handleFetchData = () => {
    setLoading(true)
    axios
      .get(`${baseApi}/blog`)
      .then((response) => {
        if (response?.status === 200) {
          setListBlog(response?.data?.blogs)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const [count, setCount] = useState(0)

  const handleCount = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return (
    <>
      <Container className='mt--7'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>List Blog</CardHeader>
              <Button className='my-2' color='primary' onClick={handleCount}>
                Ubah Count
              </Button>
              <h2 className='text-center text-danger'>{count}</h2>
              <CardBody>
                <ListBlog data={listBlog} handleFetchData={handleFetchData} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
