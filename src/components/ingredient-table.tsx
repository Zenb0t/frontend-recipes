import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { IngredientItem } from "../features/recipeBook/RecipeBookModels";

interface IngredientTableProps {
  ingredients: IngredientItem[];
}

export const IngredientTable: React.FC<IngredientTableProps> = ({
  ingredients
}: IngredientTableProps) => {
  const columnHelper = createColumnHelper<IngredientItem>();

  //Set accessors according to model
  const columns = [
    columnHelper.accessor("ingredient", {
      cell: (info) => info.getValue().name,
      header: "Ingredient"
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => info.getValue(),
      header: "Quantity",
      meta: {
        isNumeric: true
      }
    }),
    columnHelper.accessor("cost", {
      cell: (info) => info.getValue(),
      header: "Cost",
      meta: {
        isNumeric: true
      }
    })
  ];
  return <DataTable columns={columns} data={ingredients} />;
};
