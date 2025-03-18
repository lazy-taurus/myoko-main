'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios'; // Import axios
import { ChevronDown, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ProductCard from '@/components/product-card';
import { categories, artisans } from '@/lib/data';
import CartDrawer from '@/components/custom/CartDrawer';

export default function CategoryPage({ params }) {
  const category =
    categories.find((c) => c.slug === params.slug) || categories[0];

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        // Use axios to fetch products
        const response = await axios.post('/api/product/product-find-by-cat', {
          slug: params.slug,
        });

        // Set the product data

        console.log(response.data.products);
        setProduct(response.data.products);
        setCategoryProducts(response.data.product);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [params.slug]); // Use params.slug instead of category.slug

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Category Banner */}
      <div className='relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8'>
        <Image
          src={category.bannerImage || '/placeholder.svg?height=400&width=1200'}
          alt={category.name}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
            {category.name}
          </h1>
          <p className='text-white/90 max-w-md'>{category.description}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search products...' className='pl-10' />
        </div>

        <div className='flex gap-2'>
          <Select defaultValue='featured'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='featured'>Featured</SelectItem>
              <SelectItem value='newest'>Newest</SelectItem>
              <SelectItem value='price-low'>Price: Low to High</SelectItem>
              <SelectItem value='price-high'>Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='gap-2'>
                <Filter className='h-4 w-4' />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className='w-[300px] sm:w-[400px] overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect handcrafted item.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className='text-center text-lg'>Loading products...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : product.length === 0 ? (
        <p className='text-center text-muted-foreground'>
          No products found in this category.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {product.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              artisanName={
                artisans.find((a) => a.id === product.artisanId)?.name
              }
              showQuickView
            />
          ))}
        </div>
      )}
    </div>
  );
}
