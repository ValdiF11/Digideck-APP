import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Login from "../pages/login";
import Chat from "../pages/AIchat";
import Register from "../pages/addUser";
import MainLayout from "../components/mainLayout";
import Menu from "../pages/digicards";
import Deck from "../components/deck";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.acces_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/deck",
        element: <Deck />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
