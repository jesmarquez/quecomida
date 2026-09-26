import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
// import { SpinButton } from "../../components/ui/SpinButton";
import { useAuth } from "../../auth/store/AuthContext";
import { useForm } from 'react-hook-form';
import { X } from "lucide-react";
import type { DietaryInfo, Meal } from '../interfaces/vendor.interfaces';

interface MealFormValues {
  name: string;
  description: string;
  price: number;
  status: 'Active' | 'Inactive'; // adjust to your actual status type
  image: string;
  dietaryTags: DietaryInfo[];
  customTags: string[];
}

const availableDietaryInfo: DietaryInfo[] = ["Gluten-free", "Nut-free", "Vegan", "Vegetarian"];

export const AddMealPage = () => {
  const navigate = useNavigate();
  const { getToken} = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const { register, 
          handleSubmit, 
          formState: { errors },
          getValues, 
          setValue,
          watch
        } = useForm<MealFormValues>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,  
      status: 'Inactive',
      image: '',
      dietaryTags : ['Vegan'],
      customTags: []
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDietery = watch('dietaryTags');
  const selectedCustomTag = watch('customTags');

  useEffect(() => {
    if (!getToken()) navigate('/auth/login');
  }, [] );

  const onChangeDietary = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    console.log({ newValue });
    
    if (newValue) {
      setValue('status', 'Active')
    } else {
      setValue('status', 'Inactive')
    }
  }

  const onHandleAddTag = ( dietaryTagSelected: DietaryInfo ) => {
    const dietarySet = new Set<DietaryInfo>(getValues('dietaryTags'));
    dietarySet.add(dietaryTagSelected);
    setValue('dietaryTags', Array.from(dietarySet));
    
    return;
  }

  const onHandleTagRemove = (dietaryTagSelected: DietaryInfo) => {
    setValue('dietaryTags', getValues('dietaryTags').filter(tag => tag !== dietaryTagSelected) );
    return;
  }

  const onHandleCustomTagRemove = (customTagSelected: string) => {
    setValue('customTags', getValues('customTags').filter(tag => tag !== customTagSelected) );
    return;
  }

  const onKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      e.preventDefault();
      const value = e.currentTarget.value;
      if (!value) return;
      const currentTags = getValues('customTags');
      setValue('customTags', [...currentTags, value]);
      e.currentTarget.value = ''; // clear the input after adding
    }
  }
  const onSubmitDeal = ( mealLike: Meal) => {
    console.log('onSubmit', mealLike );
    return;
  }

  const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };

    return (
    <main className="w-full pt-20">
      <div className="flex flex-col w-full max-w-container-max mx-auto px-gutter py-xl">
        <div className="mb-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-background mb-xs">
            Create a New Meal Post
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Share your culinary creation with the neighborhood.
          </p>
        </div>
        <form onSubmit={ handleSubmit(onSubmitDeal) }>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            <div className="lg:col-span-8 flex flex-col gap-lg">
              <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none"
                ></div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
                  Meal Details
                </h2>
                <div className="flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="meal-title"
                      >Meal Title</label
                    >
                    <input
                      type="text"
                      { ...register('name', {
                        required: true
                      }) }
                      className="bg-surface font-body-md text-body-md text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      id="meal-title"
                      placeholder="e.g. Nonna's Sunday Lasagna"
                    />
                    {
                      errors.name && (<p className="text-red-500 text-sm">Meal title is required</p>)
                    }
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="meal-description"
                      >Description</label
                    >
                    <textarea
                      { ...register('description', {
                        required: true
                      }) }
                      className="bg-surface font-body-md text-body-md text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      id="meal-description"
                      placeholder="Describe the flavors, ingredients, and story behind this dish..."
                      rows={ 4 }
                    ></textarea>
                    {
                      errors.description && (<p className="text-red-500 text-sm">Description is required</p>)
                    }
                  </div>
                  <div className="flex flex-col sm:flex-row gap-md">
                    <div className="flex flex-col gap-xs flex-1">
                      <label
                        className="font-label-md text-label-md text-on-surface"
                        htmlFor="meal-price"
                        >Price ($)</label
                      >
                      <div className="relative">
                        <span
                          className="absolute left-sm top-1/2 -translate-y-1/2 font-body-md text-on-surface-variant"
                          >$</span
                        >
                        <input

                          { ...register('price', {
                            required: true,
                            min: 1,
                            valueAsNumber: true,
                            
                            validate: (value) =>
                              /^\d+(\.\d{1,2})?$/.test(value.toString()) || "Only numbers are allowed",
                            
                          })}
                          className="w-full bg-surface font-body-md text-body-md text-on-surface rounded-lg pl-[28px] pr-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          id="meal-price"
                          placeholder="15.00"
                          type="number"
                          onKeyDown={ blockInvalidChar }
                          step="0.01"
                        />
                        {
                          errors.price && (<p className="text-red-500 text-sm">Price must be greater than 1</p>)
                        }
                      </div>
                    </div>
                    <div className="flex flex-col gap-xs flex-1">
                      <label
                        className="font-label-md text-label-md text-on-surface"
                        htmlFor="meal-portions"
                        >Status</label
                      >
                    <select
                      {...register("status")}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container rounded-xl p-md shadow-sm">
                <div className="flex items-center justify-between mb-md">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Mouthwatering Photos</h2>
                  <span
                    className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
                    >Up to 4 images</span
                  >
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-sm">
                  <div
                    className="col-span-2 sm:col-span-2 aspect-[4/3] bg-surface rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors group relative overflow-hidden">
                    <input
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                    />
                    <span
                      className="material-symbols-outlined text-4xl text-on-surface-variant mb-xs group-hover:-translate-y-1 transition-transform"
                      >add_a_photo</span
                    >
                    <span
                      className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors"
                      >Main Photo</span
                    >
                  </div>
                  <div
                    className="aspect-square bg-surface rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors relative">
                    <input
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                    />
                    <span
                      className="material-symbols-outlined text-on-surface-variant"
                      >add</span
                    >
                  </div>
                  <div className="aspect-square bg-surface rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors relative"
                  >
                    <input
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                    />
                    <span
                      className="material-symbols-outlined text-on-surface-variant"
                      >add</span
                    >
                  </div>
                </div>
                <p
                  className="font-body-sm text-body-sm text-on-surface-variant mt-sm text-center"
                >
                  Use high-quality, well-lit photos to attract more neighbors.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-lg">
              <div className="bg-surface-container rounded-xl p-md shadow-sm">
                <h3
                  className="font-headline-sm text-headline-sm text-on-surface mb-md"
                >
                  Publishing
                </h3>
                <div
                  className="flex items-center justify-between mb-md bg-surface p-sm rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface"
                      >Available Now</span
                    >
                    <span
                      className="font-body-sm text-body-sm text-on-surface-variant"
                      >Neighbors can order immediately.</span
                    >
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={ isChecked }
                      onChange={ e => onChangeDietary(e) }
                      className="sr-only peer"
                      type="checkbox"
                      value=""
                    />
                    <div
                      className="w-11 h-6 bg-tertiary-fixed rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                    ></div>
                  </label>
                </div>
                <div className="flex flex-col gap-sm">
                  <button className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-sm">restaurant</span>
                    Post Meal
                  </button>
                  <button className="w-full h-12 bg-transparent text-primary font-label-md text-label-md rounded-lg hover:bg-surface-dim transition-colors flex items-center justify-center">
                    Save as Draft
                  </button>
                </div>
              </div>
              <div className="bg-surface-container rounded-xl p-md shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-md">Dietary Info</h3>
                <div className="flex flex-wrap gap-xs">
                  {
                    selectedDietery.map ( (tag, index) => (
                    <button
                      type="button"
                      onClick={ () => onHandleTagRemove(tag) }
                      key={ index }
                      className="flex items-center gap-1 px-sm py-xs bg-secondary/10 text-secondary font-label-md text-label-md rounded-full cursor-pointer hover:bg-secondary/20 transition-colors"
                      >{ tag }
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                    ))
                  }
                </div>
                <div className="flex flex-wrap gap-xs mt-6">
                  <p>Add dietary:</p>
                  {
                    availableDietaryInfo.map( (dietaryType, index) => (
                    <button
                      type="button"
                      onClick={ () => onHandleAddTag(dietaryType) }
                      disabled={ getValues('dietaryTags').includes(dietaryType) }
                      key={ index }
                      className={`px-sm py-xs 
                                bg-secondary/10 
                                text-secondary 
                                font-label-md 
                                text-label-md 
                                rounded-full
                                ${ selectedDietery.includes(dietaryType) ? 'hidden' : 'cursor-pointer  hover:bg-secondary/20 transition-colors'}
                                `}
                      >{ dietaryType }
                    </button>
                    ))
                  }
                </div>
              </div>

              <div className="bg-surface-container rounded-xl p-md shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-md">Custom tags</h3>
                <div className="flex flex-wrap gap-xs">
                  {
                    selectedCustomTag.map ( (tag, index) => (
                    <button
                      type="button"
                      onClick={ () => onHandleCustomTagRemove(tag) }
                      key={ index }
                      className="flex items-center gap-1 px-sm py-xs bg-secondary/10 text-secondary font-label-md text-label-md rounded-full cursor-pointer hover:bg-secondary/20 transition-colors"
                      >{ tag }
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                    ))
                  }
                </div>

                <div className="flex flex-wrap gap-xs mt-6">
                  <p>Type a new tag:</p>

                  <input
                    className="w-full bg-surface font-body-md text-body-md text-on-surface rounded-lg pl-[28px] pr-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    id="custom-tag"
                    placeholder="Enter new tag"
                    type="text"
                    onKeyDown={ (e) =>  onKeyDownTag(e) }
                  />
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
    );
};

