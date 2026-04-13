export default function CTA() {

return (

<section className="py-32 px-6 relative overflow-hidden">

<div className="relative max-w-4xl mx-auto text-center glass p-12 md:p-20 rounded-[3rem] border-primary/20">

<h2 className="text-4xl md:text-7xl font-black text-white uppercase italic mb-8">
Tu Espacio <br />
<span className="text-primary">¿Estas Listo?</span>
</h2>

<p className="text-xl text-slate-300 mb-12">
Deja tu comentario,Queremos saber tu opinion.

</p>

<div className="flex flex-col md:flex-row gap-6 justify-center items-center">

<div className="flex items-center gap-4 text-white font-bold">
<span className="material-symbols-outlined text-primary">
Telefono
</span>
<span className="cursor-pointer">+57 (3112227733)</span>
</div>

<div className="w-px h-10 bg-white/20 hidden md:block"></div>

<button className="bg-white text-background-dark px-12 py-5 rounded-full font-black uppercase hover:bg-primary hover:text-white transition-all neon-glow">
Dejar Comentario
</button>

</div>

</div>

</section>

)

}
