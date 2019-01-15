import generator from 'generate-password';

export const config = {
  length: 10,
  numbers: true,
  uppercase: true,
  symbols: true,
  excludeSimilarCharacters: true,
  strict: true,
};

export const customPassword = () => {
  let newPassword = generator.generate(config);

  if (newPassword.length <= 10) {
    newPassword = `${newPassword}_${generator.generate(config)}`;
  }
  return newPassword;
};
