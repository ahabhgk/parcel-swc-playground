import * as wasm from '../../parcel/packages/transformers/js/wasm/dist-web';

export interface TransformConfig {
  filename: string;
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

export interface TransformResult {
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

export interface DependencyDescriptor {
  kind: DependencyKind;
  loc: SourceLocation;
  specifier: string;
  attributes?: Record<string, boolean>;
  is_optional: boolean;
  is_helper: boolean;
  source_type?: 'Module' | 'script';
  placeholder?: string;
}

export interface HoistResult {
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

export interface CollectResult {
  imports: CollectImportedSymbol[];
  exports: CollectExportedSymbol[];
  exports_all: CollectExportedAll[];
}

export type DependencyKind =
  | 'Import'
  | 'Export'
  | 'DynamicImport'
  | 'Require'
  | 'WebWorker'
  | 'ServiceWorker'
  | 'Worklet'
  | 'Url'
  | 'File';

export type ImportKind = 'Require' | 'Import' | 'DynamicImport';

export interface SourceLocation {
  start_line: number;
  start_col: number;
  end_line: number;
  end_col: number;
}

export interface ExportedSymbol {
  local: string;
  exported: string;
  loc: SourceLocation;
}

export interface ImportedSymbol {
  source: string;
  local: string;
  imported: string;
  loc: SourceLocation;
}

export interface CollectImportedSymbol {
  source: string;
  local: string;
  imported: string;
  loc: SourceLocation;
  kind: ImportKind;
}

export interface CollectExportedSymbol {
  source?: string;
  local: string;
  exported: string;
  loc: SourceLocation;
}

export interface CollectExportedAll {
  source: string;
  loc: SourceLocation;
}

export interface Diagnostic {
  message: string;
  code_highlights?: CodeHighlight[];
  hints?: string[];
  show_environment: boolean;
  severity: DiagnosticSeverity;
  documentation_url?: string;
}

export interface CodeHighlight {
  message?: string;
  loc: SourceLocation;
}

export type DiagnosticSeverity =
  | 'Error' // Fails the build with an error.
  | 'Warning' // Logs a warning, but the build does not fail.
  | 'SourceError'; // An error if this is source code in the project, or a warning if in node_modules.

export type Transformed = {output: string; result: TransformResult};

export type Transform = (code: string, config: TransformConfig) => Transformed;

export async function load(): Promise<Transform> {
  await wasm.default();
  return (code: string, config: TransformConfig) => {
    const result = wasm.transform({code: encode(code), ...config});
    const output = decode(result.code);
    delete result.code;
    return {
      output,
      result,
    };
  };
}

const enc = new TextEncoder();
function encode(str: string) {
  return enc.encode(str);
}

const dec = new TextDecoder();
function decode(buf?: BufferSource) {
  return dec.decode(buf);
}
