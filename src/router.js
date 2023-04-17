import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./Admin/DashboardContent";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SingUP";
import Orders from "./Admin/Orders";
import Customers from "./Admin/Customers"
import PressingsList from "./Admin/PressingsList";
import ClientsList from "./Admin/ClientsList";
import Article from "./Admin/Article";
import Home from "./HomePage/Home";
import SignUpPressing from "./Auth/SignUpPressing";
import PressingDashboard from "./Pressing/PressingDashboard";
import OurArticles from "./Pressing/OurArticles";
import Services from "./Pressing/Services";
import Ratings from "./Pressing/Ratings";
import Commandes from "./Pressing/Commandes";
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
            },
            {
                path: 'clients',
                element: <ClientsList />
            },
            {
                path: 'vêtements',
                element: <Article />
            }


        ]
    },
    {
        path: '/pressingdashboard',
        element: <PressingDashboard/>,
        children: [
            {
                path: 'commandes',
                element: <Commandes />
            },
            {
                path: 'services',
                element: <Services />

            },
            {
                path: 'vêtements',
                element: <OurArticles />
            },
            {
                path: 'notation',
                element: <Ratings />
            },


        ]
    },

    {   
        path : '/login',
        element: <SignIn/>
    },
    {  
        path: '/register',
        element: <SignUp/>
    },
    {  
        path: '/pressing/register',
        element: <SignUpPressing/>
    },
    
    {  
         path: '/',
        element: <Home/>,
        exact: true

    },
    
    
])

export default router;