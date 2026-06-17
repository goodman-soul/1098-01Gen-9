import { MapPin, Clock, Phone, CheckCircle } from 'lucide-react';
import type { PickupPoint } from '@/types';

interface PickupInfoProps {
  pickupPoint: PickupPoint;
}

export const PickupInfo = ({ pickupPoint }: PickupInfoProps) => {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-emerald-500" />
        <h3 className="font-bold text-frost-800">取还地点</h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-semibold text-ice-700">{pickupPoint.name}</p>
        </div>

        <div className="space-y-2 text-sm text-frost-600">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-frost-400 mt-0.5 flex-shrink-0" />
            <span>{pickupPoint.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-frost-400 flex-shrink-0" />
            <span>营业时间：{pickupPoint.openTime}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-frost-400 flex-shrink-0" />
            <span>{pickupPoint.phone}</span>
          </p>
        </div>
      </div>

      <div className="bg-ice-50 rounded-lg p-3 text-xs text-ice-700">
        <p className="font-medium mb-1">取还须知</p>
        <ul className="space-y-1 text-ice-600/80">
          <li>• 请凭订单二维码到店取还</li>
          <li>• 建议提前15分钟到店办理手续</li>
          <li>• 归还时请保持装备完好</li>
        </ul>
      </div>
    </div>
  );
};
