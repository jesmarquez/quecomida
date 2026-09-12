import { useNavigate } from 'react-router';

export const MealsPage = () => {
    const navigate = useNavigate();

    
  return (
    <main className="w-full pt-20">
        <div className="flex flex-col w-full relative">
            <div className="relative w-full h-[512px] min-h-[400px] flex items-center justify-center overflow-hidden mb-lg">
                <div className="absolute inset-0 bg-cover bg-center w-full h-full scale-105 transform origin-center transition-transform duration-[10000ms] hover:scale-100 ease-out" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbADyK1lAMzN0FdrNCFGj2LDVlbnlzwHLpKtQOosQaOwtDqiCW3y4zqbiHi0JU4JpvF3qLNgi6ErdmaDnWr2Zq6m0kPW8TB3khq-r_1PnlHlgu6mWRg5BC2RXTKi40oZzR3qM74gEculPkOybz7JGTqo5fKykPrEnWhktc5quHLI6XgKybK-KG5SWtrRcfJWKBWUWGYxwzW6b29D8BLjYLhCMBHbej_0H7_6QStwe4v8Oj1EdVMf0ldw')"}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent mix-blend-multiply"></div>
                <div className="relative z-10 text-center max-w-[800px] px-gutter flex flex-col items-center">
                    <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-sm">Your Neighborhood</span>
                    <h1 className="font-display-lg text-display-lg text-surface-bright mb-md text-balance drop-shadow-[0_2px_12px_rgba(33,27,18,0.4)]">Discover Authentic Home Cooking</h1>
                    <p className="font-body-lg text-body-lg text-surface-container-low max-w-[600px] drop-shadow-[0_1px_4px_rgba(33,27,18,0.5)]">Taste the care and tradition in every bite, shared by local cooks right in your community.</p>
                </div>
            </div>

            <div className="max-w-container-max mx-auto px-gutter w-full mb-lg sticky top-24 z-30 pointer-events-none">
                <div className="bg-surface/90 backdrop-blur-md rounded-xl p-xs flex flex-col md:flex-row items-center justify-between shadow-[0_4px_30px_rgba(74,66,56,0.06)] pointer-events-auto">
                    <div className="flex items-center gap-sm overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar pl-sm">
                        <button className="px-md py-sm bg-primary text-on-primary rounded-full font-label-md text-label-md transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">All Meals</button>
                        <button className="px-md py-sm bg-transparent text-on-surface-variant hover:bg-surface-container-highest rounded-full font-label-md text-label-md transition-colors whitespace-nowrap">Vegetarian</button>
                        <button className="px-md py-sm bg-transparent text-on-surface-variant hover:bg-surface-container-highest rounded-full font-label-md text-label-md transition-colors whitespace-nowrap">Gluten-Free</button>
                        <button className="px-md py-sm bg-transparent text-on-surface-variant hover:bg-surface-container-highest rounded-full font-label-md text-label-md transition-colors whitespace-nowrap">Spicy</button>
                    </div>
                    <div className="flex items-center gap-sm mt-sm md:mt-0 px-sm md:pr-sm">
                        <div className="relative group">
                            <input className="w-full md:w-[240px] h-12 bg-surface-container rounded-full pl-lg pr-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary transition-all" placeholder="Search by ingredient or chef..." type="text"/>
                            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/70 group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <button className="h-12 w-12 flex items-center justify-center bg-surface-container hover:bg-surface-container-highest text-on-surface rounded-full transition-colors">
                            <span className="material-symbols-outlined">tune</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-container-max mx-auto px-gutter w-full pb-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-md gap-y-xl">
                    {/* Meal Card 1 */}
                    <article onClick={() => navigate('/place-order')} className="group relative cursor-pointer flex flex-col h-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(74,66,56,0.04)] hover:shadow-[0_8px_30px_rgba(74,66,56,0.08)] transition-shadow duration-300">
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCayJiiIb2PpfEDsfxx-VQPLMFR-j5voA9nbWlQgiO4vftLsiVu5vQqSp952605CpR1sUKjMFMOlMuQct37kmhnVb6ngNwqalk-t2ghBOsdGu6puTJX-V_BbiZ1xFkORjaYzLQ7m4B4V_gSrGQaBIuQHHpx9cyjypOrTPOMZ3qKnLZdpI1zFoJP79lI3XPMpsF4VQe-5chmKULmGiVAyRCz5eTm0XZEhHMkiFxE45pXv4I8_d7-YZ5gtw"/>
                            <div className="absolute top-sm left-sm flex gap-xs">
                                <span className="bg-secondary/15 text-secondary px-sm py-xs rounded-full font-label-md text-[12px] leading-none uppercase tracking-wider backdrop-blur-sm">Vegetarian</span>
                            </div>
                        </div>
                        <div className="p-md flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-xs">
                                <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight line-clamp-2 pr-sm">Wild Mushroom & Truffle Risotto</h2>
                                <span className="font-headline-md text-headline-md text-primary whitespace-nowrap">$18</span>
                            </div>
                            <div className="flex items-center gap-sm mb-md mt-auto pt-sm">
                                <img className="w-8 h-8 rounded-full object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASCv3XUz7UIA3vGZmnZW0cJm4DSRxvgZouWxbJhmZrnMaKotFUuUH9eAbgb56HveQjokzGM22UPP1vlzUOMQfasQG7XMG3wYJ7OOzuYNGZIW2jjSpbuQPgpT_ZjsjjBjlj_8GonyZPRx6sEOI05ROIwA418ncEomPhTmPWbTViBy3RzMEWxe-cT_6V2qZpEVgWyf6LIU4cYsXIzex6g3LyWQQxH3agumib4_is28JwXO8YEqPBErt5mQ"/>
                                <div className="flex flex-col">
                                    <span className="font-label-md text-label-md text-on-surface-variant leading-none">Chef Maria G.</span>
                                    <div className="flex items-center gap-xs mt-1">
                                        <span className="material-symbols-outlined text-[14px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                        <span className="font-body-sm text-[12px] text-on-surface-variant">4.9 (120 reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full h-12 bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-xs">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span> Order Now
                            </button>
                        </div>
                    </article>
                    {/* More cards... Placeholder logic for prototype */}
                    <article className="group relative flex flex-col h-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(74,66,56,0.04)]">
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6a1ctb0B2RFjxP6hhrAxnJLvLnolK7l5gnr-YPOedBbzrLwSveLrp6hDPtedxP0IPeqXZoRy_XGtPR_j8cIp7K0PiPJi4pramYd1TNahEAvS2l9R9zU9D65t2b2yclHLvpnqBR8HFLWAgfdiv-bpvUDLljoLJ73uKymTTuKvJ-z1WcKK8O_zGozOFCukuHPsuoxqYLNKWKXmFzZZjI7MTdoJfYqZah4AA2rFmhBt2AQ5rTTHNXeZwlQ"/>
                            <div className="absolute top-sm left-sm flex gap-xs">
                                <span className="bg-secondary/15 text-secondary px-sm py-xs rounded-full font-label-md text-[12px] uppercase tracking-wider">Gluten-Free</span>
                            </div>
                        </div>
                        <div className="p-md flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-xs">
                                <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Slow-Braised Lamb Shank</h2>
                                <span className="font-headline-md text-headline-md text-primary">$26</span>
                            </div>
                            <button className="w-full h-12 mt-auto bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface rounded-lg font-label-md text-label-md transition-colors">Order Now</button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </main>
  )
}

