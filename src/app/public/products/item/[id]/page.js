'use client';

import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Package,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/product-card';
import ProductImageGallery from '@/components/product-image-gallery';
import ProductReviews from '@/components/product-reviews';
import CartDrawer from '@/components/custom/CartDrawer';

export default function ProductDetailPage({ params }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartDataState, setCartData] = useState([]);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post('/api/product/product-find-by-id', {
          slug: params.id,
        });
        const fetchedProduct = response.data.product || {};

        // Set dummy data for missing fields
        const dummyProduct = {
          ...fetchedProduct,
          category: fetchedProduct.category || 'Uncategorized',
          shortDescription:
            fetchedProduct.shortDescription ||
            'This is a dummy short description for the product.',
          description:
            fetchedProduct.description ||
            'This is a dummy description for the product. It provides more details about the product.',
          isLimited: fetchedProduct.isLimited || false,
          isEcoFriendly: fetchedProduct.isEcoFriendly || false,
          isAwardWinning: fetchedProduct.isAwardWinning || false,
          culturalSignificance:
            fetchedProduct.culturalSignificance ||
            'This product has significant cultural value.',
          additionalImages: fetchedProduct.additionalImages || [],
        };

        setProduct(dummyProduct);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (product) {
      async function fetchRelatedProducts() {
        try {
          const response = await axios.get(
            `/api/product/related?category=${
              product.category || 'unknown'
            }&exclude=${product._id || ''}`
          );
          setRelatedProducts(response.data.relatedProducts || []);
        } catch (err) {
          console.error('Error fetching related products:', err);
        }
      }
      fetchRelatedProducts();
      fetchCartItems();
    }
  }, [product]);
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/client/show-cart',
        { accessToken: token }, // Request body with the accessToken
        { headers: { Authorization: `Bearer ${token}` } } // Optional headers if needed
      );
      if (response.status === 200) {
        console.log(response.data.data);
        setCartData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to fetch cart items: ' + error.message);
    }
  };

  // useEffect(() => {
  //   fetchCartItems();
  // }, [cartDataState]);
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('/api/client/add-cart', {
        accessToken: localStorage.getItem('token'),
        menuItemId: params.id,
        quantity: 1,
      });
      if (response.status === 201) {
        toast.success('Item added to cart');
        setCartData([...cartDataState, product]);
        setIsDrawerOpen(true);
      } else {
        toast.error('Add to cart failed: ' + response.data.error);
      }
    } catch (error) {
      toast.error('Add to cart failed: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  // Dummy artisan data
  const artisan = {
    id: '1',
    name: 'Arslan',
    location: {
      village: 'haldwa',
      state: 'Sikkim',
    },
    shortBio: 'The most hard working one.',
    craftDetails: [
      {
        materials: ['silk', 'satin'],
        description: 'a beautifull textile art by using traditional ways',
        culturalSignificance: 'This craft has significant cultural value.',
      },
    ],
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Link
        href={`/products/${product.category
          .toLowerCase()
          .replace(/\s+/g, '-')}`}
        className='inline-flex items-center text-muted-foreground hover:text-foreground mb-6'
      >
        <ChevronLeft className='h-4 w-4 mr-1' />
        Back to {product.category}
      </Link>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Product Image Gallery */}
        <ProductImageGallery
          mainImage={`data:image/png;base64, ${product.images[0]}`}
          additionalImages={product.additionalImages}
          productName={product.name}
        />

        {/* Product Information */}
        <div className='flex flex-col'>
          <div className='mb-6'>
            <div className='flex flex-wrap items-start justify-between gap-4 mb-2'>
              <h1 className='text-3xl font-bold'>{product.name}</h1>

              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <Heart className='h-5 w-5' />
                </Button>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <Share2 className='h-5 w-5' />
                </Button>
              </div>
            </div>

            <div className='flex items-center gap-2 mb-4'>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className='text-sm text-muted-foreground'>
                (12 reviews)
              </span>

              {artisan && (
                <span className='text-sm text-muted-foreground'>
                  by{' '}
                  <Link
                    href={`/artisans/${artisan.id}`}
                    className='text-primary hover:underline'
                  >
                    {artisan.name}
                  </Link>
                </span>
              )}
            </div>

            <div className='flex flex-wrap gap-2 mb-4'>
              {product.isLimited && (
                <Badge
                  variant='outline'
                  className='bg-red-50 text-red-700 border-red-200'
                >
                  Limited Edition
                </Badge>
              )}
              {product.isEcoFriendly && (
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 border-green-200'
                >
                  Eco-Friendly
                </Badge>
              )}
              {product.isAwardWinning && (
                <Badge
                  variant='outline'
                  className='bg-amber-50 text-amber-700 border-amber-200'
                >
                  Award Winning
                </Badge>
              )}
            </div>

            <p className='text-3xl font-semibold mb-4'>
              ₹{product.price.toLocaleString()}
            </p>

            <p className='text-muted-foreground mb-6'>
              {product.shortDescription}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
              <Button
                onClick={handleAddToCart}
                className='flex-1 backprim hover:text-black gap-2'
              >
                <ShoppingCart className='h-4 w-4' />
                Add to Cart
              </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
              <div className='flex items-center gap-3 p-3 border rounded-lg'>
                <Truck className='h-5 w-5 text-muted-foreground' />
                <div className='text-sm'>
                  <p className='font-medium'>Free Shipping</p>
                  <p className='text-muted-foreground'>On orders over ₹2000</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 border rounded-lg'>
                <Package className='h-5 w-5 text-muted-foreground' />
                <div className='text-sm'>
                  <p className='font-medium'>Secure Packaging</p>
                  <p className='text-muted-foreground'>
                    Protecting delicate crafts
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 border rounded-lg'>
                <Clock className='h-5 w-5 text-muted-foreground' />
                <div className='text-sm'>
                  <p className='font-medium'>Made to Order</p>
                  <p className='text-muted-foreground'>Ships in 5-7 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Information */}
          {artisan && (
            <div className='mb-8 p-4 bg-muted/30 rounded-lg border'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/placeholder.svg'
                  alt={artisan.name}
                  width={60}
                  height={60}
                  className='rounded-full object-cover'
                />
                <div>
                  <h3 className='font-medium'>{artisan.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {artisan.location.village}, {artisan.location.state}
                  </p>
                </div>
                <Link href={`/artisans/${artisan.id}`} className='ml-auto'>
                  <Button variant='outline' size='sm'>
                    View Profile
                  </Button>
                </Link>
              </div>
              <Separator className='my-4' />
              <p className='text-sm text-muted-foreground'>
                {artisan.shortBio}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className='mt-12'>
        <Tabs defaultValue='description'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='description'>Description</TabsTrigger>
            <TabsTrigger value='cultural'>Cultural Significance</TabsTrigger>
            <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value='description' className='mt-6'>
            <div className='prose max-w-none'>
              <h3 className='text-xl font-medium mb-4'>Product Details</h3>
              <p>{product.description}</p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
                <div>
                  <h4 className='text-lg font-medium mb-3'>Materials Used</h4>
                  <ul className='list-disc pl-5 space-y-1'>
                    {artisan?.craftDetails[0].materials?.map(
                      (material, index) => (
                        <li key={index} className='text-muted-foreground'>
                          {material}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className='text-lg font-medium mb-3'>Craft Technique</h4>
                  <p className='text-muted-foreground'>
                    {artisan?.craftDetails[0].description}
                  </p>
                </div>
              </div>

              <div className='mt-8'>
                <h4 className='text-lg font-medium mb-3'>Care Instructions</h4>
                <ul className='list-disc pl-5 space-y-1'>
                  <li className='text-muted-foreground'>
                    Handle with care to preserve the intricate craftsmanship
                  </li>
                  <li className='text-muted-foreground'>
                    Keep away from direct sunlight to prevent fading
                  </li>
                  <li className='text-muted-foreground'>
                    Clean with a soft, dry cloth
                  </li>
                  <li className='text-muted-foreground'>
                    Store in a cool, dry place
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='cultural' className='mt-6'>
            <div className='prose max-w-none'>
              <h3 className='text-xl font-medium mb-4'>Cultural Heritage</h3>

              {product.culturalSignificance ? (
                <p>{product.culturalSignificance}</p>
              ) : (
                <p>
                  This {product.category.toLowerCase()} represents generations
                  of traditional craftsmanship from Northeast India. The
                  techniques used to create this piece have been passed down
                  through families for centuries, preserving cultural knowledge
                  and artistic expression that might otherwise be lost.
                </p>
              )}

              <div className='mt-8 p-6 bg-muted/30 rounded-lg border'>
                <h4 className='text-lg font-medium mb-3'>
                  The Story Behind the Craft
                </h4>
                <p className='text-muted-foreground mb-4'>
                  {artisan?.craftDetails[0].culturalSignificance ||
                    'This craft is deeply intertwined with the cultural identity and heritage of Northeast India, representing centuries of traditional knowledge and artistic expression.'}
                </p>

                <div className='mt-6 flex justify-center'>
                  <Link href='/heritage-stories'>
                    <Button variant='outline'>Explore Heritage Stories</Button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='reviews' className='mt-6'>
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className='mt-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>You May Also Like</h2>
          <Link
            href={`/products/${product.category
              .toLowerCase()
              .replace(/\s+/g, '-')}`}
          >
            <Button variant='ghost' className='gap-2'>
              View All
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              artisanName={
                artisans.find((a) => a.id === relatedProduct.artisanId)?.name
              }
            />
          ))}
        </div>
      </div>
      <CartDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        cartItems={cartDataState}
        setCartItems={setCartData}
      />
    </div>
  );
}
