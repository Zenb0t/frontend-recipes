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
    columnHelper.accessor("unitCost", {
      cell: (info) => info.getValue().toPrecision(2),
      header: "Unit Cost",
      meta: {
        isNumeric: true
      }
    }),
    columnHelper.accessor("measuringUnit", {
      cell: (info) => info.getValue(),
      header: "Measuring Unit"
    }),
  ];
  return <DataTable columns={columns} data={ingredients as IngredientModel[]} />;
}
