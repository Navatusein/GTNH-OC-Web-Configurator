import {useEffect, useState} from "react";

export default function useFetch(url: string|null) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url)
      return;

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.message);
      })
  }, [url])

  return {data, isLoading, error};
}