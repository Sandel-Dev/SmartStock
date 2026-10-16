import React, { useState } from "react";
import Products from "./Products.jsx";

const modules = ["Dashboard", "Productos", "Categorías", "Proveedores", "Movimientos", "Análisis de demanda", "Predicciones", "Alertas"];
const icons = ["▦", "□", "◫", "◇", "↕", "⌁", "⌖", "!"];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  return <div className="layout">
    <aside><div className="brand"><span className="brand-mark">S</span><div><strong>SmartStock</strong><small>Inventario inteligente</small></div></div>
      <nav>{modules.map((name, i) => <button className={active === name ? "nav-item active" : "nav-item"} key={name} onClick={() => setActive(name)}><span>{icons[i]}</span>{name}</button>)}</nav>
      <div className="sidebar-foot">Proyecto final · TDS</div>
    </aside>
    <main><header><div><p className="eyebrow">SMARTSTOCK / MÓDULOS</p><h1>{active}</h1></div><span className="status"><i /> Primera versión</span></header>
      {active === "Dashboard" ? <><section className="welcome"><div><p className="eyebrow">INICIO DEL PROYECTO</p><h2>Tu inventario, con una visión más clara.</h2><p>Comienza registrando productos para llevar el control de sus existencias.</p><button className="welcome-action" onClick={() => setActive("Productos")}>Ir a Productos <span>→</span></button></div><div className="welcome-icon">▤</div></section>
        <div className="section-head"><div><h3>Espacios de trabajo</h3><p>Productos es el primer módulo funcional</p></div><span className="count">01 módulo activo</span></div>
        <section className="module-grid">{modules.map((name, i) => <button className="module-card" key={name} onClick={() => setActive(name)}><span className="module-icon">{icons[i]}</span><strong>{name}</strong><small>{name === "Productos" ? "Gestión inicial disponible" : "Preparado para siguientes etapas"}</small><span className="arrow">↗</span></button>)}</section></>
        : active === "Productos" ? <Products />
        : <section className="empty"><div className="empty-icon">{modules.indexOf(active) + 1}</div><h2>{active}</h2><p>Este módulo está reservado para una siguiente etapa del desarrollo.</p><span className="tag">PENDIENTE DE DESARROLLO</span></section>}
      <footer>SmartStock <span>Primera versión funcional · v0.2</span></footer>
    </main>
  </div>;
}
