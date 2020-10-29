import axios from "axios";
import dotenv from "dotenv";

const instance = axios.create();
dotenv.config();

instance.defaults.baseURL = process.env.REACT_APP_API_PATH;

export default instance;