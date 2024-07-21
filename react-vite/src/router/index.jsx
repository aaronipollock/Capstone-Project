import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage'
import UserPage from '../components/UserPage'
import Notebooks from '../components/Notebooks'
import CreateNotebookModal from '../components/CreateNotebookModal'
import UpdateNotebookModal from '../components/UpdateNotebookModal';
import DeleteNotebookModal from '../components/DeleteNotebookModal';
import Notes from '../components/Notes'
import CreateNoteModal from '../components/CreateNoteModal';
import UpdateNoteModal from '../components/UpdateNoteModal';
import DeleteNoteModal from '../components/DeleteNoteModal';
import NotebookDetails from '../components/NotebookDetails';
import DeleteNotebookDetailModal from '../components/DeleteNotebookDetailModal/DeleteNotebookDetailModal';

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
        path: "users/current",
        element: <UserPage />
      },
      {
        path: "notebooks",
        element: <Notebooks />
      },
      {
        path: "notebooks/create",
        element: <CreateNotebookModal />
      },
      {
        path: "notebooks/:notebookId/edit",
        element: <UpdateNotebookModal />
      },
      {
        path: "notebooks/:notebookId/delete",
        element: <DeleteNotebookModal />
      },
      {
        path: "notes",
        element: <Notes />
      },
      {
        path: "notes/create",
        element: <CreateNoteModal />
      },
      {
        path: "notes/:noteId/edit",
        element: <UpdateNoteModal />
      },
      {
        path: "notes/:noteId/delete",
        element: <DeleteNoteModal />
      },
      {
        path: "notebooks/:notebookId",
        element: <NotebookDetails />
      },
      {
        path: "note/:noteId",
        element: <DeleteNotebookDetailModal />
      }
    ],
  },
]);
