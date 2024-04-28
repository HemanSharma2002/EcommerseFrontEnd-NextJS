import axios from "axios";

const backend=axios.create(
    {
        baseURL:"http://localhost:8085"
    }
)
export function addTokenToBaseUrl(token){
    backend.interceptors.request.use((config)=>{
        config.headers.Authorization=token
        // console.log(t0.
        return config
    })
}
export function removeTokenFromBaseUrl(){
    const intercept=axios.interceptors.request.use(config=>{

    })
    backend.interceptors.request.eject(intercept)
}
export default backend