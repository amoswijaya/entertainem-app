import { gql } from '@apollo/client'

export const DeleteSeries = gql`
mutation deleteSeries(
  $_id: ID!
){
  deleteSeries(
      _id: $_id
  ){
    _id
  }
}
`

export const GetSeriesById = gql`
query getOne(
  $_id: ID!
){
  seriesById(
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