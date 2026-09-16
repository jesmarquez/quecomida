import { useEffect, useState } from 'react';
import type { Meal, StatCardProps } from '../interfaces/dashboard.interfaces'
import { getMeals } from '../actions/get-meals-action';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/store/AuthContext';

const StatCard = ({ icon, value, label, colorClass, bgClass }: StatCardProps) => (
  <div className="bg-surface-container rounded-xl p-md flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-sm transition-shadow">
    <div className={`absolute top-0 right-0 w-24 h-24 ${bgClass} rounded-full -mr-8 -mt-8 blur-xl transition-colors`} />
    <span className={`material-symbols-outlined ${colorClass} mb-xs`}>{icon}</span>
    <div>
      <div className="font-headline-md text-headline-md text-on-surface">{value}</div>
      <div className="font-body-sm text-body-sm text-on-surface-variant">{label}</div>
    </div>
  </div>
);

// ---- Meal Item ----
interface MealItemProps {
  meal: Meal;
  onToggle: (id: number) => void;
}

const MealItem = ({ meal, onToggle }: MealItemProps) => {
  const isActive = meal.status === 'active';
  const isPaused = meal.status === 'paused';

  return (
    <div className="bg-surface p-sm rounded-xl flex flex-col md:flex-row items-center gap-sm md:gap-md group hover:bg-surface-container-lowest transition-colors shadow-sm hover:shadow-md border border-transparent hover:border-secondary/10 relative">
      {meal.isNew && (
        <div className="absolute -left-2 -top-2 w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(226,114,91,0.6)] hidden md:block" />
      )}

      {/* Image */}
      <div className={`w-full md:w-24 h-48 md:h-24 rounded-lg overflow-hidden shrink-0 relative ${isPaused ? 'opacity-60 grayscale-[50%]' : ''}`}>
        <img
          alt={meal.name}
          className={`w-full h-full object-cover ${isActive ? 'transition-transform duration-700 group-hover:scale-105' : ''}`}
          src={meal.image}
        />
        {isPaused && <div className="absolute inset-0 bg-surface/20" />}
        <div className="absolute top-2 right-2 md:hidden">
          <span className={`font-label-md text-[10px] px-2 py-1 rounded-full backdrop-blur-md ${isActive ? 'bg-secondary/10 text-secondary' : 'bg-outline-variant/30 text-on-surface-variant'}`}>
            {isActive ? 'Available' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className={`flex-1 flex flex-col justify-center min-w-0 w-full px-xs md:px-0 ${isPaused ? 'opacity-70' : ''}`}>
        <div className="flex items-center gap-2 mb-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{meal.name}</h3>
          {meal.isNew && (
            <span className="bg-primary-container text-on-primary-container text-[10px] font-label-md px-2 py-0.5 rounded-sm uppercase tracking-wider md:hidden">New</span>
          )}
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 w-full max-w-lg mb-sm md:mb-0">{meal.description}</p>
        <div className="flex gap-2 mt-auto md:hidden">
          {meal.tags.map((tag) => (
            <span key={tag} className="font-label-md text-[10px] text-tertiary bg-tertiary-container/20 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className={`w-full md:w-32 flex justify-between md:justify-end items-center px-xs md:px-0 ${isPaused ? 'opacity-70' : ''}`}>
        <span className="md:hidden font-label-md text-label-md text-on-surface-variant">Price:</span>
        <span className={`font-headline-sm text-headline-sm ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>{meal.price}</span>
      </div>

      {/* Toggle */}
      <div className="w-full md:w-40 flex justify-between md:justify-center items-center px-xs md:px-0 py-sm md:py-0 border-t md:border-t-0 border-outline-variant/20 mt-sm md:mt-0">
        <span className="md:hidden font-label-md text-label-md text-on-surface-variant">Status:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            type="checkbox"
            checked={isActive}
            onChange={() => onToggle(meal.id)}
          />
          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" />
          <span className={`ml-3 text-body-sm font-body-sm text-on-surface-variant font-medium min-w-[70px] ${isActive ? 'text-secondary' : ''}`}>
            {isActive ? 'Active' : 'Paused'}
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
};

// ---- Main Page ----
export const DashboardPage = () => {
  const [mealList, setMealList] = useState<Meal[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    getMeals().then( meals => {
      setMealList(meals);
    });
  }, []);

  const handleToggle = (id: number) => {
    setMealList((prev) =>
      prev.map((meal) =>
        meal.id === id
          ? { ...meal, status: meal.status === 'active' ? 'paused' : 'active' }
          : meal
      )
    );
  };

  // const user = getAuthentication();

  // console.log('authstate');

  return (
    <>
      <main className="w-full pt-20">
        <div className="flex flex-col w-full px-gutter pb-xl max-w-container-max mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg mt-lg gap-sm">
            <div className="flex flex-col gap-xs">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase">My Kitchen</span>
              <h1 className="font-display-lg text-display-lg text-on-background m-0">Meal Management</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-xs">
                Control your active listings, adjust availability, and introduce new culinary creations to your neighbors.
              </p>
            </div>
            <button 
              onClick = { () => navigate('/add-meal') }
              className="bg-primary text-on-primary font-label-md text-label-md px-md h-12 rounded-full flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm hover:shadow-md shrink-0 w-full md:w-auto mt-sm md:mt-0">
              <span className="material-symbols-outlined text-[18px]">Add New Meal</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
            <StatCard icon="restaurant_menu" value="12" label="Active Listings" colorClass="text-primary" bgClass="bg-primary/5 group-hover:bg-primary/10" />
            <StatCard icon="payments" value="$450" label="Sales This Week" colorClass="text-secondary" bgClass="bg-secondary/5 group-hover:bg-secondary/10" />
            <StatCard icon="visibility" value="842" label="Menu Views" colorClass="text-tertiary" bgClass="bg-tertiary/5 group-hover:bg-tertiary/10" />
            <StatCard icon="star" value="4.9" label="Average Rating" colorClass="text-primary-container" bgClass="bg-primary-container/5 group-hover:bg-primary-container/10" />
          </div>

          {/* Meal List */}
          <div className="flex flex-col gap-md">
            <div className="flex items-center justify-between pb-sm border-b border-outline-variant/30 hidden md:flex px-sm">
              <div className="w-16" />
              <div className="flex-1 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Meal Details</div>
              <div className="w-32 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Price</div>
              <div className="w-40 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Status</div>
              <div className="w-24 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</div>
            </div>
            {mealList.map((meal) => (
              <MealItem key={meal.id} meal={meal} onToggle={handleToggle} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-lg flex justify-center">
            <button className="border border-outline font-label-md text-label-md text-on-surface px-lg h-12 rounded-full flex items-center justify-center hover:bg-surface-container hover:text-primary transition-colors">
              Load More Meals
            </button>
          </div>
        </div>
      </main>
      </>
  );
};
