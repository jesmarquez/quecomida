import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../../auth/store/AuthContext';
import { getVendorAction } from '../../auth/actions/getVendor.action';
import { toast } from 'sonner';
import type { Meal } from '../interfaces/meals.response.interface';
import { getMealsMine } from '../actions/get-meals-mine.action';
import { MealItem } from '../components/MealItem';
import { StatCard } from '../components/StatCard';
import type { MealAvailability } from '../interfaces/availability_meal.interface';
import { updateMealAvailable } from '../actions/update-available-meal.action';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { deleteMeal } from '../actions/delete-meal.action';
import axios from "axios";

// ---- Main Page ----
export const DashboardPage = () => {
  const [mealList, setMealList] = useState<Meal[]>([]);
  const navigate = useNavigate();
  const { saveToken, setAuthentication, getToken, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ready, setReady] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
  const [messageErrorConfirmDelete, setMessageErrorConfirmDelete] = useState<string | null>(null);
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
        // navigate("/auth/login", { replace: true });
        if (axios.isAxiosError<{ error?: string }>(error)) {
          if (error?.response?.status === 401 ) logout();
          const status = error.response?.data?.error ?? error.message
          const backendMessage = error.response?.data?.error ?? error.message;
          console.log(`Error ${status ?? 'no response'}: ${backendMessage}`);
        }
        else {
          console.log(`An unexpected error occurred getVendorAction: ${String(error)}`);
        }
      }
    }
    initDashboard();
  }, []);

  useEffect(() => {
    async function loadMeals() {
      try {
        const  data  = await getMealsMine();
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

  const handleToggle = async (id: string) => {
    try {
      const mealToUpdating = mealList.find((meal) => meal.id === id);
      const mealUpdated: MealAvailability = await updateMealAvailable(id, !mealToUpdating?.isAvailable);

    setMealList((prev) =>
        prev.map((meal) => 
          meal.id === id
            ? { ...meal, isAvailable: meal.isAvailable ? false : true }
            : meal
        )
      );

    } catch (error) {
      console.log(error);
      console.log(`Error updating availalibity meal id ${ id }`);
    }
  };

  const onConfirmDelete = async () => {

    try {
      const data = await deleteMeal(mealToDelete.id);
      setMealList(mealList.filter( m => m.id !== mealToDelete.id ));

      setMealToDelete(null);
      setMessageErrorConfirmDelete(null);
      console.log(data);
      toast.info(`Deleted meal`);
    } catch (error) {
      console.log('Failed delete meal', error);
      setMessageErrorConfirmDelete(error.message! || 'Failed delete meal');
    }
  }

  const onDeleteMeal = (id: string) => {
    const mealFound = mealList.find((meal) => meal.id === id );
    setMealToDelete(mealFound || null);
  }

  const onCancelDelete = () => {
    setMealToDelete(null);
    setMessageErrorConfirmDelete(null);
  }

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
            <StatCard icon="restaurant_menu" value="12" label="Active Listings" className="text-primary" bgclassName="bg-primary/5 group-hover:bg-primary/10" />
            <StatCard icon="payments" value="$450" label="Sales This Week" className="text-secondary" bgclassName="bg-secondary/5 group-hover:bg-secondary/10" />
            <StatCard icon="visibility" value="842" label="Menu Views" className="text-tertiary" bgclassName="bg-tertiary/5 group-hover:bg-tertiary/10" />
            <StatCard icon="star" value="4.9" label="Average Rating" className="text-primary-container" bgclassName="bg-primary-container/5 group-hover:bg-primary-container/10" />
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
              <MealItem key={meal.id} meal={meal} onToggle={handleToggle} onDelete={ onDeleteMeal }/>
            ))}


          </div>

          {/* Load More */}
          <div className="mt-lg flex justify-center">
            <button className="border border-outline font-label-md text-label-md text-on-surface px-lg h-12 rounded-full flex items-center justify-center hover:bg-surface-container hover:text-primary transition-colors">
              Load More Meals
            </button>
          </div>
        </div>

      {
        mealToDelete && <ConfirmDialog open={ true } title='Delete meal' message={`Are you sure you want to delete ${ mealToDelete.title }? This action cannot be undone and will permanently remove this meal from your kitchen and the neighborhood marketplace`} confirmLabel='Delete' isLoading={ false } onConfirm={ onConfirmDelete } onCancel= { onCancelDelete } messageError={ messageErrorConfirmDelete }/>
      }
      </main>

    </>
  );
};
