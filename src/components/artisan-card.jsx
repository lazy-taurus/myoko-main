'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ArtisanCard({ artisan }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      {/* Profile Image */}
      <div className='relative aspect-[4/3] overflow-hidden'>
        <Image
          src={`data:image/png;base64, ${artisan.profileImage}`|| '/placeholder.svg'}
          alt={artisan.name}
          fill
          className='object-cover transition-transform hover:scale-105'
        />
        {/* Favorite Button */}
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>
        {/* Location Overlay */}
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-white' />
            <span className='text-white text-sm'>
              {artisan.location?.village || 'Unknown'}, {artisan.location?.state || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className='p-5'>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-between items-start'>
            <h3 className='font-semibold text-xl'>{artisan.name}</h3>
            <Badge
              variant='outline'
              className='bg-primary/10 text-primary border-primary/20'
            >
              {artisan.yearsOfExperience}+ years
            </Badge>
          </div>

          {/* Craft Types */}
          <div className='flex flex-wrap gap-2 my-2'>
            {artisan.craftDetails.map((craft) => (
              <Badge key={craft._id} variant='secondary' className='font-normal'>
                {craft.name}
              </Badge>
            ))}
          </div>

          {/* Short Bio */}
          <p className='text-muted-foreground line-clamp-3 text-sm'>
            {artisan.shortBio}
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className='p-5 pt-0 flex justify-between'>
        <span className='text-sm text-muted-foreground'>
          {artisan.productsCount} products available
        </span>
        <Link href={`/public/artisans/${artisan._id}`}>
          <Button variant='outline' size='sm'>
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
