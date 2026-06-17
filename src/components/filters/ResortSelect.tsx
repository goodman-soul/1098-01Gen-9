import { useState } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { resorts } from '@/data/resorts';
import { useFilterStore } from '@/store/useFilterStore';
import { cn } from '@/lib/utils';

export const ResortSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const resortId = useFilterStore((state) => state.resortId);
  const setResort = useFilterStore((state) => state.setResort);

  const selectedResort = resorts.find((r) => r.id === resortId);

  const handleSelect = (id: string) => {
    setResort(id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-frost-700 mb-2">
        <MapPin className="w-4 h-4 inline mr-1.5 text-ice-500" />
        选择雪场
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-3 bg-white border rounded-xl text-left flex items-center justify-between transition-all',
          isOpen
            ? 'border-ice-400 ring-2 ring-ice-500/30'
            : 'border-snow-200 hover:border-ice-300'
        )}
      >
        <span className={selectedResort ? 'text-frost-700' : 'text-frost-500/60'}>
          {selectedResort ? selectedResort.name : '请选择雪场'}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-frost-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-floating border border-snow-200 z-50 overflow-hidden animate-slide-down">
          <div className="max-h-64 overflow-y-auto scrollbar-hide">
            {resorts.map((resort) => (
              <button
                key={resort.id}
                type="button"
                onClick={() => handleSelect(resort.id)}
                className={cn(
                  'w-full px-4 py-3 text-left flex items-center justify-between hover:bg-ice-50 transition-colors',
                  resortId === resort.id && 'bg-ice-50'
                )}
              >
                <div>
                  <p className="font-medium text-frost-800">{resort.name}</p>
                  <p className="text-xs text-frost-500 mt-0.5">{resort.location}</p>
                </div>
                {resortId === resort.id && (
                  <Check className="w-5 h-5 text-ice-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
