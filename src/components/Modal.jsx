import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ isOpen, onClose, title, children }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={onClose}>
                <div className="fixed inset-0 bg-black/60" />
                <div className="bg-black p-12 shadow-lg rounded-3xl z-50 w-4/5">
                    <Dialog.Title className="text-3xl lg:text-4xl font-bold mb-4 text-white text-center">
                        {title}
                    </Dialog.Title>
                    {children}
                    <button
                        className="mt-6 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-xl"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </Dialog>
        </Transition>
    );
}