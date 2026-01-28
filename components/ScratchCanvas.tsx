
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCanvasProps {
  onComplete: () => void;
  width: number;
  height: number;
}

export const ScratchCanvas: React.FC<ScratchCanvasProps> = ({ onComplete, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const lastVibrateTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial state: Golden Scratch Layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#b8860b');
    gradient.addColorStop(0.5, '#ffd700');
    gradient.addColorStop(1, '#b8860b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add texture for a more realistic metallic look
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < 800; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }
  }, [width, height]);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    // Tăng kích thước cọ lên 50 để cào nhanh hơn
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();

    // Haptic Feedback during scratching (throttled for performance and subtlety)
    const now = Date.now();
    if (now - lastVibrateTime.current > 60) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(8); // Tiny pulse to simulate scratch resistance
      }
      lastVibrateTime.current = now;
    }

    // Check completion
    const imageData = ctx.getImageData(0, 0, width, height);
    let transparentPixels = 0;
    // Sample more efficiently
    for (let i = 3; i < imageData.data.length; i += 16) {
      if (imageData.data[i] < 128) transparentPixels++;
    }
    const percent = (transparentPixels / (width * height / 4)) * 100;
    setScratchedPercent(percent);
    
    // Giảm ngưỡng hoàn thành xuống 35% để dễ trúng hơn
    if (percent > 35) {
      onComplete();
    }
  }, [width, height, onComplete]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPressed(true);
    handleMove(e);
  };

  const handleMouseUp = () => setIsPressed(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPressed && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    scratch(x, y);
  };

  return (
    <div className="relative w-full h-full cursor-pointer touch-none">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full rounded-2xl shadow-2xl transition-opacity duration-700"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMove}
        onTouchEnd={handleMouseUp}
        style={{ opacity: scratchedPercent > 35 ? 0 : 1 }}
      />
      {scratchedPercent < 5 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-pulse">
            <span className="material-symbols-outlined text-white/90 text-6xl">touch_app</span>
            <p className="text-white font-bold tracking-widest mt-4 uppercase text-xs">Vuốt để nhận lộc</p>
        </div>
      )}
    </div>
  );
};
