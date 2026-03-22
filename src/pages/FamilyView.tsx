import { useNavigate } from 'react-router-dom';

const FamilyView = () => {
  const navigate = useNavigate();

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://ilac-asistan.app/aile/abc123');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/?text=İlaç listem: https://ilac-asistan.app/aile/abc123', '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-8 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold text-primary mb-4 min-h-[56px] px-2 active:opacity-80"
      >
        ← Geri
      </button>

      <h1 className="text-2xl font-extrabold text-center mb-6">👨‍👩‍👧 Aile Görünümü</h1>

      <div className="bg-card border rounded-lg p-8 flex items-center justify-center min-h-[240px] mb-6 shadow-sm">
        <p className="text-xl text-muted-foreground font-semibold text-center">QR Kod burada görünecek</p>
      </div>

      <div className="space-y-3 mb-8">
        <button
          onClick={handleCopyLink}
          className="w-full bg-nav-blue text-primary-foreground font-bold text-xl rounded-lg py-4 min-h-[56px] active:opacity-80 transition-opacity shadow-md"
        >
          📋 Linki Kopyala
        </button>
        <button
          onClick={handleWhatsApp}
          className="w-full bg-nav-green text-primary-foreground font-bold text-xl rounded-lg py-4 min-h-[56px] active:opacity-80 transition-opacity shadow-md"
        >
          📱 WhatsApp'tan Gönder
        </button>
      </div>

      <p className="text-center text-muted-foreground text-base">
        Aile üyeleri ilaç listenizi görüntüleyebilir.
      </p>
    </div>
  );
};

export default FamilyView;
