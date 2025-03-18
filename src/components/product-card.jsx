'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProductCard({
  product,
  artisanName,
  showQuickView = false,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images);
  console.log(currentImage);
  return (
    <Card className='overflow-hidden group'>
      <div className='relative aspect-square overflow-hidden'>
        <Image
          src='/img/mask.jpg'
          // {`data:image/png;base64, ${currentImage}` || '/placeholder.svg'}
          alt={product.name}
          fill
          className='object-cover transition-transform group-hover:scale-105'
          onMouseEnter={() =>
            product.additionalImages?.[0] &&
            setCurrentImage(product.additionalImages[0])
          }
          onMouseLeave={() => setCurrentImage(product.image)}
        />

        {/* Product Badges */}
        <div className='absolute top-2 left-2 flex flex-col gap-2'>
          {product.isLimited && (
            <Badge className='bg-red-500 hover:bg-red-600 text-white border-0'>
              Limited Edition
            </Badge>
          )}
          {product.isEcoFriendly && (
            <Badge className='bg-green-500 hover:bg-green-600 text-white border-0'>
              Eco-Friendly
            </Badge>
          )}
          {product.isAwardWinning && (
            <Badge className='bg-amber-500 hover:bg-amber-600 text-white border-0'>
              Award Winning
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className='absolute top-2 right-2 flex flex-col gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
          >
            <Share2 className='h-5 w-5 text-gray-600' />
          </Button>
        </div>

        {/* Quick View & Add to Cart Overlay */}
        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3' />
      </div>

      <Link href={`/public/products/item/${product._id}`}>
        <CardContent className='p-4'>
          <div className='space-y-1'>
            <h3 className='font-medium line-clamp-1'>{product.name}</h3>
            {artisanName && (
              <p className='text-xs text-muted-foreground'>By {artisanName}</p>
            )}
            <p className='font-semibold'>₹{product.price.toLocaleString()}</p>
            <p className='text-sm text-muted-foreground line-clamp-2'>
              {product.shortDescription}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
