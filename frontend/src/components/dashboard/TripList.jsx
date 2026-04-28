import { TRIPS, statusLabel } from '../../data/mockData'

export default function TripList() {
  return (
    <section className="bg-white rounded-[22px] p-[24px] border border-black/5 animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="font-display text-[18px] font-bold text-text-dark tracking-[-0.2px]">My Trips</h2>
        <button className="border-none bg-transparent text-[13px] text-gold font-semibold cursor-pointer font-body p-0 transition-opacity duration-200 hover:opacity-70">See all</button>
      </div>
      <div className="flex flex-col gap-[4px]">
        {TRIPS.map((trip, i) => (
          <div className="flex items-center gap-[14px] p-[13px] rounded-[14px] cursor-pointer transition-all duration-200 animate-[fadeRight_0.45s_cubic-bezier(0.16,1,0.3,1)_both] hover:bg-cream hover:translate-x-[4px]" key={trip.id} style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
            <img src={trip.img} alt={trip.dest} className="w-[56px] h-[56px] rounded-[14px] object-cover shrink-0 border-[2px] border-black/5" />
            <div className="flex-1 min-w-0">
              <p className="text-[14.5px] font-semibold text-text-dark mb-[3px] tracking-[-0.1px]">{trip.dest}</p>
              <p className="text-[12px] text-text-mid font-normal">{trip.dates} · {trip.days} days</p>
            </div>
            <div className="flex flex-col items-end gap-[5px] shrink-0">
              <span className={`text-[11px] font-semibold p-[4px_11px] rounded-full whitespace-nowrap tracking-[0.2px] ${trip.status === 'upcoming' ? 'bg-[#2A9D8F]/10 text-[#1E8A7D] border border-[#2A9D8F]/20' : trip.status === 'planning' ? 'bg-gold/10 text-[#9B7020] border border-gold/20' : 'bg-[#C0605E]/10 text-[#B05250] border border-[#C0605E]/20'}`}>
                {statusLabel(trip.status)}
              </span>
              {trip.daysLeft && (
                <p className="text-[11px] text-text-light font-medium">{trip.daysLeft}d away</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
