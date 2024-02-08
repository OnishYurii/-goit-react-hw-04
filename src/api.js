import axios from 'axios';

export const fetchImages = async (query, page) => {
  const config = {
    url: 'https://api.unsplash.com/search/photos',
    headers: { Authorization: 'Client-ID 13qoLjJb3VjBw3eeLskddWjQ34p0VZcQ70pWDAZQUrI' },
    params: {
      query: query,
      page: page,
      per_page: 20,
    },
  };
  const response = await axios.request(config);
  return response.data.results;
};
