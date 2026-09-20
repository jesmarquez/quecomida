import { useState } from "react";
import { useNavigate } from "react-router";

export const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);

    const basePrice = 18.00;
    const serviceFee = 2.50;

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
                                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9CrC951oka0UYQdg9L-ISF-E4zAMDifgiDzXOu3xhhIScwEOr4oJPZVdWakK8qAE_2oYukMJTl9uX-CafO56ZoH2pGV5-dTDIualy5ElpdfyktyjIloV-2eIXOOhszfAPKBnyISGYocpS59AZ2TdewScpinMR-Cbe4ecsMjthq5MQDkA5wpeTD-khvPV7MkGy6dNnXS9D2KxTRl4U2iMFb4u6OpEAUhrzN2aZOOLBYkaZTcWvwa7FOw')"}}></div>
                                <div className="absolute top-sm left-sm flex gap-xs">
                                    <span className="bg-secondary/15 text-secondary px-sm py-[2px] rounded-full font-label-md text-[12px] uppercase backdrop-blur-sm">Vegetarian</span>
                                </div>
                            </div>
                            <div className="p-md flex flex-col gap-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-headline-lg text-headline-lg text-on-surface">Rustic Root Vegetable Tart</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                                            <span className="material-symbols-outlined text-[18px]">skillet</span> By Chef Elena Rostova
                                        </p>
                                    </div>
                                    <span className="font-headline-md text-headline-md text-primary">${basePrice.toFixed(2)}</span>
                                </div>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-sm border-t border-outline-variant/30 pt-sm">
                                    A comforting medley of seasonal root vegetables, slow-roasted with thyme and garlic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[420px] lg:w-[480px] shrink-0">
                        <div className="bg-surface sticky top-[104px] rounded-xl shadow-[0_12px_40px_rgba(74,66,56,0.08)] overflow-hidden">
                            <div className="bg-surface-container-high px-md py-sm flex justify-between items-center border-b border-outline-variant/20">
                                <h2 className="font-headline-sm text-headline-sm text-on-surface">Order Details</h2>
                                <span className="font-label-md text-label-md text-primary tracking-wide">SECURE CHECKOUT</span>
                            </div>
                            <div className="p-md">
                                <form className="flex flex-col gap-md" onSubmit={(e) => {e.preventDefault(); navigate('/order-confirmation');}}>
                                    <div className="flex flex-col gap-xs relative">
                                        <label className="font-label-md text-label-md text-on-surface-variant mb-1">Contact Email</label>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-sm text-outline z-10">mail</span>
                                            <input className="w-full bg-surface-bright font-body-md text-body-md text-on-surface pl-xl pr-sm py-[14px] rounded-lg border border-outline-variant" placeholder="your@email.com" required type="email"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-xs mt-sm">
                                        <label className="font-label-md text-label-md text-on-surface-variant mb-1">Quantity</label>
                                        <div className="flex items-center gap-sm">
                                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center" type="button">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <input className="flex-1 h-12 bg-surface-bright font-headline-md text-center text-on-surface border border-outline-variant rounded-lg" value={qty} readOnly/>
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
                                            <span>${serviceFee.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-sm pt-sm border-t border-outline-variant/50 flex justify-between items-end mb-md">
                                        <span className="font-headline-sm">Total</span>
                                        <span className="font-display-lg text-primary">${(basePrice * qty + serviceFee).toFixed(2)}</span>
                                    </div>
                                    <button onClick = {() => navigate('/order-confirmed')} className="w-full h-14 bg-primary text-on-primary font-label-md uppercase rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-sm" type="submit">
                                        Confirm Order <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
function getToken() {
    throw new Error("Function not implemented.");
}

