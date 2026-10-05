import type { StatCardProps } from '../interfaces/dashboard.interfaces'

export const StatCard = ({ icon, value, label, colorClass, bgClass }: StatCardProps) => {
  return (
    <div className="bg-surface-container rounded-xl p-md flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-sm transition-shadow">
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgClass} rounded-full -mr-8 -mt-8 blur-xl transition-colors`} />
      <span className={`material-symbols-outlined ${colorClass} mb-xs`}>{icon}</span>
      <div>
        <div className="font-headline-md text-headline-md text-on-surface">{value}</div>
        <div className="font-body-sm text-body-sm text-on-surface-variant">{label}</div>
      </div>
    </div>
  )
}
