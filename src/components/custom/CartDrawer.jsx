'use client';
import Image from 'next/image';
import axios from 'axios';
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

  // Call the API to remove a cart item and update the local state
  const removeCartItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/client/remove-cart',
        { accessToken: token, productId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        console.log(response.data.message);
        // Remove the item from local state using the product _id
        const updatedCart = cartItems.filter((item) => item._id !== productId);
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
      // Optionally, display an error to the user
    }
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
              <div key={cartItem._id} className='mt-2'>
                <div className='flex items-center'>
                  {/* Uncomment and adjust if you have a valid image source
                  <Image
                    width={80}
                    height={80}
                    src={cartItem.src}
                    alt={cartItem.title}
                  /> */}
                  <div className='flex flex-col ml-[10px]'>
                    <p className='text-[20px] font-bold'>{cartItem.name}</p>
                    <p className='text-[24px] font-bold'>${cartItem.price}</p>
                  </div>
                  <button
                    className='ml-auto'
                    onClick={() => removeCartItem(cartItem._id)}
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
                <h1 className='font-semibold text-[31px]'>Total</h1>
                <h1 className='ml-auto font-bold text-[33px]'>
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
