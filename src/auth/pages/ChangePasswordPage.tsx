import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router";
import { changePassword } from "../actions/changePassword";
import { SpinButton } from "../../components/ui/SpinButton";
import { validateAllInOne } from "../../util/validateAllinone";

type TouchedFields = { 
  password: boolean; 
  repassword: boolean 
};

export const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [isSubmitted, setIsSubmitted ] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');


  const [formData, setFormData] = useState({
    password: '',
    repassword: ''
  });

  const [ touched, setTouched ] = useState<TouchedFields>({
    password: false,
    repassword: false
  });

  const [ errors, setErrors ] = useState({
    password: '',
    repassword: ''
  });
  
  useEffect(() => {
    const tokenSecurity = searchParams.get('token_security');
    const email = searchParams.get('email');

    if (!tokenSecurity || !email) {
      navigate('/auth/login') ;
    } 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(tokenSecurity || '');
    setEmail(email || '');
    // console.log('token-security', tokenSecurity, email);
    return;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof TouchedFields;
    const value = e.target.value as keyof TouchedFields;
        
    setFormData((prev) => ({ ...prev, [name]: value}));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateAllInOne(name, value) }));
      if (name === 'repassword') {
        if (formData.password !== value) {
          setErrors((prev) => ({ ...prev, [name]: 'Password does not match' }));
        }
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({...prev, [name] : validateAllInOne(name, value)}))
  }

  const handleChangePassword = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('handle submit change password');
    setIsSubmitting(true);
    
    const data = await changePassword(email, token, formData.password);
    if ( data ) {
      setMessage(data.message);
      setMessageTitle('Request received');
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
    return;
  }

  const isValid = touched.password && errors.password === '' && formData.password.length > 1 && formData.repassword === formData.password;

  return (
  <div className="flex flex-col w-full h-full items-center justify-center min-h-screen py-lg bg-background">
        <div className="w-full max-w-[24rem] flex flex-col items-center">
            <div className="mb-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{fontVariationSettings: "'FILL' 1"}}>skillet</span>
                <h1 className="font-headline-lg text-headline-lg text-on-background text-center">HomeChef</h1>
                <p className="font-body-md text-body-md text-on-surface-variant text-center mt-xs">A neighborhood of flavor.</p>
            </div>
            { !isSubmitted && (

              <form className="w-full flex flex-col bg-surface-container rounded-xl shadow-md p-md gap-sm relative overflow-hidden" 
                    onSubmit={(e) => { handleChangePassword(e) }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Change password</h2>
                  <div className="flex flex-col gap-xs mt-sm">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="password">Password</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                          <input 
                              onChange={ handleChange }
                              onBlur={ handleBlur }
                              className="w-full bg-tertiary-fixed text-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" id="password" placeholder="••••••••" required type="password" name="password"/>
                      </div>
                      { errors.password && (
                        <p className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1">
                          <span className="material-symbols-outlined text-base">error</span>{ errors.password }
                        </p>)
                      }
                  </div>
                  <div className="flex flex-col gap-xs mt-sm">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="password">Retype Password</label>
                      <div className="relative">
                          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                          <input 
                              onChange={ handleChange }
                              onBlur={ handleBlur }
                              className="w-full bg-tertiary-fixed text-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" id="password" placeholder="••••••••" required type="password" name="repassword"/>
                      </div>
                      { errors.repassword && (<p className="flex items-center gap-1 text-error text-body-sm font-body-sm mt-1">
                          <span className="material-symbols-outlined text-base">error</span>{ 'Password does not match!' }
                        </p>)
                      }
                  </div>
                  <button type="submit" 
                      disabled={ !isValid || isSubmitting }
                      className={`mt-md 
                          w-full
                          flex
                          items-center
                          justify-center
                          bg-primary 
                          text-on-primary 
                          font-label-md 
                          text-label-md 
                          uppercase 
                          tracking-widest 
                          py-sm rounded-lg 
                          hover:bg-on-primary-fixed-variant 
                          transition-colors shadow-sm min-h-[48px]
                          ${ !isValid || isSubmitting ? 'disabled:opacity-50' : '' }`}>
                      { isSubmitting && <SpinButton /> }
                      Change it!
                  </button>
              </form>
            )}
            {
            isSubmitted && (
              <>
              <div className="bg-surface-container-low p-md rounded-lg flex items-start gap-md mt-sm">
                <span className="material-symbols-outlined text-primary mt-1">info</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface mb-xs" id="status-heading">
                    { messageTitle }
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant" id="status-desc">
                    { message }
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-xs">
                <Link to="/auth/login" className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors">Go to sign in?</Link>
              </div>
              </>
            )
          }
        </div>
    </div>

  )
}
