import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";

const CompleteDialog = () => {
  const { handleRestart, finalTime, isComplete } = useSudokuGridStore();
  const [show, setShow] = useState(isComplete);

  useEffect(() => {
    setShow(isComplete);
  }, [isComplete]);

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShow(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  Puzzle Completed! 🎉
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500 border-t pt-2">
                    Well done, you finished in {finalTime}
                  </p>
                </div>

                <div className="flex space-x-4 mt-4">
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm text-green-700 bg-green-200 border border-transparent rounded-md hover:bg-green-300 duration-300"
                      onClick={handleRestart}
                    >
                      Play Again
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm text-red-700 bg-red-200 border border-transparent rounded-md hover:bg-red-300 duration-300"
                      onClick={() => setShow(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CompleteDialog;
