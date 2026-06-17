import { Mountain, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-ice-950 text-ice-100 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">雪具达</h3>
                <p className="text-xs text-ice-300">专业滑雪装备租售平台</p>
              </div>
            </div>
            <p className="text-sm text-ice-200/80 max-w-md leading-relaxed">
              我们提供全系列滑雪装备的租赁与购买服务，与全国各大雪场合作，
              为滑雪爱好者提供便捷、专业、安全的装备解决方案。
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-ice-200/80">
              <li className="hover:text-white transition-colors cursor-pointer">
                装备租赁
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                装备购买
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                雪场合作
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                常见问题
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">联系我们</h4>
            <ul className="space-y-3 text-sm text-ice-200/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>400-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>service@xuejuda.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>北京市朝阳区建国路88号</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ice-800 mt-10 pt-6 text-center text-xs text-ice-300/60">
          © 2024 雪具达 XueJuDa. 保留所有权利.
        </div>
      </div>
    </footer>
  );
};
