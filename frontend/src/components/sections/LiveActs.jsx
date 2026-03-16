export default function LiveActs(){

return(

<section className="py-24 px-6 bg-background-dark/95" id="live-acts">

<div className="max-w-7xl mx-auto">

<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">

<div>
<h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
Resonando Este Fin de Semana
</h2>

<h3 className="text-4xl md:text-6xl font-black text-white italic uppercase">
Live Acts
</h3>
</div>

<button className="text-white border-b border-primary pb-1 font-bold uppercase tracking-widest hover:text-primary transition-all">
Ver Cartelera Completa
</button>

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

{/* DJ 1 */}

<div className="relative h-[500px] rounded-3xl overflow-hidden group">

<img
className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
src="https://lh3.googleusercontent.com/aida-public/AB6AXuBifF5P0xvYyZBftuwJmumDGNYzpqx0gGxb8jb0b2txruFadLC3x3R2CcalR16U1cDPuPko8DK7sJlVtQFVmeqCvbqh6migcaRSbxPCipDOrok1HmYu2tJ4zxAp6ScoSkggSkk3bj9-iafqdv3RmmY2hzAoZCI1MpNLA4oJ6Lol0THyngf98LlcPoEQv7szUzr6paJnf24d5E2Ch-73MIrexybis2fH4Z0arLfFO-Cpt5kMZtsUh5gmQfoHC4dYIVdph7hbSRwUQTui"
/>

<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />

<div className="absolute bottom-10 left-10">

<span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
Artista Principal / Viernes
</span>

<h4 className="text-5xl font-black text-white uppercase italic">
DJ ECLIPSE
</h4>

</div>

</div>

{/* DJ 2 */}

<div className="relative h-[500px] rounded-3xl overflow-hidden group">

<img
className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRW5z3QKvvxc7E4rMXf-Yrbl2KNeKkioAhF56pZFhAisYHc8plvmSCX2cDRtGeyGGgzRfMbG_GMuiRW0-G7ecgjOTMuVSSg87RnbvgHNrPWSByh1t3wNLvboxsfKH85X4O6uznSnMbQu6ZbwXz_MBK1MJFoWMh5cQGvm-ZPD2xQwI6FgtMkVWrT8prH_MZJcsFN_zgUUTpcbZ3m7McCzT2aM9HXuL2prI4XQ-GeQBgahH-hszK6aCRds_aHVomIB4K1-DPNPtp_-C-"
/>

<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />

<div className="absolute bottom-10 left-10">

<span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
Tech House / Sábado
</span>

<h4 className="text-5xl font-black text-white uppercase italic">
VALERIA VOID
</h4>

</div>

</div>

</div>

</div>

</section>

)

}
