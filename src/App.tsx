import {useGetProfileQuery} from "./store/userApiSlice";

const App = () => {

    const {data: {profile}, isError, isFetching, refetch} = useGetProfileQuery("df")

    if (isFetching) return <div>fetching....</div>
    if (isError) return <div>ERROR</div>
    if (profile) return <div>{profile.phone} {profile.id}</div>

}

export default App
