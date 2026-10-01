import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
// import { SpinButton } from "../../components/ui/SpinButton";
import { useAuth } from "../../auth/store/AuthContext";
import { useForm } from 'react-hook-form';
import { X } from "lucide-react";
import type { DietaryInfo } from '../interfaces/vendor.interfaces';
import { createUpdateMealAction } from "../actions/create-update-meal-post.action";
import { SpinButton } from "../../components/ui/SpinButton";
import { toast } from "sonner";


interface MealFormValues {
  title: string;
  description: string;
  price: number;
  isAvailable: boolean; // adjust to your actual status type
  images: File[];
  dietaryTags: DietaryInfo[];
  customTags: string[];
}

const availableDietaryInfo: DietaryInfo[] = ["GLUTEN_FREE", "VEGAN", "CARNIVORE", "ITALIAN"];

export const AddMealPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken} = useAuth();
  const [ isNew, setIsNew ] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  const { register, 
          handleSubmit, 
          formState: { errors, isSubmitting, isValid },
          getValues, 
          setValue,
          watch
        } = useForm<MealFormValues>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      description: '',
      price: 0,  
      isAvailable: false,
      images: [],
      dietaryTags : ['GLUTEN_FREE'],
      customTags: []
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDietery = watch('dietaryTags');
  const selectedCustomTag = watch('customTags');

  useEffect(() => {
    if (!getToken()) navigate('/auth/login');
    if (id == 'new') {
      setIsNew(true)
     } else {
      setIsNew(false);
     }
     console.log(id);

  }, [] );

  useEffect(() => {
    console.log('current error:', errors.images);
  }, [errors.images]);

  const previewUrls = files.map((file) => URL.createObjectURL(file));

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
  const onSubmit = async ( data: MealFormValues) => {
    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('dietaryTags', JSON.stringify(data.dietaryTags));
      formData.append('customTags', JSON.stringify(data.customTags));
      formData.append('isAvailable', data.isAvailable.toString());

      files.forEach((file) => {
        formData.append('images', file);
      });

      const res = createUpdateMealAction(formData);
      navigate('/vendor/dashboard');

      console.log('Meal created:', res);
    } catch (err) {
      toast.error('Failed creation meal!');
      console.error('Failed to create meal:', err);
    }
    return;
  }

  const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const combined = [...files, ...newFiles].slice(0, 5); // enforce the 5-image max

    setFiles(combined);
    setValue('images', combined, { shouldValidate: true });
    console.log('stored in form:', getValues('images'));
    console.log(files);

    e.target.value = '';
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
        <form onSubmit={ handleSubmit(onSubmit) }>
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
                      { ...register('title', {
                        required: true
                      }) }
                      className="bg-surface font-body-md text-body-md text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      id="meal-title"
                      placeholder="e.g. Nonna's Sunday Lasagna"
                    />
                    {
                      errors.title && (<p className="text-red-500 text-sm">Meal title is required</p>)
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
                <div className="flex items-center justify-between mb-md">
                  <div
                    className="w-24 col-span-4 sm:col-span-4 aspect-4/3 bg-surface rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors group relative overflow-hidden">
                    <input
                      id="images"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                      onChange={ handleFileChange }
                    />

                    {/* Hidden input — this is what RHF actually tracks for validation/submission */}
                    <input
                      type="hidden"
                      {...register('images', {
                        validate: (files) => {
                          if (!files || files.length === 0) return "At least one image is required";
                          if (files.length > 5) return "You can upload up to 5 images";
                          return true;
                        },
                      })}
                    />
                    <span
                      className="material-symbols-outlined text-4xl text-on-surface-variant mb-xs group-hover:-translate-y-1 transition-transform"
                      >add_a_photo</span
                    >
                    <span
                      className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors"
                      >Upload Photo</span
                    >
                  </div>
                    {errors.images && (
                      <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
                  {
                    previewUrls.map ((url, i) => (
                      <div key={ i } className="aspect-square bg-surface rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors relative">
                        <img
                          src={ url }
                          alt={`Preview ${i + 1}`}
                          className="rounded-lg"
                        />
                      </div>
                    ))
                  }
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
                      id="isAvailable"
                      {...register("isAvailable")}
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
                  <button 
                    disabled = { isSubmitting || !isValid }
                    type="submit" 
           className={`w-full 
                      h-12 
                      bg-primary 
                      text-on-primary 
                      font-label-md 
                      text-label-md 
                      rounded-lg 
                      hover:bg-primary-container 
                      hover:text-on-primary-container 
                      transition-colors shadow-md 
                      hover:shadow-lg 
                      flex items-center justify-center gap-xs
                      ${ isSubmitting || !isValid ? 'disabled:opacity-50' : '' }
                      `}>
                    <span className="material-symbols-outlined text-sm">restaurant</span>
                    { isSubmitting && <SpinButton />}
                    Post Meal
                  </button>
                  <button type="button" className="w-full h-12 bg-transparent text-primary font-label-md text-label-md rounded-lg hover:bg-surface-dim transition-colors flex items-center justify-center">
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

