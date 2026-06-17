import { useState } from 'react';
import { ChevronDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ResortSelect } from '@/components/filters/ResortSelect';
import { DatePicker } from '@/components/filters/DatePicker';
import { BodyInfoForm } from '@/components/filters/BodyInfoForm';
import { LevelSelect } from '@/components/filters/LevelSelect';
import { SafetyBanner } from '@/components/common/SafetyBanner';
import { RecommendSection } from '@/components/equipment/RecommendSection';
import { RentalSummary } from '@/components/rental/RentalSummary';
import { useFilterStore } from '@/store/useFilterStore';
import { resorts } from '@/data/resorts';

const Home = () => {
  const level = useFilterStore((state) => state.level);
  const resortId = useFilterStore((state) => state.resortId);
  const resort = resorts.find((r) => r.id === resortId);
  const isBeginner = level === 'beginner';

  const [showFilters, setShowFilters] = useState(true);

  const pickupPoint = resort?.pickupPoints[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative bg-hero-pattern text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-ice-300/20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-36 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-ice-200" />
              <span className="text-sm text-ice-100">专业滑雪装备租售平台</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              滑雪装备
              <br />
              <span className="bg-gradient-to-r from-ice-200 via-white to-ice-200 bg-clip-text text-transparent">
                一键租购
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-ice-100 mb-8 max-w-2xl mx-auto animate-slide-up animate-stagger-1">
              智能推荐最适合你的装备，按日期锁定库存，
              <br className="hidden md:block" />
              支持租赁和购买两种模式，灵活满足你的滑雪需求
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up animate-stagger-2">
              <a
                href="#filters"
                className="px-8 py-3.5 bg-gradient-accent text-white font-semibold rounded-xl shadow-lg shadow-accent-500/40 hover:shadow-xl hover:shadow-accent-500/50 hover:-translate-y-0.5 transition-all"
              >
                开始选装备
              </a>
              <a
                href="#equipment"
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                浏览装备
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-snow-50 to-transparent" />
      </section>

      <main className="flex-1 bg-snow-50">
        <div className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div id="filters" className="card p-6 space-y-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-bold text-frost-800">
                        装备推荐设置
                      </h2>
                      <p className="text-sm text-frost-500">
                        填写信息，获取专属装备推荐
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-frost-400 transition-transform ${
                      showFilters ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showFilters && (
                  <div className="space-y-6 pt-2 border-t border-snow-100 animate-slide-down">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ResortSelect />
                      <DatePicker />
                    </div>

                    <div className="pt-2">
                      <BodyInfoForm />
                    </div>

                    <div className="pt-2">
                      <LevelSelect />
                    </div>
                  </div>
                )}
              </div>

              {isBeginner && (
                <SafetyBanner
                  pickupPointName={pickupPoint?.name}
                  pickupPointAddress={pickupPoint?.address}
                  pickupPointOpenTime={pickupPoint?.openTime}
                  pickupPointPhone={pickupPoint?.phone}
                />
              )}

              <div id="equipment" className="pt-6">
                <RecommendSection />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <RentalSummary />

                <div className="card p-5">
                  <h3 className="font-semibold text-frost-800 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    服务保障
                  </h3>
                  <ul className="space-y-2 text-sm text-frost-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      正品装备，定期维护
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      预约锁定，到店即取
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      损坏免赔，安心使用
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="safety" className="py-16 mt-16 bg-gradient-snow">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-frost-800 mb-3">
                安全滑雪，快乐出行
              </h2>
              <p className="text-frost-500">
                我们致力于为每一位滑雪爱好者提供安全、专业的装备和服务
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🛡️',
                  title: '专业认证装备',
                  desc: '所有装备均通过安全认证，定期检查维护',
                },
                {
                  icon: '📏',
                  title: '精准尺码推荐',
                  desc: '根据身高体重智能推荐，确保合脚舒适',
                },
                {
                  icon: '💝',
                  title: '贴心保险服务',
                  desc: '租赁装备含基础保险，损坏免赔更安心',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card p-6 text-center hover:-translate-y-1 transition-transform"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-frost-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-frost-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
