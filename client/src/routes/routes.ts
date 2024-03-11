import Layout from "../pages/Layout";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

export const routes = [
    {
        path: "/",
        Component: Layout,
        children: [
            {
                name: "Form",
                path: "/",
                index: true,
                Component: Register
            },
            {
                name: "User",
                path: "/profile",
                Component: Profile
            }
        ]
    }
]