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
    auth: IAuth,
    profile: IProfile | undefined,
    isLoading: boolean,
    error: any
}

type IRegisterUser = Omit<IProfile, 'id'> & { password: string }

interface IGenericResponse {
    status: string;
    message: string;
}