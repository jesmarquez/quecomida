import { useEffect, useState } from 'react';
import type { Meal, StatCardProps } from '../interfaces/dashboard.interfaces'
import { getMeals } from '../actions/get-meals-action';

// ---- Data ----
// const meals: Meal[] = [
//   {
//     id: 1,
//     name: 'Rustic Beef Bourguignon',
//     description: 'Slow-cooked for 8 hours with red wine, pearl onions, and tender mushrooms. A neighborhood favorite for chilly evenings.',
//     price: '$18.50',
//     status: 'active',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE27NIFIO36dVcUA1XnQCB2mcBy8iqdXIZPO4SORT5wkRkUJKO38ZxKVH8mg4eQ9L3TVgzLTKlmV4JMheLmXYvJcfiJA5lm6PeviG1UI9LH9O4evEtWnB9zV2upGdk6eYEKGu6OZtbeCLPnHe1_3DzLnGQ_FAW78MgftC8xfYaadLDth0yGaTd9dFuJ-8MHyC9PrAZm9VwFT9eCtnyIgG-eZLxbb1GWfhPvVN7YJx5BCPeIoaWSycEsQ',
//     tags: ['Gluten-Free', 'Contains Dairy'],
//   },
//   {
//     id: 2,
//     name: 'Heirloom Tomato Caprese',
//     description: 'Fresh from the garden tomatoes, local mozzarella, and home-grown basil with a 12-year aged balsamic drizzle.',
//     price: '$12.00',
//     status: 'paused',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFr7LyKwvX706Xb5xSQbbYUBQ5WbITSUybJSLDCB4xFDtcH2tT0q04mDP8mcLpBLh-3wo-la81pG01rk2VnatHUlhyDyhllFAt1N9JhIy03WZ2nXrHQCLT23LJbzGBJTFPhDAGhzo0vnZ0e1u8D36bJfxLMLBH7NYm0bIPz02d8cdjg4vGA3E7swDD9Hw_enJnApoiWjBk2ENDPPprT5jfj9tF530qM1lgWevEJZvzH2CzqImN6mHWPA',
//     tags: ['Vegetarian'],
//   },
//   {
//     id: 3,
//     name: 'Handmade Squash Ravioli',
//     description: 'Labor of love ravioli stuffed with roasted butternut squash, bathed in a rich brown butter and crisp sage sauce.',
//     price: '$22.00',
//     status: 'active',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDST01nVMs8aH4kYE2NyaMqIdUCHAA-PACBHil2Z13N0jpGMfLiP4crhHZjNuejkYJdXt-TNXDGkqRNhEOdee0DzecmYb_xDFu0cKB4Jp0SPMsw_1NU38mYyLPP--mMCIaFigeAdWRlTqLCifAjWOSG8tmtM7wiiQeUX0xQXElqdgzqwp0zxdgLZMx12ej7QoLTxOY0h4jwkIlEEAxztX1bTnqK7BXOCj55g5NEygsVRh8z8HSszenQgg',
//     tags: ['Vegetarian', 'Contains Nuts'],
//     isNew: true,
//   },
// ];

// ---- Header ----
const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
    <div className="h-20 max-w-container-max mx-auto px-gutter flex items-center justify-between">
      <div className="flex items-center gap-md">
        <img
          alt="HomeChef Brand Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEp5F3PQluY3sI8yOE17jt35i3m56n30cQZyPEEg0mZQumqAkFNc20mYunAb5asXRKuw4p6AyFgfdfvoPzExfWq3_RD1AiU8JE6kqFz4spHgyg2vZ3TTzaTA5z1r0rHHplRj0GdosDezJVF3KNGiKbFKPLEz7wH7C-5P-tnYRpCmOM7zZKPgNEFv4t4g6P_NEpy_O8ysKsv7xhzX2hJKGSBlVHF886yevrgUlT7FKZk2GOxswsSDa0gg"
        />
        <span className="font-headline-md text-headline-md text-primary tracking-tight">HomeChef</span>
      </div>
      <nav className="hidden md:flex items-center gap-lg">
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Discover Meals</a>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">My Orders 123</a>
        <a aria-current="page" className="transition-colors text-primary font-bold" href="#">My Kitchen X</a>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Orders Received</a>
      </nav>
      <div className="flex items-center gap-sm">
        <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">shopping_basket</span>
        <div className="h-8 w-[1px] bg-outline-variant mx-xs" />
        <img
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-highest cursor-pointer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnMr86kBgT5PxszzeoBKBppSbaDLa-ABRKzTeMjMkbYozZQNq_UGyMQdxZKW_P1muYM95AwVqEJHEgeNp7Xbrpve3EQqKHxJNmxo_vScP3Vtea4IGZbgzyw-6KJLuX8WjRsYyjoVVQI65luYrFmuzymALmW5lhTr5sBuSr7c4rXw1v6IA6Diuq6q6ahAugAkceZ5t_sR6DJjW1DsAd0r652aTwzwBdieHgQFucMNwu2BHvFgHmWk2kow"
        />
      </div>
    </div>
  </header>
);


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

// ---- Footer ----
const Footer = () => (
  <footer className="bg-surface-container py-xl border-t border-outline-variant/20">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-lg">
        <div className="col-span-1 md:col-span-1">
          <img
            alt="HomeChef Logo"
            className="h-6 w-auto mb-md grayscale opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEp5F3PQluY3sI8yOE17jt35i3m56n30cQZyPEEg0mZQumqAkFNc20mYunAb5asXRKuw4p6AyFgfdfvoPzExfWq3_RD1AiU8JE6kqFz4spHgyg2vZ3TTzaTA5z1r0rHHplRj0GdosDezJVF3KNGiKbFKPLEz7wH7C-5P-tnYRpCmOM7zZKPgNEFv4t4g6P_NEpy_O8ysKsv7xhzX2hJKGSBlVHF886yevrgUlT7FKZk2GOxswsSDa0gg"
          />
          <p className="text-body-sm font-body-sm text-on-surface-variant">Connecting home cooks with hungry neighbors through the love of shared meals.</p>
        </div>
        {[
          { title: 'Marketplace', links: ['Browse All', 'Chef Spotlight', 'Gift Cards'] },
          { title: 'Support', links: ['Help Center', 'Trust & Safety', 'Terms'] },
          { title: 'Kitchen', links: ['Become a Chef', 'Kitchen Tools', 'Earnings'] },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-label-md text-label-md text-on-surface mb-md">{title}</h4>
            <ul className="space-y-xs">
              {links.map((link) => (
                <li key={link} className="text-body-sm font-body-sm text-on-surface-variant">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center border-t border-outline-variant/30 pt-md text-body-sm font-body-sm text-on-surface-variant">
        © 2024 HomeChef. All rights reserved. Made with love for the community.
      </div>
    </div>
  </footer>
);

// ---- Main Page ----
export const DashboardPage = () => {
  const [mealList, setMealList] = useState<Meal[]>([]);

  useEffect(() => {
    getMeals().then( meals => {
      setMealList(meals);
    });
  }, [mealList]);

  const handleToggle = (id: number) => {
    setMealList((prev) =>
      prev.map((meal) =>
        meal.id === id
          ? { ...meal, status: meal.status === 'active' ? 'paused' : 'active' }
          : meal
      )
    );
  };

  return (
    <body className="bg-background font-body-md text-on-background">
      <Header />
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
            <button className="bg-primary text-on-primary font-label-md text-label-md px-md h-12 rounded-full flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm hover:shadow-md shrink-0 w-full md:w-auto mt-sm md:mt-0">
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
      <Footer />
    </body>
  );
};
