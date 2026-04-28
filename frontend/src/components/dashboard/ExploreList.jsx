import { EXPLORE } from '../../data/mockData'

export default function ExploreList() {
  return (
    <section className="flex flex-col animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.28s_both]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="font-display text-[18px] font-bold text-text-dark tracking-[-0.2px]">Explore</h2>
        <button className="border-none bg-transparent text-[13px] text-gold font-semibold cursor-pointer font-body p-0 transition-opacity duration-200 hover:opacity-70">Discover more</button>
      </div>
      <div className="flex flex-col gap-[14px] flex-1">
        {EXPLORE.map((place, i) => (
          <div className="relative rounded-[18px] overflow-hidden cursor-pointer flex-1 min-h-[90px] animate-[fadeRight_0.45s_cubic-bezier(0.16,1,0.3,1)_both] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:scale-[1.01] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] group" key={place.name} style={{ animationDelay: `${0.18 + i * 0.1}s` }}>
            <img src={place.img} alt={place.name} className="w-full h-full object-cover min-h-[90px] block transition-transform duration-[0.55s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1428]/70 via-[#0f1428]/15 to-transparent flex items-center justify-between px-[18px]">
              <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-gold-light bg-gold/20 p-[4px_10px] rounded-full border border-gold/45 backdrop-blur-md">{place.tag}</span>
              <div>
                <p className="text-[14px] font-bold text-white text-right tracking-[-0.2px]">{place.name}</p>
                <p className="text-[11px] text-white/60 text-right mt-[2px] font-normal">{place.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
