'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Loader2, Send } from 'lucide-react';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';

export default function AITextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState('h-12');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);

    try {
      const { data } = await axios.post('/api/google-api', { prompt });
      setMessages((prev) => [...prev, { role: 'ai', content: data.result }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: 'Failed to generate content. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    e.target.style.height = 'auto';
    const newHeight = Math.min(e.target.scrollHeight, 150);
    setInputHeight(`h-[${newHeight}px]`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerate();
  };

  return (
    <div className='flex flex-col bg-background'>
      <main className='flex-1 overflow-hidden flex flex-col p-4 min-h-[400px] md:p-6 md:container md:mx-auto md:max-w-3xl'>
        <Card className='flex-1 overflow-hidden flex flex-col'>
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.length ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <div className='whitespace-pre-wrap max-w-[80%] break-words'>
                    {msg.content}
                  </div>
                </div>
              ))
            ) : (
              <div className='h-full flex items-center justify-center text-muted-foreground'>
                <p>Send a message to start the conversation</p>
              </div>
            )}
            {isLoading && (
              <div className='flex w-full max-w-[80%] rounded-lg p-4 bg-muted'>
                <Loader2 className='h-4 w-4 animate-spin' />
              </div>
            )}
          </div>

          <div className='p-4 border-t'>
            <form
              onSubmit={handleSubmit}
              className='flex space-x-2 justify-center items-center'
            >
              <Textarea
                value={prompt}
                onChange={handleInputChange}
                placeholder='Type your message...'
                className={`resize-none min-h-12 ${inputHeight}`}
                disabled={isLoading}
              />
              <Button
                type='submit'
                size='icon'
                className='backprim hover:text-black'
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Send className='h-4 w-4' />
                )}
                <span className='sr-only '>Send message</span>
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}
