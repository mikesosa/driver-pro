import { Bars4Icon, ClockIcon, HomeIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useEffect } from 'react';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import SidebarMobile from '@/components/layout/SidebarMobile';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'My tasks', href: '#', icon: Bars4Icon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
];
const teams = [
  { name: 'Engineering', href: '#', bgColorClass: 'bg-violet-500' },
  { name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (!loading && !session) {
      window.location.href = '/auth/sign-in';
    }
  }, [loading, session]);

  // When rendering client side don't display anything until loading is complete
  // if (typeof window === 'undefined' && loading) return <p>asdas</p>;

  // // If no session exists, display access denied message
  // if (!session) {
  //   window.location.href = '/auth/signin';
  //   return null;
  // }

  // Put Header or Footer Here
  return (
    <div className='min-h-full'>
      <SidebarMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
        teams={teams}
      />
      {/* Static sidebar for desktop */}
      <Sidebar navigation={navigation} teams={teams} />

      <div className='flex flex-col lg:pl-64'>
        {/* Search header */}
        <Navbar setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getServerSideProps(context: any) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   // export const getServerSideProps: GetServerSideProps = async (context) => {

//   console.log('session->', session);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// }
