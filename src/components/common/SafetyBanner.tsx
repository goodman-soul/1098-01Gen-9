import { useState } from 'react';
import { AlertTriangle, ChevronDown, Shield, MapPin, Clock, Phone } from 'lucide-react';
import { safetyTips, beginnerNotice } from '@/data/safety';
import { cn } from '@/lib/utils';

interface SafetyBannerProps {
  pickupPointName?: string;
  pickupPointAddress?: string;
  pickupPointOpenTime?: string;
  pickupPointPhone?: string;
}

export const SafetyBanner = ({
  pickupPointName,
  pickupPointAddress,
  pickupPointOpenTime,
  pickupPointPhone,
}: SafetyBannerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden animate-slide-down">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-amber-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-amber-800">
              {beginnerNotice.title}
            </h3>
            <p className="text-sm text-amber-700/80 line-clamp-1">
              {beginnerNotice.content}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-amber-600 transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 animate-slide-down">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {safetyTips.map((tip, index) => (
              <div
                key={tip.id}
                className="bg-white/60 rounded-xl p-3 flex items-start gap-2.5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800 text-sm">{tip.title}</p>
                  <p className="text-xs text-amber-700/70 mt-0.5">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>

          {pickupPointName && (
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                取还地点
              </h4>
              <div className="space-y-2 text-sm text-amber-700">
                <p className="font-medium text-amber-800">{pickupPointName}</p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {pickupPointAddress}
                </p>
                {pickupPointOpenTime && (
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    营业时间：{pickupPointOpenTime}
                  </p>
                )}
                {pickupPointPhone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-500" />
                    联系电话：{pickupPointPhone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
