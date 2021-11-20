import * as React from "react";
import { DataTable } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSortBy: Dispatch<SetStateAction<{ id: string; direction: "asc" | "desc" }>>;
  title: string;
  id: string;
  sortBy: { id: string; direction: "asc" | "desc" };
};
export default function EventTableSortHeader(props: Props) {
  const active = props.sortBy.id === props.id;
  return (
    <DataTable.Title
      hasTVPreferredFocus={active}
      sortDirection={
        active ? (props.sortBy.direction == "asc" ? "ascending" : "descending") : undefined
      }
      onPressOut={() => {
        active
          ? props.setSortBy({
              id: props.id,
              direction: props.sortBy.direction === "asc" ? "desc" : "asc",
            })
          : props.setSortBy({ id: props.id, direction: "asc" });
      }}
    >
      {props.title}
    </DataTable.Title>
  );
}
