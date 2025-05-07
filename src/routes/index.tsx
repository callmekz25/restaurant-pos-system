import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import { lazy, Suspense } from "react";
import PublicRoute from "./publicRoute";
import Loading from "@/components/ui/loading";
const Home = lazy(() => import("../pages/home/Home"));
const Order = lazy(() => import("../pages/order/Order"));
const OrderList = lazy(() => import("../pages/order/OrderList"));
const TableList = lazy(() => import("../pages/table/TableList"));
const TimeTable = lazy(() => import("../pages/time/TimeKeeping"));
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            ),
            path: "/",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Order />
              </Suspense>
            ),
            path: "/serving/orders/add",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <OrderList />
              </Suspense>
            ),
            path: "/serving/orders",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <TableList />
              </Suspense>
            ),
            path: "/serving/orders/tables",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <TimeTable />
              </Suspense>
            ),
            path: "/timekeeping",
          },
        ],
      },
    ],
  },
]);

export default router;
