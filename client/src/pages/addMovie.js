import Form from "../components/form";
import {Container} from 'react-bootstrap'
export default function AddMovie() {
  return (
    <>
    <Container>
      <div className="d-flex justify-content-center" style={{margin: 100}}>
        <Form></Form>
      </div>
    </Container>
    </>
  )
}