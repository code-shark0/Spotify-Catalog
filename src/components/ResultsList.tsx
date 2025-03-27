import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { FC, useEffect, useState } from "react";
import { ListItem } from "../models/model";

interface ResultsListProps {
    data: Array<ListItem>; // Todo: find and add a proper type for this
}

// Results list that displays all catalog items filtered by a search
// The data coming in is assumed to be an aggregated superset of all the users saved albums, tracks, and episodes
const ResultsList: FC<ResultsListProps> = ({data}) => {
    const [listData, setListData] = useState<Array<ListItem>>([]);

    useEffect(() => {
        setListData(data.map(item => {return {
            image: item?.image, 
            name: item?.name,
            type: item?.type,
            genres: item?.genres}}));
    }, [data]);

    const columnHelper = createColumnHelper<ListItem>();
    const columns = [
        columnHelper.accessor('image', {
            header: 'Image',
            cell: info => <img src={info.getValue()?.url} style={{width: "40px"}} alt="Album Artwork"/>,
            enableSorting: false,
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('type', {
            header: 'Type',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('genres', {
            header: 'Genres',
            cell: info => info.renderValue()?.join(', '),
            enableSorting: false
        })
    ]

    const table = useReactTable({
        data: listData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                    <th key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ResultsList;
