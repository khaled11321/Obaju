(function () {
    function toast(message) {
        var shell = document.getElementById('toast-shell');
        if (!shell) return;
        var el = document.createElement('div');
        el.className = 'toast-msg';
        el.textContent = message;
        shell.appendChild(el);
        setTimeout(function () { el.remove(); }, 2500);
    }

    function initAddToCart() {
        document.querySelectorAll('[data-add-cart]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                toast('تمت إضافة المنتج إلى السلة بنجاح');
            });
        });
    }

    function initCategoryFilters() {
        var sort = document.getElementById('sortProducts');
        var onlyDeals = document.getElementById('onlyDeals');
        if (!sort) return;

        function applyFilters() {
            var cards = document.querySelectorAll('.js-filter-card');
            cards.forEach(function (card) {
                var hideByDeal = onlyDeals && onlyDeals.checked && card.dataset.deal !== 'true';
                card.style.display = hideByDeal ? 'none' : 'block';
            });

            var container = document.querySelector('.js-filter-container');
            if (!container) return;
            var list = Array.from(container.querySelectorAll('.js-filter-card')).filter(function (item) {
                return item.style.display !== 'none';
            });

            list.sort(function (a, b) {
                var ap = parseFloat(a.dataset.price);
                var bp = parseFloat(b.dataset.price);
                var ar = parseFloat(a.dataset.rating);
                var br = parseFloat(b.dataset.rating);
                if (sort.value === 'priceAsc') return ap - bp;
                if (sort.value === 'topRated') return br - ar;
                return 0;
            });

            list.forEach(function (el) { container.appendChild(el); });
        }

        sort.addEventListener('change', applyFilters);
        if (onlyDeals) onlyDeals.addEventListener('change', applyFilters);
    }

    function initGallery() {
        var main = document.getElementById('mainPhoto');
        if (!main) return;
        document.querySelectorAll('[data-photo]').forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                main.src = thumb.dataset.photo;
            });
        });
    }

    function initSkeleton() {
        window.setTimeout(function () {
            document.querySelectorAll('.skeleton').forEach(function (el) { el.remove(); });
        }, 900);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initAddToCart();
        initCategoryFilters();
        initGallery();
        initSkeleton();
    });
})();
