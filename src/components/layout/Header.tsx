import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Mountain } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const Header = () => {
  const location = useLocation();
  const purchaseCount = useCartStore((state) => state.getPurchaseCount());

  const isHome = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHome
          ? 'bg-transparent'
          : 'glass border-b border-snow-200'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center shadow-lg shadow-ice-500/30">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${isHome ? 'text-white' : 'text-ice-900'}`}>
                雪具达
              </h1>
              <p className={`text-xs ${isHome ? 'text-ice-100' : 'text-frost-500'}`}>
                专业滑雪装备租售
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                isHome ? 'text-white/90' : 'text-frost-600'
              }`}
            >
              首页
            </Link>
            <a
              href="#equipment"
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                isHome ? 'text-white/90' : 'text-frost-600'
              }`}
            >
              装备推荐
            </a>
            <a
              href="#safety"
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                isHome ? 'text-white/90' : 'text-frost-600'
              }`}
            >
              安全须知
            </a>
          </nav>

          <Link
            to="/cart"
            className="relative p-2.5 rounded-xl transition-all hover:bg-white/10"
          >
            <ShoppingCart
              className={`w-5 h-5 ${isHome ? 'text-white' : 'text-frost-700'}`}
            />
            {purchaseCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {purchaseCount > 99 ? '99+' : purchaseCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
