import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Phone,
  Package,
  QrCode,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useFilterStore } from '@/store/useFilterStore';
import { useCartStore } from '@/store/useCartStore';
import { resorts } from '@/data/resorts';
import { formatPrice } from '@/utils/price';
import { getDaysDiff, formatDate } from '@/utils/date';

const RentalConfirm = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const resortId = useFilterStore((state) => state.resortId);
  const startDate = useFilterStore((state) => state.startDate);
  const endDate = useFilterStore((state) => state.endDate);
  const rentalItems = useCartStore((state) => state.rentalItems);
  const getRentalTotal = useCartStore((state) => state.getRentalTotal);
  const clearRental = useCartStore((state) => state.clearRental);

  const resort = resorts.find((r) => r.id === resortId);
  const pickupPoint = resort?.pickupPoints[0];
  const days = startDate && endDate ? getDaysDiff(startDate, endDate) : 0;
  const totalPrice = getRentalTotal(days);

  const handleConfirm = () => {
    setConfirmed(true);
    clearRental();
  };

  if (!resortId || !startDate || !endDate || rentalItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-snow-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="card p-8 text-center max-w-md">
            <Package className="w-16 h-16 mx-auto text-frost-300 mb-4" />
            <h2 className="text-xl font-bold text-frost-800 mb-2">
              租赁信息不完整
            </h2>
            <p className="text-frost-500 mb-6">
              请先选择雪场、日期和装备
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-gradient-ice text-white font-medium rounded-xl hover:shadow-lg hover:shadow-ice-500/30 transition-all"
            >
              返回首页
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col bg-snow-50">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-lg">
            <div className="card p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-frost-800 mb-2">
                  预约成功！
                </h2>
                <p className="text-frost-500">
                  您的滑雪装备已预约成功，请凭取件码到店取货
                </p>
              </div>

              <div className="bg-snow-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-frost-500">订单编号</span>
                  <span className="font-mono font-medium text-frost-700">
                    SK{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-frost-500">租赁天数</span>
                  <span className="text-frost-700">{days} 天</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-frost-500">支付金额</span>
                  <span className="text-lg font-bold text-ice-700">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="bg-white border-2 border-dashed border-snow-200 rounded-xl p-4">
                <div className="w-32 h-32 mx-auto bg-snow-50 rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="w-24 h-24 text-frost-400" />
                </div>
                <p className="text-sm text-frost-500">到店出示此二维码取件</p>
              </div>

              {pickupPoint && (
                <div className="text-left bg-ice-50 rounded-xl p-4 space-y-2">
                  <p className="font-semibold text-ice-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    取还地点
                  </p>
                  <p className="text-sm text-ice-600">{pickupPoint.name}</p>
                  <p className="text-sm text-ice-600/80">
                    {pickupPoint.address}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-ice-600/70 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {pickupPoint.openTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {pickupPoint.phone}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate('/')}
                className="w-full py-3 bg-gradient-ice text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ice-500/30 transition-all"
              >
                返回首页
              </button>
            </div>
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
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-frost-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-frost-800">确认租赁</h1>
              <p className="text-sm text-frost-500">请核对以下信息</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-5 space-y-4">
              <h3 className="font-bold text-frost-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-ice-600" />
                雪场信息
              </h3>
              <div className="flex items-start gap-4">
                <img
                  src={resort?.image}
                  alt={resort?.name}
                  className="w-24 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-frost-800">{resort?.name}</p>
                  <p className="text-sm text-frost-500 mt-1">{resort?.location}</p>
                </div>
              </div>
            </div>

            <div className="card p-5 space-y-4">
              <h3 className="font-bold text-frost-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ice-600" />
                租赁时间
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-snow-50 rounded-xl p-3">
                  <p className="text-xs text-frost-500 mb-1">开始日期</p>
                  <p className="font-semibold text-frost-700">
                    {startDate && formatDate(startDate)}
                  </p>
                </div>
                <div className="bg-ice-50 rounded-xl p-3">
                  <p className="text-xs text-ice-500 mb-1">租赁天数</p>
                  <p className="font-bold text-ice-700 text-xl">{days}</p>
                  <p className="text-xs text-ice-500">天</p>
                </div>
                <div className="bg-snow-50 rounded-xl p-3">
                  <p className="text-xs text-frost-500 mb-1">结束日期</p>
                  <p className="font-semibold text-frost-700">
                    {endDate && formatDate(endDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 space-y-4">
              <h3 className="font-bold text-frost-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-ice-600" />
                租赁装备
                <span className="ml-auto text-sm font-normal text-frost-500">
                  {rentalItems.length} 件
                </span>
              </h3>
              <div className="space-y-3">
                {rentalItems.map((item) => (
                  <div
                    key={item.equipment.id}
                    className="flex items-center gap-3 bg-snow-50 rounded-xl p-3"
                  >
                    <img
                      src={item.equipment.image}
                      alt={item.equipment.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-frost-800 text-sm">
                        {item.equipment.name}
                      </p>
                      <p className="text-xs text-frost-500">
                        {formatPrice(item.equipment.rentalPrice)}/天 × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-ice-700">
                      {formatPrice(item.equipment.rentalPrice * item.quantity * days)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {pickupPoint && (
              <div className="card p-5 space-y-4">
                <h3 className="font-bold text-frost-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  取还地点
                </h3>
                <div className="bg-emerald-50 rounded-xl p-4 space-y-2">
                  <p className="font-semibold text-emerald-700">
                    {pickupPoint.name}
                  </p>
                  <p className="text-sm text-emerald-600/80">
                    {pickupPoint.address}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-emerald-600/70 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {pickupPoint.openTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {pickupPoint.phone}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="card p-5 space-y-4">
              <h3 className="font-bold text-frost-800">费用明细</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-frost-500">装备租金</span>
                  <span className="text-frost-700">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-frost-500">服务费</span>
                  <span className="text-emerald-600">免费</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-frost-500">押金</span>
                  <span className="text-frost-700">到店支付</span>
                </div>
              </div>
              <div className="border-t border-snow-100 pt-4 flex items-center justify-between">
                <span className="font-semibold text-frost-700">应付金额</span>
                <span className="text-3xl font-bold text-ice-700">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-gradient-ice text-white font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-ice-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              确认预约 · {formatPrice(totalPrice)}
            </button>

            <p className="text-center text-xs text-frost-400">
              点击确认即表示同意《租赁服务协议》
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RentalConfirm;
