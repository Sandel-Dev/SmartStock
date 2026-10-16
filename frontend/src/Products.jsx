import React, { useEffect, useMemo, useState } from "react";
import { productsApi } from "./api.js";

const emptyForm = { sku: "", name: "", category: "General", quantity: 0, min_quantity: 0, unit_price: 0 };
const money = new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP", maximumFractionDigits: 2 });

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function loadProducts(query = search) {
    setLoading(true);
    setError("");
    try {
      setProducts(await productsApi.list(query));
    } catch (err) {
      setError(`${err.message}. Confirma que la API esté activa en http://localhost:8000.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => loadProducts(search), 250);
    return () => clearTimeout(timer);
  }, [search]);

  const lowStock = products.filter((item) => item.quantity <= item.min_quantity).length;
  const inventoryValue = useMemo(() => products.reduce((sum, item) => sum + item.quantity * item.unit_price, 0), [products]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({ sku: item.sku, name: item.name, category: item.category, quantity: item.quantity, min_quantity: item.min_quantity, unit_price: item.unit_price });
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, sku: form.sku.trim(), name: form.name.trim(), category: form.category.trim() || "General", quantity: Number(form.quantity), min_quantity: Number(form.min_quantity), unit_price: Number(form.unit_price) };
    try {
      if (editingId) await productsApi.update(editingId, payload);
      else await productsApi.create(payload);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`¿Eliminar el producto ${item.name}?`)) return;
    try {
      await productsApi.remove(item.id);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  return <div className="products-page">
    <section className="product-intro"><div><p className="eyebrow">CONTROL DE EXISTENCIAS</p><h2>Productos</h2><p>Registra y consulta los artículos de tu inventario.</p></div><button className="primary-button" onClick={startCreate}>＋ Nuevo producto</button></section>
    <section className="product-stats">
      <article><span>Productos registrados</span><strong>{loading ? "—" : products.length}</strong><small>Coincidencias en la lista</small></article>
      <article><span>Existencias bajas</span><strong className={lowStock ? "warn-number" : ""}>{loading ? "—" : lowStock}</strong><small>En o por debajo del mínimo</small></article>
      <article><span>Valor estimado</span><strong>{loading ? "—" : money.format(inventoryValue)}</strong><small>Existencia × precio unitario</small></article>
    </section>
    <section className="product-table-card">
      <div className="table-toolbar"><div><h3>Listado de productos</h3><p>Los datos se guardan en la base local del backend.</p></div><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar producto..." /></label></div>
      {error && <div className="notice error-notice" role="alert">{error}</div>}
      <div className="table-wrap"><table><thead><tr><th>PRODUCTO</th><th>CATEGORÍA</th><th>SKU</th><th>EXISTENCIA</th><th>PRECIO</th><th>ESTADO</th><th>ACCIONES</th></tr></thead>
        <tbody>{loading ? <tr><td colSpan="7" className="table-message">Cargando productos...</td></tr> : products.length === 0 ? <tr><td colSpan="7" className="table-message"><strong>{search ? "No encontramos coincidencias" : "Todavía no hay productos"}</strong><span>{search ? "Prueba con otro término." : "Agrega el primer producto para iniciar el control de inventario."}</span></td></tr> : products.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.category}</td><td><span className="sku-chip">{item.sku}</span></td><td>{item.quantity} <span className="muted">/ mín. {item.min_quantity}</span></td><td>{money.format(item.unit_price)}</td><td><span className={`stock-badge ${item.quantity <= item.min_quantity ? "stock-low" : "stock-ok"}`}>{item.quantity <= item.min_quantity ? "Bajo" : "Disponible"}</span></td><td><div className="row-actions"><button onClick={() => startEdit(item)} aria-label={`Editar ${item.name}`}>Editar</button><button className="delete-action" onClick={() => handleDelete(item)} aria-label={`Eliminar ${item.name}`}>Eliminar</button></div></td></tr>)}</tbody>
      </table></div>
      <div className="table-foot">Mostrando {loading ? "…" : products.length} producto(s)</div>
    </section>
    {showForm && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-form-title"><div className="modal-heading"><div><p className="eyebrow">INVENTARIO</p><h2 id="product-form-title">{editingId ? "Editar producto" : "Nuevo producto"}</h2></div><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Cerrar">×</button></div>
      <form onSubmit={handleSubmit}><div className="form-grid"><label>Nombre<input required maxLength="120" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Ej. Café molido" /></label><label>Código SKU<input required maxLength="40" value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} placeholder="Ej. CAF-001" /></label><label>Categoría<input required maxLength="80" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} /></label><label>Existencia actual<input required type="number" min="0" step="1" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} /></label><label>Existencia mínima<input required type="number" min="0" step="1" value={form.min_quantity} onChange={(event) => setForm({ ...form, min_quantity: event.target.value })} /></label><label>Precio unitario (RD$)<input required type="number" min="0" step="0.01" value={form.unit_price} onChange={(event) => setForm({ ...form, unit_price: event.target.value })} /></label></div>
      {error && <div className="notice error-notice" role="alert">{error}</div>}<div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancelar</button><button className="primary-button" disabled={saving}>{saving ? "Guardando..." : editingId ? "Guardar cambios" : "Registrar producto"}</button></div></form>
    </section></div>}
  </div>;
}
