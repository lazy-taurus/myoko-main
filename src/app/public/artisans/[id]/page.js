'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  MapPin,
  Award,
  Calendar,
  ShoppingBag,
  Share2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/product-card';
import Footer from '@/components/custom/Footer';

const product = {
  id: 'p3',
  name: 'Hand-Painted Bamboo Tribal Masks',
  shortDescription:
    'Traditional handcrafted bamboo masks with intricate tribal designs.',
  description:
    "These stunning hand-painted bamboo masks are crafted by skilled artisans using sustainable materials. Inspired by Northeast India's tribal culture, the masks feature bold colors, intricate patterns, and symbolic elements like feathers and metal earrings. Each piece is a unique representation of indigenous artistic heritage.",
  price: 3200,
  image: '/mask.jpg',
  additionalImages: [],
  category: 'Handcrafted Decor',
  artisanId: '2',
  isEcoFriendly: true,
};

export default function ArtisanProfilePage({ params }) {
  const [artisans, setArtisans] = useState([]);
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Artisan ID from params:', params.id);

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all artisans
        const response = await axios.get(`/api/artisan/all-artisan`);
        const allArtisans = response.data.artisans || [];

        // Store all artisans
        setArtisans(allArtisans);

        // Find the specific artisan matching params.id
        const foundArtisan = allArtisans.find((a) => a._id === params.id);

        // Set the matched artisan
        setArtisan(foundArtisan || null);
      } catch (err) {
        setError('Something went wrong while fetching artisans.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [params.id]);

  if (loading) return <p className='text-center py-10'>Loading...</p>;
  if (error) return <p className='text-center py-10 text-red-500'>{error}</p>;
  if (!artisan) return <p className='text-center py-10'>Artisan not found.</p>;

  return (
    <>
      <div className='min-h-screen backback'>
        <div className='container mx-auto px-4 py-8'>
          <Link
            href='/public/artisan'
            className='inline-flex items-center text-gray-700 hover:text-[#16150A] mb-6'
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            Back to Artisans
          </Link>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-1 space-y-6'>
              <div className='relative rounded-lg overflow-hidden aspect-square border border-gray-200 shadow-sm'>
                <Image
                  src={
                    `data:image/png;base64, ${artisan.profileImage}` ||
                    '/placeholder.svg'
                  }
                  alt={artisan.name}
                  fill
                  className='object-cover'
                  priority
                />
              </div>

              <div className='rounded-lg p-5 space-y-4 bg-gray-50 border border-gray-200 shadow-sm'>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      {artisan.location?.village || 'Unknown'}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.location?.district || 'Unknown'},{' '}
                      {artisan.location?.state || 'Unknown'}
                    </p>
                  </div>
                </div>

                <Separator className='border-gray-200' />

                <div className='flex items-center gap-2'>
                  <Award className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      Master Craftsperson
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.yearsOfExperience || '0'}+ years experience
                    </p>
                  </div>
                </div>

                <Separator className='border-gray-200' />

                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      Joined Platform
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.joinedDate || 'N/A'}
                    </p>
                  </div>
                </div>

                <Separator className='border-gray-200' />

                <div className='flex items-center gap-2'>
                  <ShoppingBag className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      {artisan.productsCount || 0} Products
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.salesCount || 0}+ sales completed
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <Button className='w-full bg-[#16150A] text-[#D4AF37] border border-[#16150A] hover:bg-[#D4AF37] hover:text-[#16150A]'>
                  Contact Artisan
                </Button>

                <Button
                  variant='outline'
                  className='w-full gap-2 border-[#16150A] text-[#16150A] hover:bg-[#16150A] hover:text-[#D4AF37]'
                >
                  <Share2 className='h-4 w-4' />
                  Share Profile
                </Button>
              </div>
            </div>

            <div className='lg:col-span-2 space-y-8'>
              <div>
                <h1 className='text-3xl font-bold text-[#16150A]'>
                  {artisan.name}
                </h1>
                <p className='text-gray-600'>
                  {artisan.craftTypes?.join(', ') || 'Unknown'} Specialist
                </p>

                {artisan.awards?.length > 0 && (
                  <Badge className='bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#16150A]'>
                    Award Winning Artisan
                  </Badge>
                )}
              </div>

              <Tabs defaultValue='story'>
                <TabsList className='grid w-full grid-cols-3 border-b border-gray-200'>
                  <TabsTrigger value='story'>Artisan Story</TabsTrigger>
                  <TabsTrigger value='crafts'>Craft Heritage</TabsTrigger>
                  <TabsTrigger value='products'>Products</TabsTrigger>
                </TabsList>

                <TabsContent value='story'>
                  <p className='text-gray-700'>{artisan.fullBio || 'N/A'}</p>
                </TabsContent>

                <TabsContent value='products'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <ProductCard
                      key={1}
                      product={product}
                      artisanName={artisan.name}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
