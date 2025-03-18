'use client';
import Image from 'next/image';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Cross, X } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer({
  isOpen,
  setIsOpen,
  cartItems,
  setCartItems,
}) {
  const openDrawer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeDrawer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };
  const updateCartUI = () => {
    setCartItems([...cartItems]);
  };

  const totalAmount = cartItems
    .reduce((total, item) => total + Number(item.price), 0)
    .toFixed(2);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button style={{ display: 'none' }} onClick={openDrawer} />
      </DrawerTrigger>

      <DrawerContent className='flex flex-col backprim z-50 text-white'>
        <div className='mx-auto md:ml-auto w-full md:w-[400px] flex flex-col h-full'>
          {/* Drawer Header */}
          <DrawerHeader>
            <div className='flex flex-row gap-4 items-center px-4'>
              <DrawerTitle>Your Cart</DrawerTitle>
              <div className='ml-auto'>
                <DrawerClose asChild>
                  <button onClick={closeDrawer}>
                    <Cross />
                  </button>
                </DrawerClose>
              </div>
            </div>
          </DrawerHeader>

          {/* Cart Items */}
          <div className='border-[1px] border-[#0000001A] rounded-[20px] px-4 text-white mt-4 flex-1 overflow-y-auto'>
            {cartItems.map((cartItem) => (
              <div key={cartItem.id} className='mt-2'>
                <div className='flex items-center'>
                  {/* <Image
                    width={80}
                    height={80}
                    src={cartItem.src}
                    alt={cartItem.title}
                  /> */}
                  <div className='flex flex-col ml-[10px]'>
                    <p className=' text-[20px] font-bold'>{cartItem.name}</p>
                    <p className=' text-[24px] font-bold'>${cartItem.price}</p>
                  </div>
                  <button
                    className='ml-auto'
                    onClick={() => {
                      const productIndex = cartItems.findIndex(
                        (product) => product.id === cartItem.id
                      );

                      if (productIndex !== -1) {
                        cartItems.splice(productIndex, 1);
                        updateCartUI();
                      }
                    }}
                  >
                    <X />
                  </button>
                </div>
                <div className='border-t-[1px] border-[#0000001A] mt-2'></div>
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className='mt-auto'>
            <div className='fixed bottom-0 w-full'>
              <div className='border-t-[2px] border-[#0000001A] h-[50px] flex flex-row items-center mr-4 ml-4'>
                <h1 className=' font-semibold text-[31px]'>Total</h1>
                <h1 className='ml-auto  font-bold text-[33px]'>
                  ${totalAmount}
                </h1>
              </div>
              <div className='bg-[#80808026] h-[100px] flex flex-row items-center px-4'>
                <button className='px-4 py-2 backsec text-white text-[15px] rounded-full'>
                  Continue Shopping {`>`}
                </button>
                <Link href='/user/checkout'>
                  <button className='px-4 ml-auto py-2 backback text-black rounded-full'>
                    Buy Now {`>`}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
