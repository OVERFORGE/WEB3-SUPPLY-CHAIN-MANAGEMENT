import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";
import axios from "axios";

const isUser = async (address) => {
  console.log("Call reached here");
  console.log(backendUrl);
  if (address) {
    console.log(address);
    const walletAddress = address;
    const res = await axios.post(backendUrl + "/api/v1/users/is-user", {
      walletAddress,
    });
    console.log("Call reached here 2");
    console.log(res.data);
    if (res.data.success) {
      return true;
    }
  }
};

function App() {
  return (
    <>
      <ConnectWallet />
    </>
  );
}
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ConnectWallet = () => {
  const { address } = useAccount();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  if (address) {
    const userCheck = isUser(address);
    console.log(userCheck);
    if (userCheck) {
      return (
        <div>
          Wallet Connected Successfully and User is logged in <br />{" "}
          <div>
            Connected to {address} <br />
            <button
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      {connectors.map((connector) => (
        <button onClick={() => connect({ connector: connector })}>
          Connect Via {connector.name}
        </button>
      ))}
    </div>
  );
};

export default App;
