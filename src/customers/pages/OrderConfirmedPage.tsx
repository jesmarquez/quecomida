export const OrderConfirmedPage = () => {
  return (
      <main className="w-full pt-20">
          <div className="relative z-10 max-w-container-max mx-auto w-full px-gutter py-lg md:py-xl grid grid-cols-1 lg:grid-cols-12 gap-lg">
              <div className="col-span-1 lg:col-span-7 flex flex-col gap-lg">
                  <div className="flex flex-col gap-sm">
                      <div className="inline-flex items-center gap-xs text-secondary mb-xs">
                          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                          <span className="font-label-md uppercase tracking-widest text-on-surface-variant">Order Confirmed</span>
                      </div>
                      <h1 className="font-display-lg text-on-background">Your feast is on the way.</h1>
                      <p className="font-body-lg text-on-surface-variant">We've received your order #HC-8492. Chef Maria is preparing your ingredients now.</p>
                  </div>
                  <div className="bg-surface-container rounded-xl p-md md:p-lg shadow-sm flex flex-col sm:flex-row gap-lg justify-between items-center">
                      <div className="flex flex-col gap-sm flex-1">
                          <h2 className="font-headline-md">Pickup Verification</h2>
                          <p className="text-on-surface-variant">Provide this code to the chef upon pickup.</p>
                      </div>
                      <div className="bg-surface px-lg py-md rounded-lg shadow-sm text-center">
                          <span className="font-label-md uppercase tracking-wider text-on-surface-variant">Your Code</span>
                          <div className="font-display-lg text-primary tracking-[0.2em]">8492</div>
                      </div>
                  </div>
              </div>
              <div className="col-span-1 lg:col-span-5">
                  <div className="bg-surface-bright rounded-xl shadow-lg p-lg border border-outline-variant/20">
                      <h3 className="font-headline-md mb-md">Live Status Tracker</h3>
                      <div className="flex flex-col gap-lg">
                          <div className="flex gap-md">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between font-label-md"><span>ORDERED</span><span>4:15 PM</span></div>
                                  <p className="text-sm text-on-surface-variant">Order sent to chef.</p>
                              </div>
                          </div>
                          <div className="flex gap-md">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary relative">
                                  <span className="material-symbols-outlined text-[16px]">skillet</span>
                                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></span>
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between font-label-md text-primary"><span>PREPARING</span><span>Now</span></div>
                                  <p className="text-sm">Chef is preparing your meal.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
  );
}
