import { favourites } from "../cache/index"
import { useReactiveVar } from '@apollo/client'
import CardList from '../components/Card'
import { Container, Row } from "react-bootstrap"
export default function Favourite() {
  const favourite = useReactiveVar(favourites)
  return (
    <>
      <Container>
        <Row>
          {!favourite.length ? <h1>kosong</h1> :
            favourite.map(fav => <CardList
              key={fav._id}
              title={fav.title}
              poster_path={fav.poster_path}
              popularity={fav.popularity}
              tags={fav.tags}
            />
            )}
        </Row>
      </Container>
    </>
  )
}