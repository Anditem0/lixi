
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppState, LixiItem } from './types';
import { LIXI_LIST, FORMAT_CURRENCY, getRandomPrizeAmount } from './constants';
import { ScratchCanvas } from './components/ScratchCanvas';

const BlossomEffect: React.FC = () => {
  const blossoms = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
      size: `${10 + Math.random() * 20}px`,
      opacity: 0.4 + Math.random() * 0.6
    }));
  }, []);

  return (
    <>
      {blossoms.map((b) => (
        <span
          key={b.id}
          className="material-symbols-outlined blossom filled"
          style={{
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay,
            fontSize: b.size,
            opacity: b.opacity,
          }}
        >
          filter_vintage
        </span>
      ))}
    </>
  );
};

const FireworkEffect: React.FC = () => {
  const fireworks = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      delay: `${i * 0.8}s`,
      color: i === 0 ? '#FFD700' : i === 1 ? '#FF4500' : '#ADFF2F'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireworks.map((f) => (
        <div 
          key={f.id} 
          className="firework-particle" 
          style={{ 
            left: f.left, 
            animationDelay: f.delay,
            boxShadow: `0 0 ${f.color}, 20px -30px ${f.color}, -40px -60px ${f.color}, 60px -20px ${f.color}, -20px -80px ${f.color}, 40px -100px ${f.color}`
          }} 
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.HOME);
  const [selectedLixi, setSelectedLixi] = useState<LixiItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectLixi = (item: LixiItem) => {
    const randomizedItem = {
      ...item,
      amount: getRandomPrizeAmount()
    };
    setSelectedLixi(randomizedItem);
    setView(AppState.SCRATCH);
    if (window.navigator.vibrate) window.navigator.vibrate(60);
  };

  const handleScratchComplete = useCallback(() => {
    // Enhanced celebratory haptic pattern: heartbeat-like double tap followed by a long burst
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100, 30, 100, 30, 300]);
    }
    setTimeout(() => setView(AppState.RESULT), 1000);
  }, []);

  const resetGame = () => {
    setSelectedLixi(null);
    setView(AppState.HOME);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="relative h-screen w-full max-w-md mx-auto flex flex-col bg-bg-deep overflow-hidden selection:bg-gold/30">
      {/* Background Decor & Effects */}
      <BlossomEffect />
      {view === AppState.RESULT && <FireworkEffect />}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-10%] opacity-10 rotate-12">
          <span className="material-symbols-outlined text-[300px] text-gold">filter_vintage</span>
        </div>
      </div>

      {/* Header UI Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold shadow-lg active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-xl">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto no-scrollbar">
        {view === AppState.HOME && (
          <div className="flex flex-col min-h-full px-5 py-12">
            <header className="text-center mb-10">
              <div className="mb-4 flex justify-center animate-bounce">
                <span className="material-symbols-outlined text-gold text-5xl filled">cruelty_free</span>
              </div>
              <h1 className="text-3xl font-black tracking-widest gold-text uppercase mb-2">
                CÀO LÌ XÌ 2026
              </h1>
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-3"></div>
              <p className="text-gold/60 text-[10px] tracking-[0.3em] font-bold uppercase">Bính Ngọ Đại Cát • Tấn Tài Tấn Lộc</p>
            </header>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {LIXI_LIST.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleSelectLixi(item)}
                  className="group relative aspect-[3/4.5] luxury-gradient rounded-2xl overflow-hidden shadow-2xl border border-gold/30 flex flex-col items-center justify-between p-5 lixi-pattern active:scale-95 transition-all duration-300"
                >
                  <div className="w-full flex justify-between items-start opacity-30 group-hover:opacity-60 transition-opacity">
                    <span className="material-symbols-outlined text-gold text-xs">flare</span>
                    <span className="material-symbols-outlined text-gold text-lg filled">cruelty_free</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center mb-4 bg-white/5 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-gold text-2xl">{item.icon}</span>
                    </div>
                    <p className="text-gold font-bold text-sm tracking-widest gold-text uppercase leading-none">
                      {item.title}
                    </p>
                  </div>
                  <div className="w-full flex justify-center opacity-20">
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                  </div>
                </button>
              ))}
            </div>

            <footer className="mt-10 text-center pb-6">
              <p className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-medium">Chạm một bao lì xì để bắt đầu</p>
            </footer>
          </div>
        )}

        {view === AppState.SCRATCH && selectedLixi && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
            <button onClick={resetGame} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>

            <div className="w-full max-w-[320px] aspect-[3/4.8] bg-primary rounded-[2.5rem] shadow-[0_0_100px_rgba(236,19,19,0.4)] flex flex-col items-center p-2 overflow-hidden ring-2 ring-gold/20">
              <div className="w-full h-full rounded-[2.2rem] border border-yellow-500/30 flex flex-col items-center justify-center relative overflow-hidden bg-primary lixi-pattern">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[300px]">auto_fix_high</span>
                </div>
                
                <div className="relative w-[90%] aspect-square z-10">
                  <div className="w-full h-full bg-[#120202] rounded-3xl border-2 border-yellow-600/30 flex items-center justify-center overflow-hidden relative shadow-inner">
                      <div className="flex flex-col items-center text-center p-4">
                        <span className="text-gold text-5xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                          {FORMAT_CURRENCY(selectedLixi.amount)}
                        </span>
                        <span className="text-yellow-200/50 text-xs font-bold tracking-[0.5em] mt-3 uppercase">Lộc Xuân</span>
                      </div>
                      <div className="absolute inset-0">
                        <ScratchCanvas width={300} height={300} onComplete={handleScratchComplete} />
                      </div>
                  </div>
                </div>

                <div className="mt-10 text-center px-4 z-10">
                  <p className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Cào nhanh tay rước ngay lộc quý</p>
                </div>
              </div>
            </div>

            <div className="mt-10 w-full max-w-[320px] bg-black/30 backdrop-blur-xl rounded-3xl p-5 border border-gold/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-gold text-3xl">flare</span>
                    </div>
                    <div>
                        <h3 className="text-gold font-bold text-sm tracking-wide">Cảm giác cào siêu thực</h3>
                        <p className="text-gray-400 text-[10px] leading-relaxed">Cảm nhận từng đường cào với phản hồi rung tinh tế. Lộc xuân đang ở rất gần!</p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {view === AppState.RESULT && selectedLixi && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 animate-[fadeIn_0.6s_ease-out]">
            <div className="text-center mb-10 relative">
              <div className="mb-4 inline-block scale-125">
                <span className="material-symbols-outlined text-gold text-7xl drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] filled">stars</span>
              </div>
              <h1 className="text-3xl font-black tracking-[0.2em] gold-text uppercase">BÍNH NGỌ PHÁT TÀI!</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-3"></div>
            </div>

            <div className="relative w-full max-w-[320px] aspect-[2/1] bg-vnd-blue rounded-xl border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col p-5 animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px'}}></div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/90 font-black uppercase tracking-tighter">Ngân hàng Nhà nước</span>
                  <span className="text-[9px] text-white/90 font-black uppercase tracking-tighter leading-none">Việt Nam</span>
                </div>
                <span className="text-[10px] text-white/60 font-mono font-bold tracking-widest">2026</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute left-0 w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center blur-[1px]">
                  <span className="material-symbols-outlined text-white/10 text-5xl filled">cruelty_free</span>
                </div>
                <div className="flex flex-col items-center animate-gentle-pulse z-10">
                  <span className="text-5xl font-black tracking-tight shimmer-text">
                    {FORMAT_CURRENCY(selectedLixi.amount)}
                  </span>
                  <span className="text-[11px] font-black text-white/90 tracking-[0.4em] uppercase mt-2">ĐỒNG LỘC XUÂN</span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-[10px] text-white/60 font-medium italic">Tết Bính Ngọ 2026</span>
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/40 text-xl">qr_code_2</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 mb-10">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-[1px] w-10 bg-gold/40"></span>
                <span className="material-symbols-outlined text-gold text-lg filled">celebration</span>
                <span className="h-[1px] w-10 bg-gold/40"></span>
              </div>
              <p className="text-xl font-black text-white px-4 leading-tight">
                “Mừng Xuân Bính Ngọ,<br/>Lộc về đầy ngõ!”
              </p>
            </div>

            <div className="space-y-4 w-full max-w-[320px]">
              <button 
                onClick={resetGame}
                className="w-full h-14 bg-gradient-to-b from-[#FFE08A] via-[#D4AF37] to-[#8A6623] rounded-2xl font-black text-red-900 text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-gold-dark"
              >
                <span className="material-symbols-outlined font-black">restart_alt</span>
                CÀO TIẾP
              </button>
              <button className="w-full h-14 bg-black/50 backdrop-blur-xl border-2 border-gold/40 rounded-2xl font-black text-gold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined font-black">share</span>
                KHOE LỘC XUÂN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav Hint (Only Home) */}
      {view === AppState.HOME && (
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
             <div className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-sm">
                <p className="text-gold text-[8px] font-bold tracking-[0.3em] uppercase italic">Designed for 2026 New Year</p>
             </div>
        </div>
      )}
    </div>
  );
};

export default App;
