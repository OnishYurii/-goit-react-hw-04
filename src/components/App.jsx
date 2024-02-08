import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { InfinitySpin } from 'react-loader-spinner';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from '../api';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const searchImages = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await fetchImages(query.split('/')[1], page);
        setImages(prevArticles => [...prevArticles, ...fetchedData]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      {error && <ErrorMessage />}
      {loading && (
        <InfinitySpin
          visible={true}
          width="200"
          color="#e99d11"
          ariaLabel="infinity-spin-loading"
        />
      )}
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}

      <Toaster />
    </div>
  );
};

export default App;
