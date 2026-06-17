import type { DateStock } from '@/types';
import { equipmentList } from './equipment';

const generateDateStocks = (): DateStock[] => {
  const stocks: DateStock[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    equipmentList.forEach((equipment) => {
      const minStock = Math.floor(equipment.stock * 0.2);
      const maxStock = equipment.stock;
      const available = Math.floor(Math.random() * (maxStock - minStock + 1)) + minStock;
      
      stocks.push({
        equipmentId: equipment.id,
        date: dateStr,
        available,
      });
    });
  }
  
  return stocks;
};

export const dateStocks: DateStock[] = generateDateStocks();

export const getStockForDate = (equipmentId: string, date: string): number => {
  const stock = dateStocks.find(
    (s) => s.equipmentId === equipmentId && s.date === date
  );
  return stock?.available ?? 0;
};

export const getStockForDateRange = (
  equipmentId: string,
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let minStock = Infinity;
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const stock = getStockForDate(equipmentId, dateStr);
    minStock = Math.min(minStock, stock);
  }
  
  return minStock === Infinity ? 0 : minStock;
};
