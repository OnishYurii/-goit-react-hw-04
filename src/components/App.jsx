import { useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import axios from 'axios';

export const App = () => {
  const [images, setImages] = useState([]);

  const searchImages = async query => {
    const config = {
      url: 'https://api.unsplash.com/photos/',
      headers: { Authorization: 'Client-ID 13qoLjJb3VjBw3eeLskddWjQ34p0VZcQ70pWDAZQUrI' },
      params: {
        query: query,
      },
    };

    try {
      const response = await axios.request(config);
      setImages(response.data.results);
    } catch (err) {}
  };

  return <SearchBar onSubmit={searchImages} />;
};
