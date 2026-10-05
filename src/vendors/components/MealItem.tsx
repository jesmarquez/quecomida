// ---- Meal Item ----
import type { Meal } from '../interfaces/meals.response.interface';

interface MealItemProps {
  meal: Meal;
  onToggle: (id: string) => void;
}

export const MealItem = ({ meal, onToggle }: MealItemProps) => {
  const isNew = false;



  return (
    <div className="bg-surface p-sm rounded-xl flex flex-col md:flex-row items-center gap-sm md:gap-md group hover:bg-surface-container-lowest transition-colors shadow-sm hover:shadow-md border border-transparent hover:border-secondary/10 relative">
      {isNew && (
        <div className="absolute -left-2 -top-2 w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(226,114,91,0.6)] hidden md:block" />
      )}

      {/* Image */}
      <div className={`w-full md:w-24 h-48 md:h-24 rounded-lg overflow-hidden shrink-0 relative ${!meal.isAvailable ? 'opacity-60 grayscale-[50%]' : ''}`}>
        <img
          alt={meal.title}
          className={`w-full h-full object-cover ${meal.isAvailable ? 'transition-transform duration-700 group-hover:scale-105' : ''}`}
          src={ import.meta.env.VITE_QC_API_URL + meal.images[0].imageUrl }
        />
        {meal.isAvailable && <div className="absolute inset-0 bg-surface/20" />}
        <div className="absolute top-2 right-2 md:hidden">
          <span className={`font-label-md text-[10px] px-2 py-1 rounded-full backdrop-blur-md ${meal.isAvailable ? 'bg-secondary/10 text-secondary' : 'bg-outline-variant/30 text-on-surface-variant'}`}>
            {meal.isAvailable ? 'Available' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className={`flex-1 flex flex-col justify-center min-w-0 w-full px-xs md:px-0 ${!meal.isAvailable ? 'opacity-70' : ''}`}>
        <div className="flex items-center gap-2 mb-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{meal.title }</h3>
          {isNew && (
            <span className="bg-primary-container text-on-primary-container text-[10px] font-label-md px-2 py-0.5 rounded-sm uppercase tracking-wider md:hidden">New</span>
          )}
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 w-full max-w-lg mb-sm md:mb-0">{meal.description}</p>
        <div className="flex gap-2 mt-auto md:hidden">
          {meal.dietaryTags.map((tag) => (
            <span key={tag} className="font-label-md text-[10px] text-tertiary bg-tertiary-container/20 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className={`w-full md:w-32 flex justify-between md:justify-end items-center px-xs md:px-0 ${!meal.isAvailable ? 'opacity-70' : ''}`}>
        <span className="md:hidden font-label-md text-label-md text-on-surface-variant">Price:</span>
        <span className={`font-headline-sm text-headline-sm ${meal.isAvailable ? 'text-primary' : 'text-on-surface-variant'}`}>{meal.price}</span>
      </div>

      {/* Toggle */}
      <div className="w-full md:w-40 flex justify-between md:justify-center items-center px-xs md:px-0 py-sm md:py-0 border-t md:border-t-0 border-outline-variant/20 mt-sm md:mt-0">
        <span className="md:hidden font-label-md text-label-md text-on-surface-variant">Status:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            type="checkbox"
            checked={meal.isAvailable}
            onChange={() => onToggle(meal.id)}
          />
          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" />
          <span className={`ml-3 text-body-sm font-body-sm text-on-surface-variant font-medium min-w-[70px] ${meal.isAvailable ? 'text-secondary' : ''}`}>
            {meal.isAvailable ? 'Active' : 'Paused'}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="w-full md:w-24 flex justify-end gap-2 px-xs md:px-0">
        <button className="h-10 w-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Edit Meal">
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button className="h-10 w-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Delete Meal">
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  );
}
