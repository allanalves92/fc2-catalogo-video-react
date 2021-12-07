import * as React from 'react';
import { useEffect, useState } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { BadgeNo, BadgeYes } from '../../components/Badge';
import { Genre, ListResponse } from '../../util/model';
import genreHttp from '../../util/http/genre-http';
import { IconButton, MuiThemeProvider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DefaultTable, {
    makeActionStyles,
    TableColumn,
} from '../../components/Table';
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
        width: '23%',
        options: {
            filter: false,
        },
    },
    {
        name: 'is_active',
        label: 'Ativo?',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return value ? <BadgeYes /> : <BadgeNo />;
            },
        },
        width: '4%',
    },
    {
        name: 'categories',
        label: 'Categorias',
        width: '20%',
        options: {
            filterType: 'multiselect',
            filterOptions: {
                names: [],
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return 'teste'; //.map(value => value.name).join(', ');
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
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                return (
                    <span>
                        <IconButton
                            color={'secondary'}
                            component={Link}
                            to={`/genres/${tableMeta.rowData[0]}/edit`}
                        >
                            <EditIcon />
                        </IconButton>
                    </span>
                );
            },
        },
    },
];

type Props = {};
const Table = (props: Props) => {
    const [data, setData] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let isSubscribed = true;
        (async () => {
            const { data } = await genreHttp.list<ListResponse<Genre>>();
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
