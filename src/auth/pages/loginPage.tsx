import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { loginAction } from "../actions/loginAction";
import { toast } from "sonner";
import { useAuth } from '../store/AuthContext';
import { validateEmail } from "../../util/validate";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthentication, saveToken, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated()) navigate('/vendor/dashboard');
    
        return;
    }, []);
  

  const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const message = validateEmail(email);
    setEmailError(message);
    return;
  }

  const isInvalidEmail = email.length > 0 && !!emailError;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    return;
  }

  const isInvalidPassword = password.length > 0 ? false : true;

  const isValidForm = !isInvalidEmail && !isInvalidPassword;

  const handleLogin = async (event: FormEvent<HTMLFormEvent>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const dataAuth = await loginAction(email, password);
    
    if ( dataAuth.token ) {
      saveToken(dataAuth.token);
      setAuthentication(dataAuth.username, dataAuth.token);
      console.log(dataAuth.username, dataAuth.token);
      navigate('/vendor/dashboard');
      return;
    } else {
        toast.error('Email or password invalid');
        console.log('error');
    }
    // navigate('dashboard'); 
    return;
  }
  
  return (
    <div className="flex flex-col w-full h-full items-center justify-center min-h-screen py-lg bg-background">
        <div className="w-full max-w-[24rem] flex flex-col items-center">
            <div className="mb-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{fontVariationSettings: "'FILL' 1"}}>skillet</span>
                <h1 className="font-headline-lg text-headline-lg text-on-background text-center">HomeChef</h1>
                <p className="font-body-md text-body-md text-on-surface-variant text-center mt-xs">A neighborhood of flavor.</p>
            </div>
            <form className="w-full flex flex-col bg-surface-container rounded-xl shadow-md p-md gap-sm relative overflow-hidden" 
                  onSubmit={(e) => { handleLogin(e) }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Sign In</h2>
                <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="email">Email</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">mail</span>
                        <input
                            onChange={ handleEmailChange }
                            className="w-full bg-tertiary-fixed text-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" id="email" placeholder="you@example.com" required type="email" name="email"/>
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
                <div className="flex flex-col gap-xs mt-sm">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="password">Password</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                        <input 
                            onChange={ handlePasswordChange }
                            className="w-full bg-tertiary-fixed text-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" id="password" placeholder="••••••••" required type="password" name="password"/>
                    </div>
                </div>
                <div className="flex justify-end mt-xs">
                    <Link to="/auth/forget-password" className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors">Forgot Password?</Link>
                </div>
                <button type="submit" 
                    disabled={ !isValidForm }
                    className="mt-md 
                        w-full 
                        bg-primary 
                        text-on-primary 
                        font-label-md 
                        text-label-md 
                        uppercase 
                        tracking-widest 
                        py-sm rounded-lg 
                        hover:bg-on-primary-fixed-variant 
                        transition-colors shadow-sm min-h-[48px]">
                    Sign In
                </button>
            </form>
            <div className="w-full flex flex-col items-center mt-lg gap-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">New to the neighborhood?</span>
                <div className="flex gap-sm">
                    <button
                        onClick={ () => navigate('/') }
                        className="bg-transparent text-secondary font-label-md text-label-md uppercase tracking-widest py-sm px-md rounded-lg outline outline-1 outline-secondary hover:bg-secondary/10 transition-colors min-h-[48px]">
                        Join as Diner
                    </button>
                    <button 
                        onClick={() => navigate('/auth/register')}
                        className="bg-transparent text-secondary font-label-md text-label-md uppercase tracking-widest py-sm px-md rounded-lg outline outline-1 outline-secondary hover:bg-secondary/10 transition-colors min-h-[48px]">
                        Join as Cook
                    </button>
                </div>
            </div>
        </div>
    </div>

  );
};


