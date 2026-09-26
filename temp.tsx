import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SpinButton } from "../../components/ui/SpinButton";
import { useAuth } from "../../auth/store/AuthContext";
import { useForm } from 'react-hook-form';
import type { Meal } from '../interfaces/vendor.interfaces';

export const AddMealPage = () => {
  const [sw, setsw] = useState(false);
  const navigate = useNavigate();
  const { getToken} = useAuth();
  const meal: Meal = {
    id: 1,
    name: 'Sopita de res',
    description: 'Arroz + tortilla + una coca-cola lata y un deliciosa chile para los amantes del picante',
    price: '20',  
    status: 'Inactive',
    image: '',
    tags: [],
    isNew: true
  }

  const { register } = useForm({
    defaultValues: meal
  });

  useEffect(() => {
    if (!getToken()) navigate('/auth/login');
  }, [] );

  const onClickPostDeal = () => {
    console.log(sw);
    setsw(!sw);
    return;
  }

    return (
        <main className="w-full pt-20">
            <div className="flex flex-col w-full max-w-container-max mx-auto px-gutter py-xl">
                <div className="mb-lg">
                    <h1 className="font-headline-lg text-headline-lg text-on-background mb-xs">
                      Create a New Meal Post
                    </h1>
                    <p className="text-on-surface-variant">Share your culinary creation with the neighborhood.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                    <div className="lg:col-span-8 flex flex-col gap-lg">
                        <div className="bg-surface-container rounded-xl p-md shadow-sm">
                            <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
                              Meal Details
                            </h2>
                            <div className="flex flex-col gap-md">
                                                <label
                    class="font-label-md text-label-md text-on-surface"
                    for="meal-title"
                    >Meal Title</label
                  >
                                <input 
                                    value={ meal.name }
                                    type="text"
                                    { ...register('name')}
                                    className="bg-surface p-sm rounded-lg" 
                                    placeholder="e.g. Nonna's Sunday Lasagna"/>
                                <textarea 
                                  value={ meal.description }
                                  className="bg-surface p-sm rounded-lg" 
                                  placeholder="Describe the flavors..." 
                                  rows="4"></textarea>
                                <div className="flex gap-md">
                                    <input
                                      value={ meal.price }
                                      { ...register('price') }
                                      className="bg-surface p-sm rounded-lg flex-1" 
                                      placeholder="Price ($)"/>
                                    <input
                                      value={ meal.status }
                                      className="bg-surface p-sm rounded-lg flex-1" 
                                      placeholder="Portions Available"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-lg">
                        <div className="bg-surface-container rounded-xl p-md shadow-sm">
                            <h3 className="font-headline-sm mb-md">Publishing</h3>
                            <button onClick={ onClickPostDeal } 
                              className="w-full
                                      flex
                                      items-center
                                      justify-center
                                      gap-2
                                      hover:bg-primary-container
                                      hover:text-on-primary-container
                                        h-12 
                                        bg-primary 
                                        text-on-primary rounded-lg mb-sm">
                              {
                                sw && (
                                  <SpinButton/>
                                )
                              }              
                              {
                                sw ? "Proccesing..." : 'Post Meal' 
                              }
                            </button>
                            <button onClick={() => navigate('/dashboard')} className="w-full h-12 border border-primary text-primary rounded-lg">Save as Draft</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};


function getToken() {
    throw new Error("Function not implemented.");
}

