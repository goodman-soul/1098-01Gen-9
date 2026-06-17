import { useNavigate } from 'react-router-dom';
import { Calendar, X, ShoppingBag, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useFilterStore } from '@/store/useFilterStore';
import { resorts } from '@/data/resorts';
import { formatPrice } from '@/utils/price';
import { getDaysDiff, formatDateShort } from '@/utils/date';
import { cn } from '@/lib/utils';

interface RentalSummaryProps {
  className?: string;
}

export const RentalSummary = ({ className }: RentalSummaryProps) => {
  const navigate = useNavigate();
  const rentalItems = useCartStore((state) => state.rentalItems);
  const getRentalTotal = useCartStore((state) => state.getRentalTotal);
  const removeRentalItem = useCartStore((state) => state.removeRentalItem);
  const updateRentalQuantity = useCartStore((state) => state.updateRentalQuantity);
  
  const resortId = useFilterStore((state) => state.resortId);
  const startDate = useFilterStore((state) => state.startDate);
  const endDate = useFilterStore((state) => state.endDate);

  const resort = resorts.find((r) => r.id === resortId);
  const days = startDate && endDate ? getDaysDiff(startDate, endDate) : 0;
  const totalPrice = days > 0 ? getRentalTotal(days) : 0;

  const handleConfirm = () => {
    navigate('/rental/confirm');
  };

  const isDisabled = !resortId || !startDate || !endDate || rentalItems.length === 0;

  return (
    <div className={cn('card p-5 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-frost-800 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-ice-600" />
          租赁清单
        </h3>
        <span className="text-sm text-frost-500">
          {rentalItems.length} 件装备
        </span>
      </div>

      {resort && (
        <div className="flex items-center gap-2 text-sm text-frost-600 bg-ice-50 rounded-lg px-3 py-2">
          <MapPin className="w-4 h-4 text-ice-500" />
          <span>{resort.name}</span>
        </div>
      )}

      {startDate && endDate && (
        <div className="flex items-center gap-2 text-sm text-frost-600 bg-snow-50 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-ice-500" />
          <span>
            {formatDateShort(startDate)} - {formatDateShort(endDate)}
          </span>
          <span className="text-ice-600 font-medium">({days} 天)</span>
        </div>
      )}

      {rentalItems.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
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
              <div className="flex-1 min-w-0">
                <p className="font-medium text-frost-800 text-sm truncate">
                  {item.equipment.name}
                </p>
                <p className="text-xs text-frost-500">
                  {formatPrice(item.equipment.rentalPrice)}/天 × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    updateRentalQuantity(item.equipment.id, item.quantity - 1)
                  }
                  className="w-7 h-7 rounded-md bg-white border border-snow-200 text-frost-600 hover:bg-ice-50 flex items-center justify-center text-sm"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-medium text-frost-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateRentalQuantity(item.equipment.id, item.quantity + 1)
                  }
                  className="w-7 h-7 rounded-md bg-white border border-snow-200 text-frost-600 hover:bg-ice-50 flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeRentalItem(item.equipment.id)}
                className="p-1.5 text-frost-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-frost-500 text-sm">
          还没有选择装备
          <br />
          <span className="text-frost-400 text-xs">从上方推荐中选择你需要的装备吧</span>
        </div>
      )}

      {rentalItems.length > 0 && (
        <div className="border-t border-snow-100 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-frost-500">租赁天数</span>
            <span className="text-frost-700 font-medium">{days} 天</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-frost-700 font-medium">预估总价</span>
            <span className="text-2xl font-bold text-ice-700">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={isDisabled}
        className={cn(
          'w-full py-3.5 rounded-xl font-semibold text-white transition-all',
          isDisabled
            ? 'bg-frost-300 cursor-not-allowed'
            : 'bg-gradient-ice hover:shadow-lg hover:shadow-ice-500/30 hover:-translate-y-0.5 active:translate-y-0'
        )}
      >
        {rentalItems.length === 0
          ? '请先选择装备'
          : !startDate || !endDate
          ? '请选择租赁日期'
          : !resortId
          ? '请选择雪场'
          : `确认租赁 · ${formatPrice(totalPrice)}`}
      </button>
    </div>
  );
};
