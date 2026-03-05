import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/fir-196c7/us-central1/api",
    //Deployed on render or for with out Credit Card
    baseURL: "https://amazon-api-deploy-1-hcln.onrender.com",
    
})

export {axiosInstance};