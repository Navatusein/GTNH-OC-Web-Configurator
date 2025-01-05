import {useState, useEffect} from "react";
import axios from "axios";

const useFetch = (url: string|undefined|null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url)
      return;

    axios.get(url)
      .then(response => {
        setIsLoading(false);
        setData(response.data);
        setError(null);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.message);
      })
  }, [url])

  return {data, isLoading, error};
}

export default useFetch;
