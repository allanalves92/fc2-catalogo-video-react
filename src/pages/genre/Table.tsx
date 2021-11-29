import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { BadgeNo, BadgeYes } from "../../components/Badge";
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome",
    },
    {
        name: "is_active",
        label: "Ativo?",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return value ? <BadgeYes /> : <BadgeNo />;
            }
        }
    },
    {
        name: "categories",
        label: "Categorias",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return value.map(value => value.name).join(', ');
            }
        }
    },
    {
        name: "created_at",
        label: "Criado em",
        options: {
            filter: false,
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>
            }
        }
    },
];

const data = [
    { name: "Genre1", is_active: true, categories: [{ "name": "Categoria1" }, { "name": "Categoria2" }, { "name": "Categoria3" }], created_at: "2019-12-12" },
    { name: "Genre2", is_active: false, categories: [{ "name": "Categoria1" }, { "name": "Categoria2" }, { "name": "Categoria3" }], created_at: "2019-12-13" },
    { name: "Genre3", is_active: true, categories: [{ "name": "Categoria1" }, { "name": "Categoria2" }, { "name": "Categoria3" }], created_at: "2019-12-14" },
    { name: "Genre4", is_active: false, categories: [{ "name": "Categoria1" }, { "name": "Categoria2" }, { "name": "Categoria3" }], created_at: "2019-12-15" },
]

type Props = {};
const Table = (props: Props) => {

    // const [data, setData] = useState([]);

    useEffect(() => {
    }, []);

    return (
        <MUIDataTable title="Listagem de genêros"
            columns={columnsDefinition}
            data={data} />
    );
};

export default Table;

