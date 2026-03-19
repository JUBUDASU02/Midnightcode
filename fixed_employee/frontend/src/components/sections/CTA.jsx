export default function CTA() {

return (

<section className="py-32 px-6 relative overflow-hidden">

<div className="relative max-w-4xl mx-auto text-center glass p-12 md:p-20 rounded-[3rem] border-primary/20">

<h2 className="text-4xl md:text-7xl font-black text-white uppercase italic mb-8">
Your Table <br />
<span className="text-primary">Is Ready</span>
</h2>

<p className="text-xl text-slate-300 mb-12">
Join the elite few in Neon Overload.
</p>

<div className="flex flex-col md:flex-row gap-6 justify-center items-center">

<div className="flex items-center gap-4 text-white font-bold">
<span className="material-symbols-outlined text-primary">
local_phone
</span>
<span>+1 (800) NEON-LV</span>
</div>

<div className="w-px h-10 bg-white/20 hidden md:block"></div>

<button className="bg-white text-background-dark px-12 py-5 rounded-full font-black uppercase hover:bg-primary hover:text-white transition-all neon-glow">
Book Now
</button>

</div>

</div>

</section>

)

}
