const numerizeDate = dateIsoString => {
  try {
    const [day, month, year] = dateIsoString.split('-');
    if (
      !day ||
      !month ||
      !year ||
      !day.length === 2 ||
      !month.length === 2 ||
      !year.length === 4
    ) {
      throw new Error('Invalid date isoString');
    }
    return Number([year, month, day].join(''));
  } catch {
    return 0;
  }
};

const isValidNameLength = name => name.length > 3;
const isValidNameChars = name => {
  const nameRegex = /^\w+$/;
  return nameRegex.test(name);
};

const isValidEmail = email => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const isValidPassword = pass => pass.length > 5;

module.exports = {
  numerizeDate,
  isValidNameLength,
  isValidNameChars,
  isValidEmail,
  isValidPassword
};
