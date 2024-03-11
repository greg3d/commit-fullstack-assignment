import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useEffect,
    useRef,
    useState
} from 'react';
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
    error: string = ""
    confirm: string = ""

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

    addConfirm = (field: string) => {
        this.confirm = field;
        return this;
    }

    getErrorMessage = () => {
        return this.error === "" ? false : this.error
    }

    setValue = (val: string) => {
        val = val.trim();
        if (val !== this.value) this.value = val;
    }

    validate = () => {
        for (let i = 0; i < this.validators.length; i++) {
            const validator = this.validators[i]
            if (!validator.fun(this.value)) {
                this.error = validator.message;
                return false;
            }
        }
        this.error = ""
        return true;
    }


    // shitty method
    eq = (val: string) => {
        if (this.value !== val) {
            this.error = this.name + " must be equal to password"
            return false;
        } else {
            this.error = ""
            return true;
        }
    }
}

export const validateForm = (form: InputData[]) => {
    let ret = true;
    form.forEach(field => {
        if (field.confirm !== "") {
            if (!field.eq(form.find(item => item.name === field.confirm)?.value!)) {
                ret = false
            }
            //
        } else {
            ret = field.validate() ? ret : false
        }
    });
    return ret;
}

const initialState: InputData[] = [
    InputData.create('username', 'text')
        .addValidator(val => val.length > 1, 'Enter username')
        .addValidator(val => val.length < 32, 'Username too long')
        .addValidator(val => /^[A-z]+([a-zA-Z0-9])*$/.test(val), 'Username should start with letter, and should not contain white spaces'),
    InputData.create('phone', 'text')
        .addValidator(val => val.length > 0, 'enter phone')
        .addValidator(val => val.length > 6, 'phone too short')
        .addValidator(val => val.length < 20, 'phone too long')
        .addValidator(val => /^[+0-9]([0-9]*(-|\s)?[0-9]+)*[0-9]$/.test(val), "wrong phone format"),
    InputData.create('password', 'password')
        .addValidator(val => val.length >= 1, 'enter password')
        .addValidator(val => val.length >= 6, 'password too short')
        .addValidator(val => val.length <= 16, 'password too long')
        .addValidator(val => /^.*[A-Z]+.*$/.test(val), "should contain at least one capital letter")
        .addValidator(val => /^.*[0-9]+.*$/.test(val), "should contain at least one digit")
        .addValidator(val => /^.*[~!@#$%^&*]+.*$/.test(val), "should contain at least one special (~!@#$%^&*) char"),
    InputData.create('passwordConfirm', 'password')
        .addConfirm('password')
]

const Register = () => {

    const [registerUser, {isLoading, error, isError, isSuccess}] = useRegisterUserMutation();

    const [former, setFormer] = useState(initialState)
    const [allow, setAllow] = useState(true)
    const navigate = useNavigate();
    const registerForm = useRef<HTMLFormElement>(null)

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
            setAllow(flag)
            return temp;
        })
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAllow(validateForm(former));
        const obj: Record<string, any> = {};
        const data = former.map((item) => {
            if (item.confirm === "") {
                obj[item.name] = item.value
            }
        })

        if (allow) registerUser(obj as IRegisterUser);
    }

    return (
        <Box>
            <form id={"register-form"} ref={registerForm} onSubmit={submitHandler}>
                {former.map(item => <CustomInput
                    key={item.name}
                    type={item.type}
                    name={item.name}
                    value={item.value}
                    errorMessage={item.error}
                    onChange={changeHandler}/>)}

                <button disabled={!allow} type={"submit"}>Submit</button>
            </form>
        </Box>
    );
};

export default Register;

const CustomInput = ({type, name, value, errorMessage, onChange}: {
        type: string
        name: string
        value: string
        errorMessage: string | boolean
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
        return (
            <div>
                <input type={type} name={name} value={value}
                       onChange={onChange}/>
                <div>{errorMessage}</div>

            </div>
        );
    }
;
