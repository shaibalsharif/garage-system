import { toast } from "react-toastify";

export const showToast = ({ message = "", type = 'success', position = 'BOTTOM_RIGHT', }) => {
    toast[type](message,{
        position:toast.POSITION[position]
    })
    // switch (type) {
    //     case 'success':

    //         break;
    //     case 'error':

    //         break;
    //     case 'warning':

    //         break;
    //     case 'info':

    //         break;

    // }
    // toast.success("Success Notification !", {
    //     position: toast.POSITION.TOP_RIGHT,
    // });

    // toast.error("Error Notification !", {
    //     position: toast.POSITION.TOP_CENTER,
    // });

    // toast.warning("Warning Notification !", {
    //     position: toast.POSITION.TOP_LEFT,
    // });

    // toast.info("Information Notification !", {
    //     position: toast.POSITION.BOTTOM_CENTER,
    // });

    // toast("Default Notification !", {
    //     position: toast.POSITION.BOTTOM_LEFT,
    // });

    // toast("Custom Style Notification with css class!", {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     className: "foo-bar",
    // });
}