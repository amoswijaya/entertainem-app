import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, useMutation } from '@apollo/client'
import { GetSeriesById } from '../queries/series'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
export default function Detail() {
  const { id } = useParams()
  const history = useHistory()
  const [isEdit, setEdit] = useState(false)
  const { loading, error, data } = useQuery(GetSeriesById, {
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
        <Card>
          <Row>
            <Col>
              <img src={poster_path} alt="..."></img>
            </Col>
            <Col>
              <ul class="list-group">
                <li class="list-group-item">Title: {title}</li>
                <li class="list-group-item">Overview: {overview}</li>
                <li class="list-group-item">ratings: {popularity}</li>
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