import { useState } from "react";

const S = { mono:"'Space Mono',monospace", syne:"'Syne',sans-serif" };

const CATS = ["Licores","Cervezas","Cócteles","Sin Alcohol","Alimentos","Otros"];
const EMOJI_MAP = { "Licores":"🥃","Cervezas":"🍺","Cócteles":"🍹","Sin Alcohol":"💧","Alimentos":"🍽","Otros":"📦" };

const INITIAL_PRODUCTS = [
  { id:1,  name:"Aguardiente Antioqueño", cat:"Licores",   price:28000, cost:18000, stock:24, unit:"Botella",  code:"LIC-001", active:true  },
  { id:2,  name:"Vodka Grey Goose",       cat:"Licores",   price:65000, cost:42000, stock:12, unit:"Botella",  code:"LIC-002", active:true  },
  { id:3,  name:"Cerveza Andina",         cat:"Cervezas",  price:8000,  cost:4500,  stock:60, unit:"Unidad",   code:"CER-001", active:true  },
  { id:4,  name:"Mojito Clasico",         cat:"Cócteles",  price:22000, cost:8000,  stock:999,unit:"Porción",  code:"COC-001", active:true  },
  { id:5,  name:"Tabla de Quesos VIP",    cat:"Alimentos", price:45000, cost:22000, stock:10, unit:"Porción",  code:"ALI-001", active:true  },
  { id:6,  name:"Gaseosa 350ml",          cat:"Sin Alcohol",price:6000, cost:2500,  stock:72, unit:"Unidad",   code:"SA-001",  active:true  },
];

const EMPTY_FORM = { name:"", cat:"Licores", price:"", cost:"", stock:"", unit:"Unidad", code:"", notes:"" };

const fmt   = (n) => `$${Number(n).toLocaleString("es-CO")}`;
const margin= (p,c) => p && c ? Math.round(((p-c)/p)*100) : 0;

