function generateKeys() {
  // Aquí iría el código JavaFX de la clase ECDLPProtocol para generar las claves
  // Para este ejemplo, simplemente generaremos claves aleatorias

  // Generar claves aleatorias
  const privateKey = generateRandomHex(64);
  const publicKey = generateRandomHex(128);

  // Mostrar las claves generadas en los campos de texto
  document.getElementById('privateKey').value = privateKey;
  document.getElementById('publicKey').value = publicKey;
}

function generateRandomHex(length) {
  const characters = 'abcdef0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
