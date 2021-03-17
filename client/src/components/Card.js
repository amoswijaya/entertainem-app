import { Card, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function CardList({ title, poster_path, popularity, id, deleteData, detailData, tags, favouritesData }) {
  return (
    <>
      <Card style={{ width: '18rem' }} className='col-md-3 mx-2 my-4'>
        <Card.Img variant="top" src={poster_path} />
        <Card.Body>
          {favouritesData ?
            <div className="d-flex justify-content-end">
              <OverlayTrigger overlay={<Tooltip id="tooltip">add to favouriter</Tooltip>}>
                <span className="d-inline-block">
                  <button className="btn-sm btn" onClick={() => favouritesData()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                      <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </button>
                </span>
              </OverlayTrigger>
            </div> : <div></div>}
          <ListGroup variant="flush">
            <ListGroup.Item>Name: {title}</ListGroup.Item>
            <ListGroup.Item>ratings: {popularity}/10</ListGroup.Item>
            <ListGroup.Item>
              {
                tags.map(tag => <span class="badge badge-pill badge-primary">{tag}</span>)
              }
            </ListGroup.Item>
          </ListGroup>
          {deleteData && detailData ?
            <div className="d-flex justify-content-between">
              <button onClick={() => deleteData(id)} className="btn btn-primary">delete</button>
              <button onClick={() => detailData(id)} className="btn btn-success" >detail</button>
            </div>
            : <div></div>
          }
        </Card.Body>
      </Card>
    </>
  )
}