import { useState } from "react";

const S = { mono:"'Space Mono',monospace", syne:"'Syne',sans-serif" };

const DAYS    = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const MONTHS  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

/* ─── Horario mock ─────────────────────────────────────────────────────────── */
const SCHEDULE = {
  // semana actual: índice 0 = lunes
  0: { shift:"Nocturno", start:"8:00 PM", end:"4:00 AM", area:"Barra Principal", supervisor:"Carlos M.", note:"Noche de lanzamiento — evento especial" },
  1: { shift:"Nocturno", start:"8:00 PM", end:"4:00 AM", area:"Zona VIP",        supervisor:"Carlos M.", note:"" },
  2: null, // Descanso
  3: { shift:"Nocturno", start:"9:00 PM", end:"4:00 AM", area:"Barra Principal", supervisor:"Luis R.",   note:"Revisar inventario al inicio del turno" },
  4: { shift:"Nocturno", start:"8:00 PM", end:"4:00 AM", area:"Zona VIP",        supervisor:"Carlos M.", note:"" },
  5: { shift:"Nocturno", start:"7:00 PM", end:"5:00 AM", area:"Piso Principal",  supervisor:"Diana V.",  note:"Sábado — máxima ocupación" },
  6: null, // Descanso
};

const WEEK_SCHEDULE = [
  // Semana anterior (para historial)
  { week:"Semana anterior", days:[
    { shift:"Nocturno", start:"8:00 PM", end:"4:00 AM", area:"Barra Principal" },
    { shift:"Nocturno", start:"8:00 PM", end:"4:00 AM", area:"Zona VIP" },
    null,
    { shift:"Nocturno", start:"9:00 PM", end:"4:00 AM", area:"Barra Principal" },
    { shift:"Nocturno", start:"8:00 PM", end:"4:00 AM", area:"Zona VIP" },
    { shift:"Nocturno", start:"7:00 PM", end:"5:00 AM", area:"Piso Principal" },
    null,
  ]},
];

const today = new Date();
const todayIdx = (today.getDay() + 6) % 7; // 0=Lunes

const AREA_COLOR = {
  "Barra Principal": { bg:"rgba(138,43,226,0.15)", border:"rgba(138,43,226,0.35)", text:"#c084fc" },
  "Zona VIP":        { bg:"rgba(212,0,255,0.12)",  border:"rgba(212,0,255,0.35)",  text:"#e040fb" },
  "Piso Principal":  { bg:"rgba(0,245,160,0.1)",   border:"rgba(0,245,160,0.3)",   text:"#00f5a0" },
};

const hrs = (s, e) => {
  const toMins = t => {
    const [h,rest] = t.split(":");
    const [m,pm]   = rest.split(" ");
    let hrs = Number(h);
    if (pm === "AM" && hrs === 12) hrs = 0;
    if (pm === "PM" && hrs !== 12) hrs += 12;
    return hrs * 60 + Number(m);
  };
  let diff = toMins(e) - toMins(s);
  if (diff < 0) diff += 24 * 60;
  return `${Math.floor(diff/60)}h ${diff%60>0?diff%60+"m":""}`.trim();
};

const totalHours = (sched) =>
  Object.values(sched).filter(Boolean).reduce((acc,d) => {
    const [h] = hrs(d.start, d.end).split("h");
    return acc + Number(h);
  }, 0);

