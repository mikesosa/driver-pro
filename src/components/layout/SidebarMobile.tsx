import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { FC } from 'react';

import classNames from '@/lib/classNames';

import Logo from '~/svg/logo.svg';

interface SidebarMobileProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  teams: {
    name: string;
    href: string;
    bgColorClass: string;
  }[];
  navigation: {
    name: string;
    href: string;
    icon: FC;
    current: boolean;
  }[];
}

const SidebarMobile: FC<SidebarMobileProps> = ({
  sidebarOpen,
  setSidebarOpen,
  teams,
  navigation,
}) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as='div'
        className='relative z-40 lg:hidden'
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </Transition.Child>

        <div className='fixed inset-0 z-40 flex'>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex flex-shrink-0 items-center px-4'>
                <Logo className='text-5xl' />
              </div>
              <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {navigation.map((item: any) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 h-6 w-6 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className='mt-8'>
                    <h3
                      className='px-3 text-sm font-medium text-gray-500'
                      id='mobile-teams-headline'
                    >
                      Teams
                    </h3>
                    <div
                      className='mt-1 space-y-1'
                      role='group'
                      aria-labelledby='mobile-teams-headline'
                    >
                      {teams.map((team) => (
                        <a
                          key={team.name}
                          href={team.href}
                          className='group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        >
                          <span
                            className={classNames(
                              team.bgColorClass,
                              'mr-4 h-2.5 w-2.5 rounded-full'
                            )}
                            aria-hidden='true'
                          />
                          <span className='truncate'>{team.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className='w-14 flex-shrink-0' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SidebarMobile;