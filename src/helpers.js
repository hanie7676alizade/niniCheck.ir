import axios from "store/Test/node_modules/axiosInstance";
import store from "store/reducer";

export const addAxiosAuthorization = () => {
    axios.interceptors.request.use((request) => {
        const newRequest = {...request}
        const auth = store.getState().Auth.auth;
        if (auth && auth.check){
            const token = auth.getToken();

            newRequest.headers.authorization = "Bearer " + token.token;
        }

        return Promise.resolve(newRequest);
    });
}

export const getSectionData = (dataStore , section) => {
    let output = ''
    if (Array.isArray(dataStore)){
        const data = dataStore.find(item => item.key === section)
        if (data) output = data.value
    }
    return output
}

export const stripHtml = (str,characterCount=200) => {
    return str.replace(/(<([^>]+)>)/ig,"").slice(0,characterCount);
}