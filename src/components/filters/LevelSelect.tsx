import { TrendingUp } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import type { SkillLevel } from '@/types';
import { cn } from '@/lib/utils';

const levels: { value: SkillLevel; label: string; desc: string; color: string }[] = [
  {
    value: 'beginner',
    label: '新手入门',
    desc: '第一次滑雪或初级道',
    color: 'emerald',
  },
  {
    value: 'intermediate',
    label: '进阶水平',
    desc: '能滑中级道，正在练习',
    color: 'ice',
  },
  {
    value: 'advanced',
    label: '专业高手',
    desc: '高级道轻松驾驭',
    color: 'accent',
  },
];

export const LevelSelect = () => {
  const level = useFilterStore((state) => state.level);
  const setLevel = useFilterStore((state) => state.setLevel);

  return (
    <div>
      <label className="block text-sm font-medium text-frost-700 mb-3">
        <TrendingUp className="w-4 h-4 inline mr-1.5 text-ice-500" />
        滑雪水平
      </label>
      <div className="grid grid-cols-3 gap-3">
        {levels.map((item) => {
          const isSelected = level === item.value;
          const colorClasses = getColorClasses(item.color, isSelected);

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setLevel(item.value)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                isSelected
                  ? colorClasses.selected
                  : 'border-snow-200 bg-white hover:border-ice-200 hover:bg-ice-50/50'
              )}
            >
              <p className={cn('font-semibold text-sm', isSelected ? colorClasses.text : 'text-frost-800')}>
                {item.label}
              </p>
              <p className={cn('text-xs mt-1', isSelected ? colorClasses.subtext : 'text-frost-500')}>
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function getColorClasses(color: string, selected: boolean) {
  if (!selected) {
    return { selected: '', text: '', subtext: '' };
  }

  const colorMap: Record<string, { selected: string; text: string; subtext: string }> = {
    emerald: {
      selected: 'border-emerald-400 bg-emerald-50',
      text: 'text-emerald-700',
      subtext: 'text-emerald-600/80',
    },
    ice: {
      selected: 'border-ice-400 bg-ice-50',
      text: 'text-ice-700',
      subtext: 'text-ice-600/80',
    },
    accent: {
      selected: 'border-accent-400 bg-accent-50',
      text: 'text-accent-700',
      subtext: 'text-accent-600/80',
    },
  };

  return colorMap[color] || colorMap.ice;
}
