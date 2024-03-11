import React, {ChangeEvent} from 'react';
import {Input as _Input, Box, TextField} from "@mui/material";


const CustomInput = ({type, name, value, errorMessage, onChange}: {
        type: string
        name: string
        value: string
        errorMessage: string | boolean
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
        return (
            <Box>
                <TextField
                    autoComplete={"off"}
                    onChange={onChange}
                    type={type}
                    name={name}
                    value={value}
                    label={name}
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