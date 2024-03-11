interface IProfile extends Record<string, number | string>{
    id: number
    username: string
    phone: string
}

interface IAuth {
    username: string
    token: string
}

interface IState {
    auth: IAuth
    profile: IProfile | undefined
    isLoading: boolean
    error: string
    tab: number
}

type IRegisterUser = Omit<IProfile, 'id'> & { password: string }

interface IValidator {
    fun: (val: string) => boolean
    message: string
}


interface IGenericResponse {
    status: string;
    message: string;
}