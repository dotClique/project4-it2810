import { ReactNode } from "react";

export type PopupType = "alert" | "confirm";

export type ParamList = {
  Home: undefined;
  MovieGroupPage: { MovieGroupId: string };
  MovieGroupsPage: undefined;
  FavoriteGroupsPage: undefined;
  CreateMovieGroupPage: undefined;
  CreateMovieEventPage: { MovieGroupId: string };
  MovieEventPage: { MovieEventId: string };
  PopupPage: {
    message: string;
    title: string;
    content?: ReactNode;
    disableClose?: boolean;
    onConfirm?: () => void;
    confirmButtonText?: string;
    type: PopupType;
  };
};
