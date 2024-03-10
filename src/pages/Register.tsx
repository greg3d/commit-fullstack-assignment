import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import {useRegisterUserMutation} from "../store/userApiSlice";
import {useNavigate} from "react-router-dom";
import {Box, Button} from "@mui/material";


interface IValidator {
    fun: (val: string) => boolean
    message: string
}

class InputData {
    name: string = ""
    value: string = ""
    type: string = "text"
    validators: IValidator[] = []

    private constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    public static create(name: string, type: string) {
        return new InputData(name, type);
    }

    addValidator = (fun: (val: string) => boolean, message: string = "") => {
        this.validators.push({fun, message})
        return this;
    }

    setValue = (val: string) => {
        val = val.trim();
        if (val !== this.value) this.value = val;
    }

    validate = () => {
        this.validators.forEach(validator => {
            if (!validator.fun(this.value)) {
                return {
                    result: false,
                    message: validator.message
                }
            }
        });

        return {
            result: true,
            message: ""
        }
    }

    eq = (val: string) => this.value === val
}

const initialState: InputData[] = [
    InputData.create('username', 'text')
        .addValidator(val => val.length > 1, 'Enter username!')
        .addValidator(val => val.length < 20, 'Username too long!')
        .addValidator(val => /^[a-zA-Z]+$/.test(val)),
    InputData.create('phone', 'text')
        .addValidator(val => val.length >= 1, 'enter phone')
        .addValidator(val => val.length >= 6, 'phone too short')
        .addValidator(val => val.length <= 12, 'phone too long')
        .addValidator(val => /^[+08]([0-9]+(-| )?[0-9]+)*[0-9]$/.test(val), "wrong phone format"),
    InputData.create('password', 'password')
        .addValidator(val => val.length >= 1, 'enter password')
        .addValidator(val => val.length >= 6, 'password too short')
        .addValidator(val => val.length <= 16, 'password too long')
        .addValidator(val => /^.*[A-Z]+.*$/.test(val), "should contain at least one capital letter")
        .addValidator(val => /^.*[0-9]+.*$/.test(val), "should contain at least one digit")
        .addValidator(val => /^.*[~!@#$%^&*]+.*$/.test(val), "should contain at least one special (~!@#$%^&*) char"),
    InputData.create('passwordConfirm', 'password')
]

//form.find(item=>item.name==='passwordConfirm')?.eq(form.find(item=>item.name==='password')?.value!)


const Register = () => {

    //const [registerUser, {isLoading, error, isError, isSuccess}] = useRegisterUserMutation();

    const [former, setFormer] = useState(initialState)
    const navigate = useNavigate();

    // const {
    //     reset,
    //     handleSubmit,
    //     formState: {isSubmitSuccessful},
    // } = methods;

    // useEffect(() => {
    //     if (isSuccess) navigate('/profile')
    //
    //     if (isError) {
    //         console.log(error);
    //     }
    // }, [isLoading])

    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset();
    //     }
    // }, [isSubmitSuccessful]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const name = e.target.name
        setFormer((state) => {
            const [...temp] = state
            const obj = temp.find(item => item.name === name)
            if (obj) {
                obj.value = val
                return temp
            }
            return state
        })
    }

    return (

        <Box>
            <form id={"register-form"}>
                {former.map(item => <input type={item.type} name={item.name} value={item.value}
                                           onChange={changeHandler}/>)}

                <button type={"submit"}>Submit</button>
            </form>
        </Box>
    );
};

export default Register;