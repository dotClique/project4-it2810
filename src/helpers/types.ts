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

export type MovieGroups = {
  movieGroups: {
    movieGroupId: string;
    name: string;
    userFavorites: { alias: string }[];
  }[];
};

export type MovieGroupCount = {
  movieGroupCount: number;
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
