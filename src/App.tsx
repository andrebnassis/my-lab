import React, { useCallback, useEffect, useState } from 'react';

function delay(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

const App:React.FC = () => {
 

  const [promises, setPromises] = useState<Array<Promise<any>>>([1,2,3,4,5].map(num => new Promise(async resolve => resolve(num))));
    
  const handlePromises = useCallback(async () => {
    if(promises.length)
    {
      await delay(1000);
      const targetPromise = promises.slice(0,1);
      const result = await targetPromise[0];
      console.log({result});
      const rest = promises.slice(1);
      setPromises(rest);
  }
  }, [promises])

  useEffect(() => {handlePromises()}, [handlePromises])

  return (
  <>
    See console.log
  </>)
}

export default App;
