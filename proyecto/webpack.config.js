const path = require('path');

module.exports = {
  entry: './codigo/setup.js',  // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'),  // Carpeta de salida
    filename: 'bundle.js'  // Nombre del archivo de salida
  },
  mode: 'production',  // Modo de compilación ('development' o 'production')
  resolve: {
    fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "util": require.resolve("util/"),
    },
  },
};