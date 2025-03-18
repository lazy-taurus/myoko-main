'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';

const artisansSampleData = [
  {
    name: 'Rohit Das',
    craft: 'Silk Weaving',
    location: 'Assam',
    img: '/img/silk.jpg',
  },
  {
    name: 'Anita Tamang',
    craft: 'Bamboo Crafts',
    location: 'Nagaland',
    img: '/img/bamboo.jpg',
  },
  {
    name: 'Tashi Lepcha',
    craft: 'Wood Carving',
    location: 'Sikkim',
    img: '/img/wood.jpg',
  },
  {
    name: 'Parvati Boro',
    craft: 'Pottery and Terracotta',
    location: 'Assam',
    img: '/img/silk',
  },
];

const ArtisanList = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // Uncomment the below lines when using real API
        // const endpoint = 'http://localhost:8000/api/v1/artisan/get-names';
        // const response = await axios.post(endpoint);
        // setArtisans(response.data.artisans);

        setArtisans(artisansSampleData); // Using sample data
      } catch (error) {
        console.error('Error fetching artisan data:', error.message);
      }
    };

    fetchArtisans();
  }, []);

  if (artisans.length > 2) {
    return (
      <div className='min-h-40vh backprim shadow-2xl w-[90%] flex flex-row items-center justify-evenly object-right mr-[10%] rounded-r-xl py-10 my-24'>
        {artisans.slice(0, 3).map((artisan, index) => (
          <Card
            key={index}
            className='w-[20%] md:flex flex-col hidden hover:scale-105 h-[40vh] backsec text-white overflow-hidden border-0'
          >
            <Link href={'/public/artisans/' + (index + 1)}>
              <Image
                src={artisan.img}
                alt={artisan.name}
                width={400}
                height={300}
                className='h-[30vh] w-full object-cover'
              />
              <CardHeader className='h-[10vh] items-center justify-center p-0'>
                <CardTitle className='text-2xl font-bold p-4'>
                  {artisan.name} ({artisan.craft})
                </CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))}
        <CardHeader className='min-h-[30vh] md:w-[20%] w-[40%] justify-between p-0'>
          <CardTitle className='text-4xl font-bold p-0 forsec'>
            AND MANY MORE ARTISANS
          </CardTitle>
          <Link href='/public/artisans'>
            <div className='h-[8vh] hover:scale-105 w-[100%] flex flex-row justify-between p-2 items-center backsec rounded-[5vh]'>
              <span className='text-white xl:ml-16 lg:ml-10 ml-5 text-nowrap'>
                EXPLORE
              </span>
              <span className='h-[7vh] w-[7vh] p-0 backprim rounded-full flex items-center justify-center'>
                <img
                  className='h-[5vh] w-[5vh] invert'
                  src='/img/right.svg'
                  alt=''
                />
              </span>
            </div>
          </Link>
        </CardHeader>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ArtisanList;
