import { useState } from "react";
import Axios from "axios";

function Api() {
  const [ price, setPrice] = useState("")
  const getPrice = () => {
    Axios.get("https://api.dexscreener.io/latest/dex/tokens/0xd6CDd609aE911FD35F5e13e76242eA33902500d0").then(
      (response) => {
        console.log(response)
        setPrice(response.data.pairs[0].priceUsd + " USD");
      }
    );
  };
  return (
    <div>
      <h1> {getPrice}</h1>
      <h2> USD: {price}</h2>

    </div>
  );
}

export default Api;
export const price = "";