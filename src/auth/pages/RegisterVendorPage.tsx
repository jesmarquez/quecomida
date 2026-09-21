import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { registerAction } from '../actions/register.action';
import { SpinButton } from '../../components/ui/SpinButton';

export const RegisterVendorPage = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repassword, setRepassword] = useState('');
  const [repasswordError, setRepasswordError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateRepassword = (value: string) => {
    if (password !== value ) {
      setRepasswordError('Password retyped does not match!');
      return;
    }
    setRepasswordError('');
    console.log(password, value);
  }

  const handleRepasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepassword(value);
    validateRepassword(value);
    console.log(repassword);
  }

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setPasswordError('Must be at least 8 characters');
      return;
    }
    if (!/\d/.test(value)) {
      setPasswordError('Must include at least one number');
      return;
    }
    if (!/[^A-Za-z0-9\s]/.test(value)) {
      setPasswordError('Must include at least one special character');
      return;
    }
    return setPasswordError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  }

  const validatePhone = (value: string) => {
    const phoneRegex = /^\+?[\d\s()-]{7,15}$/;
    if (!value) {
      setPhoneError('');
    } else if (!phoneRegex.test(value)) {
      setPhoneError('Please enter a valid phone Example: 519-9026809');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const validateName = (value: string) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!value) {
      setNameError('');
    } else if (!nameRegex.test(value)) {
      setNameError('Please enter a valid name');
    } else {
      setNameError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const isValidEmail = email.length > 0 && !emailError;
  const isInvalidEmail = email.length > 0 && !!emailError;
  const isValidName = name.length > 0 && !nameError;
  const isInvalidName = name.length > 0 && !!nameError;
  const isValidPhone = phone.length > 0 && !phoneError;
  const isInvalidPhone = phone.length > 0 && !!phoneError;
  const isValidPassword = password.length > 0 && !passwordError;
  const isInvalidPassword = password.length > 0 && !!passwordError;
  const isValidRepassword = repassword.length > 0 && !repasswordError;
  const isInvalidRepassword = repassword.length > 0 && !!repasswordError;
  const isValidForm = isValidEmail && isValidName && isValidPhone && isValidPassword && isValidRepassword;
  

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log('handle register', name, email, phone, address, password, repassword);
    setIsSubmitting(true);
    const data = await registerAction(name, email, phone,address, password);
    // console.log(data);
    setIsSubmitting(false);
    setMessage( data.message);
    setIsSubmit(true);
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center min-h-screen py-lg bg-background">

        <div className="w-full max-w-[24rem] flex flex-col items-center">
            <div className="mb-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{fontVariationSettings: "'FILL' 1"}}>skillet</span>
                <h1 className="font-headline-lg text-headline-lg text-on-background text-center">HomeChef</h1>
                <p className="font-body-md text-body-md text-on-surface-variant text-center mt-xs">A neighborhood of flavor.</p>
            </div>

            { !isSubmit && (
              <form className="w-full flex flex-col bg-surface-container rounded-xl shadow-md p-md gap-sm relative overflow-hidden" 
                    onSubmit={(e) => { handleRegister(e) }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Sign Up</h2>
                  <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="name">Name</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">id_card</span>
                          <input
                              className= {
                                  `w-full 
                                  bg-tertiary-fixed 
                                  text-on-surface 
                                  font-body-md 
                                  text-body-md 
                                  rounded-lg 
                                  py-sm 
                                  pl-xl 
                                  pr-sm 
                                  focus:outline-none 
                                  ${ isValidName ? 'focus:ring-1 focus:ring-primary transition-shadow' : 'border-error focus:outline-none focus:ring-error' }
                                  ${ isInvalidName ? 'ring-1 ring-error focus:ring-error' : ''}`}
                              
                              id="name" 
                              placeholder="Your name" 
                              required type="text" name="name"
                              value={ name }
                              onChange={ handleNameChange }/>
                      </div>
                      { isInvalidName && (
                      <p
                        className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1"
                      >
                        <span className="material-symbols-outlined text-base">error</span>
                          { nameError }
                      </p>)
                      }
                  </div>
                  <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="email">Email</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">mail</span>
                          <input 
                              className={ 
                                  `w-full 
                                  bg-tertiary-fixed 
                                  text-on-surface 
                                  font-body-md 
                                  text-body-md 
                                  rounded-lg 
                                  py-sm 
                                  pl-xl 
                                  pr-sm 
                                  focus:outline-none 
                                  ${ isValidEmail ? 'focus:ring-1 focus:ring-primary transition-shadow' : 'border-error focus:outline-none focus:ring-error' }
                                  ${ isInvalidEmail ? 'ring-1 ring-error focus:ring-error' : ''}`}

                              id="email" 
                              placeholder="you@example.com" 
                              required type="email" 
                              name="email"
                              value={ email }
                              onChange={ handleEmailChange }
                          />
                      </div>
                      { isInvalidEmail && (
                      <p
                        className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1"
                      >
                        <span className="material-symbols-outlined text-base">error</span>
                          { emailError }
                      </p>)
                      }
                  </div>
                  <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="name">Phone</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">contact_phone</span>
                          <input 
                              className={ 
                                  `w-full 
                                  bg-tertiary-fixed 
                                  text-on-surface 
                                  font-body-md 
                                  text-body-md 
                                  rounded-lg 
                                  py-sm 
                                  pl-xl 
                                  pr-sm 
                                  focus:outline-none 
                                  ${ isValidPhone ? 'focus:ring-1 focus:ring-primary transition-shadow' : 'border-error focus:outline-none focus:ring-error' }
                                  ${ isInvalidPhone ? 'ring-1 ring-error focus:ring-error' : ''}`}
                              id="phone" 
                              placeholder="Your phone number" 
                              required 
                              type="text" 
                              name="phone"
                              value={ phone }
                              onChange={ handlePhoneChange }
                          />
                      </div>
                      { isInvalidPhone && (
                      <p
                        className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1"
                      >
                        <span className="material-symbols-outlined text-base">error</span>
                          { phoneError }
                      </p>)
                      }
                  </div>
                  <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="name">Address</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">add_location</span>
                          <input 
                              className="w-full bg-tertiary-fixed texWt-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" 
                              id="address" 
                              placeholder="Your address" 
                              required 
                              type="text" 
                              name="address"
                              value={ address }
                              onChange={ (e) => setAddress(e.target.value )}
                          />
                      </div>
                  </div>

                  <div className="flex flex-col gap-xs mt-sm">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="password">Password</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                          <input 
                            className={ 
                                  `w-full 
                                  bg-tertiary-fixed 
                                  text-on-surface 
                                  font-body-md 
                                  text-body-md 
                                  rounded-lg 
                                  py-sm 
                                  pl-xl 
                                  pr-sm 
                                  focus:outline-none 
                                  ${ isValidPassword ? 'focus:ring-1 focus:ring-primary transition-shadow' : 'border-error focus:outline-none focus:ring-error' }
                                  ${ isInvalidPassword ? 'ring-1 ring-error focus:ring-error' : ''}`}

                              id="password" 
                              placeholder="••••••••" 
                              required 
                              type="password" 
                              name="password"
                              value={ password }
                              onChange={ handlePasswordChange }
                          />
                      </div>
                      { isInvalidPassword && (
                        <p
                          className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1"
                        >
                          <span className="material-symbols-outlined text-base">error</span>
                            { passwordError }
                        </p>)
                        }
                  </div>
                  <div className="flex flex-col gap-xs mt-sm">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="repassword">Retype Password</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                          <input 
                            className={ 
                                  `w-full 
                                  bg-tertiary-fixed 
                                  text-on-surface 
                                  font-body-md 
                                  text-body-md 
                                  rounded-lg 
                                  py-sm 
                                  pl-xl 
                                  pr-sm 
                                  focus:outline-none 
                                  ${ isValidRepassword ? 'focus:ring-1 focus:ring-primary transition-shadow' : 'border-error focus:outline-none focus:ring-error' }
                                  ${ isInvalidRepassword ? 'ring-1 ring-error focus:ring-error' : ''}`}
                              id="repassword" 
                              placeholder="••••••••" 
                              required 
                              type="password" 
                              name="repassword"
                              value={ repassword }
                              onChange={ handleRepasswordChange }/>
                      </div>

                        { isInvalidRepassword && (
                        <p
                          className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1"
                        >
                          <span className="material-symbols-outlined text-base">error</span>
                            { repasswordError }
                        </p>)
                        }
                  </div>

                  <div className="flex justify-end mt-xs">
                      <a className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors" href="#">Forgot Password?</a>
                  </div>

                  {
                    !isSubmit && (
                      <button type="submit" 
                          disabled={ !isValidForm || (isSubmitting && isValidForm)}
                          className={`mt-md 
                            w-full
                            flex
                            justify-center
                            items-center
                            gap-2
                            bg-primary 
                            text-on-primary 
                            font-label-md 
                            text-label-md 
                            uppercase 
                            py-sm rounded-lg 
                            hover:bg-on-primary-fixed-variant transition-colors shadow-sm min-h-[48px]
                            ${ !isValidForm ? 'disabled:opacity-50' : '' }
                            `}
                        >
                          {isSubmitting && <SpinButton />}
                          Sign Up
                      </button>)
                  }



              </form>

              
              )
            }

            { isSubmit && (
              <div className="bg-surface-container-low p-md rounded-lg flex items-start gap-md mt-sm">
                <span className="material-symbols-outlined text-primary mt-1">info</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface mb-xs" id="status-heading">
                    Request received
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant" id="status-desc">
                    { message }
                  </p>
                </div>
              </div>
              )
            }


            { !isSubmit && (
            <div className="w-full flex flex-col items-center mt-lg gap-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">New to the neighborhood?</span>
                <div className="flex gap-sm">
                    <button onClick= { () => navigate('/auth/login') } 
                      className="
                        bg-transparent hover:bg-secondary/10 transition-colors min-h-[48px]
                        text-secondary 
                         font-label-md 
                         text-label-md 
                         uppercase 
                         tracking-widest 
                         py-sm px-md rounded-lg outline outline-1 outline-secondary 
                         ">
                        I have an account!
                    </button>
                </div>
            </div>
            )
          }
        </div>
    </div>

  );
}
