import { gql } from '@apollo/client'

export const GetAll = gql`
query getAll{
  movies{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  series{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GetAllMovie = gql`
query getAllMovies{
  movies{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const DeleteMovie = gql`
mutation deleteMovie(
  $_id: ID!
){
  deleteMovie(
      _id: $_id
  ){
    _id
  }
}
`

export const GetMovieById = gql`
query getOne(
  $_id: ID!
){
  movieById(
      _id: $_id
  ){
    title,
    overview,
    tags,
    popularity,
    poster_path
  }
}
`



export const AddMovie = gql`
mutation addmovie($addMovie: MovieInput)  {
  addMovie(movie:$addMovie){
    title,
    overview,
    poster_path,
    popularity,
    tags
  }
}
`

export const EditMovie = gql`
mutation editMovie($editMovie: MovieEdit)  {
  editMovie(edit:$editMovie){
    title,
    overview,
    poster_path,
    tags,
    popularity
  }
}
`