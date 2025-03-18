import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';

export default function CategoriesPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Hero Banner */}
      <div className='relative w-full h-80 rounded-lg overflow-hidden mb-12'>
        <Image
          src='/img/banner.png'
          alt='Northeast Indian Crafts'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-4 max-w-xl'>
            Discover the Rich Craft Heritage of Northeast India
          </h1>
          <p className='text-white/90 max-w-xl mb-6'>
            Explore centuries-old traditions transformed into exquisite
            handcrafted treasures by master artisans
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md'>
            <Button className='bg-white text-black hover:bg-white/90'>
              Explore All Crafts
            </Button>
            <Button
              variant='outline'
              className='text-white border-white hover:bg-white/20'
            >
              Meet Our Artisans
            </Button>
          </div>
        </div>
      </div>

      {/* All Categories */}
      <div>
        <h2 className='text-2xl font-bold mb-6'>All Categories</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/public/products/${category.slug}`}
              className='group'
            >
              <div className='relative rounded-lg overflow-hidden border hover:border-primary transition-colors'>
                <div className='relative aspect-[4/3]'>
                  <Image
                    src={category.bannerImage || '/placeholder.svg'}
                    alt={category.name}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                  <div className='absolute bottom-0 left-0 right-0 p-4'>
                    <h3 className='text-xl font-bold text-white mb-1'>
                      {category.name}
                    </h3>
                    <p className='text-white/80 text-sm line-clamp-2'>
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className='p-4 bg-white'>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {category.materials.slice(0, 3).map((material, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='font-normal'
                      >
                        {material}
                      </Badge>
                    ))}
                    {category.materials.length > 3 && (
                      <Badge variant='secondary' className='font-normal'>
                        +{category.materials.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      12 products
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='gap-2 group-hover:text-primary'
                    >
                      View Category
                      <ArrowRight className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cultural Highlights */}
      <div className='mt-16 bg-muted/30 rounded-lg p-8'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            Preserving Cultural Heritage
          </h2>
          <p className='text-muted-foreground mb-6'>
            Each craft category represents centuries of traditional knowledge
            and artistic expression. By supporting these artisans, you help
            preserve cultural practices that might otherwise be lost to time.
          </p>

          <div className='flex justify-center'>
            <Link href='/heritage-stories'>
              <Button className='gap-2'>
                Discover Craft Stories
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>

          <Separator className='my-8' />

          <div className='italic text-muted-foreground'>
            <p>
              "Our crafts are not just objects of beauty, but carriers of our
              identity, history, and the wisdom of our ancestors."
            </p>
            <p className='mt-2 text-sm'>
              — Traditional saying from Northeast India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
