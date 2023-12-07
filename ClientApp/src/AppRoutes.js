import Clients from "./comp/Clients";
import Dashboard from "./comp/Dashboard";
import Loans from "./comp/Loans";
import Reports from "./comp/Reports";

const AppRoutes = [
  {
    index: true,
    element: <Dashboard />
  },
  {
    path: '/clients',
    element: <Clients />
  },
  {
    path: '/loans',
    element: <Loans />
  },
  {
    path: '/reports',
    element: <Reports />
  },
];

export default AppRoutes;
