import axios from "axios";
import { ethers } from "ethers";

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_ENDPOINT = process.env.NEXT_PUBLIC_ETHERSCAN_ENDPOINT;
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const INFURA_ENDPOINT = process.env.NEXT_PUBLIC_INFURA_ENDPOINT;

//GET_CONTRACT_ABI
export const GET_CONTRACT_ABI = async (CONTRACT_ADDRESS) => {
  try {
    const GET_CONTRACT_ABI_DATA = await axios.get(
      `${ETHERSCAN_ENDPOINT}?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
    );
    return GET_CONTRACT_ABI_DATA;
  } catch (error) {
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
    console.log(error);
  }
};

//GET_CONTRACT_SOURCE_CODE
export const GET_CONTRACT_SOURCE_CODE = async (CONTRACT_ADDRESS) => {
  try {
    const GET_CONTRACT_SOURCE_CODE_DATA = await axios.get(
      `${ETHERSCAN_ENDPOINT}?module=contract&action=getsourcecode&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
    );
    return GET_CONTRACT_SOURCE_CODE_DATA;
  } catch (error) {
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
    console.log(error);
  }
};

//GET_CONTRACT_CREATOR
export const GET_CONTRACT_CREATOR = async (CONTRACT_ADDRESS) => {
  try {
    const GET_CONTRACT_CREATOR_DATA = await axios.get(
      `${ETHERSCAN_ENDPOINT}?module=contract&action=getcontractcreation&contractaddresses=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
    );
    return GET_CONTRACT_CREATOR_DATA;
  } catch (error) {
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
    console.log(error);
  }
};

export const ENS_NAME = async (ADDRESS) => {
  try {
    //GET LATEST BLOCK
    const PROVIDER = new ethers.providers.JsonRpcProvider(
      `${INFURA_ENDPOINT}${INFURA_API_KEY}`
    );
    const ESN = await PROVIDER.lookupAddress(ADDRESS);
    return ESN;
  } catch (error) {
    console.log(error);
  }
};

//ETHER_LATEST_PRICE
export const ETHER_LATEST_PRICE = async () => {
  try {
    const ETHER_LATEST_PRICE_DATA = await axios.get(
      `${ETHERSCAN_ENDPOINT}?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`
    );
    return ETHER_LATEST_PRICE_DATA;
  } catch (error) {
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
    console.log(error);
  }
};
