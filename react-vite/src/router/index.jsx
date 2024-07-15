import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage'
import UserPage from '../components/UserPage'
import Notebooks from '../components/Notebooks'
import CreateNotebookModal from '../components/CreateNotebookModal'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "user",
        element: <UserPage />
      },
      {
        path: "notebooks",
        element: <Notebooks />
      }
      {
        path: "notebooks/create",
        element: <CreateNotebookModal />
      }
    ],
  },
]);
