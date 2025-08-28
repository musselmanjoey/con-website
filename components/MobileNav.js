import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'

export default function MobileNav({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile menu dialog */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-semibold text-gray-900">
                            Navigation
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <X size={24} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <nav className="space-y-4">
                          <Link
                            href="/"
                            className="block py-3 px-4 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            🏠 All Conferences
                          </Link>
                          
                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-500 px-4 mb-3">
                              Quick Access
                            </p>
                            <Link
                              href="/conferences/ai-conf-2024"
                              className="block py-3 px-4 text-base text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              🤖 AI Conference 2024
                            </Link>
                            <Link
                              href="/conferences/devcon-2024"
                              className="block py-3 px-4 text-base text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              💻 DevCon 2024
                            </Link>
                            <Link
                              href="/conferences/ml-summit-2024"
                              className="block py-3 px-4 text-base text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              🧠 ML Summit 2024
                            </Link>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="px-4">
                              <p className="text-sm text-gray-500">
                                AI Conference Content optimized for NotebookLM processing
                              </p>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}