'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function ProductImageGallery({
  mainImage,
  additionalImages,
  productName,
}) {
  const allImages = [mainImage, ...additionalImages];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className='space-y-4'>
      <div className='relative aspect-square overflow-hidden rounded-lg border bg-muted/20'>
        <Image
          src={allImages[currentImage] || '/placeholder.svg'}
          alt={`data:image/png;base64, ${currentImage} - View ${currentImage + 1}`}
          fill
          className='object-contain'
          priority
        />

        {allImages.length > 1 && (
          <>
            <Button
              variant='ghost'
              size='icon'
              className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
              onClick={prevImage}
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
              onClick={nextImage}
            >
              <ChevronRight className='h-5 w-5' />
            </Button>
          </>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
            >
              <ZoomIn className='h-5 w-5' />
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl'>
            <div className='relative aspect-[4/3] w-full'>
              <Image
                src={allImages[currentImage] || '/placeholder.svg'}
                alt={`${productName} - View ${currentImage + 1}`}
                fill
                className='object-contain'
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {allImages.length > 1 && (
        <div className='flex gap-2 overflow-x-auto pb-2'>
          {allImages.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                currentImage === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
