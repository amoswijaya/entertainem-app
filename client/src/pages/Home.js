import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { Row, Container, Spinner } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import CardList from '../components/Card'
import { GetAll, DeleteMovie } from '../queries/movie'
import { DeleteSeries } from '../queries/series'
import { favourites } from "../cache/index"
import Swal from 'sweetalert2'
export default function Home() {
  const fav = useReactiveVar(favourites)
  const history = useHistory()
  const [deleteM] = useMutation(DeleteMovie, {
    refetchQueries: [{ query: GetAll }]
  })
  const [deleteS] = useMutation(DeleteSeries, {
    refetchQueries: [{ query: GetAll }]
  })
  const { loading, data } = useQuery(GetAll)
  if (loading) {
    return (
      <Container>
        <center>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </center>
      </Container>
    )
  }
  console.log(data)
  const deleteMovie = (id) => {
    deleteM({
      variables: {
        _id: id
      }
    })
  }

  const deleteSeries = (id) => {
    deleteS({
      variables: {
        _id: id
      }
    })
  }

  const detailMovie = (id) => {
    history.push('/movie/' + id)
  }

  const detailSeries = (id) => {
    history.push('/series/' + id)
  }

  const handleFavourite = (data) => {
    let same = false
    fav.forEach(e => {
      if (e._id === data._id) same = true
    });
    if (!same) {
      console.log('baru')
      favourites([...favourites(), data])
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Success add to favourite!',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'alraedy exist in favourite!',
      })
    }
  }
  return (
    <>
      <Container className="shadow p-3 mb-5 bg-body rounded">
        <h1 className="text-title text-uppercase text-center">Movie</h1>
        <div className="d-flex justify-content-end">
          <NavLink className="btn btn-primary" to="/addMovie">+Add movie</NavLink>
        </div>
        <Row>
          {data.movies?.map(movie =>
            <CardList
              key={movie._id}
              title={movie.title}
              overview={movie.overview}
              poster_path={movie.poster_path}
              popularity={movie.popularity}
              id={movie._id}
              tags={movie.tags}
              deleteData={(id) => deleteMovie(id)}
              detailData={(id) => detailMovie(id)}
              favouritesData={() => handleFavourite(movie)}
            />
          )}
        </Row>
      </Container>
      <Container className="shadow p-3 mb-5 bg-body rounded">
        <h1 className="text-title text-uppercase text-center">Series</h1>
        <Row>
          {data.series?.map(serie =>
            <CardList
              key={serie._id}
              title={serie.title}
              overview={serie.overview}
              poster_path={serie.poster_path}
              popularity={serie.popularity}
              id={serie._id}
              tags={serie.tags}
              deleteData={(id) => deleteSeries(id)}
              detailData={(id) => detailSeries(id)}
              favouritesData={() => handleFavourite(serie)}
            />
          )}
        </Row>
      </Container>
    </>
  )
}