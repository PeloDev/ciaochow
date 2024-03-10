import toast, { Toast, ToastOptions, Toaster } from "react-hot-toast";

export const defaultOptions: ToastOptions = {
  duration: 3000,
  position: "top-center",

  // Styling
  style: {},
  className: "",

  // Custom Icon
  //   icon: "ℹ️",

  // Change colors of success/error/loading icon
  //   iconTheme: {
  //     primary: "#000",
  //     secondary: "#fff",
  //   },

  // Aria
  //   ariaProps: {
  //     role: "status",
  //     "aria-live": "polite",
  //   },
};

const defaultToastStyle: ToastOptions["style"] = {
  textAlign: "center",
  color: "white",
};
const errorIcons = ["🙅", "👎", "😕", "😔", "🫣", undefined];
const successIcons = ["👌", "👍", "😎", "🥳", "🚀", undefined];

export function notifyErrorToast(message: string, options?: ToastOptions) {
  toast.error(message, {
    ...defaultOptions,
    icon: errorIcons[Math.floor(Math.random() * errorIcons.length)],
    // className: "bg-red-600 text-white", // TODO: can we use Tailwind?
    style: {
      ...defaultToastStyle,
      backgroundColor: "red",
    },
    ...options,
  });
}

export function notifySuccessToast(message: string, options?: ToastOptions) {
  toast.success(message, {
    ...defaultOptions,
    icon: successIcons[Math.floor(Math.random() * successIcons.length)],
    // className: "bg-green-500 text-white", // TODO: can we use Tailwind?
    style: {
      ...defaultToastStyle,
      backgroundColor: "green",
    },
    ...options,
  });
}
