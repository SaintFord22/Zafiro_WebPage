/**
 * cart.js — Shopping cart (localStorage)
 * Shared across all pages
 */

// ── CART STATE ─────────────────────────────────────────────────
  var cart = JSON.parse(localStorage.getItem('zafiro_cart') || '[]');

  function saveCart() {
    localStorage.setItem('zafiro_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(id, name, brand, price) {
    var existing = cart.find(function(i) { return i.id === id; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: id, name: name, brand: brand, price: price, qty: 1 });
    }
    saveCart();

    // Visual feedback on button
    var btn = document.querySelector('[data-cart-id="' + id + '"]');
    if (btn) {
      btn.classList.add('added');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;flex-shrink:0;"><path d="M4.5 12.75l6 6 9-13.5"/></svg> Agregado';
      setTimeout(function() {
        btn.classList.remove('added');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg> Agregar';
      }, 1500);
    }
    openCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(function(i) { return i.id !== id; });
    saveCart();
  }

  function changeQty(id, delta) {
    var item = cart.find(function(i) { return i.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else saveCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function updateCartUI() {
    var total = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
    var totalItems = cart.reduce(function(s, i) { return s + i.qty; }, 0);

    // Badge
    var badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Items
    var itemsEl = document.getElementById('cart-items');
    var footerEl = document.getElementById('cart-footer');
    var totalEl = document.getElementById('cart-total');
    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="width:56px;height:56px;color:#c8d4e0;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg><p>Tu carrito está vacío.</p><p style="font-size:0.82rem;margin-top:4px;">Explorá la tienda y agregá productos.</p></div>';
      if (footerEl) footerEl.style.display = 'none';
    } else {
      itemsEl.innerHTML = cart.map(function(item) {
        return '<div class="cart-item">' +
          '<div class="cart-item-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"/></svg></div>' +
          '<div class="cart-item-info">' +
            '<div class="cart-item-name" title="' + item.name + '">' + item.name + '</div>' +
            '<div class="cart-item-brand">' + item.brand + '</div>' +
            '<div class="cart-item-price">₡' + (item.price * item.qty).toLocaleString('es-CR') + '</div>' +
            '<div class="cart-item-controls">' +
              '<button class="qty-btn" onclick="changeQty(' + item.id + ', -1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><path d="M5 12h14"/></svg></button>' +
              '<span class="qty-display">' + item.qty + '</span>' +
              '<button class="qty-btn" onclick="changeQty(' + item.id + ', 1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><path d="M12 5v14M5 12h14"/></svg></button>' +
            '</div>' +
          '</div>' +
          '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg></button>' +
        '</div>';
      }).join('');
      if (footerEl) {
        footerEl.style.display = 'block';
        totalEl.textContent = '₡' + total.toLocaleString('es-CR');
      }
    }
  }

  function toggleCart() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    var isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function openCart() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function checkoutWhatsApp() {
    if (cart.length === 0) return;
    var lines = cart.map(function(i) {
      return '• ' + i.name + ' x' + i.qty + ' — ₡' + (i.price * i.qty).toLocaleString('es-CR');
    });
    var total = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
    var msg = 'Hola, me gustaría hacer el siguiente pedido:\n\n' +
              lines.join('\n') +
              '\n\n*Total estimado: ₡' + total.toLocaleString('es-CR') + '*' +
              '\n\n¿Podría confirmar disponibilidad y precio final?';
    window.open('https://wa.me/50686158400?text=' + encodeURIComponent(msg), '_blank');
  }

  // Init on load
  document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
  });