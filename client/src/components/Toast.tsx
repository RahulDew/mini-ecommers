import { MdClose, MdOutlineCancel } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";
import { BsCheck2Circle } from "react-icons/bs";

interface IToast {
  toast: {
    id: string;
    message: string;
    type: "success" | "warning" | "failure";
  };
  removeToast: (toastId: string) => void;
}

const Toast = ({ toast, removeToast }: IToast) => {
  const ToastIcons = [
    {
      type: "success",
      icon: <BsCheck2Circle />,
      color: "green",
    },
    {
      type: "warning",
      icon: <TiWarningOutline />,
      color: "yellow",
    },
    {
      type: "failure",
      icon: <MdOutlineCancel />,
      color: "red",
    },
  ];

  let toastIcon = null;
  let toastIconColor = null;

  ToastIcons.map((ToastIcon) => {
    if (ToastIcon.type === toast.type) {
      toastIconColor = ToastIcon.color;
      toastIcon = ToastIcon.icon;
    }
  });

  return (
    <div className="z-50 fixed max-sm:left-5 max-sm:top-20 sm:bottom-3 sm:right-5 w-48 sm:h-14 sm:w-64 md:w-72 lg:w-96 flex items-center p-0.5 sm:p-2 text-black-700 bg-white border-2 border-black rounded-xl shadow-lg ">
      <div
        style={{ color: toastIconColor ? toastIconColor : "#4f46e5" }}
        className={`text-xl inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg`}
      >
        {toastIcon}
      </div>
      <div className="ml-3 text-xs sm:text-sm font-normal break-all truncate">
        {toast.message}
      </div>
      <button
        onClick={() => removeToast(toast?.id)}
        type="button"
        className="ml-auto text-xl text-gray-400 hover:text-white rounded-lg p-1.5 hover:bg-neutral-900 outline-none inline-flex items-center justify-center h-7 w-7 duration-300"
      >
        <MdClose />
      </button>
    </div>
  );
};

export default Toast;
