import { useState, Suspense, ChangeEventHandler } from 'react';
import useSWR from 'swr';
import { decode, encode, loadTransformer } from './helpers';

function App() {
  const { data: transform } = useSWR('parcel-swc-wasm', loadTransformer, { suspense: true });
  const [code, setCode] = useState('');

  const handleCodeChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const code = e.target.value;
    const encoded = encode(code);
    const result = handleTransform(encoded);
    console.log(result);
    setCode(code);
  }

  const handleTransform = (code: Uint8Array) => {
    try {
      console.log(code);
      const result = transform({
        code,
        filename: 'index.ts',
        module_id: 'index',
        project_root: '/',
        replace_env: true,
        env: {
          NODE_ENV: 'production',
        },
        inline_fs: true,
        insert_node_globals: true,
        node_replacer: true,
        is_browser: true,
        is_worker: false,
        is_type_script: true,
        is_jsx: true,
        jsx_pragma: 'React.createElement',
        jsx_pragma_frag: 'React.Fragment',
        automatic_jsx_runtime: true,
        jsx_import_source: 'react-jsx',
        decorators: true,
        is_development: true,
        react_refresh: true,
        targets: {
          chrome: '98',
        },
        source_maps: true,
        scope_hoist: true,
        source_type: 'Module',
        supports_module_workers: true,
        is_library: false,
        is_esm_output: true,
        trace_bailouts: true,
        is_swc_helpers: false,
      });
      console.log(result);
      return decode(result.code);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <textarea value={code} onChange={handleCodeChange} />
    </Suspense>
  );
}

export default App;
