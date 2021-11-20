import { PopupParams } from "helpers/types";

export type ParamList = {
  Home: undefined;
  MovieGroupPage: { MovieGroupId: string };
  MovieGroupsPage: undefined;
  FavoriteGroupsPage: undefined;
  CreateMovieGroupPage: undefined;
  CreateMovieEventPage: { MovieGroupId: string };
  MovieEventPage: { MovieEventId: string };
  PopupPage: PopupParams;
};
