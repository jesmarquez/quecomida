
export const OrdersPage = () => {
  return (
    <main className="w-full pt-20">
        <div className="flex flex-col w-full px-gutter max-w-container-max mx-auto pb-xl">
            <div className="flex justify-between items-end mb-lg mt-md">
                <h1 className="font-display-lg">Orders Received</h1>
                <div className="flex gap-md">
                    <button className="bg-surface-container-high px-md py-sm rounded-full">Export</button>
                    <button className="bg-primary text-on-primary px-md py-sm rounded-full">Filter</button>
                </div>
            </div>
            <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr] gap-sm px-md py-sm bg-surface-container-highest border-b border-outline-variant/30 text-left font-label-md uppercase">
                    <div>ID</div><div>Customer</div><div>Meal</div><div>Qty</div><div>Status</div>
                </div>
                <div onClick={() => navigate('/manage-order')} className="grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr] gap-sm px-md py-md border-b border-outline-variant/20 hover:bg-surface-container-highest/50 cursor-pointer">
                    <div className="font-medium">#ORD-9824</div>
                    <div className="truncate">sarah.jenkins@example.com</div>
                    <div className="font-headline-sm truncate">Heirloom Tomato Galette</div>
                    <div>2</div>
                    <div><span className="px-sm py-xs rounded-full bg-secondary-container text-on-secondary-container text-xs">Ready for Pickup</span></div>
                </div>
                <div onClick={() => navigate('/manage-order')} className="grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr] gap-sm px-md py-md border-b border-outline-variant/20 hover:bg-surface-container-highest/50 cursor-pointer">
                    <div className="font-medium">#ORD-9823</div>
                    <div className="truncate">m.chen@neighborhood.net</div>
                    <div className="font-headline-sm truncate">Wild Mushroom Risotto</div>
                    <div>1</div>
                    <div><span className="px-sm py-xs rounded-full bg-primary-container/20 text-primary text-xs">Ordered</span></div>
                </div>
            </div>
        </div>
    </main>
  )
}
