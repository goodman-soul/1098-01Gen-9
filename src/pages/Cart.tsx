import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils/price';

const Cart = () => {
  const navigate = useNavigate();
  const purchaseItems = useCartStore((state) => state.purchaseItems);
  const getPurchaseTotal = useCartStore((state) => state.getPurchaseTotal);
  const removePurchaseItem = useCartStore((state) => state.removePurchaseItem);
  const updatePurchaseQuantity = useCartStore((state) => state.updatePurchaseQuantity);
  const clearPurchase = useCartStore((state) => state.clearPurchase);

  const total = getPurchaseTotal();

  const handleCheckout = () => {
    const orderNo = `DD${Date.now().toString().slice(-10)}`;
    const orderData = {
      items: [...purchaseItems],
      total: getPurchaseTotal(),
      orderNo,
    };
    sessionStorage.setItem('purchase-order', JSON.stringify(orderData));
    clearPurchase();
    navigate('/purchase/success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-snow-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-frost-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-frost-800">购物车</h1>
              <p className="text-sm text-frost-500">
                共 {purchaseItems.length} 件商品
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {purchaseItems.length > 0 ? (
                <div className="card overflow-hidden">
                  <div className="divide-y divide-snow-100">
                    {purchaseItems.map((item) => (
                      <div
                        key={item.equipment.id}
                        className="p-4 flex items-center gap-4 hover:bg-snow-50 transition-colors"
                      >
                        <img
                          src={item.equipment.image}
                          alt={item.equipment.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-frost-500 mb-1">
                            {item.equipment.brand}
                          </p>
                          <h3 className="font-semibold text-frost-800 truncate">
                            {item.equipment.name}
                          </h3>
                          <p className="text-sm text-frost-500 mt-1">
                            {item.equipment.description}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="text-lg font-bold text-accent-600">
                            {formatPrice(item.equipment.purchasePrice)}
                          </p>

                          <div className="flex items-center gap-2 bg-snow-100 rounded-lg px-2 py-1">
                            <button
                              onClick={() =>
                                updatePurchaseQuantity(
                                  item.equipment.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 rounded-md bg-white text-frost-600 hover:bg-ice-50 flex items-center justify-center text-sm shadow-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-frost-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updatePurchaseQuantity(
                                  item.equipment.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 rounded-md bg-white text-frost-600 hover:bg-ice-50 flex items-center justify-center text-sm shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removePurchaseItem(item.equipment.id)}
                          className="p-2 text-frost-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="card p-12 text-center">
                  <div className="w-20 h-20 mx-auto bg-snow-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-10 h-10 text-frost-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-frost-700 mb-2">
                    购物车是空的
                  </h3>
                  <p className="text-frost-500 mb-6">
                    去挑选你喜欢的滑雪装备吧
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-ice text-white font-medium rounded-xl hover:shadow-lg hover:shadow-ice-500/30 transition-all"
                  >
                    去逛逛
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24 space-y-5">
                <h3 className="font-bold text-frost-800 text-lg">订单摘要</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-frost-500">商品总价</span>
                    <span className="text-frost-700">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-frost-500">运费</span>
                    <span className="text-emerald-600 font-medium">免运费</span>
                  </div>
                </div>

                <div className="border-t border-snow-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-frost-700">应付总额</span>
                    <span className="text-2xl font-bold text-accent-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={purchaseItems.length === 0}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all ${
                    purchaseItems.length === 0
                      ? 'bg-frost-300 cursor-not-allowed'
                      : 'bg-gradient-accent hover:shadow-lg hover:shadow-accent-500/30 hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  立即结算
                </button>

                <p className="text-xs text-frost-400 text-center">
                  支持多种支付方式，安全便捷
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
