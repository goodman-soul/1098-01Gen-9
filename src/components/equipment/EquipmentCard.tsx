import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Tag, Package } from 'lucide-react';
import type { Equipment } from '@/types';
import { formatPrice } from '@/utils/price';
import { getEquipmentSizeLabel, getLevelLabel } from '@/utils/recommend';
import { getStockForDateRange } from '@/data/stock';
import { useCartStore } from '@/store/useCartStore';
import { useFilterStore } from '@/store/useFilterStore';
import { cn } from '@/lib/utils';

interface EquipmentCardProps {
  equipment: Equipment;
  mode: 'rental' | 'purchase';
  isSelected?: boolean;
  onSelect?: () => void;
}

export const EquipmentCard = ({
  equipment,
  mode,
  isSelected,
  onSelect,
}: EquipmentCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const startDate = useFilterStore((state) => state.startDate);
  const endDate = useFilterStore((state) => state.endDate);
  const addRentalItem = useCartStore((state) => state.addRentalItem);
  const addPurchaseItem = useCartStore((state) => state.addPurchaseItem);
  const rentalItems = useCartStore((state) => state.rentalItems);
  const purchaseItems = useCartStore((state) => state.purchaseItems);

  const isInRental = rentalItems.some((item) => item.equipment.id === equipment.id);
  const isInPurchase = purchaseItems.some((item) => item.equipment.id === equipment.id);

  const stock =
    startDate && endDate
      ? getStockForDateRange(equipment.id, startDate, endDate)
      : equipment.stock;

  const isLowStock = stock > 0 && stock <= 5;
  const isOutOfStock = stock <= 0;

  const price = mode === 'rental' ? equipment.rentalPrice : equipment.purchasePrice;
  const priceLabel = mode === 'rental' ? '/天' : '';

  const handleAddToCart = () => {
    if (mode === 'rental') {
      addRentalItem(equipment, quantity);
    } else {
      addPurchaseItem(equipment, quantity);
    }
  };

  return (
    <div
      className={cn(
        'card card-hover group overflow-hidden',
        isSelected && 'ring-2 ring-ice-500',
        isOutOfStock && 'opacity-60'
      )}
    >
      <div className="relative aspect-square bg-gradient-snow overflow-hidden">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="badge badge-info">
            {getLevelLabel(equipment.level)}
          </span>
          {mode === 'rental' && (
            <span className="badge bg-ice-100 text-ice-700">
              <Tag className="w-3 h-3" />
              可租赁
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="badge badge-danger animate-pulse-soft">已租完</span>
          ) : isLowStock ? (
            <span className="badge badge-warning animate-pulse-soft">
              仅剩 {stock} 件
            </span>
          ) : (
            <span className="badge badge-success">库存充足</span>
          )}
        </div>

        {(isInRental && mode === 'rental') || (isInPurchase && mode === 'purchase') ? (
          <div className="absolute bottom-3 right-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-frost-500 mb-1">{equipment.brand}</p>
          <h3 className="font-semibold text-frost-800 line-clamp-1">{equipment.name}</h3>
          <p className="text-sm text-frost-500 line-clamp-2 mt-1">{equipment.description}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-frost-500">
          <Package className="w-3.5 h-3.5" />
          <span>尺码：{getEquipmentSizeLabel(equipment)}</span>
        </div>

        <div className="flex items-end justify-between pt-2 border-t border-snow-100">
          <div>
            <p className="text-2xl font-bold text-ice-700">
              {formatPrice(price)}
              <span className="text-sm font-normal text-frost-500 ml-1">{priceLabel}</span>
            </p>
          </div>

          {mode === 'rental' && isInRental && (
            <div className="flex items-center gap-2 bg-ice-50 rounded-lg px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-md bg-white text-ice-600 hover:bg-ice-100 flex items-center justify-center transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium text-ice-700 w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                className="w-6 h-6 rounded-md bg-white text-ice-600 hover:bg-ice-100 flex items-center justify-center transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {onSelect ? (
          <button
            onClick={onSelect}
            disabled={isOutOfStock}
            className={cn(
              'w-full py-2.5 rounded-xl font-medium text-sm transition-all',
              isSelected
                ? 'bg-ice-100 text-ice-700'
                : 'bg-ice-600 text-white hover:bg-ice-700',
              isOutOfStock && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isSelected ? '已选择' : '选择此款'}
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              'w-full py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2',
              mode === 'rental'
                ? 'bg-gradient-ice text-white hover:shadow-lg hover:shadow-ice-500/30'
                : 'bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent-500/30',
              isOutOfStock && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {mode === 'rental' ? '加入租赁' : '加入购物车'}
          </button>
        )}
      </div>
    </div>
  );
};
