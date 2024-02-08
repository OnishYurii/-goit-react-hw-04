import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { InfinitySpin } from 'react-loader-spinner';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from './ImageModal/ImageModal';
import { fetchImages } from '../api';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        setImages(prevImages => [...prevImages, ...fetchedData.results]);
        setTotalPages(fetchedData.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const openModal = item => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

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
      {images.length > 0 && <ImageGallery images={images} onClick={openModal} />}
      {images.length > 0 && !loading && page !== totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedItem && (
        <ImageModal
          isOpen={!!selectedItem}
          onRequestClose={closeModal}
          selectedItem={selectedItem}
        />
      )}

      <Toaster />
    </div>
  );
};

export default App;
