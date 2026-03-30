import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const FamilyView = () => {
  const navigate = useNavigate();

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://ilac-asistan.app/aile/abc123');
    toast.success('📋 Link kopyalandı!');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/?text=İlaç listem: https://ilac-asistan.app/aile/abc123', '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-5 pb-8 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold text-secondary mb-4 min-h-[56px] px-2 active:opacity-80"
      >
        ← Geri
      </button>

      <h1 className="text-2xl font-extrabold text-center mb-6">👨‍👩‍👧 Aile Görünümü</h1>

      {/* QR Code placeholder */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px] mb-6 shadow-md">
        {/* Simulated QR code pattern */}
        <div className="w-48 h-48 bg-foreground rounded-lg p-3 mb-4">
          <div className="w-full h-full bg-background rounded-sm grid grid-cols-7 grid-rows-7 gap-[2px] p-2">
            {Array.from({ length: 49 }).map((_, i) => {
              // Create a QR-like pattern
              const isCorner = (i < 3 || (i >= 4 && i < 7)) && (Math.floor(i / 7) < 3) ||
                (i % 7 < 3 && Math.floor(i / 7) < 3) ||
                (i % 7 > 3 && Math.floor(i / 7) < 3) ||
                (i % 7 < 3 && Math.floor(i / 7) > 3);
              const isRandom = [10, 12, 15, 18, 22, 25, 30, 33, 36, 38, 40, 44, 47].includes(i);
              const isFilled = isCorner || isRandom;
              return (
                <div
                  key={i}
                  className={`rounded-[1px] ${isFilled ? 'bg-foreground' : 'bg-background'}`}
                />
              );
            })}
          </div>
        </div>
        <p className="text-2xl font-extrabold text-foreground text-center">📱 QR Kodu Okutun</p>
        <p className="text-base text-muted-foreground font-bold mt-1 text-center">
          Aile üyeleriniz bu kodu telefonlarıyla okutabilir
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <button
          onClick={handleCopyLink}
          className="w-full bg-nav-blue text-primary-foreground font-extrabold text-xl rounded-2xl py-5 min-h-[64px] active:scale-95 transition-transform shadow-[0_4px_16px_-2px_hsl(var(--nav-blue)/0.4)]"
        >
          📋 Linki Kopyala
        </button>
        <button
          onClick={handleWhatsApp}
          className="w-full bg-primary text-primary-foreground font-extrabold text-xl rounded-2xl py-5 min-h-[64px] active:scale-95 transition-transform shadow-[0_4px_16px_-2px_hsl(var(--primary)/0.4)]"
        >
          📱 WhatsApp'tan Gönder
        </button>
      </div>

      <p className="text-center text-muted-foreground text-base font-bold">
        Aile üyeleri ilaç listenizi görüntüleyebilir.
      </p>
    </div>
  );
};

export default FamilyView;
