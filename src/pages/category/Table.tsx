import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { BadgeNo, BadgeYes } from "../../components/Badge";
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { Category, ListResponse } from '../../util/model';
import categoryHttp from '../../util/http/category-http';

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
        },
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

type Props = {};
const Table = (props: Props) => {

    const [data, setData] = useState<Category[]>([]);

    useEffect(() => {
        let isSubscribed = true;
        (async () => {
            const { data } = await categoryHttp.list<ListResponse<Category>>();
            if (isSubscribed) {
                setData(data.data);
            }
        })();

        return () => {
            isSubscribed = false;
        }

    }, []);

    return (
        <MUIDataTable title="Listagem de categorias"
            columns={columnsDefinition}
            data={data} />
    );
};

export default Table;

function useFilter(arg0: { columns: MUIDataTableColumn[]; debounceTime: any; rowsPerPage: any; rowsPerPageOptions: any; tableRef: any; }): { columns: any; filterManager: any; cleanSearchText: any; filterState: any; debouncedFilterState: any; totalRecords: any; setTotalRecords: any; } {
    throw new Error('Function not implemented.');
}

