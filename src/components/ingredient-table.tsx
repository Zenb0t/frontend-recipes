import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { IngredientItem, IngredientModel } from "../features/recipeBook/models";

interface IngredientTableProps {
  ingredients: IngredientItem[] | IngredientModel[];
}

export const IngredientItemTable: React.FC<IngredientTableProps> = ({
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
  return <DataTable columns={columns} data={ingredients as IngredientItem[]} />;
};

/**
 * This component is used to display a list of ingredients. Pass a list of [IngredientModel] to the component.
 */
export const IngredientListTable: React.FC<IngredientTableProps> = ({
  ingredients
}: IngredientTableProps) => {
  const columnHelper = createColumnHelper<IngredientModel>();
  
  //Set accessors according to model
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Ingredient"
    }),
    columnHelper.accessor("amount", {
      cell: (info) => info.getValue(),
      header: "Amount",
    }),
    columnHelper.accessor("measuringUnit", {
      cell: (info) => info.getValue(),
      header: "Measuring Unit"
    }),
    columnHelper.accessor("cost", {
      cell: (info) => info.getValue().toFixed(2),
      header: "Cost",
      meta: {
        isNumeric: true
      }
    }),
  ];
  return <DataTable columns={columns} data={ingredients as IngredientModel[]} />;
}
