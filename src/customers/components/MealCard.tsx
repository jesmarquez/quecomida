import { useNavigate } from "react-router";
import type { Meal } from "../../vendors/interfaces/meals.response.interface"


export const MealCard = ({ id, title, images, price, dietaryTags, vendor }: Meal) => {
  const navigate = useNavigate();

  const onClickOrderNow = (id: string) => {
    navigate(`/place-order/${id}`);
    console.log(id);
  }

  return (
    <article className="group relative cursor-pointer flex flex-col h-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(74,66,56,0.04)] hover:shadow-[0_8px_30px_rgba(74,66,56,0.08)] transition-shadow duration-300">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={ `${import.meta.env.VITE_QC_API_URL}${images[0].imageUrl}` }/>
            <div className="absolute top-sm left-sm flex gap-xs">
                {
                    dietaryTags.map( (d, index) => (
                      <span key={ index } className="bg-secondary/15 text-secondary px-sm py-xs rounded-full font-label-md text-[12px] leading-none uppercase tracking-wider backdrop-blur-sm">
                          { d }
                      </span>
                    ))
                }
            </div>
        </div>
        <div className="p-md flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-xs">
                <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight line-clamp-2 pr-sm">{ title }</h2>
                <span className="font-headline-md text-headline-md text-primary whitespace-nowrap">$ { price }</span>
            </div>
            <div className="flex items-center gap-sm mb-md mt-auto pt-sm">
                <img className="w-8 h-8 rounded-full object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASCv3XUz7UIA3vGZmnZW0cJm4DSRxvgZouWxbJhmZrnMaKotFUuUH9eAbgb56HveQjokzGM22UPP1vlzUOMQfasQG7XMG3wYJ7OOzuYNGZIW2jjSpbuQPgpT_ZjsjjBjlj_8GonyZPRx6sEOI05ROIwA418ncEomPhTmPWbTViBy3RzMEWxe-cT_6V2qZpEVgWyf6LIU4cYsXIzex6g3LyWQQxH3agumib4_is28JwXO8YEqPBErt5mQ"/>
                <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface-variant leading-none">{ vendor.name }</span>
                    <div className="flex items-center gap-xs mt-1">
                        <span className="material-symbols-outlined text-[14px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        <span className="font-body-sm text-[12px] text-on-surface-variant">4.9 (120 reviews)</span>
                    </div>
                </div>
            </div>
            <button onClick = { () => onClickOrderNow(id) } className="w-full h-12 bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-xs">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span> Order Now
            </button>
        </div>
    </article>
  )
}
