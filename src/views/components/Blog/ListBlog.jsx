import React, { useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import TambahBlog from './TambahBlog'
import { Button, ButtonGroup } from 'reactstrap'
import UpdateBlog from './UpdateBlog'
import axios from 'axios'
import { baseApi } from 'variables/api'
import Upload from './Upload'
import { baseApiPhoto } from 'variables/api'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

const { SearchBar } = Search

const ListBlog = (props) => {
  const { data, handleFetchData } = props
  const [modalTambah, setModalTambah] = useState(false)
  const [modalUbah, setModalUbah] = useState(false)
  const [modalUpload, setModalUpload] = useState(false)
  const [idRows, setIdRows] = useState('')

  const handleDelete = (id) => (e) => {
    axios
      .delete(`${baseApi}/blog/${id}`)
      .then((response) => {
        if (response?.status === 200) {
          alert('berhasil hapus...')
          setIdRows('')
        }
      })
      .catch(console.error)
  }

  const columns = [
    {
      dataField: '',
      text: 'Actions',
      formatter: (_, row) => (
        <ButtonGroup>
          <Button
            onClick={() => setModalUbah(!modalUbah, setIdRows(row.id))}
            color='info'
          >
            <i className='fas fa-edit' />
          </Button>
          <Button
            onClick={() => setModalUpload(!modalUpload, setIdRows(row.id))}
            color='success'
          >
            <i className='fas fa-upload' />
          </Button>
          <Button
            onClick={handleDelete(row.id, setIdRows(row.id))}
            color='danger'
          >
            <i className='fas fa-trash' />
          </Button>
        </ButtonGroup>
      ),
    },
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'description',
      text: 'Description',
    },
    {
      dataField: 'photo',
      text: 'Photo',
      formatter: (_, row) => (
        <div>
          {row?.photo ? (
            <img
              src={`${baseApiPhoto}/${row.photo}`}
              alt={`${row.title}`}
              width='50px'
            />
          ) : (
            ''
          )}
        </div>
      ),
    },
    {
      dataField: 'created_at',
      text: 'Created At',
    },
  ]

  return (
    <>
      <Button
        color='primary'
        className='btn-sm my-2'
        onClick={() => setModalTambah(!modalTambah)}
      >
        Tambah
      </Button>
      <ToolkitProvider keyField='id' data={data} columns={columns} search>
        {(props) => (
          <div>
            <h3>Pencarian: </h3>
            <SearchBar {...props.searchProps} />
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory()}
              headerWrapperClasses='thead-light'
            />
          </div>
        )}
      </ToolkitProvider>
      <TambahBlog
        setModalTambah={setModalTambah}
        modalTambah={modalTambah}
        handleFetchData={handleFetchData}
      />
      {modalUbah && (
        <UpdateBlog
          setModalUbah={setModalUbah}
          modalUbah={modalUbah}
          handleFetchData={handleFetchData}
          idRows={idRows}
        />
      )}
      {modalUpload && (
        <Upload
          setModalUpload={setModalUpload}
          modalUpload={modalUpload}
          handleFetchData={handleFetchData}
          idRows={idRows}
        />
      )}
    </>
  )
}

export default ListBlog
