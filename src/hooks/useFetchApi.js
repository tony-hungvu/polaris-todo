import { useEffect, useState } from 'react';

import { baseUrl } from '../apis/apiUrl';

const useFetchApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const url = `${baseUrl}/todoes?sort=desc&limit=10`;
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData.data);
        setLoading(false);
        setFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    setData,
    loading,
    fetched,
  };
};

export default useFetchApi;
