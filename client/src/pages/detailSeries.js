import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from '@apollo/client'
import { GetSeriesById } from '../queries/series'
import { useParams } from 'react-router-dom'
export default function Detail() {
  const { id } = useParams()
  const { loading, data } = useQuery(GetSeriesById, {
    variables: {
      _id: id
    }
  })
  if(loading) {
    return <h1>loading...</h1>
  }
  const {tags, popularity, overview, poster_path, title} = data.seriesById
  console.log(data);
  return (
    <>
      <Container>
        <Card fluid>
          <Row>
            <Col>
              <img src={poster_path} alt="..." width="500" height="600"></img>
            </Col>
            <Col>
              <ul class="list-group">
                <li class="list-group-item">Title: {title}</li>
                <li class="list-group-item">Overview: {overview}</li>
                <li class="list-group-item">ratings: {popularity}/10</li>
                <li class="list-group-item">
                  {tags.map(tag => <span class="badge badge-pill badge-primary">{tag}</span>)}
                </li>
              </ul>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  )
}