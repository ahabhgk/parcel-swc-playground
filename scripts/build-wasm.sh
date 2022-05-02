cd parcel
yarn install
cd packages/transformers/js
CARGO_PROFILE_RELEASE_LTO=true \
CARGO_PROFILE_RELEASE_PANIC=abort \
CARGO_PROFILE_RELEASE_OPT_LEVEL=z \
node ../../../../node_modules/.bin/wasm-pack build wasm --release --target web --out-dir dist-web
