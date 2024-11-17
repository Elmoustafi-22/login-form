import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const showToast = (msg: any, type = "default") => {
    switch(type){
        case "success":
            toast.success(msg);
            break;
        case "error":
            toast.error(msg);
            break;
        default:
            toast(msg);
            break;
    }
}

const Notify = () => {
    return <ToastContainer autoClose={2000} />
}

export default Notify;