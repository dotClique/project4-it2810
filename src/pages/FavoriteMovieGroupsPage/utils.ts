import {
  GET_COUNT_MOVIE_GROUPS_FAVORITE,
  GET_MOVIE_GROUPS_FAVORITE,
} from "../../helpers/graphql-queries";
import { useEffect, useState } from "react";
import { useQueryCall } from "helpers/hooks";
import { FavoriteMovieGroup, FavoriteMovieGroups, MovieGroupCount } from "helpers/types";

/**
 * Custom hook for getting favorite movie groups of a user with upcoming events of said groups
 * with pagination and search
 * @param page index of the current page
 * @param pageSize number of elements pr page
 * @param alias the alias of the user
 * @param searchString a part of the elements title
 */
export function useFavoriteMovieGroups(
  page: number,
  pageSize: number,
  alias: string,
  searchString: string,
) {
  // Gets the total count of posts the user has favorited
  const [fetchCountQuery, { data: dataCount, loading: loadingCount }] =
    useQueryCall<MovieGroupCount>(GET_COUNT_MOVIE_GROUPS_FAVORITE, true, undefined, true);

  // Gets one page of movie groups with events
  const [movieGroupsQuery, { data: dataGroups, loading: loadingGroups }] =
    useQueryCall<FavoriteMovieGroups>(GET_MOVIE_GROUPS_FAVORITE, true, undefined, true);

  // The array to store the movie groups and events in
  const [movieGroups, setMovieGroups] = useState<FavoriteMovieGroup[]>([]);

  // The total page count
  const [pageCount, setPageCount] = useState(1);

  // Updates the movie group array when finished fetching elements from grapqhl
  useEffect(() => {
    if (dataGroups && !loadingGroups) {
      setMovieGroups(dataGroups.movieGroups);
    }
  }, [dataGroups, loadingGroups]);

  // Updates the total page count when finished fetching element count from graphql
  useEffect(() => {
    if (!loadingCount && dataCount) {
      setPageCount(Math.ceil(dataCount.movieGroupCount / pageSize));
    }
  }, [loadingCount, dataCount]);

  // Refetches if page, alias or searchstring changes
  useEffect(() => {
    if (alias) {
      refetch();
    }
  }, [page, alias, searchString]);

  function refetch() {
    movieGroupsQuery({ variables: { alias, page, pageSize, searchString } });
    fetchCountQuery({ variables: { alias } });
  }

  return { movieGroups, pageCount, refetch };
}
