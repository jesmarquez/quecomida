

export const OrderProgress = () => {
  return (
      <div
        className="flex flex-col w-full px-gutter md:px-lg py-lg max-w-container-max mx-auto gap-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg relative">
          <div
            className="col-span-1 md:col-span-4 flex flex-col gap-md sticky top-[120px] self-start z-10"
          >
            <div className="flex items-center gap-sm">
              <button
                className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors group cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                  >arrow_back</span
                >
              </button>
              <span
                className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest"
                >Back to Orders</span
              >
            </div>
            <div
              className="relative bg-surface-container rounded-xl overflow-hidden shadow-lg p-lg flex flex-col gap-md"
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 100% 0%, var(--tw-colors-primary-container) 0%, transparent 60%)',
                }}
              ></div>
              <div>
                <span
                  className="font-label-md text-label-md text-on-surface-variant mb-xs block"
                  >Order ID</span
                >
                <h1
                  className="font-display-lg text-display-lg text-on-surface mb-0"
                >
                  #8492A
                </h1>
                <span className="font-body-md text-body-md text-on-surface-variant"
                  >Placed on Oct 24, 2024 at 4:30 PM</span
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
                    >Eleanor Vance</span
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
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-xl">
            <div className="flex flex-col gap-md">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Order Progress
              </h2>
              <div
                className="bg-surface-bright rounded-xl shadow-md p-lg relative overflow-hidden"
              >
                <div
                  className="absolute right-0 top-0 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"
                ></div>
                <div className="relative z-10 flex flex-col gap-lg">
                  <div className="flex items-center justify-between relative">
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container-highest rounded-full"
                    ></div>
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-700 ease-in-out w-[10%]"
                      id="progress-track"
                    ></div>
                    <button
                      className="status-btn relative flex flex-col items-center gap-sm group active cursor-pointer w-32 -ml-16"
                      data-status="ordered"
                    >
                      <div
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md transition-all duration-300 ring-4 ring-surface-bright status-indicator z-10"
                      >
                        <span
                          className="material-symbols-outlined text-on-primary text-[16px]"
                          >receipt_long</span
                        >
                      </div>
                      <span
                        className="font-label-md text-label-md text-primary status-label transition-colors"
                        >Ordered</span
                      >
                    </button>
                    <button
                      className="status-btn relative flex flex-col items-center gap-sm group cursor-pointer w-32"
                      data-status="ready"
                    >
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container-highest group-hover:bg-primary-container/40 flex items-center justify-center transition-all duration-300 ring-4 ring-surface-bright status-indicator z-10"
                      >
                        <span
                          className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[16px]"
                          >outdoor_grill</span
                        >
                      </div>
                      <span
                        className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary status-label transition-colors"
                        >Ready</span
                      >
                    </button>
                    <button
                      className="status-btn relative flex flex-col items-center gap-sm group cursor-pointer w-32 -mr-16"
                      data-status="handed_over"
                    >
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container-highest group-hover:bg-primary-container/40 flex items-center justify-center transition-all duration-300 ring-4 ring-surface-bright status-indicator z-10"
                      >
                        <span
                          className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[16px]"
                          >handshake</span
                        >
                      </div>
                      <span
                        className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary status-label transition-colors"
                        >Handed Over</span
                      >
                    </button>
                  </div>
                  <div
                    className="bg-surface-container-low p-md rounded-lg flex items-start gap-md mt-sm"
                  >
                    <span className="material-symbols-outlined text-primary mt-1"
                      >info</span
                    >
                    <div>
                      <h4
                        className="font-label-md text-label-md text-on-surface mb-xs"
                        id="status-heading"
                      >
                        Order Received
                      </h4>
                      <p
                        className="font-body-sm text-body-sm text-on-surface-variant"
                        id="status-desc"
                      >
                        The customer has placed the order. Review dietary notes
                        before you begin preparation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-md">
              <h2
                className="font-headline-md text-headline-md text-on-surface flex items-baseline gap-sm"
              >
                Order Items
                <span
                  className="font-body-md text-body-md text-on-surface-variant font-normal"
                  >2 items</span
                >
              </h2>
              <div
                className="bg-surface-bright rounded-xl shadow-sm overflow-hidden"
              >
                <div
                  className="p-md md:p-lg flex flex-col md:flex-row gap-lg items-start border-b border-outline-variant/20 hover:bg-surface-container-lowest transition-colors"
                >
                  <div
                    className="w-full md:w-32 h-32 md:h-24 bg-cover bg-center rounded-lg shadow-sm flex-shrink-0"
                    data-alt="A rustic, overhead shot of a large slice of artisanal sourdough bread topped with creamy ricotta, roasted heirloom cherry tomatoes in deep reds and yellows, fresh basil leaves, and a drizzle of balsamic glaze. Soft natural window light, warm earth tones, styled on a speckled ceramic plate over a linen cloth."
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDS_SMkae39qGFG-08iq13hEPsVF9VcyNKr5RGmWhUqW7qi_cDNTMR5u_WL5EL70s0UyGXDTsgXTLup9-ACbUNaXyICqFriap40LYGVL3aqhHSgWPOqUD121sGAMaaH6ARhh61ynGqLfHeEj9TxZHhQw2TDTZdp-xzZikKHs3k3xhvcywlvWGdv3hJKl6awynE93Z2flKzL7m5g1V3skEoyxwbt39seteqhUgg98rYqMV-aO92yvsW_sw")',
                    }}
                  ></div>
                  <div className="flex-grow flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-xs">
                        <h3
                          className="font-headline-sm text-headline-sm text-on-surface"
                        >
                          Heirloom Tomato Tartine
                        </h3>
                        <span
                          className="font-headline-sm text-headline-sm text-on-surface"
                          >$14.50</span
                        >
                      </div>
                      <p
                        className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"
                      >
                        Sourdough toast with whipped ricotta, roasted local
                        heirloom tomatoes, and fresh garden basil.
                      </p>
                    </div>
                    <div className="mt-sm flex items-center justify-between">
                      <span
                        className="font-label-md text-label-md text-secondary uppercase bg-secondary-container px-sm py-xs rounded"
                        >Qty: 2</span
                      >
                      <span
                        className="font-label-md text-label-md text-on-surface-variant"
                        >Subtotal: $29.00</span
                      >
                    </div>
                  </div>
                </div>
                <div
                  className="p-md md:p-lg flex flex-col md:flex-row gap-lg items-start hover:bg-surface-container-lowest transition-colors"
                >
                  <div
                    className="w-full md:w-32 h-32 md:h-24 bg-cover bg-center rounded-lg shadow-sm flex-shrink-0"
                    data-alt="A delicate, handcrafted ceramic bowl filled with a vibrant green matcha chia pudding. The pudding is topped with a perfectly arranged fan of fresh fig slices and toasted coconut flakes. Shot from a slight angle with soft, diffused morning light, emphasizing the textures and fresh, healthy ingredients against a warm, neutral background."
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4AtuIkdB7KUEEtIGicGlclUfUMlDgUd-bhI5d_sNayrY47d8A7ZGVFstCf2amupC_fKyO4MIEy2_OnNUD1QuBtM2wd5Lyj2_lZfoGRBsXYruYY0QrYTv4gEyzTC54G084ObQDKCarjXv-tzFK0iMmH5FbiB-86XhD_zpyteLueiLD6j42EevCagybvLcUMTrr48cmBELJVSZarSNXXwzq3vW2xq5OI-o27kkm6pJPLLCXrE-1Z-6TA")',
                    }}
                  ></div>
                  <div className="flex-grow flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-xs">
                        <h3
                          className="font-headline-sm text-headline-sm text-on-surface"
                        >
                          Matcha Fig Chia Bowl
                        </h3>
                        <span
                          className="font-headline-sm text-headline-sm text-on-surface"
                          >$9.00</span
                        >
                      </div>
                      <p
                        className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"
                      >
                        Overnight chia pudding infused with ceremonial grade
                        matcha, topped with fresh black mission figs.
                      </p>
                    </div>
                    <div className="mt-sm flex items-center justify-between">
                      <span
                        className="font-label-md text-label-md text-secondary uppercase bg-secondary-container px-sm py-xs rounded"
                        >Qty: 1</span
                      >
                      <span
                        className="font-label-md text-label-md text-on-surface-variant"
                        >Subtotal: $9.00</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl p-lg flex flex-col gap-md -mx-4 md:mx-0 px-8 md:px-lg mt-md"
            >
              <div className="flex justify-between items-center">
                <span
                  className="font-body-lg text-body-lg text-inverse-on-surface/80"
                  >Subtotal</span
                >
                <span className="font-body-lg text-body-lg">$38.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className="font-body-lg text-body-lg text-inverse-on-surface/80"
                  >Community Fee (5%)</span
                >
                <span className="font-body-lg text-body-lg">$1.90</span>
              </div>
              <div className="h-[1px] w-full bg-outline-variant/20 my-sm"></div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span
                    className="font-label-md text-label-md text-primary-fixed uppercase tracking-wider mb-xs"
                    >Total Earnings</span
                  >
                  <span
                    className="font-body-sm text-body-sm text-inverse-on-surface/60"
                    >Payment held in escrow until pickup</span
                  >
                </div>
                <span className="font-display-lg text-display-lg text-primary-fixed"
                  >$36.10</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
