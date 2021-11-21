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

export type UserData = {
  user: {
    alias: string;
    userHasFavorites: boolean;
  };
};

export type CreateUserOrCheckIfExists = {
  createUserOrCheckIfExists: UserData["user"];
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
