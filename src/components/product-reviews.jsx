'use client';

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample review data
const sampleReviews = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2 months ago',
    title: 'Exceptional craftsmanship',
    comment:
      "The attention to detail in this piece is remarkable. You can truly feel the cultural heritage and skill that went into creating it. It's become a cherished item in my home and a conversation starter with guests.",
    helpful: 12,
    isHelpful: false,
  },
  {
    id: '2',
    name: 'Rajiv Mehta',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    date: '3 months ago',
    title: 'Beautiful and authentic',
    comment:
      "This product exceeded my expectations. The quality is excellent and it's clear that it was made with traditional techniques. The only reason I'm giving 4 stars instead of 5 is that the shipping took a bit longer than expected.",
    helpful: 8,
    isHelpful: false,
  },
  {
    id: '3',
    name: 'Ananya Deb',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '1 month ago',
    title: 'A piece of Northeast India in my home',
    comment:
      "As someone with roots in Assam, I was thrilled to find this authentic craft. The artisan's skill is evident in every detail, and it brings back memories of my childhood visits to the region. Highly recommend supporting these talented craftspeople!",
    helpful: 15,
    isHelpful: false,
  },
];

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState(sampleReviews);

  const markHelpful = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1, isHelpful: true }
          : review
      )
    );
  };

  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  // Count ratings by star
  const ratingCounts = [0, 0, 0, 0, 0]; // 1-5 stars
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  // Calculate percentages
  const ratingPercentages = ratingCounts.map(
    (count) => (count / totalReviews) * 100
  );

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-1 space-y-4'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>{averageRating.toFixed(1)}</h3>
            <div className='flex justify-center my-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className='text-sm text-muted-foreground'>
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className='space-y-3'>
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className='flex items-center gap-4 text-sm'>
                <div className='flex gap-1 items-center w-12'>
                  {star}{' '}
                  <Star className='h-3 w-3 fill-amber-400 text-amber-400' />
                </div>
                <Progress
                  value={ratingPercentages[5 - star]}
                  className='flex-1'
                />
                <span className='text-muted-foreground w-12 text-right'>
                  {ratingCounts[5 - star]}
                </span>
              </div>
            ))}
          </div>

          <div className='pt-4'>
            <Button className='w-full'>Write a Review</Button>
          </div>
        </div>

        <div className='md:col-span-2 space-y-6'>
          {reviews.map((review) => (
            <div key={review.id} className='space-y-3'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{review.name}</h4>
                    <p className='text-xs text-muted-foreground'>
                      {review.date}
                    </p>
                  </div>
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

              <div>
                <h5 className='font-medium'>{review.title}</h5>
                <p className='text-sm text-muted-foreground mt-1'>
                  {review.comment}
                </p>
              </div>

              <div className='flex items-center justify-end'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='gap-2 text-xs'
                  onClick={() => !review.isHelpful && markHelpful(review.id)}
                  disabled={review.isHelpful}
                >
                  <ThumbsUp className='h-3 w-3' />
                  Helpful ({review.helpful})
                </Button>
              </div>

              <Separator />
            </div>
          ))}

          <div className='flex justify-center pt-4'>
            <Button variant='outline'>Load More Reviews</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
