import { Card, ListGroup } from 'react-bootstrap'

export default function CardList({title, overview, poster_path, popularity, id, deleteData, detailData, tags}) {
  return (
    <>
      <Card style={{width: '18rem'}} className='col-md-3 mx-2 my-4'>
        <Card.Img variant="top" src={poster_path} />
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Name: {title}</ListGroup.Item>
            <ListGroup.Item>Overview: {overview}</ListGroup.Item>
            <ListGroup.Item>popularity: {popularity}</ListGroup.Item>
            <ListGroup.Item>
              {
                tags.map(tag => <span class="badge badge-pill badge-primary">{tag}</span>)
              }
            </ListGroup.Item>
          </ListGroup>
          <button onClick={() => deleteData(id)}>delete</button>
          <button onClick={() => detailData(id)}>detail</button>
        </Card.Body>
      </Card>
    </>
  )
}