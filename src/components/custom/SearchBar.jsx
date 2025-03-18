'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import Link from 'next/link';

const SearchBar = () => {
  const [artisanNames, setArtisanNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const fetchArtisanNames = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/v1/artisan/get-names';
        const response = await axios.post(endpoint);
        const names = response.data.artisans;
        setArtisanNames(names);
      } catch (error) {
        console.error('Error fetching artisan names:', error.message);
      }
    };

    fetchArtisanNames();
  }, []);

  // Update the search query as the user types
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter artisan names based on search query
  const filteredNames = artisanNames.filter((artisan) =>
    artisan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Set focus state for showing/hiding suggestions
  const handleInputFocus = () => {
    setTimeout(() => {
      setInputFocused(true);
    }, 100);
  };

  // Delay hiding suggestions on blur to allow link clicks
  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocused(false);
    }, 1000);
  };

  return (
    <div className='relative h-[10vh] md:w-[45%] w-[100%] flex flex-row justify-between p-2 items-center backprim rounded-[5vh]'>
      <Input
        className='h-[10vh] w-[80%] border-none text-white text-2xl font-bold'
        placeholder='Search artisans...'
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <Button className='h-[9vh] w-[9vh] p-0 backsec rounded-full grid content-center'>
        <img
          className='h-[5vh] w-[5vh] invert'
          src='/img/arrow.svg'
          alt='Search'
        />
      </Button>
      {inputFocused && (
        <ul className='absolute max-h-[45%] md:top-80 top-96 w-80 bg-white rounded-lg shadow-lg z-10 overflow-y-scroll'>
          {filteredNames.map((artisan, index) => (
            <Link href={`/customer/artisan/${artisan.name}`} key={index}>
              <li className='px-4 py-2 cursor-pointer hover:bg-gray-100'>
                {artisan.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
