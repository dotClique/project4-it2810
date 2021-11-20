import { PopupParams } from "helpers/types";

export type ParamList = {
  Home: undefined;
  MovieGroupPage: { movieGroupId: string };
  MovieGroupsPage: undefined;
  FavoriteGroupsPage: undefined;
  CreateMovieGroupPage: undefined;
  CreateMovieEventPage: { movieGroupId: string };
  MovieEventPage: { movieEventId: string };
  PopupPage: PopupParams;
};
