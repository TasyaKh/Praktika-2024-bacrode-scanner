import { useState } from "react";


export const useAxios = () => {

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const makeQuery = async (getFunction: () => Promise<any>) => {

    setIsLoading(true);
    await getFunction().then((res) => {
      setData(res);
    }).catch((err) => {
      setError(`Error. ${err || err?.message}`);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return { data, isLoading, error, makeQuery };
};
