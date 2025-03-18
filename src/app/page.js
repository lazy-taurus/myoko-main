import SearchBar from '../components/custom/SearchBar';
import Header from '../components/custom/Header';
import ProductList from '../components/custom/ProductList';
import ArtisanList from '../components/custom/ArtisanList';
import Slogan from '../components/custom/Slogan';
import Footer from '../components/custom/Footer';

import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '../components/ui/dialog';
import { MessageCircle } from 'lucide-react';
import AITextGenerator from '@/components/custom/ai-text';

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-evenly p-24'>
        <div className='max-w-7xl w-full flex flex-wrap items-center justify-between'>
          {/* Heading */}
          <div className='text-wrap md:w-[50%] w-full lg:text-5xl md:text-3xl sm:text-5xl text-2xl font-semibold'>
            DIS<span className='forsec'>COVER</span> TRADITIONAL NORTHEAST
            TREASURES
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* AI Chat Button */}
          <div className='fixed bottom-12 backback right-6 flex items-center gap-2 z-50 group'>
            <span className='text-black text-sm px-3 py-1 rounded opacity-80 group-hover:opacity-100 transition-opacity'>
              Chat with AI
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className='p-4 rounded-full shadow-xl backsec transition-all active:scale-95 flex items-center justify-center'
                  aria-label='Open AI Chat'
                >
                  <MessageCircle className='w-[40px] h-[40px]' />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[1000px] overflow-y-auto max-h-[500px]'>
                <DialogTitle className='text-center w-full'>
                  AI Chatbot
                </DialogTitle>
                <DialogHeader>
                  <DialogDescription>
                    <AITextGenerator />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>

      {/* Other Sections */}
      <ProductList />
      <ArtisanList />
      <Slogan />
      <Footer />
    </>
  );
}
