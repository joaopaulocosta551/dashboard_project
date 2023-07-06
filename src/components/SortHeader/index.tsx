import React from "react";
import { CurrentSortModel } from "@/models/current-sort.model";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  identfier: string;
  currentSort: CurrentSortModel;
}

export const SortHeader = ({
  title,
  identfier,
  currentSort,
  ...attributes
}: Props) => {
  return (
    <span style={{ display: "flex", cursor: "pointer" }} {...attributes}>
      {title}&nbsp;
      {currentSort?.key === identfier && !currentSort?.isAsc && <FaSortAmountDown />}
      {currentSort?.key === identfier && currentSort?.isAsc && <FaSortAmountUp />}
    </span>
  );
};
