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
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (password.length < 4) return 'Password must be at least 4 characters';

  return '';
};

export const passwordConfirmValidator = (password: string, passwordConfirm: string) => {
  if (!passwordConfirm || passwordConfirm.length <= 0) return 'Password cannot be empty.';
  if (password !== passwordConfirm) return "Password's does not match";
  return '';
};

export const securityQuestionValidator = (securityQuestion: string) => {
  //if (!securityQuestion || securityQuestion.length <= 0) return 'Security question is required';
  //if (securityQuestion.length < 4) return 'Security question must be at least 4 characters';
  return '';
};

export const securityAnswerValidator = (securityAnswer: string) => {
  if (!securityAnswer || securityAnswer.length <= 0) return 'Security answer is required';
  if (securityAnswer.length < 4) return 'Security answer must be at least 4 characters';
  return '';
};
