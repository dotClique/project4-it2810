import { gql } from "@apollo/client";

export const ADD_OR_GET_USER = gql`
  mutation CreateUserOrCheckIfExists($alias: String!) {
    createUserOrCheckIfExists(alias: $alias) {
      alias
      userHasFavorites
    }
  }
`;

export const GET_USER = gql`
  query user($alias: String!) {
    user(alias: $alias) {
      alias
      userHasFavorites
    }
  }
`;

export const GET_MOVIE_GROUPS_FAVORITE = gql`
  query ($alias: String!, $page: Int!, $pageSize: Int!, $searchString: String) {
    movieGroups(
      aliasFavoriteUser: $alias
      page: $page
      pageSize: $pageSize
      titleSearchString: $searchString
    ) {
      movieGroupId
      name
      movieEvents(take: 3, fromNow: true) {
        title
        date
        movieEventId
      }
    }
  }
`;

export const GET_MOVIE_GROUPS = gql`
  query ($page: Int!, $pageSize: Int!, $searchString: String) {
    movieGroups(page: $page, pageSize: $pageSize, titleSearchString: $searchString) {
      movieGroupId
      name
      userFavorites {
        alias
      }
    }
  }
`;

export const GET_COUNT_MOVIE_GROUPS_FAVORITE = gql`
  query ($alias: String!) {
    movieGroupCount(aliasFavoriteUser: $alias)
  }
`;

export const GET_COUNT_MOVIE_GROUPS = gql`
  query {
    movieGroupCount
  }
`;

export const CREATE_MOVIE_GROUP = gql`
  mutation ($name: String!, $description: String!) {
    createMovieGroup(name: $name, description: $description) {
      name
      description
    }
  }
`;

export const CREATE_MOVIE_EVENT = gql`
  mutation (
    $title: String!
    $description: String!
    $date: DateTime!
    $location: String!
    $movieGroupId: String!
  ) {
    createMovieEvent(
      title: $title
      description: $description
      date: $date
      location: $location
      movieGroupId: $movieGroupId
    ) {
      title
      date
      movieGroup {
        name
        description
        userFavorites {
          alias
        }
      }
    }
  }
`;

export const GET_MOVIE_EVENT = gql`
  query ($movieEventId: String!, $alias: String!) {
    movieEvent(movieEventId: $movieEventId) {
      title
      date
      description
      location
      userIsParticipant(alias: $alias)
    }
  }
`;

export const ADD_USER_TO_MOVIE_GROUP = gql`
  mutation ($movieGroupId: String!, $useralias: String!) {
    addUserToMovieGroup(movieGroupId: $movieGroupId, useralias: $useralias) {
      name
      userFavorites {
        alias
      }
    }
  }
`;

export const REMOVE_USER_FROM_MOVIE_GROUP = gql`
  mutation ($movieGroupId: String!, $useralias: String!) {
    removeUserFromMovieGroup(movieGroupId: $movieGroupId, useralias: $useralias) {
      name
      movieGroupId
    }
  }
`;

export const ADD_USER_TO_EVENT = gql`
  mutation ($movieEventId: String!, $useralias: String!) {
    addUserToEvent(movieEventId: $movieEventId, useralias: $useralias) {
      userIsParticipant(alias: $useralias)
    }
  }
`;

export const REMOVE_USER_FROM_EVENT = gql`
  mutation ($movieEventId: String!, $useralias: String!) {
    removeUserFromEvent(movieEventId: $movieEventId, useralias: $useralias) {
      userIsParticipant(alias: $useralias)
    }
  }
`;

export const GET_MOVIES = gql`
  query ($pageSize: Int!, $searchString: String!) {
    movies(maxCount: $pageSize, searchString: $searchString) {
      primarytitle
    }
  }
`;

export const GET_MOVIE_GROUP = gql`
  query ($movieGroupId: String!) {
    movieGroup(movieGroupId: $movieGroupId) {
      name
      description
      movieGroupId
    }
  }
`;

export const GET_MOVIE_GROUP_EVENTS = gql`
  query (
    $movieGroupId: String!
    $sortBy: AllowedSortingParams
    $searchString: String
    $pageSize: Int
    $fromDate: DateTime
    $page: Int
    $toDate: DateTime
    $alias: String!
    $asc: Boolean
  ) {
    movieEvents(
      movieGroupId: $movieGroupId
      sortBy: $sortBy
      titleSearchString: $searchString
      pageSize: $pageSize
      fromDate: $fromDate
      page: $page
      toDate: $toDate
      asc: $asc
    ) {
      title
      description
      date
      location
      movieEventId
      userIsParticipant(alias: $alias)
    }
    movieEventCount(
      movieGroupId: $movieGroupId
      titleSearchString: $searchString
      fromDate: $fromDate
      toDate: $toDate
    )
  }
`;
