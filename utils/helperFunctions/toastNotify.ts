import { toast, ToastPosition, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastNotifyProps {
    type?: string,
    message?: string,
    position?: ToastPosition
}

export function ToastNotify({type = "default", message = "", position = "top-right"}: ToastNotifyProps) {

  const body: ToastOptions = {
    position,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  }

  switch (type) {
    case "success":
      toast.success(message, body);
      break;

    case "error":
      toast.error(message, body);
      break;

    case "info":
      toast.info(message, body);
      break;

    case "warning":
      toast.warning(message, body);
      break;

    case "dark":
      toast.dark(message, body);
      break;

    default:
      toast.info(message, body);
      break;
  }

}