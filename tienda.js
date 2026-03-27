/**
 * tienda.js — Product catalog, filters and search
 * Depends on: cart.js
 */

const PRODUCTS = [
  {id:1, name:'Laptop ASUS VivoBook 15', cat:'Laptop', brand:'ASUS', price:450000, avail:true},
  {id:2, name:'PC Gaming MSI Aegis', cat:'PC Gaming', brand:'MSI', price:850000, avail:true},
  {id:3, name:'MiniPC Intel NUC', cat:'MiniPC', brand:'Intel', price:320000, avail:true},
  {id:4, name:'All-In-One HP 24', cat:'All-In-One', brand:'HP', price:580000, avail:false},
  {id:5, name:'Laptop Lenovo IdeaPad 3', cat:'Laptop', brand:'Lenovo', price:380000, avail:true},
  {id:6, name:'Laptop Acer Aspire 5', cat:'Laptop', brand:'Acer', price:420000, avail:true},
  {id:7, name:'Procesador AMD Ryzen 5 7600', cat:'Procesadores', brand:'AMD', price:185000, avail:true},
  {id:8, name:'Tarjeta de Video RTX 4060', cat:'Tarjetas de Video', brand:'MSI', price:420000, avail:true},
  {id:9, name:'Memoria RAM Kingston 16GB DDR5', cat:'Memorias RAM', brand:'Kingston', price:65000, avail:true},
  {id:10, name:'SSD NVMe Samsung 1TB', cat:'Almacenamiento', brand:'Samsung', price:75000, avail:true},
  {id:11, name:'Tarjeta Madre ASUS B650M', cat:'Tarjetas Madre', brand:'ASUS', price:195000, avail:true},
  {id:12, name:'Fuente de Poder Corsair 650W', cat:'Fuentes de Poder', brand:'Corsair Memory', price:85000, avail:true},
  {id:13, name:'Cooler Thermaltake ARGB', cat:'Enfriamiento', brand:'Thermaltake', price:45000, avail:false},
  {id:14, name:'Gabinete Aerocool Cylon', cat:'Gabinetes', brand:'AeroCool', price:55000, avail:true},
  {id:15, name:'Procesador Intel Core i5-13400', cat:'Procesadores', brand:'Intel', price:195000, avail:true},
  {id:16, name:'Teclado Mecánico HyperX Alloy', cat:'Teclados', brand:'HyperX', price:65000, avail:true},
  {id:17, name:'Mouse Logitech G502 Hero', cat:'Mouse', brand:'Logitech', price:55000, avail:true},
  {id:18, name:'Headset Razer BlackShark V2', cat:'Headset', brand:'Razer', price:75000, avail:true},
  {id:19, name:'Mousepad Razer Gigantus XL', cat:'Mousepad', brand:'Razer', price:28000, avail:true},
  {id:20, name:'Cámara Web Logitech C920', cat:'Cámaras Web', brand:'Logitech', price:85000, avail:false},
  {id:21, name:'Silla Gamer Cougar', cat:'Sillas', brand:'Cougar', price:280000, avail:true},
  {id:22, name:'Impresora Epson EcoTank L3250', cat:'Impresoras', brand:'Epson', price:145000, avail:true},
  {id:23, name:'Control Xbox Inalámbrico', cat:'Controles', brand:'XBOX', price:55000, avail:true},
  {id:24, name:'Parlantes Logitech Z207', cat:'Parlantes', brand:'Logitech', price:42000, avail:true},
  {id:25, name:'Micrófono Blue Yeti Nano', cat:'Micrófonos', brand:'Anker', price:95000, avail:true},
  {id:26, name:'Monitor LG 27" IPS 144Hz', cat:'Monitores', brand:'LG', price:285000, avail:true},
  {id:27, name:'Monitor AOC 24" FHD', cat:'Monitores', brand:'AOC', price:175000, avail:true},
  {id:28, name:'Monitor BenQ 27" 4K', cat:'Monitores', brand:'BenQ', price:480000, avail:false},
  {id:29, name:'Soporte para Monitor Klip', cat:'Bases y Soportes', brand:'Klip Xtreme', price:22000, avail:true},
  {id:30, name:'Samsung Galaxy A55', cat:'Celulares', brand:'Samsung', price:395000, avail:true},
  {id:31, name:'Xiaomi Redmi Note 13', cat:'Celulares', brand:'Xiaomi', price:195000, avail:true},
  {id:32, name:'Tablet Samsung Tab A9', cat:'Tablets', brand:'Samsung', price:285000, avail:true},
  {id:33, name:'Cargador Anker 65W GaN', cat:'Cargadores', brand:'Anker', price:32000, avail:true},
  {id:34, name:'Router TP-Link Archer AX23', cat:'Routers', brand:'TP-Link', price:65000, avail:true},
  {id:35, name:'Switch TP-Link 8 Puertos', cat:'Switches', brand:'TP-Link', price:28000, avail:true},
  {id:36, name:'Amplificador Wi-Fi TP-Link RE605', cat:'Amplificadores', brand:'TP-Link', price:35000, avail:true},
  {id:37, name:'Starlink Kit Residencial', cat:'Routers', brand:'Starlink', price:650000, avail:false},
  {id:38, name:'Tintas Epson 664 Pack x4', cat:'Tintas', brand:'Epson', price:22000, avail:true},
  {id:39, name:'Resma Papel Bond A4 500 hojas', cat:'Resmas', brand:'HP', price:8500, avail:true},
  {id:40, name:'UPS APC 600VA', cat:'Reguladores de Voltaje y UPS', brand:'APC', price:55000, avail:true},
];

  const MAX_PRICE = 850000;
  var priceMax = MAX_PRICE;

  function fmtPrice(n) {
    return '₡' + n.toLocaleString('es-CR');
  }

  var currentView = 'grid';

  function setView(v) {
    currentView = v;
    var grid = document.getElementById('products-grid');
    grid.classList.toggle('list-view', v === 'list');
    document.getElementById('btn-grid').classList.toggle('active', v === 'grid');
    document.getElementById('btn-list').classList.toggle('active', v === 'list');
  }

  function renderProducts(list) {
    var grid = document.getElementById('products-grid');
    var count = document.getElementById('results-count');
    var perpage = parseInt(document.getElementById('perpage-select').value);
    var shown = perpage === 0 ? list : list.slice(0, perpage);
    var totalTxt = list.length !== shown.length ? ' (mostrando <strong>' + shown.length + '</strong> de <strong>' + list.length + '</strong>)' : '';
    count.innerHTML = '<strong>' + list.length + '</strong> producto' + (list.length !== 1 ? 's' : '') + totalTxt;
    if (shown.length === 0) {
      grid.innerHTML = '<div class="no-results"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg><p>No se encontraron productos con los filtros seleccionados.</p><p style="margin-top:8px;font-size:0.85rem;">Intentá con otros criterios.</p></div>';
      return;
    }
    grid.innerHTML = shown.map(p => `
      <div class="product-card">
        <div class="product-img">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"/></svg>
        </div>
        <div class="product-info">
          <div class="product-cat">${p.cat}</div>
          <div class="product-brand">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">${fmtPrice(p.price)}</div>
          <div class="product-avail ${p.avail ? 'avail-yes' : 'avail-no'}">${p.avail ? '✓ En stock' : '✗ Sin stock'}</div>
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" data-cart-id="${p.id}" onclick="addToCart(${p.id}, '${p.name}', '${p.brand}', ${p.price})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
            Agregar
          </button>
        </div>
      </div>`).join('');
  }

  function getActiveFilters() {
    var cats   = Array.from(document.querySelectorAll('.cat-cb:checked')).map(cb => cb.value);
    var brands = Array.from(document.querySelectorAll('.brand-cb:checked')).map(cb => cb.value);
    var query  = document.getElementById('search-input').value.trim().toLowerCase();
    var price  = parseInt(document.getElementById('price-range').value);
    return { cats, brands, query, price };
  }

  function applyFilters() {
    var f = getActiveFilters();
    var sort = document.getElementById('sort-select').value;
    var perpage = document.getElementById('perpage-select').value;

    var list = PRODUCTS.filter(p => {
      if (f.cats.length   && !f.cats.includes(p.cat))    return false;
      if (f.brands.length && !f.brands.includes(p.brand)) return false;
      if (p.price > f.price) return false;
      if (f.query && !p.name.toLowerCase().includes(f.query) && !p.brand.toLowerCase().includes(f.query) && !p.cat.toLowerCase().includes(f.query)) return false;
      return true;
    });

    if (sort === 'price_asc')  list.sort((a,b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a,b) => b.price - a.price);
    if (sort === 'name_asc')   list.sort((a,b) => a.name.localeCompare(b.name));

    // Update price label
    document.getElementById('price-val').textContent = fmtPrice(f.price);

    // Active filter chips
    renderChips(f);

    // Clear button visibility
    var hasFilt = f.cats.length || f.brands.length || f.query || f.price < MAX_PRICE;
    document.getElementById('clear-btn').classList.toggle('visible', !!hasFilt);

    renderProducts(list);
  }

  function renderChips(f) {
    var wrap = document.getElementById('active-filters');
    var chips = '';
    f.cats.forEach(c => chips += `<span class="af-chip" onclick="removeCatFilter('${c}')">${c} ✕</span>`);
    f.brands.forEach(b => chips += `<span class="af-chip" onclick="removeBrandFilter('${b}')">${b} ✕</span>`);
    if (f.query) chips += `<span class="af-chip" onclick="clearSearch()">"${f.query}" ✕</span>`;
    if (f.price < MAX_PRICE) chips += `<span class="af-chip" onclick="clearPrice()">Hasta ${fmtPrice(f.price)} ✕</span>`;
    wrap.innerHTML = chips;
  }

  function removeCatFilter(val) {
    document.querySelectorAll('.cat-cb').forEach(cb => { if (cb.value === val) cb.checked = false; });
    applyFilters();
  }
  function removeBrandFilter(val) {
    document.querySelectorAll('.brand-cb').forEach(cb => { if (cb.value === val) cb.checked = false; });
    applyFilters();
  }
  function clearSearch() {
    document.getElementById('search-input').value = '';
    applyFilters();
  }
  function clearPrice() {
    document.getElementById('price-range').value = MAX_PRICE;
    applyFilters();
  }
  function clearAllFilters() {
    document.querySelectorAll('.cat-cb, .brand-cb').forEach(cb => cb.checked = false);
    document.getElementById('search-input').value = '';
    document.getElementById('price-range').value = MAX_PRICE;
    applyFilters();
  }

  function toggleBox(id) {
    var body = document.getElementById(id);
    var head = body.previousElementSibling;
    body.classList.toggle('collapsed');
    head.classList.toggle('collapsed');
  }

  // Init
  (function() {
    document.getElementById('price-range').value = MAX_PRICE;
    document.getElementById('price-max-label').textContent = fmtPrice(MAX_PRICE);

    // Check sessionStorage first (set by drop-sub onclick), then fallback to URL param
    var catParam = sessionStorage.getItem('zafiro_cat_filter') || new URLSearchParams(window.location.search).get('cat');

    // Clear sessionStorage after reading so it doesn't persist on manual navigation
    sessionStorage.removeItem('zafiro_cat_filter');

    if (catParam) {
      document.querySelectorAll('.cat-cb').forEach(function(cb) {
        if (cb.value === catParam) {
          cb.checked = true;
        }
      });
    }

    applyFilters();

    // Live search
    document.getElementById('search-input').addEventListener('input', applyFilters);
  })();