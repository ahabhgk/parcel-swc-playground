import * as wasm from '../parcel/packages/transformers/js/wasm/dist-web';

interface TransformConfig {
  filename: string;
  code: Uint8Array;
  module_id: string;
  project_root: string;
  replace_env: boolean;
  env: Record<string, string>;
  inline_fs: boolean;
  insert_node_globals: boolean;
  node_replacer: boolean;
  is_browser: boolean;
  is_worker: boolean;
  is_type_script: boolean;
  is_jsx: boolean;
  jsx_pragma?: string;
  jsx_pragma_frag?: string;
  automatic_jsx_runtime: boolean;
  jsx_import_source?: string;
  decorators: boolean;
  is_development: boolean;
  react_refresh: boolean;
  targets?: Record<string, string>;
  source_maps: boolean;
  scope_hoist: boolean;
  source_type: 'Script' | 'Module';
  supports_module_workers: boolean;
  is_library: boolean;
  is_esm_output: boolean;
  trace_bailouts: boolean;
  is_swc_helpers: boolean;
}

interface TransformResult {
  code: Uint8Array;
  map?: string;
  shebang?: string;
  dependencies: DependencyDescriptor[];
  hoist_result?: HoistResult;
  symbol_result?: CollectResult;
  diagnostics?: Diagnostic[];
  needs_esm_helpers: boolean;
  used_env: string[];
  has_node_replacements: boolean;
}

interface DependencyDescriptor {
  kind: DependencyKind;
  loc: SourceLocation;
  specifier: string;
  attributes?: Record<string, boolean>;
  is_optional: boolean;
  is_helper: boolean;
  source_type?: 'Module' | 'script';
  placeholder?: string;
}

interface HoistResult {
  imported_symbols: ImportedSymbol[];
  exported_symbols: ExportedSymbol[];
  re_exports: ImportedSymbol[];
  self_references: string[];
  wrapped_requires: string[];
  dynamic_imports: Record<string, string>;
  static_cjs_exports: boolean;
  has_cjs_exports: boolean;
  is_esm: boolean;
  should_wrap: boolean;
}

interface CollectResult {
  imports: CollectImportedSymbol[];
  exports: CollectExportedSymbol[];
  exports_all: CollectExportedAll[];
}

type DependencyKind =
  | 'Import'
  | 'Export'
  | 'DynamicImport'
  | 'Require'
  | 'WebWorker'
  | 'ServiceWorker'
  | 'Worklet'
  | 'Url'
  | 'File';

type ImportKind = 'Require' | 'Import' | 'DynamicImport';

interface SourceLocation {
  start_line: number;
  start_col: number;
  end_line: number;
  end_col: number;
}

interface ExportedSymbol {
  local: string;
  exported: string;
  loc: SourceLocation;
}

interface ImportedSymbol {
  source: string;
  local: string;
  imported: string;
  loc: SourceLocation;
}

interface CollectImportedSymbol {
  source: string;
  local: string;
  imported: string;
  loc: SourceLocation;
  kind: ImportKind;
}

interface CollectExportedSymbol {
  source?: string;
  local: string;
  exported: string;
  loc: SourceLocation;
}

interface CollectExportedAll {
  source: string;
  loc: SourceLocation;
}

interface Diagnostic {
  message: string;
  code_highlights?: CodeHighlight[];
  hints?: string[];
  show_environment: boolean;
  severity: DiagnosticSeverity;
  documentation_url?: string;
}

interface CodeHighlight {
  message?: string;
  loc: SourceLocation;
}

type DiagnosticSeverity =
  | 'Error' // Fails the build with an error.
  | 'Warning' // Logs a warning, but the build does not fail.
  | 'SourceError'; // An error if this is source code in the project, or a warning if in node_modules.

type Transform = (config: TransformConfig) => TransformResult;

export async function loadTransformer(): Promise<Transform> {
  await wasm.default();
  return wasm.transform;
}

const enc = new TextEncoder();
export function encode(str: string) {
  return enc.encode(str);
}

const dec = new TextDecoder();
export function decode(buf?: BufferSource) {
  return dec.decode(buf);
}
