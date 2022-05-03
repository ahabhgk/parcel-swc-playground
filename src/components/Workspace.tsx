import {useState, useEffect, useCallback} from 'react';
import useSWR from 'swr';
import {
  encode,
  load,
  TransformConfig,
  TransformResult,
} from '../helpers/transformer';
import styled from '@emotion/styled';
import OutputEditor from './OutputEditor';
import InputEditor from './InputEditor';
import {loader, OnChange} from '@monaco-editor/react';
import {Center, CircularProgress} from '@chakra-ui/react';

const Main = styled.main`
  display: grid;
  padding: 1em;
  gap: 1em;

  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: 'sidebar' 'input' 'output';

  min-height: 88vh;

  @media screen and (min-width: 600px) {
    grid-template-columns: 256px 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: 'sidebar input' 'sidebar output';

    min-height: calc(100vh - 80px);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 256px repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: 'sidebar input output';

    min-height: calc(100vh - 80px);
  }
`;

const CONFIG: Omit<TransformConfig, 'code'> = {
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
};

export default function Workspace() {
  const {data: monaco} = useSWR('monaco', () => loader.init());
  const {data: transform} = useSWR('parcel-swc-wasm', load);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<TransformResult>();

  const handleCodeChange: OnChange = code => {
    if (code) {
      setCode(code);
    }
  };

  const handleTransform = useCallback(
    (code: Uint8Array) => {
      if (transform) {
        const result = transform({code, ...CONFIG});
        setResult(result);
        console.log(result);
      }
    },
    [transform]
  );

  useEffect(() => {
    handleTransform(encode(code));
  }, [code, handleTransform]);

  if (!transform || !monaco) {
    return (
      <Center width="full" height="88vh" display="flex" flexDirection="column">
        <CircularProgress isIndeterminate mb="3" />
        <div>Loading parcel-swc wasm and monaco editor...</div>
      </Center>
    );
  }

  return (
    <Main>
      <InputEditor code={code} onChange={handleCodeChange} config={CONFIG} />
      <OutputEditor result={result} />
    </Main>
  );
}
