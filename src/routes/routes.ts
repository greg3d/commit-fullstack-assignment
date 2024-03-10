import Layout from "../pages/Layout";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

export const routes = [
    {
        path: "/",
        Component: Layout,
        children: [
            {
                name: "User Register",
                path: "/",
                index: true,
                Component: Register
            },
            {
                name: "My Profile",
                path: "/profile",
                Component: Profile
            }
        ]
    }
]