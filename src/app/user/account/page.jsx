'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Package,
  Bell,
  Truck,
  HelpCircle,
  LogOut,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ArtisanFormModal from './ArtisanFormModal/ArtisanFormModal';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    orders: [],
    addresses: [],
    notifications: {},
    isArtisan: false,
  });
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy data for orders, addresses, and notifications
  const dummyData = {
    orders: [
      {
        id: 'ORD-001',
        date: 'Mar 15, 2025',
        items: [
          {
            name: 'Golden Muga Silk Mekhela Chador with Traditional Motifs',
            price: 15000,
            quantity: 2,
            image: '/img/goldenmuga.jpg',
            artisan: 'Lakshmi Devi',
          },
        ],
        total: 35650,
        status: 'Processing',
        estimatedDelivery: 'Mar 25-28, 2025',
      },
    ],
    addresses: [
      {
        id: 'addr1',
        type: 'Home',
        name: 'Ananya Sharma',
        line1: '42 Lakeside Apartments',
        line2: 'MG Road',
        city: 'Guwahati',
        state: 'Assam',
        pincode: '781005',
        phone: '+91 98765 43210',
        isDefault: true,
      },
      {
        id: 'addr2',
        type: 'Office',
        name: 'Ananya Sharma',
        line1: 'Tech Hub, 3rd Floor',
        line2: 'Beltola',
        city: 'Guwahati',
        state: 'Assam',
        pincode: '781028',
        phone: '+91 98765 43210',
        isDefault: false,
      },
    ],
    notifications: {
      orderUpdates: true,
      promotions: true,
      artisanStories: true,
      newsletter: false,
    },
  };

  useEffect(() => {
    const logintoken = localStorage.getItem('token');
    const isLoggedIn = !!logintoken;
    setIsLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      // Simulate fetching user details
      const fetchUserDetails = async () => {
        try {
          setError(null);
          const accessToken = localStorage.getItem('token');
          if (!accessToken) {
            throw new Error('Access token not found in localStorage');
          }

          // Simulate API call
          const response = await fetch('/api/client/finduser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch user details');
          }

          const data = await response.json();
          setUserDetails({
            ...data.user, // Name and email from API
            orders: dummyData.orders, // Add dummy orders
            addresses: dummyData.addresses, // Add dummy addresses
            notifications: dummyData.notifications, // Add dummy notifications
          });
        } catch (err) {
          setError(err.message);
        }
      };

      fetchUserDetails();
    } else {
      window.location.replace('/auth/signin');
    }
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      {error && <div className='text-red-500 text-sm mb-4'>Error: {error}</div>}
      {error && <div className='text-red-500 text-sm mb-4'>Error: {error}</div>}

      {/* User Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-6 mb-8'>
        <Avatar className='h-20 w-20 border-4 border-primary/10'>
          <AvatarImage alt={userDetails.name} />
          <AvatarFallback>{userDetails.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>{userDetails.name}</h1>
              <p className='text-muted-foreground'>
                {userDetails.email} • Member
              </p>
              <p className='text-muted-foreground'>
                {userDetails.email} • Member
              </p>
            </div>
            {userDetails.isArtisan ? (
              <Link href={'/artisan/dashboard'}>
                <Button variant='ghost' className='bg-black text-white'>
                  <span>Artisan Dashboard</span>
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant='ghost'
                  className='bg-black text-white'
                  onClick={() => setIsModalOpen(true)} // Open modal on click
                >
                  <span>Become an Artisan</span>
                </Button>

                {isModalOpen && (
                  <ArtisanFormModal
                    name={userDetails.name}
                    email={userDetails.email}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Account Content */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Sidebar Navigation */}
        <div className='md:col-span-1'>
          <Card>
            <CardContent className='p-0'>
              <nav className='flex flex-col'>
                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${
                    activeTab === 'orders' ? 'bg-muted font-medium' : ''
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package className='h-5 w-5' />
                  <span>Orders & Tracking</span>
                </button>

                <Separator />

                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${
                    activeTab === 'addresses' ? 'bg-muted font-medium' : ''
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <Truck className='h-5 w-5' />
                  <span>Addresses</span>
                </button>

                <Separator />

                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${
                    activeTab === 'notifications' ? 'bg-muted font-medium' : ''
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className='h-5 w-5' />
                  <span>Notifications</span>
                </button>
              </nav>
            </CardContent>
          </Card>

          <div className='mt-6 p-4 bg-muted/30 rounded-lg border'>
            <div className='flex items-start gap-3'>
              <HelpCircle className='h-5 w-5 text-primary mt-0.5' />
              <div>
                <h3 className='text-sm font-medium'>Need Help?</h3>
                <p className='text-xs text-muted-foreground mt-1 mb-3'>
                  Our support team is available to assist you with any questions
                  about your orders or account.
                </p>
                <Button
                  variant='link'
                  className='p-0 h-auto text-xs text-primary'
                >
                  Contact Customer Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='md:col-span-3'>
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-semibold mb-1'>Your Orders</h2>
                <p className='text-sm text-muted-foreground'>
                  Track, manage, and review your purchases
                </p>
              </div>

              {userDetails.orders.map((order) => (
                <Card key={order.id} className='overflow-hidden'>
                  <CardHeader className='bg-muted/30 py-4'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                      <div>
                        <CardTitle className='text-base'>
                          Order #{order.id}
                        </CardTitle>
                        <CardDescription>
                          Placed on {order.date}
                        </CardDescription>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Badge
                          variant={
                            order.status === 'Processing'
                              ? 'outline'
                              : order.status === 'Shipped'
                              ? 'secondary'
                              : 'default'
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button variant='outline' size='sm'>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <div className='p-4 border-b'>
                      {order.items.map((item, index) => (
                        <div key={index} className='flex gap-4 py-2'>
                          <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border'>
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              width={60}
                              height={60}
                              className='object-cover'
                            />
                          </div>
                          <div className='flex-1'>
                            <h3 className='text-sm font-medium line-clamp-1'>
                              {item.name}
                            </h3>
                            <p className='text-xs text-muted-foreground'>
                              By {item.artisan}
                            </p>
                            <div className='flex justify-between mt-1'>
                              <p className='text-sm'>Qty: {item.quantity}</p>
                              <p className='text-sm font-medium'>
                                ₹{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='p-4 flex flex-col sm:flex-row justify-between gap-4'>
                      <div className='flex items-center gap-3'>
                        {order.status === 'Processing' && (
                          <>
                            <Clock className='h-5 w-5 text-muted-foreground' />
                            <div>
                              <p className='text-sm font-medium'>
                                Estimated Delivery
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                {order.estimatedDelivery}
                              </p>
                            </div>
                          </>
                        )}

                        {order.status === 'Shipped' && (
                          <>
                            <Truck className='h-5 w-5 text-muted-foreground' />
                            <div>
                              <p className='text-sm font-medium'>
                                Tracking Number
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                {order.trackingNumber}
                              </p>
                            </div>
                          </>
                        )}

                        {order.status === 'Delivered' && (
                          <>
                            <CheckCircle className='h-5 w-5 text-muted-foreground' />
                            <div>
                              <p className='text-sm font-medium'>
                                Delivered On
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                {order.deliveryDate}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className='text-right'>
                        <p className='text-sm text-muted-foreground'>
                          Order Total
                        </p>
                        <p className='text-lg font-semibold'>
                          ₹{order.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-semibold mb-1'>Your Addresses</h2>
                <p className='text-sm text-muted-foreground'>
                  Manage your shipping and billing addresses
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {userDetails.addresses.map((address) => (
                  <Card key={address.id}>
                    <CardContent className='p-4'>
                      <div className='flex justify-between items-start mb-3'>
                        <div className='flex items-center gap-2'>
                          <h3 className='text-sm font-medium'>
                            {address.type}
                          </h3>
                          {address.isDefault && (
                            <Badge variant='outline'>Default</Badge>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            {!address.isDefault && (
                              <DropdownMenuItem>
                                Set as Default
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className='space-y-1 text-sm'>
                        <p className='font-medium'>{address.name}</p>
                        <p>{address.line1}</p>
                        <p>{address.line2}</p>
                        <p>
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p>Phone: {address.phone}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className='gap-2'>
                <Truck className='h-4 w-4' />
                Add New Address
              </Button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-semibold mb-1'>
                  Notification Preferences
                </h2>
                <p className='text-sm text-muted-foreground'>
                  Manage how and when we contact you
                </p>
              </div>

              <Card>
                <CardContent className='p-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='text-sm font-medium'>Order Updates</h3>
                        <p className='text-xs text-muted-foreground'>
                          Receive notifications about your order status
                        </p>
                      </div>
                      <div className='flex items-center h-5'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300'
                          defaultChecked={
                            userDetails.notifications.orderUpdates
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='text-sm font-medium'>
                          Promotions & Discounts
                        </h3>
                        <p className='text-xs text-muted-foreground'>
                          Get notified about special offers and sales
                        </p>
                      </div>
                      <div className='flex items-center h-5'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300'
                          defaultChecked={userDetails.notifications.promotions}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='text-sm font-medium'>Artisan Stories</h3>
                        <p className='text-xs text-muted-foreground'>
                          Learn about the artisans behind your favorite crafts
                        </p>
                      </div>
                      <div className='flex items-center h-5'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300'
                          defaultChecked={
                            userDetails.notifications.artisanStories
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='text-sm font-medium'>
                          Monthly Newsletter
                        </h3>
                        <p className='text-xs text-muted-foreground'>
                          Receive our monthly newsletter with craft trends and
                          stories
                        </p>
                      </div>
                      <div className='flex items-center h-5'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300'
                          defaultChecked={userDetails.notifications.newsletter}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 flex justify-end'>
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
