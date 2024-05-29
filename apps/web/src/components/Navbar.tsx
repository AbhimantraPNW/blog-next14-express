'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { Menu, MenuIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  FaHome,
  FaPen,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa';
import { Badge } from './ui/badge';

export const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 cursor-pointer">
          <h3 className="text-3xl font-bold" onClick={() => router.push('/')}>
            Blog
          </h3>
          {Boolean(id) ? (
            <>
              <div className="md:flex items-center gap-4 hidden">
                <Badge className="nav-badge" onClick={() => router.push('/')}>
                  <FaHome className="mr-2" /> Home
                </Badge>
                <Badge
                  className="nav-badge"
                  onClick={() => router.push('/write')}
                >
                  <FaPen className="mr-2" /> Write
                </Badge>
                <Badge
                  className="nav-badge"
                  onClick={() => router.push('/profile')}
                >
                  <FaUser className="mr-2" /> Profile
                </Badge>
                <Badge className="nav-badge" onClick={logout}>
                  <FaSignOutAlt className="mr-2" /> Logout
                </Badge>
              </div>

              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Menu />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push('/')}>
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/write')}>
                      Write
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <div className="md:flex hidden items-center gap-4">
                <Badge className="nav-badge" onClick={() => router.push('/')}>
                  <FaHome className="mr-2" /> Home
                </Badge>
                <Badge
                  className="nav-badge"
                  onClick={() => router.push('/login')}
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Badge>
                <Badge
                  className="nav-badge"
                  onClick={() => router.push('/register')}
                >
                  <FaUserPlus className="mr-2" /> Register
                </Badge>
              </div>

              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Menu />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push('/')}>
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/login')}>
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/register')}>
                      Register
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
