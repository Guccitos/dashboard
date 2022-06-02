import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import Web3 from 'web3';
import ScareCRO_ico from './Images/ScareCRO_ico.png'
import ScareCRO_side from './Images/ScareCRO_side.png'
import contractAbi, {contractAddress} from './contractabi'
import holdingAbi, {personalAddress} from './HoldingABI'
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as config from "./config.js";
import { ethers } from "ethers";
//import Axios from "axios";


function App() {
  const [account, setAccount] = useState("Meta/Trust")
  const [connectWallet, setConnectWallet] = useState("WalletConnect")
  const [claimrewards, setClaimRewards] = useState('0')
  const [showrewards, setShowRewards] = useState('0')
  const [balance, setBalance] = useState("0");
  const [show, setShow] = useState()
  const [showmeta, setShowMeta] = useState(true);
  const [showwallet, setShowWallet] = useState(true);
  const [showscro, setshowScro] = useState("0");
  /*const [ price, setPrice] = useState("")
  const getPrice = () => {
      Axios.get("https://api.dexscreener.io/latest/dex/tokens/0xd6CDd609aE911FD35F5e13e76242eA33902500d0").then(
        (response) => {
          console.log(response)
          setPrice(response.data.pairs[0].priceUsd * showscro);
        }
      );
    };*/
  
  console.log(account);
  let contractabi = contractAbi;
  let holdingabi = holdingAbi;
  let accountAd;

 /* eslint-disable no-unused-vars */
  const loadWeb3 = async () => {
    setShowWallet(false)
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        console.log("Metamask is not installed, please install it on your browser to connect.");
      }
      if (isConnected === true) {
        let accounts = await getAccounts();
        // setAccount(accounts[0]);
        accountAd = accounts[0];
        setAccount(accountAd);
        let accountDetails = null;
        window.ethereum.on("accountsChanged", function (accounts) {
          // setAccount(accounts[0]);
          accountAd = accounts[0];
          setAccount(accountAd);
          // console.log(accounts);
        });
        getData();
        // getmarketwatch();
      }
    } catch (error) {
      console.log("Error while connecting metamask", error);
    }
  };
 /* eslint-disable no-unused-vars */
  const getAccounts = async () => {
    const web3 = window.web3;
    try {
      let accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      return accounts;
    } catch (error) {
      console.log("Error while fetching acounts: ", error);
      return null;
    }
  };


  const getData = async () => {
    try {
      // https://bsc-dataseed.binance.org/
      const web3 = window.web3;
      // const web3 = new Web3('https://bsc-dataseed.binance.org/');
      let contract = new web3.eth.Contract(contractabi, contractAddress);
      let contract1 = new web3.eth.Contract(holdingabi, personalAddress);
      // console.log("data", web3);
      // claimRewards

      console.log("account",account, accountAd);
      let claimRewards = await contract.methods.shares(accountAd).call();

      //setClaimRewards(web3.utils.fromWei(claimRewards))

      let showRewards = await contract.methods.getUnpaidEarnings(accountAd).call();
      //setShowRewards(web3.utils.fromWei(showRewards))
     
      let balanceof = await contract.methods.totalDistributed().call();

      let showscro = await contract1.methods.balanceOf(accountAd).call();

      // setClaimRewards(web3.utils.fromWei(claimRewards));
      setBalance(balanceof / 10**9);
      setShowRewards(showRewards / 10**9);
      setClaimRewards(claimRewards[2] / 10**9);
      setshowScro(showscro / 10**9);

    } catch (e) {
      console.log("data", e);
      // avoid mask music love history produce print antenna jacket need glad wait
    }
  }
  
  
  async function voteForCanidate2() {
    try {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi, contractAddress);
      console.log("response", accountAd, account);
      let accountDetails = await contract.methods.claimDividend()
        .send({ from: account })
        .then(async (output) => {
          console.log("response", output);
        }).catch((e) => {
          console.log("response", e);
        });
    } catch (error) {
      console.log("Error while fetching acounts: ", error);

    }

  }
  //walletConnect
  const walletconnect = async () => {
    setShowMeta(false)
    let isConnected = false;
    try {
      // Reset cache
    localStorage.clear();
    const provider = new WalletConnectProvider({
      rpc: {
        [config.configVars.rpcNetwork.chainId]:
          config.configVars.rpcNetwork.rpcUrl,
      },
      // This chainId parameter is not mentioned
      // in the WalletConnect documentation,
      // But is necessary otherwise
      // WalletConnect will connect to Ethereum mainnet
      chainId: config.configVars.rpcNetwork.chainId,
    });
      //  Enable session (triggers QR Code modal)
      await provider.enable();
      const ethersProvider = new 
    ethers.providers.Web3Provider(provider);

      if (provider) {
        window.web3 = new Web3(provider);
        isConnected = true;
      } else {
        isConnected = false;
        // setErrorState(true);
        console.log("This is setErrorState(true)");
        // let options = {};
        // options = {
        //   place: "tr",
        //   message: "wallet connect is not connected",
        //   type: "primary",
        //   icon: "",
        //   autoDismiss: 7,
        // };
        // notificationAlertRef.current.notificationAlert(options);
        // // "Metamask is not installed, please install it on your browser to connect.",
      }
      if (isConnected === true) {
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        web3.eth.net.getId().then((netId) => {
          console.log("(accounts[0], 2)", (accounts))

          setAccount(accounts[0])
          setConnectWallet(accounts[0]);
          accountAd = accounts[0];
          getData();
        switch (netId) {
            case 1:
              // getData(accounts[0], 2);
              console.log("(accounts[0], 2)", (accounts[0], 2))
              console.log("This is mainnet");
              break;
            case 2:
              console.log("This is the deprecated Morden test network.");
              break;
            case 3:
              console.log("This is the ropsten test network.");
              break;
            default:
              console.log("(accounts[0], 2)", (accounts[0], 1))
              // getData(accounts[0], 1);
              console.log("This is an unknown network.");
          }
        });
        // this.props.dispatch(login(accounts[0]));

        window.ethereum.on("accountsChanged", function (accounts) {
          // this.props.dispatch(login(accounts[0]));
          web3.eth.net.getId().then((netId) => {
            switch (netId) {
              case 1:
                // getData(accounts[0], 2);
                console.log("This is mainnet");
                break;
              case 2:
                console.log("This is the deprecated Morden test network.");
                break;
              case 3:
                console.log("This is the ropsten test network.");
                break;
              default:
                // getData(accounts[0], 1);
                console.log("This is an unknown network.");
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
    // setModal(false)
    console.log("setErrorState(true)");
  };

  useEffect(() => {
    setInterval(() => {
        // getData();
    }, 1000);
}, []);

  return (
    <>
      <div className="Main_div">
        <div className="container">
          <div className="text-center pt-3 logoMaindiv d-flex justify-content-between">
            <img className=" " src={ScareCRO_side} alt="logo" />
            {/* <button onClick={loadWeb3} className="btn text-truncate btn-light fw-bolder btnWidth   p-2 fs-5">{account}</button> */}
            {show ?
              <div >
                {showmeta && <button onClick={loadWeb3} className="btn mt-3  mt-md-0 text-truncate mar border border-left-4 btn-light fw-bolder btnWidth   p-2 fs-5">{account}</button>}
                {showwallet && <button onClick={walletconnect} className="btn  mt-3  mt-md-0 marginLeft1  text-truncate btn-light fw-bolder btnWidth   p-2 fs-5">{connectWallet}</button>}
              </div>
              :
              <div>
                <button onClick={() => setShow(true)} className="btn text-truncate btn-light fw-bolder btnWidth   p-2 fs-5">Connect</button>
              </div>
            }
          </div>
          <div class="row d-flex justify-content-center pt-5">
            <div class="col-12 col-lg-6">

              <div class="card  mt-4 mt-md-4">
                <div class="card-body text-center">
                  <div className="d-flex flex-column justify-content-center mt-4">
                    <h1 className=' fw-bolder'>Total SCRO Distributed</h1>
                    <h2 className="text-truncate marginLeft fw-bold">{balance}</h2>
                  </div>
                  <div className="d-flex flex-column justify-content-center mt-4">
                    <h1 className=' fw-bolder'>Your Total Rewards Paid</h1>
                    <h2 className="text-truncate marginLeft fw-bold">{claimrewards}</h2>
                  </div>
                  <div className="d-flex flex-column justify-content-center mt-4">
                    <h1 className=' fw-bolder'>Your Pending SCRO Rewards</h1>
                    <h2 className="text-truncate marginLeft fw-bold">{showrewards}</h2>
                  </div>
                  <div className="d-flex flex-column justify-content-center mt-4">
                    <h1 className=' fw-bolder'>MNSC Balance</h1>
                    <h2 className="text-truncate marginLeft fw-bold">{showscro}</h2>
                  <div className="d-flex flex-column justify-content-center mt-4">
                  </div>
                  
                    
                    {/* <h2 className="text-truncate marginLeft fw-bold">{showrewards}</h2> */}
                  </div>
                </div>
              </div>
              {/* <div class="card  mt-4 mt-md-4">
                <div class="card-body text-center">
                  <div className="d-flex flex-column justify-content-center mt-4">
                    <h1 className=' fw-bolder'>Claimable Cake Rewards</h1>
                    <h2 className="text-truncate marginLeft fw-bold">{claimrewards}</h2>
                  </div>
                </div>
              </div> */}
              { <div class="card  mt-5 mt-md-4">
                <div class="card-body text-center">
                  <div className="d-flex flex-column justify-content-center mt-1">
                    <button className=' fw-bolder btn btn-light p-2 fs-4' onClick={voteForCanidate2}>Claim rewards</button>
                  </div>
                </div>
              </div> }
              {/* <div class="card  mt-4 mt-md-6">
                <div class="card-body text-center">
                  <div className="d-flex flex-column justify-content-center mt-6">
                    <button className=' fw-bolder btn btn-light p-2 fs-4' onClick={getPrice}>USD estimate</button>
                    <h1>${price}</h1>
                    <h2>estimates do not account for taxes, price impact or DEX fees</h2>
                  </div>
                </div>
            </div> */}
              {/* <div class="card  mt-4 mt-md-4">
                <div class="card-body text-center">
                  <div className="d-flex flex-column justify-content-center mt-4">
                    <h1 className=' fw-bolder'>Show rewards</h1>
                    <h2 className="text-truncate marginLeft fw-bold">{showrewards}</h2>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className=" mt-5 logoMaindiv2 pb-2 d-flex justify-content-center align-items-center">
            <img src={ScareCRO_ico} alt="logo" />
            <a href="https://t.me/MiniScareCro"><i class="fab fs-3 marginLeft fa-telegram-plane"></i></a>
            <a href="https://twitter.com/MiniScareCro"><i class="fab fs-3 marginLeft fa-twitter"></i></a>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
