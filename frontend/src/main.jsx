import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WagmiProvider } from "wagmi";
import { config } from "./config.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();
createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
);
