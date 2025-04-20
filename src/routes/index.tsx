import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import { lazy, Suspense } from "react";
import PublicRoute from "./publicRoute";
const Home = lazy(() => import("../pages/home/Home"));
const Order = lazy(() => import("../pages/order/Order"));
const OrderList = lazy(() => import("../pages/order/OrderList"));
const TableList = lazy(() => import("../pages/table/TableList"));
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            element: (
              <Suspense fallback={<div>Loading..</div>}>
                <Home />
              </Suspense>
            ),
            path: "/",
          },
          {
            element: (
              <Suspense fallback={<div>Loading..</div>}>
                <Order />
              </Suspense>
            ),
            path: "/serving/orders/add",
          },
          {
            element: (
              <Suspense fallback={<div>Loading..</div>}>
                <OrderList />
              </Suspense>
            ),
            path: "/serving/orders",
          },
          {
            element: (
              <Suspense fallback={<div>Loading..</div>}>
                <TableList />
              </Suspense>
            ),
            path: "/serving/orders/tables",
          },
        ],
      },
    ],
  },
]);

export default router;
