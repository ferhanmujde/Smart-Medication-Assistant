import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMedications, getTodayDoses } from '@/data/medications';
import { toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const todayDoses = getTodayDoses(mockMedications);
  const [showTakeButton, setShowTakeButton] = useState(false);
  const [taken, setTaken] = useState(false);

  // Simulate: after voice alert is read, show the button
  // In production this would be triggered by Airtable's bekleyen_sesli_uyari
  const pendingDoses = todayDoses.filter((d) => !d.taken);

  // Auto-show button if there are pending doses (simulating voice alert completion)
  useState(() => {
    if (pendingDoses.length > 0) {
      const timer = setTimeout(() => setShowTakeButton(true), 1500);
      return () => clearTimeout(timer);
    }
  });

  const handleTakeMedication = () => {
    setTaken(true);
    setShowTakeButton(false);
    toast.success('✅ İlacınız kaydedildi! Aile üyeleriniz bilgilendirildi.');
  };

  const navButtons = [
    { label: '📷 İlaç Ekle', path: '/add', color: 'bg-nav-green' },
    { label: '💊 Tüm İlaçlarım', path: '/medications', color: 'bg-nav-blue' },
    { label: '👨‍👩‍👧 Aile Görünümü', path: '/family', color: 'bg-nav-purple' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-28 max-w-lg mx-auto">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">💊 İlaç Asistanınız</h1>
        <p className="text-xl text-muted-foreground mt-1">Günaydın, Ayşe Teyze!</p>
      </header>

      {/* Today's medications */}
      <section className="bg-card rounded-lg border p-4 mb-4 shadow-sm">
        <h2 className="text-xl font-bold mb-3">📅 Bugünkü İlaçlarınız</h2>
        <div className="space-y-3">
          {todayDoses.map((dose, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-muted rounded-lg p-3"
            >
              <div>
                <p className="font-bold text-lg">{dose.medicationName} {dose.dose}</p>
                <p className="text-muted-foreground">🕐 {dose.time}</p>
              </div>
              <span className="text-2xl">{dose.taken || taken ? '✅' : '⏳'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* "İlacı İçtim" CTA — visible only after voice alert */}
      {showTakeButton && !taken && (
        <button
          onClick={handleTakeMedication}
          className="w-full bg-primary text-primary-foreground font-extrabold text-2xl rounded-xl py-6 min-h-[72px] mb-6 shadow-lg active:scale-95 transition-transform animate-pulse"
          style={{ animation: 'pulse 2s infinite' }}
        >
          ✅ İlacı İçtim
        </button>
      )}

      {/* Navigation buttons */}
      <nav className="space-y-3 mb-6">
        {navButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            className={`w-full ${btn.color} text-primary-foreground font-bold text-xl rounded-lg py-4 min-h-[56px] active:opacity-80 transition-opacity shadow-md`}
          >
            {btn.label}
          </button>
        ))}
      </nav>

      {/* Warning */}
      <p className="text-center text-muted-foreground text-base">
        ⚠️ Bu uygulama tıbbi tavsiye yerine geçmez.
      </p>

      {/* AI Assistant FAB */}
      <button
        onClick={() => navigate('/assistant')}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-nav-orange text-primary-foreground shadow-xl flex items-center justify-center text-3xl active:scale-90 transition-transform z-50"
        aria-label="AI Asistan"
      >
        🤖
      </button>
    </div>
  );
};

export default Home;
