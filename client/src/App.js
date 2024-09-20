import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  InputAdornment,
} from "@mui/material";
import Task from "./Task";
import "./App.css";
import logo from "../src/assets/ccp-logo.png";
import NumberFormatInput from "./components/NumberFormatInput";

import { TaskContractAddress } from "./config.js";
import { ethers } from "ethers";
import TaskAbi from "./utils/TaskContract.json";
import TopNav from "./components/TopNav";
import SpreadMeter from "./components/SpreadMeter";
import BidsTable from "./components/BidsTable";
const navigationItems = [];

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const getAllTasks = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        let allTasks = await TaskContract.getMyTasks();
        console.log("allTasks", allTasks);
        setTasks(allTasks);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const sepolia = "0xaa36a7";

      if (chainId !== sepolia) {
        alert("You are not connected to the Rinkeby Testnet!");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const addBids = async (e) => {
    if (input && input2) {
      e.preventDefault();

      let task = {
        askingAmount: input,
        spread: input2,
        isDeleted: false,
      };

      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TaskContract = new ethers.Contract(
            TaskContractAddress,
            TaskAbi.abi,
            signer
          );

          TaskContract.addBids(task.askingAmount, task.spread, task.isDeleted)
            .then((response) => {
              setTasks([...tasks, task]);
              console.log("Completed Task");
            })
            .catch((err) => {
              console.log("Error occured while adding a new task");
            });
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log("Error submitting new Tweet", error);
      }

      setInput("");
      setInput2("");
    }
  };

  const deleteTask = (key) => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        let deleteTasks = await TaskContract.deleteTask(key, true);
        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TopNav
        logo={logo}
        user="Haris"
        navigationItems={navigationItems}
        company="Santander Group"
        totalAmount="12,000,000"
        Spread="120 - 180"
        launch={currentAccount}
      />
      {currentAccount === "" ? (
        <Box sx={{ marginLeft: "20%", marginTop: "8%" }}>
          <Typography variant="h4">
            Experience the Future of Secondary Bond Trading with decentralized
            application (dapp)
          </Typography>
          <Typography sx={{ color: "grey" }}>
            Add your Metamask wallet to use this app
          </Typography>

          <Button
            variant="contained"
            color="warning"
            className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
            onClick={connectWallet}
            sx={{ mt: 2 }}
          >
            Connect Wallet
          </Button>
        </Box>
      ) : correctNetwork ? (
        <div className="App">
          <Grid
            container
            justifyContent="center"
            spacing={2}
            sx={{ marginLeft: "100px" }}
          >
            <Grid item xs={4}>
              <Box
                sx={{
                  mt: 5,
                  p: 3,
                  border: "1px solid #e3e3e3",
                }}
              >
                <Typography variant="h6">
                  <b>Trending</b> Clearing Spread
                </Typography>
                <Typography>Live During the Auction</Typography>
                <SpreadMeter
                  min="120"
                  max="180"
                  value="172"
                  metric="SPREAD"
                  size="small"
                />
              </Box>
              <br />
              <BidsTable tasks={tasks} />
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  width: "50%",
                  mt: 5,
                  pt: 3,
                  pb: 3,
                  background:
                    "radial-gradient(99.69% 80.35% at -3.85% 23.76%, #2F1468 0%, #402CC0 49.13%, #0D87DF 100%)",
                }}
              >
                <Typography
                  sx={{ color: "white", fontWeight: "600", fontSize: "20px" }}
                >
                  Place a New Bid on Decentralized Network
                </Typography>
                <Card
                  sx={{
                    mt: 1,
                    pt: 1,
                    pb: 2,
                    p: 1,
                    width: "90%",
                    margin: "auto",
                    background: "white",
                  }}
                >
                  <br />
                  <NumberFormatInput
                    label="Amount"
                    onChange={setInput}
                    value={input}
                    InputProps={{
                      inputProps: {
                        step: "1",
                      },
                      endAdornment: (
                        <InputAdornment position="end">M</InputAdornment>
                      ),
                    }}
                  />

                  <br />
                  <TextField
                    label="Spread"
                    variant="outlined"
                    size="small"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    sx={{ background: "#f5f5f5" }}
                    InputProps={{
                      inputProps: {
                        step: "1",
                      },
                      endAdornment: (
                        <InputAdornment position="end">B</InputAdornment>
                      ),
                    }}
                  />
                  <br />
                </Card>
                <br />
                <Button variant="contained" color="warning" onClick={addBids}>
                  Submit Bid
                </Button>
              </Card>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>----------------------------------------</div>
          <div>Please connect to the Sepolia Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
    </div>
  );
}

export default App;
