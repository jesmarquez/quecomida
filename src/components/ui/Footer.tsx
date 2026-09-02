export const Footer = () => (
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