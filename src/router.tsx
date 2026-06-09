import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Layout from './pages/layout/Layout'
import ProductList from './pages/ProductList/ProductList'
import Cart from './pages/Cart/Cart'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
])
