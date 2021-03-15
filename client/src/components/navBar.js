import { Container, Row } from "react-bootstrap";
import {NavLink} from 'react-router-dom'
export default function NavBar() {
  return (
    <>
      <Container fluid>
        <Row>
          <div className="col mt-2">
          <NavLink className="mx-2 nav-item" to="/">EnetertainMe</NavLink>
          </div>
          <div className="col">
            <NavLink className="nav-link" to="/favorites">Favorite</NavLink>
          </div>
          <div className="col d-flex justify-content-end m-auto">
            <NavLink className="mx-2 nav-item" to="/movies">movie</NavLink>
            <NavLink className="mx-2 nav-item" to="/series">series</NavLink>
          </div>
        </Row>
      </Container>
    </>
  )
}