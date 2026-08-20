import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout.jsx';
import { Cart } from '../pages/Cart.jsx';
import { Checkout } from '../pages/Checkout.jsx';
import { Home } from '../pages/Home.jsx';
import { Login } from '../pages/Login.jsx';
import { NotFound } from '../pages/NotFound.jsx';
import { OrderHistory } from '../pages/OrderHistory.jsx';
import { ProductDetail } from '../pages/ProductDetail.jsx';
import { Profile } from '../pages/Profile.jsx';
import { Register } from '../pages/Register.jsx';
import { Shop } from '../pages/Shop.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'shop/:slug', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'checkout', element: <Checkout /> },
          { path: 'profile', element: <Profile /> },
          { path: 'profile/orders', element: <OrderHistory /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
