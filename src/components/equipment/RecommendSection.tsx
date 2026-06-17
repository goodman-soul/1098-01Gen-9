import { useState } from 'react';
import { Snowflake, Footprints, HardHat, Shield, Sparkles } from 'lucide-react';
import type { EquipmentCategory, Equipment } from '@/types';
import { EquipmentCard } from './EquipmentCard';
import { recommendEquipment, getCategoryLabel } from '@/utils/recommend';
import { useFilterStore } from '@/store/useFilterStore';

interface SectionProps {
  category: EquipmentCategory;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EquipmentSection = ({ category, icon, title, description }: SectionProps) => {
  const [mode, setMode] = useState<'rental' | 'purchase'>('rental');
  const level = useFilterStore((state) => state.level);
  const height = useFilterStore((state) => state.height);
  const weight = useFilterStore((state) => state.weight);
  const startDate = useFilterStore((state) => state.startDate);
  const endDate = useFilterStore((state) => state.endDate);

  const recommended = recommendEquipment(
    category,
    level,
    height,
    weight,
    startDate || undefined,
    endDate || undefined
  );

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-ice flex items-center justify-center shadow-lg shadow-ice-500/25">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-frost-800">{title}</h3>
            <p className="text-sm text-frost-500">{description}</p>
          </div>
        </div>

        <div className="flex bg-snow-100 rounded-xl p-1">
          <button
            onClick={() => setMode('rental')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              mode === 'rental'
                ? 'bg-white text-ice-700 shadow-sm'
                : 'text-frost-500 hover:text-frost-700'
            }`}
          >
            租赁
          </button>
          <button
            onClick={() => setMode('purchase')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              mode === 'purchase'
                ? 'bg-white text-accent-600 shadow-sm'
                : 'text-frost-500 hover:text-frost-700'
            }`}
          >
            购买
          </button>
        </div>
      </div>

      {recommended.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommended.map((equipment, index) => (
            <div
              key={equipment.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EquipmentCard equipment={equipment} mode={mode} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-snow-50 rounded-2xl p-8 text-center">
          <p className="text-frost-500">请填写身高体重和滑雪水平，获取专属推荐</p>
        </div>
      )}
    </section>
  );
};

export const RecommendSection = () => {
  const sections: { category: EquipmentCategory; icon: React.ReactNode; title: string; description: string }[] = [
    {
      category: 'snowboard',
      icon: <Snowflake className="w-5 h-5 text-white" />,
      title: '雪板推荐',
      description: '根据体重和水平推荐最合适的雪板',
    },
    {
      category: 'boots',
      icon: <Footprints className="w-5 h-5 text-white" />,
      title: '雪鞋推荐',
      description: '舒适贴合，为你的脚型找到最佳选择',
    },
    {
      category: 'helmet',
      icon: <HardHat className="w-5 h-5 text-white" />,
      title: '头盔推荐',
      description: '安全第一，专业认证的滑雪头盔',
    },
    {
      category: 'protector',
      icon: <Shield className="w-5 h-5 text-white" />,
      title: '护具推荐',
      description: '全方位保护，让你滑得更安心',
    },
  ];

  return (
    <div id="equipment" className="space-y-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-ice-50 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-ice-600" />
          <span className="text-sm font-medium text-ice-700">智能推荐</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-frost-800 mb-3">
          为你精选的滑雪装备
        </h2>
        <p className="text-frost-500 max-w-xl mx-auto">
          根据你的身高体重和滑雪水平，系统为你推荐最适合的装备，
          可租赁可购买，灵活选择
        </p>
      </div>

      {sections.map((section) => (
        <EquipmentSection key={section.category} {...section} />
      ))}
    </div>
  );
};
