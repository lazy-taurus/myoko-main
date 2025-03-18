'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const ProductList = () => {
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample products data (replace with API call in production)
  const sampleProducts = [
    {
      id: 1,
      name: 'Assam Muga Silk Saree',
      description:
        'Handwoven golden silk saree with traditional Assamese motifs',
      price: 12500,
      category: 'Weaving',
      region: 'Assam',
      artisan: 'Lakhimi Baruah',
      imageUrl: `/img/saree.jpg`,
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: 'Bamboo Storage Basket',
      description:
        'Hand-crafted multi-purpose storage basket made from sustainable bamboo',
      price: 1850,
      category: 'Bamboo Craft',
      region: 'Manipur',
      artisan: 'Moirangthem Tomba',
      imageUrl: `/img/basket.jpg`,
      inStock: true,
      featured: false,
    },
    {
      id: 3,
      name: 'Nagaland Wooden Tribal Mask',
      description: 'Traditional hand-carved wooden mask depicting Naga warrior',
      price: 3500,
      category: 'Wood Carving',
      region: 'Nagaland',
      artisan: 'Imkong Ao',
      imageUrl: `/img/mask.jpg`,
      inStock: true,
      featured: true,
    },
    // ... other products
  ];

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // For development, use sample data
        setArtisans([
          { id: 1, name: 'Lakhimi Baruah', region: 'Assam' },
          { id: 2, name: 'Moirangthem Tomba', region: 'Manipur' },
          { id: 3, name: 'Imkong Ao', region: 'Nagaland' },
        ]);

        /* When API is ready, uncomment this:
        const endpoint = 'http://localhost:8000/api/v1/artisan/get-names';
        const response = await axios.post(endpoint);
        const names = response.data.artisans;
        setArtisans(names);
        */
      } catch (error) {
        console.error('Error fetching artisan names:', error.message);
      }
    };

    fetchArtisans();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // For development, use sample data
        setProducts(sampleProducts);
        setLoading(false);

        /* When API is ready, uncomment this:
        const response = await axios.post(
          'http://localhost:8000/api/v1/artisan/show-products',
          {
            artisanName: artisans[0]?.name,
          }
        );

        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
        */
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (artisans.length > 0) {
      fetchProducts();
    }
  }, [artisans]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-40'>Loading...</div>
    );
  }

  if (artisans.length > 0 && products.length > 0) {
    return (
      <div className='min-h-40vh bg-white shadow-2xl w-[90%] flex flex-row items-center justify-evenly object-right ml-[10%] rounded-l-xl py-10 mb-24 mt-10'>
        {products.slice(0, 3).map((product, index) => (
          <Card
            key={index}
            className={`${
              index < 2 ? 'md:flex flex-col hidden' : 'md:w-[20%] w-[40%]'
            } w-[20%] h-[40vh] hover:scale-105 backprim text-white overflow-hidden`}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={300}
              className='h-[30vh] w-full object-cover'
            />
            <CardHeader className='h-[10vh] items-center justify-center p-0'>
              <CardTitle className='text-2xl font-bold p-4'>
                {product.name}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
        <CardHeader className='h-[10vh] md:w-[20%] w-[40%] justify-center p-0'>
          <Link
            href={
              '/customer/artisan/' + encodeURIComponent(artisans[0]?.name || '')
            }
          >
            <div className='h-[8vh] hover:scale-105 w-[100%] flex flex-row justify-between p-2 items-center backprim rounded-[5vh]'>
              <span className='text-white xl:ml-16 lg:ml-10 ml-5 text-nowrap'>
                See All
              </span>
              <span className='h-[7vh] w-[7vh] p-0 backsec rounded-full flex items-center justify-center'>
                <img
                  className='h-[5vh] w-[5vh] invert'
                  src='img/right.svg'
                  alt=''
                />
              </span>
            </div>
          </Link>
          <CardTitle className='text-4xl font-bold p-0 forsec'>
            CRAFTED BY
          </CardTitle>
          <CardTitle className='text-4xl font-bold p-0 text-wrap forprim'>
            {artisans[0]?.name || 'Artisan'}
          </CardTitle>
        </CardHeader>
      </div>
    );
  } else {
    return (
      <div className='flex justify-center items-center h-40'>
        No products available
      </div>
    );
  }
};

export default ProductList;
