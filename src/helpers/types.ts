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

export type MovieGroup = {
  movieGroupId: string;
  name: string;
  userFavorites: { alias: string }[];
};
export type MovieGroups = {
  movieGroups: MovieGroup[];
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
