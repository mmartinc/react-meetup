import { useState, useEffect } from 'react';

export const useFetch = (options) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(options?.url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log('Error fetching data: ', error);
        setData({ error: error.message });
      });
  }, [options.url]);

  return {
    data: data,
  };
};
