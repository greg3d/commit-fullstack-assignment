import type {
    InputProps} from '@mui/material';
import {
    FormHelperText,
    Typography,
    FormControl,
    Input
} from '@mui/material';
//import {styled} from '@mui/material/styles';
import type {FC} from 'react';
import {Controller, useFormContext} from 'react-hook-form';


type IFormInputProps = {
    name: string;
    label: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({name, label, ...otherProps}) => {
    const {
        control,
        formState: {errors},
    } = useFormContext();

    return (
        <Controller
            control={control}
            defaultValue=''
            name={name}
            render={({field}) => (
                <FormControl fullWidth sx={{mb: 2}}>
                    <Typography
                        variant='body2'
                        sx={{color: '#2363eb', mb: 1, fontWeight: 500}}
                    >
                        {label}
                    </Typography>
                    <Input
                        {...field}
                        fullWidth
                        disableUnderline
                        sx={{borderRadius: '1rem'}}
                        error={!!errors[name]}
                        {...otherProps}
                    />
                    <FormHelperText error={!!errors[name]}>
                        {errors[name] ? errors[name].message : ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default FormInput;
