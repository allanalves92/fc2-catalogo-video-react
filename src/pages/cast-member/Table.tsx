import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { CastMemberTypeMap } from '../../util/model';


const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome",
    },
    {
        name: "type",
        label: "Tipo",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return CastMemberTypeMap[value];
            }
        }
    },
    {
        name: "created_at",
        label: "Criado em",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>
            }
        }
    },
];

const data = [
    { name: "Member1", type: 1, created_at: "2021-12-12" },
    { name: "Member2", type: 2, created_at: "2021-12-13" },
    { name: "Member3", type: 1, created_at: "2021-12-14" },
    { name: "Member4", type: 2, created_at: "2021-12-15" },
]

type Props = {};
const Table = (props: Props) => {

    // const [data, setData] = useState([]);

    useEffect(() => {
    }, []);

    return (
        <MUIDataTable title="Listagem de membros"
            columns={columnsDefinition}
            data={data} />
    );
};

export default Table;

