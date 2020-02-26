export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 10;
  if (password.length < 8) return 20;
  if (!/[A-Z]/.test(password)) return 30;
  if (!/[@!#$%^&*(),.?:{}|<>]/.test(password)) return 40;
  if (!/[a-z]/.test(password)) return 50;
  if (!/[0-9]/.test(password)) return 60;
  return 200;
};

export const passwordConfirmValidator = (password: string, passwordConfirm: string) => {
  if (!passwordConfirm || passwordConfirm.length <= 0) return 10;
  if (password !== passwordConfirm) return 20
  return '';
};

export const securityQuestionValidator = (securityQuestion: string) => {
  if (securityQuestion.length == 0) return 'Security question is required';
  return '';
};

export const securityAnswerValidator = (securityAnswer: string) => {
  if (!securityAnswer || securityAnswer.length <= 0) return 'Security answer is required';
  if (securityAnswer.length < 4) return 'Security answer must be at least 4 characters';
  return '';
};
