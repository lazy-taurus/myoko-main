'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logintoken = localStorage.getItem('token');
    setIsLoggedIn(!!logintoken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.replace('/');
  };

  return (
    <div className='w-full h-25 flex flex-row justify-around items-center'>
      <Link href='/'>
        <div className='logo flex flex-row justify-evenly gap-2 items-center overflow-hidden my-5'>
          <Image src='/img/logo.png' width={50} height={50} alt='Myoko Logo' />
          <span className='text-3xl font-bold leading-none'>MYOKO</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className='md:flex hidden flex-row justify-evenly items-center text-2xl w-1/2'>
        <Link href='/'>
          <span className='hover:scale-105 font-bold'>Home</span>
        </Link>
        <Link href='/public/artisans'>
          <span className='hover:scale-105'>Artisans</span>
        </Link>
        <Link href='/public/products'>
          <span className='hover:scale-105'>Categories</span>
        </Link>

        {isLoggedIn ? (
          <>
            <Link href='/user/account?section=orders'>
              <span className='hover:scale-105'>Orders</span>
            </Link>
            {/* <Link href='/cart'><span className='hover:scale-105'>Cart</span></Link> */}
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Profile Dropdown (Only when logged in) */}
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='w-16 h-16 rounded-full'>
            <Avatar className='w-16 h-16 rounded-full'>
              <AvatarImage
                src='https://github.com/shadcn.png'
                alt='User Avatar'
              />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[30vh]'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href='/user/account'>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href='/user/account?section=orders'>
              <DropdownMenuItem>Orders</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex gap-4'>
          <Link href='/auth/signup'>
            <span className='hover:scale-105 text-xl'>Register</span>
          </Link>
          <Link href='/auth/signin'>
            <span className='hover:scale-105 text-xl'>Login</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
