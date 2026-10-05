import { useEffect, useState } from 'react';
import type { StatCardProps } from '../interfaces/dashboard.interfaces'
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../../auth/store/AuthContext';
import { getVendorAction } from '../../auth/actions/getVendor.action';
import { toast } from 'sonner';
import type { Meal } from '../interfaces/meals.response.interface';
import { getMealsMine } from '../actions/get-meals-mine.action';
import { MealItem } from '../components/MealItem';

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

// ---- Main Page ----
export const DashboardPage = () => {
  const [mealList, setMealList] = useState<Meal[]>([]);
  const navigate = useNavigate();
  const { saveToken, setAuthentication, getToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initDashboard () {
      const tokenFromUrl = searchParams.get("token");
      
      if (tokenFromUrl) {
        saveToken(tokenFromUrl);
        setSearchParams({}, { replace: true });
      } 
      
      const token = getToken();
      if (!token) {
        navigate("/auth/login", { replace: true });
        return;
      }

      try {
        const  data  = await getVendorAction();
        setAuthentication(data.email , token);
        setReady(true);
      } catch (error) {
        // Token was invalid/expired — your axios interceptor already clears
        // it and redirects to /login on a 401, so this catch is mostly a
        // safety net for other errors.
        console.log(error);
        navigate("/auth/login", { replace: true });
      }

    }
    initDashboard();
  }, []);

  useEffect(() => {
    async function loadMeals() {
      console.log('fetching meals...'); 
      try {
        const  data  = await getMealsMine();
        console.log(data);
        setMealList(data);
      } catch(error) {
        console.log(error);
        toast.warning('Error loading meals');
      }

    }
    loadMeals();
  
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <svg className="h-8 w-8 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  const handleToggle = (id: string) => {
    console.log(id);
    setMealList((prev) =>
      prev.map((meal) =>
        meal.id === id
          ? { ...meal, isAvailable: meal.isAvailable ? false : true }
          : meal
      )
    );
    console.log(mealList);
  };

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
              onClick = { () => navigate('/vendor/meal/new') }
              className="bg-primary text-on-primary font-label-md text-label-md px-md h-12 rounded-full flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm hover:shadow-md shrink-0 w-full md:w-auto mt-sm md:mt-0"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add New Meal
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
