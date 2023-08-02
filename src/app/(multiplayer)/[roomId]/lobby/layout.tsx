"use client";

import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fade = cssTransition({
    enter: "animate__animated animate__fadeInDownBig",
    exit: "animate__animated animate__fadeOutUpBig",
  });
  return (
    <div>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={fade}
      />
    </div>
  );
}
