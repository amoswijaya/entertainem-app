import { Container, Row } from "react-bootstrap";
import {NavLink} from 'react-router-dom'
export default function NavBar() {
  return (
    <>
      <Container fluid>
        <Row className="p-3">
          <div className="col mt-2">
          <NavLink className="mx-2 nav-item" to="/">EnetertainMe</NavLink>
          </div>
          <div className="col">
            <NavLink className="nav-link " to="/favorites">Favorite</NavLink>
          </div>
          <div className="col d-flex justify-content-end m-auto">
            <NavLink className="mx-2 nav-item btn bg-warning text-secondary" to="/movies" style={{borderRadius: 15}}>movie</NavLink>
            <NavLink className="mx-2 nav-item btn text-secondary" to="/series" style={{backgroundColor:'#98acf8', borderRadius: 15}}>series</NavLink>
          </div>
        </Row>
      </Container>
    </>
  )
}