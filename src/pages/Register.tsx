import type {ChangeEvent, FormEvent} from 'react';
import React, {useEffect, useRef, useState} from 'react';
import {useRegisterUserMutation} from "../store/userApiSlice";
import {
    Box,
    Button,
} from "@mui/material";
import {InputData, validateForm} from "../helpers/inputData";
import CustomInput from "../components/CustomInput";
import type {RootState} from "../store/store";
import {useAppDispatch, useAppSelector} from "../store/store";
import {setError} from "../store/mainSlice";

// custom form description array with validators
const initialState: InputData[] = [
    InputData.create('username', 'text')
        .addValidator(val => val.length > 1, 'Username is required')
        .addValidator(val => val.length < 32, 'Username too long')
        .addValidator(val => /^[A-z]+([a-zA-Z0-9])*$/.test(val), 'Username should start with letter, and should not contain white spaces'),
    InputData.create('phone', 'text')
        .addValidator(val => val.length > 0, 'Phone is required')
        .addValidator(val => val.length > 5, 'Phone too short')
        .addValidator(val => val.length < 20, 'Phone too long')
        .addValidator(val => /^[+0-9]([0-9]*(-|\s)?[0-9]+)*$/.test(val), "Wrong phone format")
        .addValidator(val => [...val].filter(a => (/[0-9]/.test(a))).length <= 10, "Only 10 digits allowed"),
    InputData.create('password', 'password')
        .addValidator(val => val.length >= 1, 'Password is required')
        .addValidator(val => val.length >= 6, 'Password too short')
        .addValidator(val => val.length <= 10, 'Password too long')
        .addValidator(val => /^.*[A-Z]+.*$/.test(val), "Should contain at least one capital letter")
        .addValidator(val => /^.*[0-9]+.*$/.test(val), "Should contain at least one digit")
        .addValidator(val => /^.*[~!@#$%^&*]+.*$/.test(val), "should contain at least one special (~!@#$%^&*) char"),
    InputData.create('passwordConfirm', 'password')
        .addConfirm('password')
]

const Register = () => {

    const dispatch = useAppDispatch();
    const {auth} = useAppSelector((state: RootState) => state.mainSlice)

    const [registerUser, {isError, isSuccess}] = useRegisterUserMutation();
    const [former, setFormer] = useState(initialState)
    const registerForm = useRef<HTMLFormElement>(null)
    let allow = useRef<boolean>(true);

    useEffect(() => {
        if (isSuccess) {
            setFormer(initialState)
            dispatch(setError(auth.username + ", you successfully registered! Token saved to state. Please proceed to next tab."))
            //navigate("profile")
        }
    }, [isSuccess, isError])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const name = e.target.name;
        setFormer((state) => {
            const [...temp] = state;
            const obj = temp.find(item => item.name === name);
            if (obj) {
                if (obj.value !== val) {
                    obj.value = val;
                    obj.validate();
                }
            }
            let flag = true
            temp.forEach(field => flag = field.error !== "" ? false : flag)
            allow.current = flag
            return temp;
        })
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormer((state) => {
            let temp = [...state];
            allow.current = validateForm(temp)
            return temp;
        })
        if (allow.current) {
            const obj: Record<string, any> = {};
            former.forEach((item) => {
                if (item.confirm === "") {
                    obj[item.name] = item.value
                }
            })
            registerUser(obj as IRegisterUser);
        }
    }

    return (
        <form id={"register-form"} ref={registerForm} onSubmit={submitHandler}>
            <Box>
                {former.map(item => <CustomInput
                    key={item.name}
                    type={item.type}
                    name={item.name}
                    value={item.value}
                    errorMessage={item.error}
                    onChange={changeHandler}/>)}
            </Box>
            <Button variant={"contained"} size={"large"} disabled={!allow.current}
                    type={"submit"}>Submit</Button>
        </form>
    );
};

export default Register;