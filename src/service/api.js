import axios from "axios"
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config"
import { getAccessToken } from "../utils/common-utils"
const API_URL= 'https://blogs-backend-alpha.vercel.app/'

const axiosInstance= axios.create({
    baseURL: API_URL,
    timeout: 10000,
//     headers:{
//         "Accept": "application/json, form-data", 
// "Content-Type": "application/json"
//     }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //Stop global loader heree
        console.log("bkk")
        return processResponse(response);
    },
    function(error){
        //STop global loader here.
        console.log("tmkc")
        return Promise.reject(ProcessError(error));
    }
)
///


const processResponse = (response)=>{
    console.log("Jaldi wahan se hato")
    if(response?.status===200){
        return {isSuccess: true, data: response.data}

    }
    else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

// const ProcessError = async(error)=>{

//     if(error.response){
        
//         console.log('ERROr in response: ',error.toJSON());
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.responseFailure,
//             code: error.response.status
//         }
//     }else if(error.request){
//         console.log('ERROr in Request: ',error.toJSON());
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.requestFailure,
//             code: ""
//         }
//     }
//     else{
//         console.log('ERROr in Network: ',error.toJSON());
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.networkError,
//             code: ""
//         }
//     }
// }

const ProcessError = async (error) => {
    if (error.response) {
      console.log('Error in response:', error.response);
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status,
      };
    } else if (error.request) {
      console.log('Error in Request:', error.request);
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.requestFailure,
        code: "",
      };
    } else {
      console.log('Error in Network:', error);
      // Check if the error is an instance of AxiosError and has the toJSON method
      if (error instanceof Error && typeof error.toJSON === 'function') {
        return {
          isError: true,
          msg: API_NOTIFICATION_MESSAGES.networkError,
          code: "",
        };
      } else {
        // If not an AxiosError, create a custom error object
        return {
          isError: true,
          msg: "Unknown Error",
          code: "",
        };
      }
    }
  };
  

const API={};

for(const [key,value] of Object.entries(SERVICE_URLS)){

    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url: value.query ? `${value.url}/${body.id}` : value.url,
            data: body,
            responseType: value.responseType,
            headers:{
              authorization: getAccessToken()
            },
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })

}

export {API};