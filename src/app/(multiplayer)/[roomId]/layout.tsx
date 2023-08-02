"use client";
import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fade = cssTransition({
    enter: "animate__animated animate__fadeInDownBig",
    exit: "animate__animated animate__fadeOutUp",
  });
  return (
    <div>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2500}
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
