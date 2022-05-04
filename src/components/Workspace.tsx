import {useState, useMemo} from 'react';
import useSWR from 'swr';
import {load, TransformConfig, Transformed} from '../helpers/transformer';
import InputEditor from './InputEditor';
import OutputEditor from './OutputEditor';
import ConfigEditor from './ConfigEditor';
import {loader, OnChange} from '@monaco-editor/react';
import {Center, CircularProgress, Grid} from '@chakra-ui/react';
import ResultEditor from './ResultEditor';

const DEFAULT_CONFIG: Omit<TransformConfig, 'code'> = {
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
  const {data: transform} = useSWR('parcel-swc-wasm', () => load());
  const [code, setCode] = useState('');
  const [config, setConfig] = useState(JSON.stringify(DEFAULT_CONFIG, null, 2));

  const handleCodeChange: OnChange = code => {
    if (code) {
      setCode(code);
    }
  };

  const handleConfigChange: OnChange = config => {
    if (config) {
      setConfig(config);
    }
  };

  const {output, result} = useMemo<Partial<Transformed>>(() => {
    if (transform) {
      return transform(code, JSON.parse(config));
    }
    return {};
  }, [code, config, transform]);

  if (!transform || !monaco) {
    return (
      <Center width="full" height="88vh" display="flex" flexDirection="column">
        <CircularProgress isIndeterminate mb="3" />
        <div>Loading parcel-swc wasm and monaco editor...</div>
      </Center>
    );
  }

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(2, 1fr)"
      px={4}
      py={2}
      rowGap={2}
      columnGap={4}
      flex={1}
    >
      <InputEditor code={code} onChange={handleCodeChange} />
      <OutputEditor code={output} />
      <ConfigEditor config={config} onChange={handleConfigChange} />
      <ResultEditor result={result} />
    </Grid>
  );
}
