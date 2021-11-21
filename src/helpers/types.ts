import { ReactNode } from "react";

export type PopupType = "alert" | "confirm";

export type PopupParams = {
  message: string;
  title: string;
  content?: ReactNode;
  disableClose?: boolean;
  onConfirm?: () => void;
  confirmButtonText?: string;
  type: PopupType;
};

export type MovieGroupInList = {
  movieGroupId: string;
  name: string;
  userFavorites: { alias: string }[];
};
export type MovieGroups = {
  movieGroups: MovieGroupInList[];
};

export type MovieGroupCount = {
  movieGroupCount: number;
};

export type FavoriteMovieGroup = {
  movieGroupId: string;
  name: string;
  movieEvents: { title: string; date: string; movieEventId: string }[];
};
export type FavoriteMovieGroups = {
  movieGroups: FavoriteMovieGroup[];
};

export type UserData = {
  user: {
    alias: string;
    userHasFavorites: boolean;
  };
};

export type CreateUserOrCheckIfExists = {
  createUserOrCheckIfExists: UserData["user"];
};

export type Movie = {
  primarytitle: string;
};

export type Movies = {
  movies: Movie[];
};

export type MovieGroup = {
  movieGroup: {
    movieGroupId: string;
    name: string;
    description: string;
  };
};

export type MovieGroupEvents = {
  movieEvents: {
    title: string;
    description: string;
    date: string;
    location: string;
    movieEventId: string;
    userIsParticipant: boolean;
  }[];
  movieEventCount: number;
};

export type MovieEvent = {
  movieEvent: {
    title: string;
    date: string;
    description: string;
    location: string;
    userIsParticipant: boolean;
  };
};

export type AddUserToEvent = {
  addUserToEvent: {
    userIsParticipant: boolean;
  };
};

export type RemoveUserFromEvent = {
  removeUserFromEvent: {
    userIsParticipant: boolean;
  };
};
