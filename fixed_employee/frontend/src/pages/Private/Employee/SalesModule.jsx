import { useState, useMemo } from "react";

const S = { mono:"'Space Mono',monospace", syne:"'Syne',sans-serif" };

/* ─── CATÁLOGO ───────────────────────────────────────────────────────────── */
const CATALOG = [
  // Bebidas
  { id:1,  name:"Aguardiente Antioqueño",  cat:"Licores",   price:28000, emoji:"🥃", stock:24 },
  { id:2,  name:"Vodka Grey Goose",        cat:"Licores",   price:65000, emoji:"🍸", stock:12 },
  { id:3,  name:"Whisky Jack Daniel's",    cat:"Licores",   price:55000, emoji:"🥃", stock:8  },
  { id:4,  name:"Ron Medellín 8 Años",     cat:"Licores",   price:38000, emoji:"🥃", stock:16 },
  { id:5,  name:"Cerveza Andina",          cat:"Cervezas",  price:8000,  emoji:"🍺", stock:60 },
  { id:6,  name:"Heineken",               cat:"Cervezas",  price:12000, emoji:"🍺", stock:48 },
  { id:7,  name:"Pola Artesanal IPA",      cat:"Cervezas",  price:15000, emoji:"🍺", stock:30 },
  { id:8,  name:"Mojito Clasico",          cat:"Cócteles",  price:22000, emoji:"🍹", stock:999},
  { id:9,  name:"Sex on the Beach",        cat:"Cócteles",  price:24000, emoji:"🍹", stock:999},
  { id:10, name:"Tequila Sunrise",         cat:"Cócteles",  price:26000, emoji:"🍹", stock:999},
  { id:11, name:"Agua Mineral 500ml",      cat:"Sin Alcohol",price:5000,  emoji:"💧", stock:80 },
  { id:12, name:"Gaseosa 350ml",           cat:"Sin Alcohol",price:6000,  emoji:"🥤", stock:72 },
  { id:13, name:"Tabla de Quesos VIP",     cat:"Alimentos", price:45000, emoji:"🧀", stock:10 },
  { id:14, name:"Platter de Carnes",       cat:"Alimentos", price:65000, emoji:"🥩", stock:8  },
  { id:15, name:"Nachos con Salsas",       cat:"Alimentos", price:22000, emoji:"🌮", stock:20 },
];

const CATS = ["Todos", "Licores", "Cervezas", "Cócteles", "Sin Alcohol", "Alimentos"];
const PAY_METHODS = [
  { id:"cash",  label:"Efectivo",  icon:"💵" },
  { id:"card",  label:"Tarjeta",   icon:"💳" },
  { id:"nequi", label:"Nequi",     icon:"📱" },
  { id:"davip", label:"Daviplata", icon:"📲" },
];