export default function ScheduleModule({ user }) {
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [view, setView] = useState("week"); // week | history

  const todayShift   = SCHEDULE[todayIdx];
  const workDays     = Object.values(SCHEDULE).filter(Boolean).length;
  const totalH       = totalHours(SCHEDULE);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

      {/* Header tabs */}
      <div style={{ display:"flex", gap:"4px", background:"#0d0d1a", borderRadius:"12px", padding:"4px", width:"fit-content", border:"1px solid rgba(255,255,255,0.06)" }}>
        {[{id:"week",label:"📅 Esta semana"},{id:"history",label:"🕐 Historial"}].map(t => (
          <button key={t.id} onClick={()=>setView(t.id)}
            style={{ padding:"8px 18px", borderRadius:"8px", border:"none", background:view===t.id?"linear-gradient(135deg,#8a2be2,#d400ff)":"transparent", color:view===t.id?"#fff":"#6b6b8a", fontSize:"12px", fontWeight:view===t.id?700:400, fontFamily:S.mono, cursor:"pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {view === "week" && (
        <>
          {/* Resumen semana */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }}>
            {[
              { l:"Turnos esta semana", v:`${workDays} turnos`,    c:"#c084fc" },
              { l:"Total horas",        v:`${totalH}h`,           c:"#d400ff" },
              { l:"Días descanso",      v:`${7-workDays} días`,   c:"#00f5a0" },
              { l:"Área principal",     v:"Barra / VIP",           c:"#fff"    },
            ].map((s,i) => (
              <div key={i} style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.1)", borderRadius:"12px", padding:"16px 18px" }}>
                <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#4a4a6a", margin:"0 0 6px", textTransform:"uppercase", letterSpacing:"1px" }}>{s.l}</p>
                <p style={{ fontFamily:S.syne, fontWeight:800, fontSize:"20px", color:s.c, margin:0 }}>{s.v}</p>
              </div>
            ))}
          </div>

          {/* Semana visual */}
          <div style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.1)", borderRadius:"16px", padding:"20px 24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"15px", color:"#fff", margin:0 }}>
                {MONTHS[today.getMonth()]} {today.getFullYear()}
              </p>
              <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#4a4a6a", margin:0 }}>Semana actual</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"8px" }}>
              {DAYS.map((day, i) => {
                const s       = SCHEDULE[i];
                const isToday = i === todayIdx;
                const isSel   = i === selectedDay;
                const ac      = s ? AREA_COLOR[s.area] : null;
                return (
                  <div key={i} onClick={() => setSelectedDay(i)}
                    style={{ borderRadius:"12px", padding:"12px 8px", cursor:"pointer", textAlign:"center", background:isSel?"rgba(138,43,226,0.2)":isToday?"rgba(138,43,226,0.08)":"#080810", border:`1px solid ${isSel?"rgba(138,43,226,0.5)":isToday?"rgba(138,43,226,0.25)":"rgba(255,255,255,0.04)"}`, transition:"all .15s" }}
                    onMouseEnter={e => { if(!isSel) e.currentTarget.style.borderColor="rgba(138,43,226,0.3)"; }}
                    onMouseLeave={e => { if(!isSel) e.currentTarget.style.borderColor=isToday?"rgba(138,43,226,0.25)":"rgba(255,255,255,0.04)"; }}>
                    <p style={{ fontFamily:S.mono, fontSize:"9px", color:isToday?"#c084fc":"#4a4a6a", margin:"0 0 6px", letterSpacing:"1px" }}>{day.slice(0,3).toUpperCase()}</p>
                    {isToday && <p style={{ fontFamily:S.mono, fontSize:"8px", color:"#c084fc", margin:"0 0 6px", background:"rgba(138,43,226,0.2)", borderRadius:"4px", padding:"1px 4px" }}>HOY</p>}
                    {s ? (
                      <>
                        <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:ac?.text||"#c084fc", margin:"0 auto 6px" }} />
                        <p style={{ fontFamily:S.mono, fontSize:"8px", color:"#fff", margin:"0 0 2px" }}>{s.start}</p>
                        <p style={{ fontFamily:S.mono, fontSize:"8px", color:"#4a4a6a", margin:0 }}>{s.end}</p>
                      </>
                    ) : (
                      <>
                        <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#2a2a3e", margin:"0 auto 6px" }} />
                        <p style={{ fontFamily:S.mono, fontSize:"8px", color:"#2a2a3e", margin:0 }}>Libre</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detalle del día seleccionado */}
          {SCHEDULE[selectedDay] ? (
            <div style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.15)", borderRadius:"16px", padding:"24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                <div>
                  <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", margin:"0 0 4px", letterSpacing:"2px", textTransform:"uppercase" }}>
                    {DAYS[selectedDay]}{selectedDay === todayIdx ? " · HOY" : ""}
                  </p>
                  <h3 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"22px", color:"#fff", margin:0 }}>
                    Turno {SCHEDULE[selectedDay].shift}
                  </h3>
                </div>
                <span style={{ background:AREA_COLOR[SCHEDULE[selectedDay].area]?.bg, border:`1px solid ${AREA_COLOR[SCHEDULE[selectedDay].area]?.border}`, color:AREA_COLOR[SCHEDULE[selectedDay].area]?.text, padding:"6px 14px", borderRadius:"8px", fontSize:"12px", fontFamily:S.mono, fontWeight:700 }}>
                  {SCHEDULE[selectedDay].area}
                </span>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"16px" }}>
                {[
                  { l:"Entrada",    v:SCHEDULE[selectedDay].start },
                  { l:"Salida",     v:SCHEDULE[selectedDay].end   },
                  { l:"Duración",   v:hrs(SCHEDULE[selectedDay].start, SCHEDULE[selectedDay].end) },
                  { l:"Supervisor", v:SCHEDULE[selectedDay].supervisor },
                  { l:"Área",       v:SCHEDULE[selectedDay].area },
                  { l:"Tipo",       v:SCHEDULE[selectedDay].shift },
                ].map((d,i) => (
                  <div key={i} style={{ background:"#080810", borderRadius:"10px", padding:"12px 14px" }}>
                    <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#4a4a6a", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"1px" }}>{d.l}</p>
                    <p style={{ fontFamily:S.syne, fontWeight:600, fontSize:"14px", color:"#fff", margin:0 }}>{d.v}</p>
                  </div>
                ))}
              </div>

              {SCHEDULE[selectedDay].note && (
                <div style={{ background:"rgba(255,193,7,0.08)", border:"1px solid rgba(255,193,7,0.2)", borderRadius:"10px", padding:"12px 16px", display:"flex", gap:"10px", alignItems:"flex-start" }}>
                  <span style={{ fontSize:"16px", flexShrink:0 }}>📌</span>
                  <p style={{ color:"#ffc107", fontFamily:S.mono, fontSize:"12px", margin:0, lineHeight:1.5 }}>{SCHEDULE[selectedDay].note}</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ background:"#0d0d1a", border:"1px dashed rgba(255,255,255,0.06)", borderRadius:"16px", padding:"32px", textAlign:"center" }}>
              <p style={{ fontSize:"32px", margin:"0 0 12px" }}>😴</p>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"18px", color:"#fff", margin:"0 0 6px" }}>Día libre</p>
              <p style={{ fontFamily:S.mono, fontSize:"12px", color:"#4a4a6a", margin:0 }}>{DAYS[selectedDay]} — Sin turno asignado esta semana</p>
            </div>
          )}
        </>
      )}

      {view === "history" && (
        <div>
          <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"16px" }}>Historial de turnos</p>
          {WEEK_SCHEDULE.map((wk, wi) => (
            <div key={wi} style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.08)", borderRadius:"14px", padding:"20px", marginBottom:"12px" }}>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"14px", color:"#fff", margin:"0 0 14px" }}>{wk.week}</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"6px" }}>
                {DAYS.map((day,i) => {
                  const d = wk.days[i];
                  return (
                    <div key={i} style={{ background:"#080810", borderRadius:"10px", padding:"10px 6px", textAlign:"center" }}>
                      <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#3a3a5a", margin:"0 0 6px", letterSpacing:"1px" }}>{day.slice(0,3).toUpperCase()}</p>
                      {d ? (
                        <>
                          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#8a2be2", margin:"0 auto 4px" }} />
                          <p style={{ fontFamily:S.mono, fontSize:"8px", color:"#6b6b8a", margin:"0 0 2px" }}>{d.start}</p>
                          <p style={{ fontFamily:S.mono, fontSize:"8px", color:"#3a3a5a", margin:0 }}>{d.area.split(" ")[0]}</p>
                        </>
                      ) : (
                        <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#2a2a3e", margin:0 }}>Libre</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:"12px", paddingTop:"12px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:"20px" }}>
                <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#4a4a6a", margin:0 }}>Turnos: <span style={{ color:"#c084fc" }}>{wk.days.filter(Boolean).length}</span></p>
                <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#4a4a6a", margin:0 }}>Horas: <span style={{ color:"#c084fc" }}>
                  {wk.days.filter(Boolean).reduce((acc,d)=>{ const [h]=hrs(d.start,d.end).split("h"); return acc+Number(h); },0)}h
                </span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
