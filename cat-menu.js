/**
 * cat-menu.js — Category dropdown menu
 * Shared across all pages
 */

var _catActiveIdx = null;

  function toggleDrop(idx, btn) {
    var overlay = document.getElementById('cat-overlay');
    var bar = document.getElementById('cat-bar');

    if (_catActiveIdx === idx) {
      _closeCat();
      return;
    }
    _closeCat();
    _catActiveIdx = idx;
    var drop = document.getElementById('drop-' + idx);
    drop.style.top = bar.getBoundingClientRect().bottom + 'px';
    drop.classList.add('open');
    btn.classList.add('active');
    overlay.classList.add('open');
  }

  function _closeCat() {
    if (_catActiveIdx !== null) {
      document.getElementById('drop-' + _catActiveIdx).classList.remove('open');
      document.querySelectorAll('.cat-tab').forEach(function(t) { t.classList.remove('active'); });
      _catActiveIdx = null;
    }
    document.getElementById('cat-overlay').classList.remove('open');
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cat-overlay').addEventListener('click', _closeCat);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') _closeCat(); });
    document.addEventListener('scroll', function() {
      if (_catActiveIdx !== null) {
        var bar = document.getElementById('cat-bar');
        document.getElementById('drop-' + _catActiveIdx).style.top =
          bar.getBoundingClientRect().bottom + 'px';
      }
    }, { passive: true });
  });