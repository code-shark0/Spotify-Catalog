import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { ListItem } from "../models/model";
import { Box } from "@mui/material";

interface ResultsListProps {
    data: Array<ListItem>; // Todo: find and add a proper type for this
}

// Results list that displays all catalog items filtered by a search
// The data coming in is assumed to be an aggregated superset of all the users saved albums, tracks, and episodes
const ResultsList: FC<ResultsListProps> = ({data}) => {
    const [listData, setListData] = useState<Array<ListItem>>([]);

    // One of the core obvious changes that I could make here in addition to cleaning up the styling would be
    // to add in virtualization with infinite scrolling, or pagination which would be simple enough on the component side with tanstack. 
    // It might also be a good idea depending on the amount of data coming in from the API to limit the amount of data
    // coming in, and dynamically make calls to grab more data as the user scrolls down the page, or when the
    // next page is requested if it was made in a table with pagination.

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
            cell: info => <img src={info.getValue()?.url} alt={'Album Artwork'} style={{
                width: '40px', 
                height: '40px',
                borderRadius: '4px',
                objectFit: 'cover',
            }} />,
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
        <Box   
            sx={{
                overflowX: 'auto',
                width: '100%',
            }}
        >
            <table style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
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
                        <td style={{
                            textAlign: 'center',
                            padding: '.5rem',
                            border: '1px solid #ccc'
                        }} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    )
}

export default ResultsList;
