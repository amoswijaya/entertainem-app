import { useQuery } from '@apollo/client'
import { Container, Row, Spinner } from "react-bootstrap";
import { GetAllMovie } from '../queries/movie'
import CardList from '../components/Card'
export default function Movies() {
  const { loading, data } = useQuery(GetAllMovie)
  return (
    <>
      <Container>
        {
          loading ? (
            <Container>
              <center>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </center>
            </Container>
          ) : (
            <div>
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
                  />
                )}
              </Row>
            </div>
          )
        }
      </Container>
    </>
  )
}