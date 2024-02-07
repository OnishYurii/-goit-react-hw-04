import { useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchImages = async query => {
    const config = {
      url: 'https://api.unsplash.com/search/photos',
      headers: { Authorization: 'Client-ID 13qoLjJb3VjBw3eeLskddWjQ34p0VZcQ70pWDAZQUrI' },
      params: {
        query: query,
      },
    };

    try {
      setImages([]);
      setError(false);
      setLoading(true);
      const response = await axios.request(config);
      setImages(response.data.results);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      {loading && (
        <InfinitySpin
          visible={true}
          width="200"
          color="#e99d11"
          ariaLabel="infinity-spin-loading"
        />
      )}
      {images.length > 0 && <ImageGallery images={images} />}
      {error && <ErrorMessage />}
      <Toaster />
    </div>
  );
};

export default App;
