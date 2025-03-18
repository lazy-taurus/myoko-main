'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Package,
  ShoppingBag,
  CreditCard,
  Users,
  Star,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { artisanData } from '@/lib/data';
import AddProductDialog from './addprodectform/page';
import Header from '@/components/custom/Header';

// Sample data for the artisan dashboard

export default function ArtisanDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const artisanId = '67d992f0b46df2e19529509d';
  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        {/* Artisan Header */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 mb-8'>
          <div className='relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary/10'>
            <Image
              src={artisanData.profileImage || '/placeholder.svg'}
              alt={artisanData.name}
              fill
              className='object-cover'
            />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
              <div>
                <h1 className='text-3xl font-bold'>{artisanData.name}</h1>
                <p className='text-muted-foreground'>
                  {artisanData.location} • Joined {artisanData.joinedDate}
                </p>
              </div>

              <div className='flex gap-3'>
                <Button className='gap-2'>
                  <PlusCircle className='h-4 w-4' />
                  Add New Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-4'
        >
          <TabsList className='grid grid-cols-3 gap-2'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='products'>Products</TabsTrigger>
            <TabsTrigger value='orders'>Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    You have {artisanData.stats.pendingOrders} orders to process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {artisanData.recentOrders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className='flex items-center justify-between'
                      >
                        <div className='space-y-1'>
                          <p className='text-sm font-medium'>{order.id}</p>
                          <p className='text-xs text-muted-foreground'>
                            {order.customer} • {order.date}
                          </p>
                        </div>
                        <div className='flex items-center gap-4'>
                          <div className='text-right'>
                            <p className='text-sm font-medium'>
                              ₹{order.total.toLocaleString()}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {order.items} items
                            </p>
                          </div>
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mt-4 text-center'>
                    <Button
                      variant='link'
                      className='text-sm'
                      onClick={() => setActiveTab('orders')}
                    >
                      View all orders
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Messages</CardTitle>
                  <CardDescription>
                    {artisanData.messages.filter((m) => !m.read).length} unread
                    messages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {artisanData.messages.map((message) => (
                      <div key={message.id} className='p-3 rounded-lg border'>
                        <div className='flex justify-between items-start mb-2'>
                          <div>
                            <p className='text-sm font-medium'>
                              {message.customer}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {message.date}
                            </p>
                          </div>
                          {!message.read && (
                            <Badge variant='secondary' className='text-xs'>
                              New
                            </Badge>
                          )}
                        </div>
                        <p className='text-sm'>{message.message}</p>
                        <div className='mt-3 flex justify-end'>
                          <Button variant='outline' size='sm'>
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>
                  See what customers are saying about your products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {artisanData.reviews.map((review) => (
                    <div key={review.id} className='p-4 rounded-lg border'>
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <p className='text-sm font-medium'>
                            {review.customer}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {review.product} • {review.date}
                          </p>
                        </div>
                        <div className='flex'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className='text-sm'>{review.comment}</p>
                      <div className='mt-3 flex justify-end'>
                        <Button variant='ghost' size='sm'>
                          Thank Customer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Marketing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Learn how to improve your product visibility and increase
                    sales.
                  </p>
                  <Button variant='link' className='p-0 h-auto text-sm mt-2'>
                    Read Guide <ArrowUpRight className='h-3 w-3 ml-1' />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Artisan Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Connect with other artisans to share experiences and
                    knowledge.
                  </p>
                  <Button variant='link' className='p-0 h-auto text-sm mt-2'>
                    Join Discussion <ArrowUpRight className='h-3 w-3 ml-1' />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Our support team is available to assist you with any
                    questions.
                  </p>
                  <Button variant='link' className='p-0 h-auto text-sm mt-2'>
                    Contact Support <ArrowUpRight className='h-3 w-3 ml-1' />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value='products' className='space-y-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
              <div>
                <h2 className='text-xl font-semibold'>Your Products</h2>
                <p className='text-sm text-muted-foreground'>
                  Manage your product listings and inventory
                </p>
              </div>

              <div className='flex gap-3'>
                <div className='relative'>
                  <Input
                    placeholder='Search products...'
                    className='w-[200px] sm:w-[300px]'
                  />
                </div>
                <Button
                  className='gap-2 backprim hover:text-black'
                  onClick={() => setIsDialogOpen(true)}
                >
                  <PlusCircle className='h-4 w-4' />
                  Add Product
                </Button>
                <AddProductDialog
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  artisanId={artisanId}
                />
              </div>
            </div>

            <Card>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artisanData.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <div className='relative h-10 w-10 rounded-md overflow-hidden'>
                              <Image
                                src={product.image || '/placeholder.svg'}
                                alt={product.name}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <span className='font-medium line-clamp-1'>
                              {product.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>₹{product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === 'Active'
                                ? 'outline'
                                : 'secondary'
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell className='text-right'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='sm'>
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Edit className='h-4 w-4 mr-2' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className='h-4 w-4 mr-2' />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-destructive'>
                                <Trash2 className='h-4 w-4 mr-2' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className='flex justify-between items-center'>
              <p className='text-sm text-muted-foreground'>
                Showing 4 of 4 products
              </p>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm' disabled>
                  Previous
                </Button>
                <Button variant='outline' size='sm' disabled>
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value='orders' className='space-y-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
              <div>
                <h2 className='text-xl font-semibold'>Order Management</h2>
                <p className='text-sm text-muted-foreground'>
                  Track and manage customer orders
                </p>
              </div>

              <div className='flex gap-3'>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Orders</SelectItem>
                    <SelectItem value='processing'>Processing</SelectItem>
                    <SelectItem value='shipped'>Shipped</SelectItem>
                    <SelectItem value='delivered'>Delivered</SelectItem>
                    <SelectItem value='cancelled'>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artisanData.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className='font-medium'>
                          {order.id}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>₹{order.total.toLocaleString()}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className='text-right'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='sm'>
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Eye className='h-4 w-4 mr-2' />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className='h-4 w-4 mr-2' />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <MessageSquare className='h-4 w-4 mr-2' />
                                Contact Customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
