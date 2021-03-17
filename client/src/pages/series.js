import { useQuery } from '@apollo/client'
import { Container, Row } from "react-bootstrap";
import { GetAllSeries } from '../queries/series'
import CardList from '../components/Card'
export default function Series() {
  const {loading, data} = useQuery(GetAllSeries)
  return (
    <>
      <Container>
        {
          loading ? (
            <h1 className="text-center">loading</h1>
          ) : (
            <div>
              <Row>
                {data.series?.map(movie =>
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
      </Container>`
    </>
  )
}