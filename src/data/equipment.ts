import type { Equipment } from '@/types';

export const equipmentList: Equipment[] = [
  // ===== 雪板 =====
  {
    id: 'sb-beginner-1',
    name: '入门级滑雪板 Freestyle',
    category: 'snowboard',
    brand: 'SnowTech',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20snowboard%20white%20background%20product%20photo%20winter%20sports&image_size=square_hd',
    description: '适合新手的软硬度雪板，容错性高，易于操控',
    rentalPrice: 80,
    purchasePrice: 1299,
    stock: 50,
    level: 'beginner',
    sizeInfo: {
      snowboard: { lengthMin: 140, lengthMax: 150, weightMin: 40, weightMax: 60 },
    },
  },
  {
    id: 'sb-beginner-2',
    name: '初级全能雪板',
    category: 'snowboard',
    brand: 'MountainPro',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=all%20mountain%20beginner%20snowboard%20product%20shot%20clean%20background&image_size=square_hd',
    description: '全能型入门雪板，适应各种雪道',
    rentalPrice: 100,
    purchasePrice: 1899,
    stock: 40,
    level: 'beginner',
    sizeInfo: {
      snowboard: { lengthMin: 150, lengthMax: 160, weightMin: 50, weightMax: 75 },
    },
  },
  {
    id: 'sb-intermediate-1',
    name: '进阶刻滑雪板',
    category: 'snowboard',
    brand: 'IceRider',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=intermediate%20carving%20snowboard%20sleek%20design%20product%20photo&image_size=square_hd',
    description: '中等硬度，适合进阶者练习刻滑和技巧',
    rentalPrice: 150,
    purchasePrice: 2999,
    stock: 30,
    level: 'intermediate',
    sizeInfo: {
      snowboard: { lengthMin: 155, lengthMax: 165, weightMin: 60, weightMax: 85 },
    },
  },
  {
    id: 'sb-advanced-1',
    name: '专业竞技雪板',
    category: 'snowboard',
    brand: 'PeakX',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20racing%20snowboard%20high%20performance%20product%20image&image_size=square_hd',
    description: '高硬度竞技雪板，速度快，适合高级玩家',
    rentalPrice: 220,
    purchasePrice: 4999,
    stock: 15,
    level: 'advanced',
    sizeInfo: {
      snowboard: { lengthMin: 160, lengthMax: 175, weightMin: 70, weightMax: 100 },
    },
  },

  // ===== 雪鞋 =====
  {
    id: 'boots-beginner-1',
    name: '舒适入门雪鞋',
    category: 'boots',
    brand: 'SnowFit',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20snowboard%20boots%20white%20background%20product%20photography&image_size=square_hd',
    description: '软硬度适中，穿着舒适，适合新手',
    rentalPrice: 50,
    purchasePrice: 899,
    stock: 60,
    level: 'beginner',
    sizeInfo: {
      boots: { size: 38, footLength: 240 },
    },
  },
  {
    id: 'boots-beginner-2',
    name: '保暖入门雪鞋',
    category: 'boots',
    brand: 'WarmStep',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20snow%20boots%20comfortable%20beginner%20product%20photo&image_size=square_hd',
    description: '加厚保暖内胆，长时间滑雪不冻脚',
    rentalPrice: 60,
    purchasePrice: 1099,
    stock: 50,
    level: 'beginner',
    sizeInfo: {
      boots: { size: 42, footLength: 265 },
    },
  },
  {
    id: 'boots-intermediate-1',
    name: '进阶刻滑雪鞋',
    category: 'boots',
    brand: 'SpeedLock',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=intermediate%20snowboard%20boots%20performance%20product%20shot&image_size=square_hd',
    description: '钢丝扣系统，快速穿脱，支撑性好',
    rentalPrice: 90,
    purchasePrice: 1899,
    stock: 35,
    level: 'intermediate',
    sizeInfo: {
      boots: { size: 40, footLength: 255 },
    },
  },
  {
    id: 'boots-advanced-1',
    name: '专业竞技雪鞋',
    category: 'boots',
    brand: 'RacePro',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20race%20snowboard%20boots%20high%20performance%20product&image_size=square_hd',
    description: '碳纤维鞋底，超轻量，精准传递力量',
    rentalPrice: 140,
    purchasePrice: 3299,
    stock: 20,
    level: 'advanced',
    sizeInfo: {
      boots: { size: 43, footLength: 275 },
    },
  },

  // ===== 头盔 =====
  {
    id: 'helmet-beginner-1',
    name: '安全入门头盔',
    category: 'helmet',
    brand: 'SafeHead',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20ski%20helmet%20white%20background%20safety%20gear%20product&image_size=square_hd',
    description: 'CE认证，多重缓冲，入门首选',
    rentalPrice: 30,
    purchasePrice: 399,
    stock: 80,
    level: 'beginner',
    sizeInfo: {
      helmet: { size: 'M', headCircumferenceMin: 54, headCircumferenceMax: 58 },
    },
  },
  {
    id: 'helmet-intermediate-1',
    name: '通风进阶头盔',
    category: 'helmet',
    brand: 'AirFlow',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=advanced%20ski%20helmet%20with%20goggles%20product%20photography&image_size=square_hd',
    description: '可调通风系统，兼容雪镜，舒适透气',
    rentalPrice: 50,
    purchasePrice: 699,
    stock: 50,
    level: 'intermediate',
    sizeInfo: {
      helmet: { size: 'L', headCircumferenceMin: 58, headCircumferenceMax: 62 },
    },
  },
  {
    id: 'helmet-advanced-1',
    name: '专业MIPS头盔',
    category: 'helmet',
    brand: 'ProTech',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20mips%20ski%20helmet%20high%20end%20product%20shot&image_size=square_hd',
    description: 'MIPS脑部保护系统，专业级安全防护',
    rentalPrice: 80,
    purchasePrice: 1299,
    stock: 25,
    level: 'advanced',
    sizeInfo: {
      helmet: { size: 'L', headCircumferenceMin: 59, headCircumferenceMax: 63 },
    },
  },

  // ===== 护具 =====
  {
    id: 'protector-beginner-1',
    name: '全套入门护具',
    category: 'protector',
    brand: 'Guardian',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20ski%20protective%20gear%20set%20knee%20pads%20wrist%20guards&image_size=square_hd',
    description: '护膝+护肘+护腕全套，新手必备防护',
    rentalPrice: 40,
    purchasePrice: 499,
    stock: 70,
    level: 'beginner',
    sizeInfo: {
      protector: { size: 'M', heightMin: 160, heightMax: 175, weightMin: 50, weightMax: 70 },
    },
  },
  {
    id: 'protector-beginner-2',
    name: '护臀防摔套装',
    category: 'protector',
    brand: 'Butterfly',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ski%20butt%20protector%20padded%20shorts%20safety%20gear&image_size=square_hd',
    description: '重点保护尾椎和胯部，摔倒不怕疼',
    rentalPrice: 35,
    purchasePrice: 399,
    stock: 60,
    level: 'beginner',
    sizeInfo: {
      protector: { size: 'L', heightMin: 170, heightMax: 185, weightMin: 65, weightMax: 85 },
    },
  },
  {
    id: 'protector-intermediate-1',
    name: '进阶护甲上衣',
    category: 'protector',
    brand: 'ArmorX',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ski%20body%20armor%20jacket%20protective%20gear%20product%20photo&image_size=square_hd',
    description: '全身护甲，脊柱+胸口+肩部多重防护',
    rentalPrice: 70,
    purchasePrice: 999,
    stock: 30,
    level: 'intermediate',
    sizeInfo: {
      protector: { size: 'M', heightMin: 165, heightMax: 180, weightMin: 55, weightMax: 75 },
    },
  },
  {
    id: 'protector-advanced-1',
    name: '专业竞技护具',
    category: 'protector',
    brand: 'RaceArmor',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20racing%20ski%20protective%20gear%20high%20end%20equipment&image_size=square_hd',
    description: 'FIS认证专业护具，高强度轻量化',
    rentalPrice: 100,
    purchasePrice: 1599,
    stock: 15,
    level: 'advanced',
    sizeInfo: {
      protector: { size: 'L', heightMin: 175, heightMax: 190, weightMin: 70, weightMax: 90 },
    },
  },
];

export const getEquipmentByCategory = (category: string) => {
  return equipmentList.filter((item) => item.category === category);
};

export const getEquipmentById = (id: string) => {
  return equipmentList.find((item) => item.id === id);
};
