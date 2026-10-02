import React, { useState } from "react";

const modules = ["Dashboard", "Productos", "Categorías", "Proveedores", "Movimientos", "Análisis de demanda", "Predicciones", "Alertas"];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  return <div className="layout">
    <aside><div className="brand"><span className="brand-mark">S</span><div><strong>SmartStock</strong><small>Inventario inteligente</small></div></div>
      <nav>{modules.map((name, i) => <button className={active === name ? "nav-item active" : "nav-item"} key={name} onClick={() => setActive(name)}><span>{["▦", "□", "◫", "◇", "↕", "⌁", "⌖", "! "][i]}</span>{name}</button>)}</nav>
      <div className="sidebar-foot">Proyecto final · TDS</div>
    </aside>
    <main><header><div><p className="eyebrow">SMARTSTOCK / MÓDULOS</p><h1>{active}</h1></div><span className="status"><i /> Base inicial</span></header>
      {active === "Dashboard" ? <><section className="welcome"><div><p className="eyebrow">INICIO DEL PROYECTO</p><h2>Tu inventario, con una visión más clara.</h2><p>Esta estructura inicial está lista para comenzar a conectar datos y funcionalidades.</p></div><div className="welcome-icon">▤</div></section>
      <div className="section-head"><div><h3>Espacios de trabajo</h3><p>Módulos preparados para los siguientes avances</p></div><span className="count">08 módulos</span></div>
      <section className="module-grid">{modules.map((name, i) => <button className="module-card" key={name} onClick={() => setActive(name)}><span className="module-icon">{["▦", "□", "◫", "◇", "↕", "⌁", "⌖", "!"][i]}</span><strong>{name}</strong><small>Vista inicial preparada</small><span className="arrow">↗</span></button>)}</section></> : <section className="empty"><div className="empty-icon">{modules.indexOf(active) + 1}</div><h2>{active}</h2><p>La pantalla está creada como punto de partida. En la próxima etapa se conectará con la API y los datos del sistema.</p><span className="tag">MÓDULO PENDIENTE DE DESARROLLO</span></section>}
      <footer>SmartStock <span>Base técnica · v0.1</span></footer>
    </main>
  </div>;
}

