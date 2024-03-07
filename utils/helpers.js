const keyGenerate = (numberOfCharacters) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let resultado = '';
  for (let i = 0; i < numberOfCharacters; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres.charAt(indiceAleatorio);
  }
  return resultado;
};

module.exports = { keyGenerate };
