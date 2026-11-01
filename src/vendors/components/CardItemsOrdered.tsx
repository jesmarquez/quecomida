interface ItemOrderedProps {
  quantity: number,
  image: string,
  title: string,
  price: number
}

export const CardItemsOrdered = ({ quantity, image,  title, price}: ItemOrderedProps) => {
  return (
    <div className="flex flex-col gap-md">
      <h2 className="font-headline-md text-headline-md text-on-surface flex items-baseline gap-sm">
        Order Items
        <span
          className="font-body-md text-body-md text-on-surface-variant font-normal"
          >{ quantity} items</span
        >
      </h2>
      <div className="bg-surface-bright rounded-xl shadow-sm overflow-hidden">
        <div className="p-md md:p-lg flex flex-col md:flex-row gap-lg items-start border-b border-outline-variant/20 hover:bg-surface-container-lowest transition-colors">
          <div
            className="w-full md:w-32 h-32 md:h-24 bg-cover bg-center rounded-lg shadow-sm shrink-0"
            style = {{
              backgroundImage: image 
                ? `url("${import.meta.env.VITE_QC_API_URL}${image}")`
                : undefined
            }}
          ></div>
          <div className="flex-grow flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  { title}
                </h3>
                <span
                  className="font-headline-sm text-headline-sm text-on-surface"
                  >${ price }</span
                >
              </div>
            </div>
            <div className="mt-sm flex items-center justify-between">
              <span
                className="font-label-md text-label-md text-secondary uppercase bg-secondary-container px-sm py-xs rounded"
                >Qty: { quantity }</span
              >
              <span
                className="font-label-md text-label-md text-on-surface-variant"
                >Subtotal: ${ quantity * price }</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
