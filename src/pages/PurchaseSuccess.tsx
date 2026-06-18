import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils/price';
import { useState, useEffect } from 'react';
import type { SelectedEquipment } from '@/types';

interface OrderData {
  items: SelectedEquipment[];
  total: number;
  orderNo: string;
}

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('purchase-order');
    if (saved) {
      setOrderData(JSON.parse(saved));
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col bg-snow-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="card p-8 text-center max-w-md">
            <Package className="w-16 h-16 mx-auto text-frost-300 mb-4" />
            <h2 className="text-xl font-bold text-frost-800 mb-2">
              暂无订单信息
            </h2>
            <p className="text-frost-500 mb-6">
              请先选购商品
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-gradient-ice text-white font-medium rounded-xl hover:shadow-lg hover:shadow-ice-500/30 transition-all"
            >
              去逛逛
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-snow-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-frost-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-frost-800">订单提交成功</h1>
              <p className="text-sm text-frost-500">感谢您的购买</p>
            </div>
          </div>

          <div className="card p-8 text-center space-y-6 mb-6 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-frost-800 mb-2">
                支付成功！
              </h2>
              <p className="text-frost-500">
                您的订单已提交，我们会尽快为您发货
              </p>
            </div>

            <div className="bg-snow-50 rounded-xl p-4 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-frost-500 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  订单编号
                </span>
                <span className="font-mono font-medium text-frost-700">
                  {orderData.orderNo}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-frost-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  下单时间
                </span>
                <span className="text-frost-700">
                  {new Date().toLocaleString('zh-CN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-frost-500 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  支付方式
                </span>
                <span className="text-frost-700">在线支付</span>
              </div>
              <div className="border-t border-snow-200 pt-3 flex items-center justify-between">
                <span className="text-frost-500">支付金额</span>
                <span className="text-2xl font-bold text-accent-600">
                  {formatPrice(orderData.total)}
                </span>
              </div>
            </div>

            <div className="bg-ice-50 rounded-xl p-4 text-left space-y-3">
              <h3 className="font-semibold text-ice-700 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                配送信息
              </h3>
              <div className="space-y-2 text-sm text-ice-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-ice-500" />
                  <span>北京市朝阳区建国路88号 张女士 138****8888</span>
                </p>
                <p className="text-ice-500 text-xs">
                  预计 1-3 个工作日内发货
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 text-left">
              <h3 className="font-semibold text-amber-700 mb-3">商品清单</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div
                    key={item.equipment.id}
                    className="flex items-center gap-3 bg-white/60 rounded-lg p-2"
                  >
                    <img
                      src={item.equipment.image}
                      alt={item.equipment.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-amber-800 truncate">
                        {item.equipment.name}
                      </p>
                      <p className="text-xs text-amber-600/70">
                        × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-amber-700">
                      {formatPrice(item.equipment.purchasePrice * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-snow-100 text-frost-700 font-semibold rounded-xl hover:bg-snow-200 transition-all"
              >
                继续购物
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-500/30 transition-all"
              >
                查看订单
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchaseSuccess;
