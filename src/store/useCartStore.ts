import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Equipment, SelectedEquipment } from '@/types';

interface CartState {
  rentalItems: SelectedEquipment[];
  purchaseItems: SelectedEquipment[];
  addRentalItem: (equipment: Equipment, quantity?: number) => void;
  addPurchaseItem: (equipment: Equipment, quantity?: number) => void;
  removeRentalItem: (equipmentId: string) => void;
  removePurchaseItem: (equipmentId: string) => void;
  updateRentalQuantity: (equipmentId: string, quantity: number) => void;
  updatePurchaseQuantity: (equipmentId: string, quantity: number) => void;
  clearRental: () => void;
  clearPurchase: () => void;
  getRentalTotal: (days: number) => number;
  getPurchaseTotal: () => number;
  getPurchaseCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      rentalItems: [],
      purchaseItems: [],
      
      addRentalItem: (equipment, quantity = 1) => {
        set((state) => {
          const existing = state.rentalItems.find(
            (item) => item.equipment.id === equipment.id
          );
          if (existing) {
            return {
              rentalItems: state.rentalItems.map((item) =>
                item.equipment.id === equipment.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            rentalItems: [
              ...state.rentalItems,
              { equipment, type: 'rental', quantity },
            ],
          };
        });
      },
      
      addPurchaseItem: (equipment, quantity = 1) => {
        set((state) => {
          const existing = state.purchaseItems.find(
            (item) => item.equipment.id === equipment.id
          );
          if (existing) {
            return {
              purchaseItems: state.purchaseItems.map((item) =>
                item.equipment.id === equipment.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            purchaseItems: [
              ...state.purchaseItems,
              { equipment, type: 'purchase', quantity },
            ],
          };
        });
      },
      
      removeRentalItem: (equipmentId) => {
        set((state) => ({
          rentalItems: state.rentalItems.filter(
            (item) => item.equipment.id !== equipmentId
          ),
        }));
      },
      
      removePurchaseItem: (equipmentId) => {
        set((state) => ({
          purchaseItems: state.purchaseItems.filter(
            (item) => item.equipment.id !== equipmentId
          ),
        }));
      },
      
      updateRentalQuantity: (equipmentId, quantity) => {
        if (quantity <= 0) {
          get().removeRentalItem(equipmentId);
          return;
        }
        set((state) => ({
          rentalItems: state.rentalItems.map((item) =>
            item.equipment.id === equipmentId ? { ...item, quantity } : item
          ),
        }));
      },
      
      updatePurchaseQuantity: (equipmentId, quantity) => {
        if (quantity <= 0) {
          get().removePurchaseItem(equipmentId);
          return;
        }
        set((state) => ({
          purchaseItems: state.purchaseItems.map((item) =>
            item.equipment.id === equipmentId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearRental: () => set({ rentalItems: [] }),
      
      clearPurchase: () => set({ purchaseItems: [] }),
      
      getRentalTotal: (days) => {
        return get().rentalItems.reduce(
          (total, item) => total + item.equipment.rentalPrice * item.quantity * days,
          0
        );
      },
      
      getPurchaseTotal: () => {
        return get().purchaseItems.reduce(
          (total, item) => total + item.equipment.purchasePrice * item.quantity,
          0
        );
      },
      
      getPurchaseCount: () => {
        return get().purchaseItems.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'ski-cart-storage',
    }
  )
);