const fmt = (n) => `$${Number(n).toLocaleString("es-CO")}`;

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */
export default function SalesModule({ user }) {
  const [cat,     setCat]     = useState("Todos");
  const [search,  setSearch]  = useState("");
  const [cart,    setCart]    = useState([]);
  const [payMethod, setPayMethod] = useState("cash");
  const [cashGiven, setCashGiven] = useState("");
  const [done,    setDone]    = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [sales,   setSales]   = useState([]);

  const filtered = useMemo(() => CATALOG.filter(p =>
    (cat === "Todos" || p.cat === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  ), [cat, search]);

  const total = useMemo(() => cart.reduce((s,i) => s + i.price * i.qty, 0), [cart]);
  const change = cashGiven ? Math.max(0, Number(cashGiven.replace(/\D/g,"")) - total) : 0;

  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty:1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i);
      return updated.filter(i => i.qty > 0);
    });
  };

  const confirmSale = () => {
    if (cart.length === 0) return;
    const sale = {
      id:     `V-${Date.now()}`,
      items:  cart,
      total,
      method: PAY_METHODS.find(p=>p.id===payMethod).label,
      change: payMethod === "cash" ? change : 0,
      time:   new Date().toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit" }),
      employee: user?.name,
    };
    setSales(prev => [sale, ...prev]);
    setReceipt(sale);
    setDone(true);
    setCart([]);
    setCashGiven("");
  };

  const newSale = () => { setDone(false); setReceipt(null); };

  /* ── Receipt ── */
  if (done && receipt) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"32px" }}>
      <div style={{ background:"#0d0d1a", border:"1px solid rgba(0,245,160,0.3)", borderRadius:"20px", padding:"32px", maxWidth:"400px", width:"100%", textAlign:"center" }}>
        <div style={{ width:"60px", height:"60px", background:"rgba(0,245,160,0.12)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"28px", border:"2px solid rgba(0,245,160,0.4)" }}>✓</div>
        <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#00f5a0", letterSpacing:"3px", textTransform:"uppercase", margin:"0 0 4px" }}>VENTA REGISTRADA</p>
        <h2 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"28px", color:"#fff", margin:"0 0 4px" }}>{fmt(receipt.total)}</h2>
        <p style={{ fontFamily:S.mono, fontSize:"12px", color:"#4a4a6a", margin:"0 0 24px" }}>{receipt.id} · {receipt.time} · {receipt.method}</p>

        <div style={{ background:"#080810", borderRadius:"12px", padding:"16px", marginBottom:"20px", textAlign:"left" }}>
          {receipt.items.map(i => (
            <div key={i.id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ color:"#d1d1e0", fontSize:"13px" }}>{i.emoji} {i.name} ×{i.qty}</span>
              <span style={{ color:"#c084fc", fontFamily:S.mono, fontSize:"12px", fontWeight:700 }}>{fmt(i.price * i.qty)}</span>
            </div>
          ))}
          {receipt.change > 0 && (
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:"10px", marginTop:"6px" }}>
              <span style={{ color:"#00f5a0", fontSize:"12px", fontFamily:S.mono }}>Cambio</span>
              <span style={{ color:"#00f5a0", fontFamily:S.mono, fontSize:"14px", fontWeight:700 }}>{fmt(receipt.change)}</span>
            </div>
          )}
        </div>

        <button onClick={newSale}
          style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"14px", fontWeight:700, fontFamily:S.syne, cursor:"pointer" }}>
          + Nueva Venta
        </button>
      </div>

      {/* Historial rápido */}
      {sales.length > 0 && (
        <div style={{ maxWidth:"400px", width:"100%", marginTop:"24px" }}>
          <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"12px" }}>Ventas de hoy</p>
          {sales.slice(0,5).map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:"#0d0d1a", borderRadius:"10px", marginBottom:"6px", border:"1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#fff", margin:"0 0 1px" }}>{s.id}</p>
                <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", margin:0 }}>{s.time} · {s.method} · {s.items.length} ítem(s)</p>
              </div>
              <span style={{ fontFamily:S.syne, fontWeight:700, color:"#c084fc", fontSize:"14px" }}>{fmt(s.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── POS Layout ── */
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:"20px", height:"100%" }}>

      {/* LEFT — Catálogo */}
      <div style={{ display:"flex", flexDirection:"column", gap:"16px", overflow:"hidden" }}>

        {/* Search + categorías */}
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, minWidth:"180px" }}>
            <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"14px" }}>🔍</span>
            <input type="text" placeholder="Buscar producto…" value={search} onChange={e=>setSearch(e.target.value)}
              style={{ width:"100%", paddingLeft:"36px", paddingRight:"12px", paddingTop:"10px", paddingBottom:"10px", background:"#0d0d1a", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#fff", fontSize:"13px", fontFamily:S.syne, outline:"none", boxSizing:"border-box" }} />
          </div>
        </div>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding:"5px 14px", background:"transparent", border:`1px solid ${cat===c?"#c084fc":"rgba(255,255,255,0.08)"}`, borderRadius:"20px", color:cat===c?"#c084fc":"#4a4a6a", fontSize:"11px", fontFamily:S.mono, cursor:"pointer", transition:"all .15s" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div style={{ flex:1, overflowY:"auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", alignContent:"start" }}>
          {filtered.map(p => {
            const inCart = cart.find(i => i.id === p.id);
            const oos    = p.stock === 0;
            return (
              <button key={p.id} onClick={() => addToCart(p)} disabled={oos}
                style={{ padding:"14px", background:inCart?"rgba(138,43,226,0.15)":"#0d0d1a", border:`1px solid ${inCart?"rgba(138,43,226,0.45)":oos?"rgba(255,56,86,0.15)":"rgba(255,255,255,0.06)"}`, borderRadius:"14px", cursor:oos?"not-allowed":"pointer", textAlign:"left", transition:"all .15s", opacity:oos?.5:1 }}
                onMouseEnter={e => { if(!oos) e.currentTarget.style.borderColor="rgba(138,43,226,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=inCart?"rgba(138,43,226,0.45)":oos?"rgba(255,56,86,0.15)":"rgba(255,255,255,0.06)"; }}>
                <p style={{ fontSize:"24px", margin:"0 0 6px" }}>{p.emoji}</p>
                <p style={{ fontFamily:S.syne, fontWeight:600, fontSize:"12px", color:oos?"#4a4a6a":"#fff", margin:"0 0 4px", lineHeight:1.3 }}>{p.name}</p>
                <p style={{ fontFamily:S.mono, fontWeight:700, fontSize:"13px", color:inCart?"#c084fc":"#8b8baa", margin:"0 0 4px" }}>{fmt(p.price)}</p>
                <p style={{ fontFamily:S.mono, fontSize:"9px", color:p.stock<5?"#ff6b35":"#2a2a3e", margin:0 }}>
                  {oos ? "AGOTADO" : `stock: ${p.stock}`}
                </p>
                {inCart && (
                  <span style={{ display:"inline-block", marginTop:"6px", background:"rgba(138,43,226,0.25)", borderRadius:"6px", padding:"1px 8px", fontSize:"10px", color:"#c084fc", fontFamily:S.mono }}>×{inCart.qty} en carrito</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT — Carrito */}
      <div style={{ background:"#0a0a12", border:"1px solid rgba(138,43,226,0.12)", borderRadius:"16px", padding:"20px", display:"flex", flexDirection:"column", gap:"12px", overflow:"hidden" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"15px", color:"#fff", margin:0 }}>🛒 Carrito</p>
          {cart.length > 0 && (
            <button onClick={() => setCart([])} style={{ background:"none", border:"none", color:"#ff3860", fontSize:"11px", fontFamily:S.mono, cursor:"pointer" }}>Limpiar</button>
          )}
        </div>

        {cart.length === 0 ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"#2a2a3e", gap:"8px" }}>
            <p style={{ fontSize:"32px", margin:0 }}>🛒</p>
            <p style={{ fontFamily:S.mono, fontSize:"12px", textAlign:"center" }}>Agrega productos<br/>del catálogo</p>
          </div>
        ) : (
          <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:"8px" }}>
            {cart.map(item => (
              <div key={item.id} style={{ background:"#080810", borderRadius:"10px", padding:"10px 12px", border:"1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
                  <p style={{ fontFamily:S.syne, fontWeight:600, fontSize:"12px", color:"#fff", margin:0 }}>{item.emoji} {item.name}</p>
                  <p style={{ fontFamily:S.mono, fontWeight:700, fontSize:"12px", color:"#c084fc", margin:0, flexShrink:0, marginLeft:"8px" }}>{fmt(item.price * item.qty)}</p>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", margin:0 }}>{fmt(item.price)} c/u</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width:"22px", height:"22px", borderRadius:"6px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", cursor:"pointer", fontSize:"14px", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>−</button>
                    <span style={{ fontFamily:S.mono, fontSize:"12px", color:"#fff", minWidth:"20px", textAlign:"center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width:"22px", height:"22px", borderRadius:"6px", background:"rgba(138,43,226,0.2)", border:"1px solid rgba(138,43,226,0.3)", color:"#c084fc", cursor:"pointer", fontSize:"14px", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Totales */}
        {cart.length > 0 && (
          <div>
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"12px", marginBottom:"12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                <span style={{ fontFamily:S.mono, fontSize:"11px", color:"#4a4a6a" }}>{cart.reduce((s,i)=>s+i.qty,0)} ítem(s)</span>
                <span style={{ fontFamily:S.syne, fontWeight:800, fontSize:"20px", color:"#fff" }}>{fmt(total)}</span>
              </div>
            </div>

            {/* Método de pago */}
            <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"8px" }}>Método de pago</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginBottom:"12px" }}>
              {PAY_METHODS.map(m => (
                <button key={m.id} onClick={() => setPayMethod(m.id)}
                  style={{ padding:"8px 6px", background:payMethod===m.id?"rgba(138,43,226,0.2)":"#080810", border:`1px solid ${payMethod===m.id?"rgba(138,43,226,0.5)":"rgba(255,255,255,0.06)"}`, borderRadius:"8px", color:payMethod===m.id?"#c084fc":"#6b6b8a", fontSize:"11px", fontFamily:S.mono, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" }}>
                  <span style={{ fontSize:"16px" }}>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Campo efectivo */}
            {payMethod === "cash" && (
              <div style={{ marginBottom:"12px" }}>
                <label style={{ display:"block", fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"6px" }}>Con cuánto paga</label>
                <input type="text" placeholder="$ Monto recibido" value={cashGiven} onChange={e=>setCashGiven(e.target.value.replace(/\D/g,""))}
                  style={{ width:"100%", padding:"10px 12px", background:"#080810", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"8px", color:"#fff", fontSize:"14px", fontFamily:S.mono, outline:"none", boxSizing:"border-box" }} />
                {cashGiven && Number(cashGiven) >= total && (
                  <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#00f5a0", margin:"6px 0 0" }}>Cambio: {fmt(change)}</p>
                )}
                {cashGiven && Number(cashGiven) < total && (
                  <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#ff3860", margin:"6px 0 0" }}>Faltan {fmt(total - Number(cashGiven))}</p>
                )}
              </div>
            )}

            <button onClick={confirmSale}
              disabled={payMethod === "cash" && cashGiven && Number(cashGiven) < total}
              style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"14px", fontWeight:700, fontFamily:S.syne, cursor:"pointer", opacity:(payMethod==="cash" && cashGiven && Number(cashGiven)<total)?0.5:1 }}>
              ✓ Confirmar Venta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
