import type {ChangeEvent} from 'react';
import React from 'react';
import {Box, TextField} from "@mui/material";


const CustomInput = ({type, name, value, errorMessage, onChange}: {
        type: string
        name: string
        value: string
        errorMessage: string | boolean
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {

        let label = name.charAt(0).toUpperCase() + name.slice(1)
        if (name === "passwordConfirm") label = 'Confirm Password';
        return (
            <Box>
                <TextField
                    autoComplete={"off"}
                    onChange={onChange}
                    type={type}
                    name={name}
                    value={value}
                    label={label}
                    variant="outlined"
                    error={errorMessage != ""}
                    helperText={errorMessage + " "}
                    margin="dense"
                    color="success"
                />
            </Box>
        );
    }
;

export default CustomInput;