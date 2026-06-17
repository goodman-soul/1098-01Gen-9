import { Calendar } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { getTodayStr, getTomorrowStr, formatDateShort, getDaysDiff } from '@/utils/date';

export const DatePicker = () => {
  const startDate = useFilterStore((state) => state.startDate);
  const endDate = useFilterStore((state) => state.endDate);
  const setDates = useFilterStore((state) => state.setDates);

  const today = getTodayStr();
  const tomorrow = getTomorrowStr();

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    if (endDate && newStart > endDate) {
      setDates(newStart, newStart);
    } else {
      setDates(newStart, endDate);
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    if (startDate && newEnd < startDate) {
      setDates(startDate, startDate);
    } else {
      setDates(startDate, newEnd);
    }
  };

  const days = startDate && endDate ? getDaysDiff(startDate, endDate) : 0;

  return (
    <div>
      <label className="block text-sm font-medium text-frost-700 mb-2">
        <Calendar className="w-4 h-4 inline mr-1.5 text-ice-500" />
        租赁日期
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="date"
            value={startDate || ''}
            onChange={handleStartChange}
            min={today}
            className="input-field text-sm"
          />
          <p className="text-xs text-frost-500 mt-1">开始日期</p>
        </div>
        <div className="text-frost-400 text-sm pb-4">至</div>
        <div className="flex-1">
          <input
            type="date"
            value={endDate || ''}
            onChange={handleEndChange}
            min={startDate || today}
            className="input-field text-sm"
          />
          <p className="text-xs text-frost-500 mt-1">结束日期</p>
        </div>
      </div>
      {days > 0 && (
        <p className="text-sm text-ice-600 mt-2 font-medium">
          共 {days} 天
          {startDate && endDate && (
            <span className="text-frost-500 font-normal ml-2">
              （{formatDateShort(startDate)} - {formatDateShort(endDate)}）
            </span>
          )}
        </p>
      )}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={() => setDates(today, today)}
          className="px-3 py-1.5 text-xs rounded-lg bg-ice-50 text-ice-700 hover:bg-ice-100 transition-colors"
        >
          今天
        </button>
        <button
          type="button"
          onClick={() => setDates(tomorrow, tomorrow)}
          className="px-3 py-1.5 text-xs rounded-lg bg-ice-50 text-ice-700 hover:bg-ice-100 transition-colors"
        >
          明天
        </button>
        <button
          type="button"
          onClick={() => setDates(today, getDateAfterDays(today, 2))}
          className="px-3 py-1.5 text-xs rounded-lg bg-ice-50 text-ice-700 hover:bg-ice-100 transition-colors"
        >
          周末 3 天
        </button>
      </div>
    </div>
  );
};

function getDateAfterDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days - 1);
  return date.toISOString().split('T')[0];
}
