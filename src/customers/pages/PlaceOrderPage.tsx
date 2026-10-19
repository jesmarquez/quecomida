import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getMealById } from '../../vendors/actions/get-meal-byid.action';
import type { Meal } from "../../vendors/interfaces/meals.response.interface";
import { validateEmail } from '../../util/validate';
import { createOrder } from "../actions/create-order.action";
import { verifyOrderAction } from '../actions/verify-order.action'
import { toast } from "sonner";
import { SpinButton } from "../../components/ui/SpinButton";
import { isAxiosError } from "axios";

export const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const inputQuantityRef = useRef(null);
    const [meal, setMeal] = useState<Meal>();
    const [qty, setQty] = useState(1);
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched ] = useState(false);
    const [emailMsgError,setEmailMsgError] = useState("");
    const [step, setStep] = useState("THIRD");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
      async function getMeal() {
        try {
          const mealToOrder = await getMealById(id!);
          // console.log('mealToOrder', mealToOrder);

          setMeal(mealToOrder);
        } catch (error) {
          console.log(error);
        }
      }
      getMeal();
    }, []);


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      console.log('change');
      const value = e.target.value;
      setEmail(value);
      if (emailTouched) {
        console.log('onchange');
        setEmailMsgError(validateEmail(value));
      }
      if (value.length === 0) {
        setEmailTouched(false);
        setEmailMsgError('');
      }
    }

    const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value } = e.target;
      console.log('onblur');
      // console.log(name, value);
      if (value.length > 0) setEmailTouched(true);
      setEmailMsgError(validateEmail(value));
    }

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const quantity = inputQuantityRef.current.value;
      setIsSubmitting(true);
      console.log('send email', email, id, quantity);
      try {
        const orderCreated = await createOrder(email, id!, quantity)
        setOrderId(orderCreated.orderId);
        console.log(orderCreated);
        setIsSubmitting(true);
        setStep('SECOND');
      } catch (error) {
        console.log(error);
        toast.error('Error creating order!');
      }
    }

    const onSubmitSecond = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (code.length != 6 ) return;

      setIsSubmitting(true);
      console.log('confirm order');
      try {
        setIsSubmitting(true);
        console.log({orderId}, {code});
        await verifyOrderAction(orderId, code);
        setIsSubmitting(false);
        setStep('THIRD');

      } catch (error) {
        const message = isAxiosError(error)
          ? error.response?.data?.error ?? 'Could not verify the order'
          : 'Could not verify the order';
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    }


    const basePrice = meal?.price ?? 0;
    const isEmailValid = emailTouched && !emailMsgError;
    // console.log({ emailMsgError} , { emailTouched }, {isEmailValid} );
    return (
        <main className="w-full pt-20">
            <div className="flex flex-col w-full relative min-h-[calc(100vh-80px)]">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-[40%] -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-[80px]"></div>
                </div>
                <div className="w-full max-w-container-max mx-auto px-gutter py-xl relative z-10 flex-grow flex flex-col md:flex-row gap-lg">
                    <div className="flex-1 flex flex-col gap-md">
                        <div className="flex flex-col mb-md">
                            <span className="font-label-md text-label-md text-secondary tracking-[0.1em] uppercase mb-xs">Almost Yours</span>
                            <h1 className="font-display-lg text-display-lg text-on-background mb-sm leading-none">Review Your Selection</h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[90%]">You're one step away from bringing a touch of artisanal warmth to your table.</p>
                        </div>
                        <div className="bg-surface-container rounded-xl shadow-[0_8px_30px_rgba(74,66,56,0.06)] overflow-hidden flex flex-col">
                            <div className="h-64 w-full relative">
                                <div className="absolute inset-0 bg-cover bg-center" 
                                    style={{backgroundImage: `url('${import.meta.env.VITE_QC_API_URL}${meal?.images?.[0]?.imageUrl}')`}}></div>
                                <div className="absolute top-sm left-sm flex gap-xs">
                                    <span className="bg-secondary/15 text-secondary px-sm py-[2px] rounded-full font-label-md text-[12px] uppercase backdrop-blur-sm">Vegetarian</span>
                                </div>
                            </div>
                            <div className="p-md flex flex-col gap-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-headline-lg text-headline-lg text-on-surface">{meal?.title}</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                                            <span className="material-symbols-outlined text-[18px]">skillet</span> { meal?.vendor.name }
                                        </p>
                                    </div>
                                    <span className="font-headline-md text-headline-md text-primary">${ basePrice.toFixed(2)}</span>
                                </div>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-sm border-t border-outline-variant/30 pt-sm">
                                    { meal?.description }
                                </p>
                            </div>
                        </div>
                    </div>
                    {
                      step === 'FIRST' &&
                    <div className="w-full md:w-[420px] lg:w-[480px] shrink-0">
                        <div className="bg-surface sticky top-[104px] rounded-xl shadow-[0_12px_40px_rgba(74,66,56,0.08)] overflow-hidden">
                            <div className="bg-surface-container-high px-md py-sm flex justify-between items-center border-b border-outline-variant/20">
                                <h2 className="font-headline-sm text-headline-sm text-on-surface">Order Details</h2>
                                <span className="font-label-md text-label-md text-primary tracking-wide">SECURE CHECKOUT</span>
                            </div>
                            <div className="p-md">
                                <form className="flex flex-col gap-md" onSubmit={ (e) => onSubmit(e)}>
                                    <div className="flex flex-col gap-xs relative">
                                        <label className="font-label-md text-label-md text-on-surface-variant mb-1">Contact Email</label>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-sm text-outline z-10">mail</span>
                                            <input className="w-full bg-surface-bright font-body-md text-body-md text-on-surface pl-xl pr-sm py-[14px] rounded-lg border border-outline-variant" placeholder="your@email.com" required type="email"
                                                onChange={ handleEmailChange }
                                                onBlur={ handleEmailBlur }
                                                name="email"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-xs mt-sm">
                                        <label className="font-label-md text-label-md text-on-surface-variant mb-1">Quantity</label>
                                        <div className="flex items-center gap-sm">
                                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center" type="button">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <input ref={ inputQuantityRef } className="flex-1 h-12 bg-surface-bright font-headline-md text-center text-on-surface border border-outline-variant rounded-lg" value={qty} readOnly/>
                                            <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center" type="button">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-md pt-md border-t border-outline-variant/30 flex flex-col gap-sm">
                                        <div className="flex justify-between items-center text-on-surface-variant">
                                            <span>Subtotal ({qty} item{qty > 1 ? 's' : ''})</span>
                                            <span>${(basePrice * qty).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-on-surface-variant">
                                            <span>Service Fee</span>
                                            <span>$0.00</span>
                                        </div>
                                    </div>
                                    <div className="mt-sm pt-sm border-t border-outline-variant/50 flex justify-between items-end mb-md">
                                        <span className="font-headline-sm">Total</span>
                                        <span className="font-display-lg text-primary">${(basePrice * qty).toFixed(2)}</span>
                                    </div>
                                    <button
                                      type="submit"
                                      className={`w-full h-14 
                                        bg-primary 
                                        text-on-primary 
                                        font-label-md 
                                        uppercase 
                                        rounded-lg 
                                        shadow-md 
                                        hover:bg-primary-container 
                                        transition-all 
                                        flex items-center 
                                        justify-center gap-sm ${ !isEmailValid ? 'disabled:opacity-50' : ''}`}
                                      disabled={ !isEmailValid }
                                      >
                                      { isSubmitting && <SpinButton />}
                                      Send email to confirm <span className="material-symbols-outlined">arrow_forward</span>
                                  </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    }
                    {
                      step === 'SECOND' &&
                    <div className="w-full md:w-[420px] lg:w-[480px] shrink-0">
                        <div className="bg-surface sticky top-[104px] rounded-xl shadow-[0_12px_40px_rgba(74,66,56,0.08)] overflow-hidden">
                            <div className="bg-surface-container-high px-md py-sm flex justify-between items-center border-b border-outline-variant/20">
                                <h2 className="font-headline-sm text-headline-sm text-on-surface">Confirmation</h2>
                                <span className="font-label-md text-label-md text-primary tracking-wide">SECURE CHECKOUT</span>
                            </div>
                            <div className="p-md">
                                <form className="flex flex-col gap-md" onSubmit={ (e) => onSubmitSecond(e)}>
                                    <div className="flex flex-col gap-xs relative">
                                        <label className="font-label-md text-label-md text-on-surface-variant mb-1">Enter the 6-digit code we emailed you</label>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-sm text-outline z-10">confirmation_number</span>
                                            <input className="w-full text-center
                                              bg-surface-bright font-body-md text-body-lg text-on-surface 
                                              pl-xl pr-sm py-[14px] 
                                              rounded-lg border border-outline-variant" required
                                                name="code"
                                                maxLength={ 6 }
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                pattern="[0-9]*" 
                                                title="Only numbers are allowed"
                                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                                value={ code }
                                            />
                                        </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className={`w-full h-14 bg-primary text-on-primary 
                                        font-label-md uppercase rounded-lg shadow-md 
                                        hover:bg-primary-container transition-all flex items-center 
                                        justify-center gap-sm ${ 'disabled:opacity-50' }`}
                                      disabled={ code.length != 6 }
                                      >

                                      Send code to confirm <span className="material-symbols-outlined">arrow_forward</span>
                                  </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    }
                    {
                      step == 'THIRD' && 
                                          <div className="w-full md:w-[420px] lg:w-[480px] shrink-0">
                        <div className="bg-surface sticky top-[104px] rounded-xl shadow-[0_12px_40px_rgba(74,66,56,0.08)] overflow-hidden">
                            <div className="bg-surface-container-high px-md py-sm flex justify-between items-center border-b border-outline-variant/20">
                                <h2 className="font-headline-sm text-headline-sm text-on-surface">ORDER CONFIRMED</h2>
                            </div>
                            <div className="p-md">
                              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[90%]">You order has been confirmed...
                              <span className="material-symbols-outlined absolute text-outline z-10">check_small</span>
                              </p>

                            </div>
                        </div>
                    </div>
      
                    }
                </div>
            </div>
        </main>
    );
};
function getToken() {
    throw new Error("Function not implemented.");
}

