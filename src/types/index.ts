export type EquipmentCategory = 'snowboard' | 'boots' | 'helmet' | 'protector';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type SizeType = 'S' | 'M' | 'L' | 'XL';

export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  openTime: string;
  phone: string;
}

export interface Resort {
  id: string;
  name: string;
  location: string;
  image: string;
  pickupPoints: PickupPoint[];
}

export interface SnowboardSize {
  lengthMin: number;
  lengthMax: number;
  weightMin: number;
  weightMax: number;
}

export interface BootsSize {
  size: number;
  footLength: number;
}

export interface HelmetSize {
  size: SizeType;
  headCircumferenceMin: number;
  headCircumferenceMax: number;
}

export interface ProtectorSize {
  size: SizeType;
  heightMin: number;
  heightMax: number;
  weightMin: number;
  weightMax: number;
}

export interface SizeInfo {
  snowboard?: SnowboardSize;
  boots?: BootsSize;
  helmet?: HelmetSize;
  protector?: ProtectorSize;
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  image: string;
  description: string;
  rentalPrice: number;
  purchasePrice: number;
  stock: number;
  level: SkillLevel;
  sizeInfo: SizeInfo;
}

export interface DateStock {
  equipmentId: string;
  date: string;
  available: number;
}

export interface UserFilters {
  resortId: string | null;
  startDate: string | null;
  endDate: string | null;
  height: number | null;
  weight: number | null;
  level: SkillLevel | null;
}

export interface SelectedEquipment {
  equipment: Equipment;
  type: 'rental' | 'purchase';
  quantity: number;
}

export interface CartItem {
  equipment: Equipment;
  quantity: number;
}

export interface RentalOrder {
  id: string;
  resortId: string;
  startDate: string;
  endDate: string;
  items: SelectedEquipment[];
  totalPrice: number;
  pickupPointId: string;
  createdAt: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  content: string;
  icon: string;
}
