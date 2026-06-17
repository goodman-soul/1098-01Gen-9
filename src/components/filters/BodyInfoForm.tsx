import { Ruler, Scale } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';

export const BodyInfoForm = () => {
  const height = useFilterStore((state) => state.height);
  const weight = useFilterStore((state) => state.weight);
  const setHeight = useFilterStore((state) => state.setHeight);
  const setWeight = useFilterStore((state) => state.setWeight);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setHeight(value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setWeight(value);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-frost-700 mb-2">
          <Ruler className="w-4 h-4 inline mr-1.5 text-ice-500" />
          身高
        </label>
        <div className="relative">
          <input
            type="number"
            value={height ?? ''}
            onChange={handleHeightChange}
            placeholder="请输入"
            min="100"
            max="220"
            className="input-field pr-12"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-frost-400 text-sm">
            cm
          </span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-frost-700 mb-2">
          <Scale className="w-4 h-4 inline mr-1.5 text-ice-500" />
          体重
        </label>
        <div className="relative">
          <input
            type="number"
            value={weight ?? ''}
            onChange={handleWeightChange}
            placeholder="请输入"
            min="30"
            max="150"
            className="input-field pr-12"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-frost-400 text-sm">
            kg
          </span>
        </div>
      </div>
    </div>
  );
};
