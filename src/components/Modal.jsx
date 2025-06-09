import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ isOpen, onClose, title, children }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={onClose}>
                <div className="fixed inset-0 bg-black/60" />
                <div className="bg-white p-6 rounded shadow-lg z-50">
                    <Dialog.Title className="text-xl font-bold mb-4 text-black">{title}</Dialog.Title>
                    {children}
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </Dialog>
        </Transition>
    );
}