import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Layout from "./pages/layout/Layout"
import Products from "./pages/products/products"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
])
