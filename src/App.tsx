import {useGetProfileQuery, useRegisterUserMutation} from "./store/userApiSlice";
import {SubmitHandler} from "react-hook-form";

const App = () => {

    const [registerUser, {isLoading}] = useRegisterUserMutation()

    const submit = (e:SubmitHandler) => {

    }

    return (
        <form id={"test"} onSubmit={submit}>
            <input type={"text"} name={"username"}/>
            <input type={"text"} name={"phone"}/>
            <input type={"password"} name={"password"}/>
        </form>
    );

}

export default App
