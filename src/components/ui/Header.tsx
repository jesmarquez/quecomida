import { Link } from "react-router";

export const Header = () => (
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
        <Link to="/">
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Discover Meals</a>
        </Link>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">My Orders</a>
        <Link to="dashboard">
          <a aria-current="page" className="transition-colors text-primary font-bold" href="#">My Kitchen</a>
        </Link>
        <Link to="orders">
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Orders Received</a>
        </Link>
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