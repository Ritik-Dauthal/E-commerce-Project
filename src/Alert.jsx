import React from "react";
import { CgDanger } from "react-icons/cg";
import { BiCheckCircle } from "react-icons/bi";
import AlertUser from "./AlertUser";
import { useEffect } from "react";

const themeMap = {
  success: {
    color: "bg-green-500",
    Icon: BiCheckCircle,
  },
  failed: {
    color: "bg-red-400",
    Icon: CgDanger,
  },
};

const Alert = ({ alert, removeAlert }) => {
  useEffect(() => {
    if (alert) {
      const TimeOut = setTimeout(removeAlert, 4 * 1000);
      return () => {
        clearTimeout(TimeOut);
      };
    }
  }, [alert]);
  if (!alert) {
    return <></>;
  }

  const { message, type } = alert;
  const { Icon, color } = themeMap[type];

  return (
    <div>
      <div className="flex items-center justify-center px-4 space-y-5">
        <div
          role="alert"
          id="alert"
          className="flex flex-col items-center justify-between w-full py-4 mx-auto transition duration-150 ease-in-out bg-blue-300 rounded shadow lg:w-11/12 dark:bg-gray-800 md:py-0 md:flex-row"
        >
          <div className="flex flex-col items-center md:flex-row">
            <div
              className={
                "p-4 mr-3 text-white rounded md:rounded-tr-none md:rounded-br-none " +
                color
              }
            >
              <Icon />
            </div>
            <p className="mt-2 mr-2 text-base font-bold text-gray-800 dark:text-gray-100 md:my-0">
              {type}
            </p>
            <div className="hidden w-1 h-1 mr-2 bg-gray-300 rounded-full dark:bg-gray-700 xl:block"></div>
            <p className="mb-2 text-sm text-center text-black lg:text-base dark:text-gray-400 lg:pt-1 xl:pt-0 sm:mb-0 sm:text-left">
              {message}
            </p>
          </div>
          <div className="flex justify-center pr-4 xl:items-center lg:items-center sm:justify-end">
            <button
              className="text-sm text-black cursor-pointer focus:outline-none focus:text-gray-400 hover:text-gray-400 dark:text-gray-400"
              onClick={removeAlert}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlertUser(Alert);
