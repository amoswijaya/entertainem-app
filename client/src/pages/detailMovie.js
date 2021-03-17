import { Card, Col, Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useQuery, useMutation } from '@apollo/client'
import { GetMovieById, EditMovie, GetAll } from '../queries/movie'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Select from 'react-select'
export default function Detail() {
  const { id } = useParams()
  const history = useHistory()
  const [isEdit, setEdit] = useState(false)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState([])
  const { loading, data } = useQuery(GetMovieById, {
    variables: {
      _id: id
    }
  })

  const options = [
    { value: 'Action', label: 'Action' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Colossal', label: 'Colossal' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Animation', label: 'Animation' }
  ]
  // console.log(data?.movieById.__typename)
  const [dataEdit, setDataEdit] = useState(data?.movieById)
  const [editData] = useMutation(EditMovie, {
    refetchQueries: [{ query: GetAll }]
  })
  console.log(dataEdit)
  useEffect(() => {
    setDataEdit(data?.movieById)
    if (data) {
      let tags = data.movieById.tags.map(tag => {
        return {
          value: tag,
          label: tag
        }
      })
      setTags(tags)
    }
  }, [data])
  useEffect(() => {
    let newTag = null
    if (tag) {
      newTag = tag.map(e => e.value)
    }
    setDataEdit({ ...dataEdit, tags: newTag })
  }, [tag])
  if (loading) {
    return <h1>loading..</h1>
  }
  const { movieById } = data
  const { title, overview, popularity, poster_path } = data?.movieById
  console.log(movieById);
  const handleInput = (e) => {
    const { name, value } = e.target
    setDataEdit({
      ...dataEdit,
      [name]: value
    });
  }

  const handleEdit = (e) => {
    e.preventDefault();
    const payload = {
      title: dataEdit.title,
      overview: dataEdit.overview,
      popularity: +dataEdit.popularity,
      poster_path: dataEdit.poster_path,
      tags: dataEdit.tags,
      _id: id
    }
    editData({
      variables: {
        editMovie: payload
      }
    })
    history.push('/')
  }
  return (
    <>
      <Container>
        <Card>
          <Row>
            <Col>
              <img src={poster_path} alt="..."></img>
            </Col>
            <Col>
              <div className="d-flex justify-content-end">
                <OverlayTrigger overlay={<Tooltip id="tooltip">Edit</Tooltip>}>
                  <span className="d-inline-block">
                    <button onClick={() => !isEdit ? setEdit(true) : setEdit(false)} className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </button>
                  </span>
                </OverlayTrigger>
              </div>
              {!isEdit ?
                <ul class="list-group mt-3">
                  <li class="list-group-item">Title: {title}</li>
                  <li class="list-group-item">Overview: {overview}</li>
                  <li class="list-group-item">ratings: {popularity}/10</li>
                  <li class="list-group-item">
                    {
                      data?.movieById.tags.map(tag => <span class="badge badge-pill badge-primary">{tag}</span>)
                    }
                  </li>
                </ul>
                :
                <div className="mt-3">
                  <div class="form-group">
                    <input type="text" class="form-control" name="title" onChange={handleInput} defaultValue={title} placeholder="title" />
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="overview" onChange={handleInput} defaultValue={overview} placeholder="overview" />
                  </div>
                  <div class="form-group">
                    <input type="number" class="form-control" name="popularity" onChange={handleInput} defaultValue={popularity} placeholder="ratings" />
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="poster_path" onChange={handleInput} defaultValue={poster_path} placeholder="url poster" />
                  </div>
                  <div class="form-group col">
                    <Select
                      name="tags"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={options}
                      isMulti
                      defaultValue={tags}
                      onChange={tag => setTag(tag)}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button onClick={handleEdit} className="btn btn-primary mx-4" >save</button>
                  </div>
                </div>
              }
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  )
}