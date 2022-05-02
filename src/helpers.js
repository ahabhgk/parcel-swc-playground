export async function loadTransformer() {
  const wasm = await (await import('../parcel/packages/transformers/js/wasm/dist-web')).default();
  return wasm.transform;
}
