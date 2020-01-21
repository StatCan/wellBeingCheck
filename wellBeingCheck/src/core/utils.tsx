export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const pinValidator = (pin: string) => {
  if (!pin || pin.length <= 0) return 'PIN is required';
  if (pin.length < 4) return 'PIN must be at least 4 characters';
  return '';
};

export const pinConfirmValidator = (pin: string, pinConfirm: string) => {
  if (pin !== pinConfirm) return 'PINs does not match';
  return '';
};
