'use client'

export function Hero3DFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #8b5cf6, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      
      {/* CSS particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  )
}
