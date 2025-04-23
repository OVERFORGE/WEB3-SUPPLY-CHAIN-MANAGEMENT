import { http, createConfig } from "wagmi";
import { sepolia, goerli } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
export const config = createConfig({
  connectors: [injected(), metaMask()],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/m9kOW5RTuFJtplq-IwfPhCuvs6IIdAaZ"
    ),
  },
});
