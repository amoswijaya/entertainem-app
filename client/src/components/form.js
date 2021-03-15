import { useState, useEffect } from 'react'
import { addMovie, getAll } from '../queries/movie'
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom"
import Select from 'react-select'
export default function Form() {
  const history = useHistory()
  const [addM] = useMutation(addMovie, { refetchQueries: [{ query: getAll }] })
  const [tag, setTag] = useState([])
  const [dataMovie, SetdataMovie] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: []
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

  useEffect(() => {
    let newTag = null
    if (tag) {
      newTag = tag.map(e => e.value)
    }
    SetdataMovie({ ...dataMovie, tags: newTag })
  }, [tag])

  const handleAddData = (e) => {
    const { value, name } = e.target
    SetdataMovie({
      ...dataMovie,
      [name]: value
    })
  }
  console.log(dataMovie)
  const handleSubmit = (e) => {
    console.log(dataMovie);
    e.preventDefault();
    addM({ variables: { addMovie: { ...dataMovie, popularity: +dataMovie.popularity } } })
    history.push('/')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-title text-center text-uppercase">Input data movie</h1>
        <div className="row ">
          <div class="form-group col ">
            <input type="text" class="form-control" placeholder="Title" name="title" onChange={handleAddData} />
          </div>
          <div class="form-group col">
            <textarea class="form-control" name="overview" onChange={handleAddData} rows="3" placeholder="overview"></textarea>
          </div>

        </div>
        <div className="row ">
          <div class="form-group col">
            <input type="text" class="form-control" placeholder="path poster" name="poster_path" onChange={handleAddData} />
          </div>
          <div class="form-group col">
            <input type="text" class="form-control" placeholder="popularity" name="popularity" onChange={handleAddData} />
          </div>
        </div>
        <div className="row ">
          <div class="form-group col">
            <Select
              name="tags"
              className="basic-multi-select"
              classNamePrefix="select"
              options={options}
              isMulti
              onChange={tag => setTag(tag)}
            />
          </div>
        </div>
        <input type="submit" className="btn btn-primary"></input>
      </form>
    </>
  )
}