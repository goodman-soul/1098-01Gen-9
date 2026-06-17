import type { Equipment, SkillLevel, EquipmentCategory } from '@/types';
import { equipmentList } from '@/data/equipment';
import { getStockForDateRange } from '@/data/stock';

const estimateFootLength = (height: number): number => {
  return height * 0.145;
};

const estimateHeadCircumference = (height: number): number => {
  if (height < 150) return 54;
  if (height < 160) return 56;
  if (height < 170) return 58;
  if (height < 180) return 59;
  if (height < 190) return 60;
  return 61;
};

const matchesSnowboardSize = (
  equipment: Equipment,
  weight: number
): boolean => {
  const size = equipment.sizeInfo.snowboard;
  if (!size) return false;
  return weight >= size.weightMin && weight <= size.weightMax;
};

const matchesBootsSize = (equipment: Equipment, height: number): boolean => {
  const size = equipment.sizeInfo.boots;
  if (!size) return false;
  const footLength = estimateFootLength(height);
  return Math.abs(footLength - size.footLength) <= 10;
};

const matchesHelmetSize = (equipment: Equipment, height: number): boolean => {
  const size = equipment.sizeInfo.helmet;
  if (!size) return false;
  const headCircumference = estimateHeadCircumference(height);
  return headCircumference >= size.headCircumferenceMin && headCircumference <= size.headCircumferenceMax;
};

const matchesProtectorSize = (
  equipment: Equipment,
  height: number,
  weight: number
): boolean => {
  const size = equipment.sizeInfo.protector;
  if (!size) return false;
  return (
    height >= size.heightMin &&
    height <= size.heightMax &&
    weight >= size.weightMin &&
    weight <= size.weightMax
  );
};

export const recommendEquipment = (
  category: EquipmentCategory,
  level: SkillLevel | null,
  height: number | null,
  weight: number | null,
  startDate?: string,
  endDate?: string
): Equipment[] => {
  let candidates = equipmentList.filter((e) => e.category === category);

  if (level) {
    const levelPriority: SkillLevel[] = [level];
    if (level === 'beginner') levelPriority.push('intermediate');
    if (level === 'intermediate') {
      levelPriority.push('beginner');
      levelPriority.push('advanced');
    }
    if (level === 'advanced') {
      levelPriority.push('intermediate');
    }
    
    candidates.sort((a, b) => {
      const aIdx = levelPriority.indexOf(a.level);
      const bIdx = levelPriority.indexOf(b.level);
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
    });
  }

  if (height !== null && weight !== null) {
    candidates = candidates.filter((e) => {
      switch (category) {
        case 'snowboard':
          return matchesSnowboardSize(e, weight);
        case 'boots':
          return matchesBootsSize(e, height);
        case 'helmet':
          return matchesHelmetSize(e, height);
        case 'protector':
          return matchesProtectorSize(e, height, weight);
        default:
          return true;
      }
    });
  }

  if (startDate && endDate) {
    candidates = candidates.filter(
      (e) => getStockForDateRange(e.id, startDate, endDate) > 0
    );
  }

  return candidates.slice(0, 3);
};

export const getEquipmentSizeLabel = (equipment: Equipment): string => {
  const { sizeInfo } = equipment;
  if (sizeInfo.snowboard) {
    return `${sizeInfo.snowboard.lengthMin}-${sizeInfo.snowboard.lengthMax}cm`;
  }
  if (sizeInfo.boots) {
    return `${sizeInfo.boots.size}码 / ${sizeInfo.boots.footLength}mm`;
  }
  if (sizeInfo.helmet) {
    return `${sizeInfo.helmet.size}码 (${sizeInfo.helmet.headCircumferenceMin}-${sizeInfo.helmet.headCircumferenceMax}cm)`;
  }
  if (sizeInfo.protector) {
    return `${sizeInfo.protector.size}码`;
  }
  return '均码';
};

export const getLevelLabel = (level: SkillLevel): string => {
  const labels: Record<SkillLevel, string> = {
    beginner: '入门级',
    intermediate: '进阶级',
    advanced: '专业级',
  };
  return labels[level];
};

export const getCategoryLabel = (category: EquipmentCategory): string => {
  const labels: Record<EquipmentCategory, string> = {
    snowboard: '雪板',
    boots: '雪鞋',
    helmet: '头盔',
    protector: '护具',
  };
  return labels[category];
};

export const getCategoryIcon = (category: EquipmentCategory): string => {
  const icons: Record<EquipmentCategory, string> = {
    snowboard: 'snowflake',
    boots: 'footprints',
    helmet: 'hard-hat',
    protector: 'shield',
  };
  return icons[category];
};
