import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    Icon,
    TableContainer
} from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel
} from "@tanstack/react-table";
import { useState } from "react";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>({
    data,
    columns
}: DataTableProps<Data>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });

    return (
        <TableContainer>

            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        <chakra.span>
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <Icon
                                                        as={MdArrowDropUp}
                                                        aria-label="sorted descending"
                                                    />
                                                ) : (
                                                    <Icon
                                                        as={MdArrowDropDown}
                                                        aria-label="sorted ascending"
                                                    />
                                                )
                                            ) : null}
                                        </chakra.span>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta: any = cell.column.columnDef.meta;
                                return (
                                    <Td key={cell.id} isNumeric={meta?.isNumeric}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
