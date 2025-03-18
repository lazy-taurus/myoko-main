'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ArtisanCard from '@/components/artisan-card';

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState([]);
  const [filteredArtisans, setFilteredArtisans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [craftType, setCraftType] = useState('all');
  const [region, setRegion] = useState('all');

  // Fetch artisans from API
  const fetchArtisans = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`/api/artisan/all-artisan`);
      setArtisans(response.data.artisans || []);
      setFilteredArtisans(response.data.artisans || []);
    } catch (err) {
      setError('Something went wrong while fetching artisans.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter artisans based on search, craft type, and region
  useEffect(() => {
    let filtered = artisans;

    // Search filter (name or craft)
    if (searchTerm) {
      filtered = filtered.filter(
        (artisan) =>
          artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artisan.craftDetails.some((craft) =>
            craft.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Craft Type Filter
    if (craftType !== 'all') {
      filtered = filtered.filter((artisan) =>
        artisan.craftDetails.some(
          (craft) => craft.name.toLowerCase() === craftType.toLowerCase()
        )
      );
    }

    // Region Filter
    if (region !== 'all') {
      filtered = filtered.filter(
        (artisan) =>
          artisan.location &&
          artisan.location.state.toLowerCase() === region.toLowerCase()
      );
    }

    setFilteredArtisans(filtered);
  }, [searchTerm, craftType, region, artisans]);

  useEffect(() => {
    fetchArtisans();
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
              Meet Our Artisans
            </h1>
            <p className='text-muted-foreground max-w-3xl'>
              Discover the skilled craftspeople preserving Northeast India's
              rich cultural heritage through their traditional arts and crafts.
            </p>
          </div>

          {/* Search and Filter Inputs */}
          <div className='flex flex-col md:flex-row gap-4 py-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search artisans by name or craft...'
                className='pl-10'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='flex gap-2'>
              <Select value={craftType} onValueChange={setCraftType}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Craft Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Crafts</SelectItem>
                  <SelectItem value='weaving'>Weaving</SelectItem>
                  <SelectItem value='bamboo'>Bamboo & Cane</SelectItem>
                  <SelectItem value='pottery'>Pottery</SelectItem>
                  <SelectItem value='woodcarving'>Wood Carving</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Region' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Regions</SelectItem>
                  <SelectItem value='assam'>Assam</SelectItem>
                  <SelectItem value='nagaland'>Nagaland</SelectItem>
                  <SelectItem value='manipur'>Manipur</SelectItem>
                  <SelectItem value='meghalaya'>Meghalaya</SelectItem>
                  <SelectItem value='arunachal'>Arunachal Pradesh</SelectItem>
                  <SelectItem value='tripura'>Tripura</SelectItem>
                  <SelectItem value='mizoram'>Mizoram</SelectItem>
                  <SelectItem value='sikkim'>Sikkim</SelectItem>
                </SelectContent>
              </Select>

              <Button variant='outline' size='icon' onClick={fetchArtisans}>
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Loading & Error Handling */}
          {isLoading ? (
            <p>Loading artisans...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : filteredArtisans.length === 0 ? (
            <p>No artisans found matching the criteria.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6'>
              {filteredArtisans.map((artisan) => (
                <ArtisanCard key={artisan._id} artisan={artisan} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
