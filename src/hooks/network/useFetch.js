import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState([])
  useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setData(data));
    }, [url]);
  console.log("Deo on roi")
  return data;
}