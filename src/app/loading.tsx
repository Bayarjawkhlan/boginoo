"use client";

import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

interface loadingProps {}

const loading: FC<loadingProps> = () => {
  return (
    <div className="flex h-[100dvh] w-screen items-center justify-center">
      <Transition.Root show as={Fragment}>
        <Dialog as="div" className={"relative z-[100]"} onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveTo="opacity-0"
            leaveFrom="opacity-100"
          >
            <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel>
                <ClipLoader size={40} className="text-black dark:text-white" />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default loading;
