import * as React from 'react';
import {
    Box,
    Button,
    ButtonProps,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    Theme,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import castMemberHttp from '../../util/http/cast-member-http';
import * as yup from '../../util/vendor/yup';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import SubmitActions from '../../components/SubmitActions';
import { CastMember } from '../../util/model';

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1),
        },
    };
});

const validationSchema = yup.object().shape({
    name: yup.string()
        .label('Nome')
        .required()
        .max(255),
    type: yup.number()
        .label('Tipo')
        .required(),
});

export const Form = () => {

    const classes = useStyles();

    const buttonProps: ButtonProps = {
        className: classes.submit,
        color: 'secondary',
        variant: 'contained',
    };

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        errors,
        reset,
        watch,
        triggerValidation
    } = useForm<{ name, type }>({
        validationSchema,
    });

    const snackbar = useSnackbar();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [castMember, setCastMember] = useState<CastMember | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        let isSubscribed = true;
        (async () => {
            setLoading(true);
            try {
                const { data } = await castMemberHttp.get(id);
                if (isSubscribed) {
                    setCastMember(data.data);
                    reset(data.data);
                }
            } catch (error) {
                console.error(error);
                snackbar.enqueueSnackbar(
                    'Não foi possível carregar as informações',
                    { variant: 'error', }
                )
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            isSubscribed = false;
        }
    }, []);

    useEffect(() => {
        register({ name: "type" })
    }, [register]);

    async function onSubmit(formData, event) {
        setLoading(true);
        try {
            const http = !castMember
                ? castMemberHttp.create({})
                : castMemberHttp.update(castMember.id, formData);
            const { data } = await http;
            snackbar.enqueueSnackbar(
                'Membro de elenco salvo com sucesso',
                { variant: 'success' }
            );
            setTimeout(() => {
                event
                    ? (
                        id
                            ? history.replace(`/cast-members/${data.data.id}/edit`)
                            : history.push(`/cast-members/${data.data.id}/edit`)
                    )
                    : history.push('/cast-members')
            });
        } catch (error) {
            console.error(error);
            snackbar.enqueueSnackbar(
                'Não foi possível salvar o membro de elenco',
                { variant: 'error' }
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name="name"
                label="Nome"
                fullWidth
                variant={"outlined"}
                inputRef={register}
                disabled={loading}
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
                InputLabelProps={{ shrink: true }}
            />
            <FormControl
                margin={"normal"}
                error={errors.type !== undefined}
                disabled={loading}
            >
                <FormLabel component="legend">Tipo</FormLabel>
                <RadioGroup
                    name="type"
                    onChange={(e) => {
                        setValue('type', parseInt(e.target.value));
                    }}
                    value={watch('type') + ""}
                >
                    <FormControlLabel value="1" control={<Radio color={"primary"} />} label="Diretor" />
                    <FormControlLabel value="2" control={<Radio color={"primary"} />} label="Ator" />
                </RadioGroup>
                {
                    errors.type && <FormHelperText id="type-helper-text">{errors.type.message}</FormHelperText>
                }
            </FormControl>
            <SubmitActions
                disabledButtons={loading}
                handleSave={() =>
                    triggerValidation().then(isValid => {
                        isValid && onSubmit(getValues(), null)
                    })
                }
            />
        </form>
    );
};
