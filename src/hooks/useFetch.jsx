import { useState, useEffect } from 'react';

const useFetch = (url, key) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getItems() {
    try {
      const response = await fetch(url),
        items = await response.json();
      // console.log(items);
      setItems(items[key]);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, [url]);

  return { items, isLoaded };
};

export default useFetch;