export default function ProductsModule({ user }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [view,     setView]     = useState("list");   // list | form | detail
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [errors,   setErrors]   = useState({});
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("Todos");
  const [saved,    setSaved]    = useState(false);
  const [editMode, setEditMode] = useState(false);

  const filtered = products.filter(p =>
    (filter === "Todos" || p.cat === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ── Validar formulario ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name  = "El nombre es requerido";
    if (!form.price || form.price <= 0) e.price = "Ingresa un precio válido";
    if (!form.stock && form.stock !== 0) e.stock = "Ingresa el stock";
    if (!form.code.trim())       e.code  = "El código es requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Guardar producto ── */
  const saveProduct = () => {
    if (!validate()) return;
    if (editMode && selected) {
      setProducts(prev => prev.map(p => p.id === selected.id ? { ...p, ...form, price:Number(form.price), cost:Number(form.cost), stock:Number(form.stock), active:true } : p));
      setSelected(prev => ({ ...prev, ...form, price:Number(form.price), cost:Number(form.cost), stock:Number(form.stock) }));
      setView("detail");
    } else {
      const np = { id:Date.now(), ...form, price:Number(form.price), cost:Number(form.cost||0), stock:Number(form.stock), active:true };
      setProducts(prev => [np, ...prev]);
      setView("list");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setForm(EMPTY_FORM);
    setErrors({});
    setEditMode(false);
  };

  const openEdit = (p) => { setForm({ name:p.name, cat:p.cat, price:String(p.price), cost:String(p.cost||""), stock:String(p.stock), unit:p.unit, code:p.code, notes:p.notes||"" }); setEditMode(true); setView("form"); };
  const toggleActive = (id) => setProducts(prev => prev.map(p => p.id===id ? {...p,active:!p.active} : p));

  /* ── Input helper ── */
  const Field = ({ id, label, type="text", ph, half=false }) => (
    <div style={{ gridColumn:half?"span 1":"span 2" }}>
      <label style={{ display:"block", fontFamily:S.mono, fontSize:"10px", color:"#6b6b8a", marginBottom:"6px", letterSpacing:"1px", textTransform:"uppercase" }}>{label}</label>
      <input type={type} placeholder={ph} value={form[id]} onChange={e=>setForm({...form,[id]:e.target.value})}
        style={{ width:"100%", padding:"11px 13px", background:"#080810", border:`1px solid ${errors[id]?"rgba(255,56,86,0.5)":"rgba(255,255,255,0.08)"}`, borderRadius:"10px", color:"#fff", fontSize:"14px", fontFamily:S.syne, outline:"none", boxSizing:"border-box" }} />
      {errors[id] && <p style={{ color:"#ff3860", fontFamily:S.mono, fontSize:"10px", margin:"4px 0 0" }}>{errors[id]}</p>}
    </div>
  );

  /* ────────── VIEW: FORM ────────── */
  if (view === "form") return (
    <div style={{ maxWidth:"680px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
        <button onClick={() => { setView(editMode?"detail":"list"); setEditMode(false); setForm(EMPTY_FORM); setErrors({}); }}
          style={{ padding:"8px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"9px", color:"#6b6b8a", fontSize:"12px", cursor:"pointer", fontFamily:S.mono }}>
          ← Volver
        </button>
        <div>
          <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", margin:"0 0 2px", letterSpacing:"2px", textTransform:"uppercase" }}>{editMode?"Editar producto":"Nuevo producto"}</p>
          <h2 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"20px", color:"#fff", margin:0 }}>
            {editMode ? "Actualizar información" : "Registrar producto"}
          </h2>
        </div>
      </div>

      {saved && (
        <div style={{ background:"rgba(0,245,160,0.1)", border:"1px solid rgba(0,245,160,0.3)", borderRadius:"10px", padding:"12px 16px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ color:"#00f5a0" }}>✓</span>
          <span style={{ color:"#00f5a0", fontFamily:S.mono, fontSize:"12px" }}>Producto guardado correctamente</span>
        </div>
      )}

      <div style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.1)", borderRadius:"16px", padding:"28px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
          <Field id="name"  label="Nombre del producto *" ph="Ej. Aguardiente Antioqueño" />
          <div>
            <label style={{ display:"block", fontFamily:S.mono, fontSize:"10px", color:"#6b6b8a", marginBottom:"6px", letterSpacing:"1px", textTransform:"uppercase" }}>Categoría *</label>
            <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})}
              style={{ width:"100%", padding:"11px 13px", background:"#080810", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#fff", fontSize:"14px", fontFamily:S.syne, outline:"none" }}>
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <Field id="code"  label="Código SKU *"       ph="LIC-001" half />
          <div>
            <label style={{ display:"block", fontFamily:S.mono, fontSize:"10px", color:"#6b6b8a", marginBottom:"6px", letterSpacing:"1px", textTransform:"uppercase" }}>Unidad</label>
            <select value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}
              style={{ width:"100%", padding:"11px 13px", background:"#080810", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#fff", fontSize:"14px", fontFamily:S.syne, outline:"none" }}>
              {["Unidad","Botella","Porción","Caja","Paquete","Litro"].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <Field id="price" label="Precio de venta (COP) *" ph="28000"  type="number" half />
          <Field id="cost"  label="Costo (COP)"          ph="15000"  type="number" half />
          <Field id="stock" label="Stock inicial *"       ph="24"     type="number" half />
          <div>
            <label style={{ display:"block", fontFamily:S.mono, fontSize:"10px", color:"#6b6b8a", marginBottom:"6px", letterSpacing:"1px", textTransform:"uppercase" }}>Notas</label>
            <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Descripción opcional…" rows={3}
              style={{ width:"100%", padding:"11px 13px", background:"#080810", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#fff", fontSize:"14px", fontFamily:S.syne, outline:"none", resize:"none", boxSizing:"border-box" }} />
          </div>
        </div>

        {/* Margen preview */}
        {form.price && form.cost && (
          <div style={{ marginTop:"16px", padding:"12px 16px", background:"rgba(138,43,226,0.08)", borderRadius:"10px", border:"1px solid rgba(138,43,226,0.15)", display:"flex", gap:"24px" }}>
            <div>
              <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#4a4a6a", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"1px" }}>Ganancia unitaria</p>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"16px", color:"#00f5a0", margin:0 }}>{fmt(Number(form.price)-Number(form.cost))}</p>
            </div>
            <div>
              <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#4a4a6a", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"1px" }}>Margen</p>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"16px", color:"#c084fc", margin:0 }}>{margin(Number(form.price),Number(form.cost))}%</p>
            </div>
          </div>
        )}

        <div style={{ display:"flex", gap:"10px", marginTop:"24px" }}>
          <button onClick={() => { setView(editMode?"detail":"list"); setEditMode(false); setForm(EMPTY_FORM); setErrors({}); }}
            style={{ padding:"12px 20px", background:"transparent", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#6b6b8a", fontSize:"13px", fontFamily:S.syne, cursor:"pointer" }}>
            Cancelar
          </button>
          <button onClick={saveProduct}
            style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"10px", color:"#fff", fontSize:"14px", fontWeight:700, fontFamily:S.syne, cursor:"pointer" }}>
            {editMode ? "Actualizar producto" : "Guardar producto"}
          </button>
        </div>
      </div>
    </div>
  );

  /* ────────── VIEW: DETAIL ────────── */
  if (view === "detail" && selected) {
    const p = products.find(x => x.id === selected.id) || selected;
    return (
      <div style={{ maxWidth:"560px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <button onClick={() => { setView("list"); setSelected(null); }}
            style={{ padding:"8px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"9px", color:"#6b6b8a", fontSize:"12px", cursor:"pointer", fontFamily:S.mono }}>
            ← Volver
          </button>
          <h2 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"20px", color:"#fff", margin:0 }}>Detalle del producto</h2>
        </div>

        <div style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.12)", borderRadius:"16px", padding:"28px", marginBottom:"16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
            <div>
              <span style={{ fontSize:"36px" }}>{EMOJI_MAP[p.cat]||"📦"}</span>
              <h3 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"22px", color:"#fff", margin:"8px 0 4px" }}>{p.name}</h3>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                <span style={{ background:"rgba(138,43,226,0.15)", border:"1px solid rgba(138,43,226,0.25)", color:"#c084fc", fontSize:"10px", fontFamily:S.mono, padding:"2px 8px", borderRadius:"5px" }}>{p.cat}</span>
                <span style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#6b6b8a", fontSize:"10px", fontFamily:S.mono, padding:"2px 8px", borderRadius:"5px" }}>{p.code}</span>
                <span style={{ background:p.active?"rgba(0,245,160,0.1)":"rgba(255,56,86,0.1)", border:`1px solid ${p.active?"rgba(0,245,160,0.3)":"rgba(255,56,86,0.3)"}`, color:p.active?"#00f5a0":"#ff3860", fontSize:"10px", fontFamily:S.mono, padding:"2px 8px", borderRadius:"5px" }}>
                  {p.active?"ACTIVO":"INACTIVO"}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px", marginBottom:"20px" }}>
            {[
              { l:"Precio venta", v:fmt(p.price), c:"#c084fc" },
              { l:"Costo",        v:fmt(p.cost||0),  c:"#6b6b8a" },
              { l:"Margen",       v:`${margin(p.price,p.cost||0)}%`, c:"#00f5a0" },
              { l:"Stock",        v:p.stock===999?"∞":p.stock, c:p.stock<5?"#ff6b35":"#fff" },
              { l:"Unidad",       v:p.unit, c:"#fff" },
              { l:"Ganancia",     v:fmt((p.price)-(p.cost||0)), c:"#00f5a0" },
            ].map((stat,i) => (
              <div key={i} style={{ background:"#080810", borderRadius:"10px", padding:"12px 14px" }}>
                <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#4a4a6a", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"1px" }}>{stat.l}</p>
                <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"16px", color:stat.c, margin:0 }}>{stat.v}</p>
              </div>
            ))}
          </div>

          {p.notes && (
            <div style={{ background:"#080810", borderRadius:"10px", padding:"12px 14px", marginBottom:"20px" }}>
              <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"1px" }}>Notas</p>
              <p style={{ color:"#8b8baa", fontSize:"13px", margin:0 }}>{p.notes}</p>
            </div>
          )}

          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={() => openEdit(p)} style={{ flex:1, padding:"11px", background:"rgba(138,43,226,0.15)", border:"1px solid rgba(138,43,226,0.3)", borderRadius:"10px", color:"#c084fc", fontSize:"13px", fontFamily:S.syne, fontWeight:700, cursor:"pointer" }}>
              ✎ Editar
            </button>
            <button onClick={() => toggleActive(p.id)}
              style={{ flex:1, padding:"11px", background:p.active?"rgba(255,56,86,0.08)":"rgba(0,245,160,0.08)", border:`1px solid ${p.active?"rgba(255,56,86,0.25)":"rgba(0,245,160,0.25)"}`, borderRadius:"10px", color:p.active?"#ff3860":"#00f5a0", fontSize:"13px", fontFamily:S.syne, fontWeight:700, cursor:"pointer" }}>
              {p.active ? "Desactivar" : "Activar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ────────── VIEW: LIST ────────── */
  return (
    <div>
      <div style={{ display:"flex", gap:"12px", marginBottom:"20px", flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:1, minWidth:"180px" }}>
          <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"13px" }}>🔍</span>
          <input type="text" placeholder="Buscar producto…" value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%", paddingLeft:"36px", paddingRight:"12px", paddingTop:"10px", paddingBottom:"10px", background:"#0d0d1a", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#fff", fontSize:"13px", fontFamily:S.syne, outline:"none", boxSizing:"border-box" }} />
        </div>
        <button onClick={() => { setForm(EMPTY_FORM); setEditMode(false); setErrors({}); setView("form"); }}
          style={{ padding:"10px 20px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"10px", color:"#fff", fontSize:"13px", fontWeight:700, fontFamily:S.syne, cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", gap:"6px" }}>
          + Nuevo Producto
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"20px" }}>
        {["Todos",...CATS].map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding:"5px 14px", background:"transparent", border:`1px solid ${filter===c?"#c084fc":"rgba(255,255,255,0.08)"}`, borderRadius:"20px", color:filter===c?"#c084fc":"#4a4a6a", fontSize:"11px", fontFamily:S.mono, cursor:"pointer", transition:"all .15s" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Stats rápidas */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"24px" }}>
        {[
          { l:"Total productos", v:products.length,                      c:"#c084fc" },
          { l:"Activos",        v:products.filter(p=>p.active).length,   c:"#00f5a0" },
          { l:"Stock bajo",     v:products.filter(p=>p.stock<5&&p.stock!==999).length, c:"#ff6b35" },
          { l:"Sin costo",      v:products.filter(p=>!p.cost).length,   c:"#ffc107" },
        ].map((s,i) => (
          <div key={i} style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.1)", borderRadius:"12px", padding:"14px 16px" }}>
            <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#4a4a6a", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"1px" }}>{s.l}</p>
            <p style={{ fontFamily:S.syne, fontWeight:800, fontSize:"22px", color:s.c, margin:0 }}>{s.v}</p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.1)", borderRadius:"16px", overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 80px", padding:"10px 20px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          {["Producto","Categoría","Precio","Stock","Margen",""].map((h,i) => (
            <span key={i} style={{ fontFamily:S.mono, fontSize:"9px", color:"#2a2a3e", textTransform:"uppercase", letterSpacing:"1px" }}>{h}</span>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"40px", color:"#2a2a3e", fontFamily:S.mono, fontSize:"13px" }}>Sin productos</div>
        )}
        {filtered.map(p => (
          <div key={p.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 80px", padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.04)", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ fontSize:"18px" }}>{EMOJI_MAP[p.cat]||"📦"}</span>
              <div>
                <p style={{ fontFamily:S.syne, fontWeight:600, fontSize:"13px", color:p.active?"#fff":"#4a4a6a", margin:"0 0 1px" }}>{p.name}</p>
                <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#3a3a5a", margin:0 }}>{p.code}</p>
              </div>
            </div>
            <span style={{ fontFamily:S.mono, fontSize:"11px", color:"#6b6b8a" }}>{p.cat}</span>
            <span style={{ fontFamily:S.mono, fontWeight:700, fontSize:"13px", color:"#c084fc" }}>{fmt(p.price)}</span>
            <span style={{ fontFamily:S.mono, fontSize:"12px", color:p.stock<5&&p.stock!==999?"#ff6b35":"#6b6b8a" }}>
              {p.stock===999?"∞":p.stock} {p.unit}
            </span>
            <span style={{ fontFamily:S.mono, fontSize:"12px", color:"#00f5a0" }}>{margin(p.price,p.cost||0)}%</span>
            <button onClick={() => { setSelected(p); setView("detail"); }}
              style={{ padding:"6px 12px", background:"rgba(138,43,226,0.1)", border:"1px solid rgba(138,43,226,0.2)", borderRadius:"8px", color:"#c084fc", fontSize:"11px", fontFamily:S.mono, cursor:"pointer" }}>
              Ver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
