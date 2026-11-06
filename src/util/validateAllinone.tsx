export const validateAllInOne = (type: string, value: string ) => {

  switch (type) {
    case 'email':
      { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return 'Email is required';
      if (!emailRegex.test(value)) return 'Please enter a valid email';
      return ''; }
    case 'password':
      if (!value) return 'Password is required';
      return '';

  }
}