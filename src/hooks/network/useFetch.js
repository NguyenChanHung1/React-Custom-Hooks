import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setData(data);
      });
  }, [url]);
  return [data, setData];
}