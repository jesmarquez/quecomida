import { useState } from "react";
import type { Status } from "../interfaces/order.interfaces";
import { isStatus } from "../interfaces/order.interfaces";

interface CardStatusProps {
  stepCurrent: number,
  onHandleStatus: (status: Status) => void;
}

const statusContent = {
  ordered: {
    percent: "w-[10%]",
    head: "Order Received",
    text: "The customer has placed the order. Review dietary notes before you begin preparation.",
  },
  ready: {
    percent: "w-[50%]",
    head: "Ready for Pickup",
    text: "Order is prepared and packaged. The customer has been notified to head your way.",
  },
  handed_over: {
    percent: "w-[100%]",
    head: "Order Completed",
    text: "Meal successfully handed over. Your earnings will be released shortly.",
  },
};

const activeIconStyle = "material-symbols-outlined text-on-primary text-[16px]";
const futureIconStyle = "material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[16px]";
const activeIndicatorStyle = "w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md transition-all duration-300 ring-4 ring-surface-bright status-indicator z-10";
const futureIndicatorStyle = "w-8 h-8 rounded-full bg-surface-container-highest group-hover:bg-primary-container/40 flex items-center justify-center transition-all duration-300 ring-4 ring-surface-bright status-indicator z-10";
const activeLabel = "font-label-md text-label-md text-primary status-label transition-colors";
const futureLabel = "font-label-md text-label-md text-on-surface-variant group-hover:text-primary status-label transition-colors";

export const CardStatus = ({ stepCurrent, onHandleStatus }: CardStatusProps) => {

  const [step, setStep] = useState(stepCurrent);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    const status = e.currentTarget.dataset.status;
    if (!isStatus(status)) return;

    switch (status) {
      case 'ORDERED':
        setStep(1);        
        break;
      case 'READY_FOR_PICKUP':
        setStep(2);
        break;
      case 'HANDED_OVER':
        setStep(3);
        break;
    }
    onHandleStatus(status);
  }

  return (
    <div className="flex flex-col gap-md">
      <h2 className="font-headline-md text-headline-md text-on-surface">Order Progress</h2>
      <div className="bg-surface-bright rounded-xl shadow-md p-lg relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"
        ></div>
        <div className="relative z-10 flex flex-col gap-lg">
          <div className="flex items-center justify-between relative">
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 
                bg-primary rounded-full transition-all duration-700 ease-in-out w-[10%]
                ${ step === 1 ? statusContent["ordered"].percent : ''}
                ${ step === 2 ? statusContent["ready"].percent : ''}
                ${ step === 3 ? statusContent["handed_over"].percent : ''}`}
              id="progress-track"
            ></div>
            <button
              className="status-btn relative flex flex-col items-center gap-sm group active cursor-pointer w-32 -ml-16"
              data-status="ORDERED"
              onClick={ (e) => handleClick (e) }
            >
              <div className={`${ step >= 1 ? activeIndicatorStyle : futureIndicatorStyle }`}>
                <span className={`${ step >= 1 ? activeIconStyle : futureIconStyle }`}>receipt_long</span>
              </div>
                <span className={`${ step >= 1 ? activeLabel : futureLabel }`}>Ordered</span>
            </button>
            <button
              className="status-btn relative flex flex-col items-center gap-sm group cursor-pointer w-32"
              data-status="READY_FOR_PICKUP"
              onClick={ (e) => handleClick(e) }
            >
              <div className={`${ step >= 2 ? activeIndicatorStyle : futureIndicatorStyle }`}>
                <span className={`${ step >= 2 ? activeIconStyle : futureIconStyle }`}>outdoor_grill</span>
              </div>
              <span className={`${ step >= 2 ? activeLabel : futureLabel }`}>Ready</span>
            </button>
            <button
              className="status-btn relative flex flex-col items-center gap-sm group cursor-pointer w-32 -mr-16"
              data-status="HANDED_OVER"
              onClick={ (e) => handleClick(e) }
            >
              <div className={`${ step >= 3 ? activeIndicatorStyle : futureIndicatorStyle }`}>
                <span className={`${ step >= 3 ? activeIconStyle : futureIconStyle }`}>handshake</span>
              </div>
              <span className={`${ step >= 3 ? activeLabel : futureLabel }`}>Handed Over</span>
            </button>
          </div>
          <div className="bg-surface-container-low p-md rounded-lg flex items-start gap-md mt-sm">
            <span className="material-symbols-outlined text-primary mt-1">info</span>
            <div>
              <h4
                className="font-label-md text-label-md text-on-surface mb-xs"
                id="status-heading"
              >
                { step === 1 ? statusContent["ordered"].head : step === 2 ? statusContent["ready"].head : statusContent["handed_over"].head }
              </h4>
              <p
                className="font-body-sm text-body-sm text-on-surface-variant"
                id="status-desc"
              >
              { step === 1 ? statusContent["ordered"].text : step === 2 ? statusContent["ready"].text : statusContent["handed_over"].text }  
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
