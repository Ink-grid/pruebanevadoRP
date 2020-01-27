/** @format */

import { useEffect, useState } from 'react';

const usePrueba = urls => {
  const configServiceDefault = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default'
  };

  const [data, setData] = useState(null);
  const [config] = useState(configServiceDefault);
  const [refresh, setRefresh] = useState(null);

  const crudData = async () => {
    try {
      const data = await fetch(urls, config);
      if (data.ok) {
        setData(await data.json());
      }
      // setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    crudData();
  }, [config, refresh]);

  return [data, setRefresh, setData];
};

export default usePrueba;
