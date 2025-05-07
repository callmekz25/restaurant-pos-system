import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // Giữ cache 30 phút, không fetch lại nếu chưa hết hạn
      cacheTime: 1000 * 60 * 60, // Dữ liệu cache tồn tại 60 phút trước khi bị xoá
      refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
      refetchOnReconnect: false, // Không fetch lại khi mất mạng rồi có lại
      refetchOnMount: false, // Không fetch lại khi component mount lại
      retry: 2, // Retry API tối đa 2 lần nếu lỗi
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
