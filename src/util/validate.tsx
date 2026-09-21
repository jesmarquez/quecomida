const validateName = (value: string) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!value) {
      return ('');
    } else if (!nameRegex.test(value)) {
      return('Please enter a valid name');
    } else {
      return('');
    }
  };

const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return('');
    } else if (!emailRegex.test(value)) {
      return('Please enter a valid email');
    } else {
      return('');
    }
  };
  export {
    validateName,
    validateEmail
  }