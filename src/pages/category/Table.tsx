import * as React from 'react';
import { useEffect, useState } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { BadgeNo, BadgeYes } from '../../components/Badge';
import { Category, ListResponse } from '../../util/model';
import categoryHttp from '../../util/http/category-http';
import DefaultTable, {
    makeActionStyles,
    TableColumn,
} from '../../components/Table';
import { IconButton, MuiThemeProvider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const columnsDefinition: TableColumn[] = [
    {
        name: 'id',
        label: 'ID',
        width: '30%',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'name',
        label: 'Nome',
        width: '43%',
        options: {
            filter: false,
        },
    },
    {
        name: 'is_active',
        label: 'Ativo?',
        width: '4%',
        options: {
            filterOptions: {
                names: ['Sim', 'Não'],
            },
            customBodyRender(value, tableMeta, updateValue) {
                return value ? <BadgeYes /> : <BadgeNo />;
            },
        },
    },
    {
        name: 'created_at',
        label: 'Criado em',
        width: '10%',
        options: {
            filter: false,
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>;
            },
        },
    },
    {
        name: 'actions',
        label: 'Ações',
        width: '13%',
        options: {
            sort: false,
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return (
                    <IconButton
                        color={'secondary'}
                        component={Link}
                        to={`/categories/${tableMeta.rowData[0]}/edit`}
                    >
                        <EditIcon />
                    </IconButton>
                );
            },
        },
    },
];

type Props = {};
const Table = (props: Props) => {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
        };
    }, []);

    return (
        <MuiThemeProvider theme={makeActionStyles(columnsDefinition.length - 1)}>
            <DefaultTable
                title=''
                columns={columnsDefinition}
                data={data}
                loading={loading}
                options={{
                    responsive: 'scrollMaxHeight',
                }}
            />
        </MuiThemeProvider>
    );
};

export default Table;
