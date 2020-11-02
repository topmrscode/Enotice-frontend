export const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
};

export const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  }
  return error;
};

export const validateName = (value) => {
    let error;
    if (!value || value.length < 3) {
      error = "Please enter a valid name";
    }
    return error;
};
