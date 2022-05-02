import { useState, Suspense } from 'react';
import useSWR from 'swr';
import { loadTransformer } from './helpers';

function App() {
  const { data: transform } = useSWR('parcel-swc-wasm', loadTransformer, { suspense: true });
  const [code, setCode] = useState('');

  function handleCodeChange(e) {
    setCode(e.target.value);
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <textarea cols="30" rows="10" value={code} onChange={handleCodeChange} />
    </Suspense>
  );
}

export default App;
