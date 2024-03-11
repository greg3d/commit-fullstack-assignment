export class InputData {
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
            if(!field.validate()) {
                ret = false
            }
        }
    });
    return ret;
}