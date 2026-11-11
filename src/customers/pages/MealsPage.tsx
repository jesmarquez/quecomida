import { useEffect, useState } from 'react';
import { MealCard } from '../components/MealCard';
import { getMealsPublic } from '../actions/get-meals.action';
import type { Meal } from '../../vendors/interfaces/meals.response.interface';

export const MealsPage = () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
      async function getMeals() {
        try {
          const data  = await getMealsPublic();
          setMeals(data);
        } catch (error) {
          console.log(error);
        }
      }

      getMeals();
    }, []);
    
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
                      {
                        meals.map((m) => (
                          <MealCard key={m.id} {...m} />
                        ))
                      }
                  </div>
              </div>
          </div>
      </main>
    )
}

