import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./Admin/DashboardContent";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SingUP";

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminDashboard/>
    },
    {
        path: '/login',
        element: <SignIn/>
    },
    {
        path: '/register',
        element: <SignUp/>
    },
    
])

export default router;