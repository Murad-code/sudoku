import { toast } from "react-toastify";

export const handleTimeout = () => {
  toast.error("Timeout: refresh the page to reconnect to server", {
    autoClose: false,
  });
};
