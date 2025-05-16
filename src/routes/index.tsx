import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import { lazy, Suspense } from "react";
import PublicRoute from "./publicRoute";
import Loading from "@/components/ui/loading";
import ReservedTable from "@/pages/table/ReservedTable";
import OrderDetail from "@/pages/order/OrderDetail";
const Home = lazy(() => import("../pages/home/Home"));
const Order = lazy(() => import("../pages/order/Order"));
const OrderList = lazy(() => import("../pages/order/OrderList"));
const TableList = lazy(() => import("../pages/table/TableList"));
const TimeTable = lazy(() => import("../pages/time/TimeSheet"));
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
                <OrderList />
              </Suspense>
            ),
            path: "/serving/orders",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <OrderDetail />
              </Suspense>
            ),
            path: "/serving/orders/:orderId",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <ReservedTable />
              </Suspense>
            ),
            path: "/serving/orders/tables/resevse-table",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Order />
              </Suspense>
            ),
            path: "/serving/orders/tables/:tableId",
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
            path: "/timesheet",
          },
        ],
      },
    ],
  },
]);

export default router;
