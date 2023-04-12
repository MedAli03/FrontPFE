import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./Admin/DashboardContent";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SingUP";
import Orders from "./Admin/Orders";
import Customers from "./Admin/Customers"
import PressingsList from "./Admin/PressingsList";
const router = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminDashboard/>,
        children: [
            {
                path: 'orders',
                element: <Orders />
            },
            {
                path: 'customers',
                element: <Customers />
            },
            {
                path: 'pressingrequest',
                element: <PressingsList />
            }

        ]
    },

    {
        path: '/login',
        element: <SignIn/>
    },
    {  
        path: '/register',
        element: <SignUp/>
    }

    
])

export default router;