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

  
  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return ('Must be at least 8 characters');
    }
    if (!/\d/.test(value)) {
      return('Must include at least one number');
      return;
    }
    if (!/[^A-Za-z0-9\s]/.test(value)) {
      return('Must include at least one special character');
    }
    return ('');
  };

  export {
    validateName,
    validateEmail,
    validatePassword
  }