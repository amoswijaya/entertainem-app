import { useQuery, useMutation } from '@apollo/client'
import { Row, Container } from 'react-bootstrap'
import {NavLink, useHistory} from 'react-router-dom'
import CardList from '../components/Card'
import { getAll, DeleteMovie } from '../queries/movie'
import { DeleteSeries, GetSeriesById } from '../queries/series'
export default function Home() {
  const history = useHistory()
  const [deleteM] =useMutation(DeleteMovie, {
    refetchQueries:[{query: getAll}]
  })
  const [deleteS] = useMutation(DeleteSeries, {
    refetchQueries:[{query: getAll}]
  })
  const { loading, error, data } = useQuery(getAll)
  if (loading) {
    return <h1>loading..</h1>
  }

  const deleteMovie = (id) => {
    deleteM({variables:{
      _id:id
    }})
  }

  const deleteSeries = (id) => {
    deleteS({variables:{
      _id:id
    }})
  }

  const detailMovie = (id) => {
    history.push('/movie/'+id)
  }

  const detailSeries = (id) => {
    history.push('/series/'+id)
  }
  console.log(data)
  return (
    <>
    <div className="d-flex justify-content-end">
      <NavLink className="btn btn-primary" to="/addMovie">+Add movie</NavLink>
    </div>
    <Container>
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
          />
        )}
      </Row>
    </Container>
    <h1>Series: </h1>
    <Container>
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
          />
        )}
      </Row>
    </Container>
    </>
  )
}