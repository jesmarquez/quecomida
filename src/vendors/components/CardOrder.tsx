
interface OrderProps{
  id: string,
  date: string
  customer: string,
} 

export const CardOrder = ({ id, date, customer }: OrderProps) => {
  return (
    <div className="relative bg-surface-container rounded-xl overflow-hidden shadow-lg p-lg flex flex-col gap-md">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 100% 0%, var(--tw-colors-primary-container) 0%, transparent 60%)',
        }}
      ></div>
      <div>
        <span className="font-label-md text-label-md text-on-surface-variant mb-xs block">Order ID</span>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-0">
          # { id.slice(-5) }
        </h1>
        <span className="font-body-md text-body-md text-on-surface-variant"
          >Placed on { date }</span
        >
      </div>
      <div className="h-[1px] w-full bg-outline-variant/30 my-sm"></div>
      <div className="flex flex-col gap-base">
        <div className="flex justify-between items-center">
          <span
            className="font-body-md text-body-md text-on-surface-variant"
            >Customer</span
          >
          <span className="font-label-md text-label-md text-on-surface"
            >{ customer }</span
          >
        </div>
        <div className="flex justify-between items-center">
          <span
            className="font-body-md text-body-md text-on-surface-variant"
            >Contact</span
          >
          <span className="font-label-md text-label-md text-on-surface"
            >via In-App Chat</span
          >
        </div>
        <div className="flex justify-between items-center">
          <span
            className="font-body-md text-body-md text-on-surface-variant"
            >Dietary Notes</span
          >
          <div className="bg-secondary/15 px-sm py-xs rounded-full">
            <span className="font-label-md text-label-md text-secondary"
              >Gluten-Free Request</span
            >
          </div>
        </div>
      </div>
    </div>
  )
}
