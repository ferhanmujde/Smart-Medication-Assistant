import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMedications, getTodayDoses } from '@/data/medications';
import { toast } from 'sonner';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { Progress } from '@/components/ui/progress';

const UNDO_DURATION = 5000; // 5 seconds

const Home = () => {
  const navigate = useNavigate();
  const { isOnline, savePendingTake } = useOnlineStatus();
  const todayDoses = getTodayDoses(mockMedications);
  const [showTakeButton, setShowTakeButton] = useState(false);
  const [taken, setTaken] = useState(false);

  // Undo mechanism state
  const [undoActive, setUndoActive] = useState(false);
  const [undoProgress, setUndoProgress] = useState(100);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const undoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stock tracking (simulate current stock)
  const [stockLevels, setStockLevels] = useState<Record<string, number>>(() => {
    const levels: Record<string, number> = {};
    mockMedications.forEach((m) => { levels[m.id] = m.stock; });
    return levels;
  });

  const pendingDoses = todayDoses.filter((d) => !d.taken);

  // Auto-show button if there are pending doses
  useEffect(() => {
    if (pendingDoses.length > 0) {
      const timer = setTimeout(() => setShowTakeButton(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const clearUndoTimers = useCallback(() => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
  }, []);

  const confirmMedication = useCallback(() => {
    clearUndoTimers();
    setUndoActive(false);

    // Decrease stock
    const updatedStock = { ...stockLevels };
    pendingDoses.forEach((d) => {
      if (updatedStock[d.medicationId] !== undefined) {
        updatedStock[d.medicationId] = Math.max(0, updatedStock[d.medicationId] - 1);
      }
    });
    setStockLevels(updatedStock);

    // Check low stock
    const lowStockMeds = pendingDoses.filter(
      (d) => updatedStock[d.medicationId] !== undefined && updatedStock[d.medicationId] <= 5
    );

    if (lowStockMeds.length > 0) {
      const names = lowStockMeds.map((d) => d.medicationName).join(', ');
      toast.warning(`⚠️ DİKKAT: ${names} — İlacınız Bitmek Üzere!`, {
        description: `Kalan stok çok düşük. Lütfen eczaneden temin edin.`,
        duration: 8000,
      });
    }

    if (!isOnline) {
      savePendingTake();
      toast.info('📡 İnternet yok — kayıt yerel olarak saklandı. Bağlantı gelince otomatik gönderilecek.');
    } else {
      // TODO: Send to Make.com webhook
      toast.success('✅ İlacınız kaydedildi! Aile üyeleriniz bilgilendirildi.');
    }
  }, [clearUndoTimers, stockLevels, pendingDoses, isOnline, savePendingTake]);

  const handleTakeMedication = () => {
    setTaken(true);
    setShowTakeButton(false);
    setUndoActive(true);
    setUndoProgress(100);

    // Start countdown
    const startTime = Date.now();
    undoIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / UNDO_DURATION) * 100);
      setUndoProgress(remaining);
      if (remaining <= 0) {
        clearInterval(undoIntervalRef.current!);
      }
    }, 50);

    undoTimerRef.current = setTimeout(() => {
      confirmMedication();
    }, UNDO_DURATION);
  };

  const handleUndo = () => {
    clearUndoTimers();
    setUndoActive(false);
    setTaken(false);
    setShowTakeButton(true);
    toast.info('↩️ İşlem iptal edildi. İlacınız kaydedilmedi.');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearUndoTimers();
  }, [clearUndoTimers]);

  const navButtons = [
    { label: '📷 İlaç Ekle', path: '/add', color: 'bg-nav-green' },
    { label: '💊 Tüm İlaçlarım', path: '/medications', color: 'bg-nav-blue' },
    { label: '👨‍👩‍👧 Aile Görünümü', path: '/family', color: 'bg-nav-purple' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-28 max-w-lg mx-auto">
      {/* Offline banner */}
      {!isOnline && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-3 mb-4 text-center">
          <p className="text-lg font-bold text-destructive">📡 İnternet Bağlantısı Yok</p>
          <p className="text-sm text-destructive/80">Verileriniz yerel olarak saklanacak</p>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">💊 İlaç Asistanınız</h1>
        <p className="text-xl text-muted-foreground mt-1">Günaydın, Ayşe Teyze!</p>
      </header>

      {/* Today's medications */}
      <section className="bg-card rounded-lg border p-4 mb-4 shadow-sm">
        <h2 className="text-xl font-bold mb-3">📅 Bugünkü İlaçlarınız</h2>
        <div className="space-y-3">
          {todayDoses.map((dose, i) => {
            const stock = stockLevels[dose.medicationId];
            const isLowStock = stock !== undefined && stock <= 5;
            return (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg p-3 ${
                  isLowStock ? 'bg-destructive/10 border border-destructive/30' : 'bg-muted'
                }`}
              >
                <div>
                  <p className="font-bold text-lg">{dose.medicationName} {dose.dose}</p>
                  <p className="text-muted-foreground">🕐 {dose.time}</p>
                  {isLowStock && (
                    <p className="text-destructive font-bold text-sm animate-pulse mt-1">
                      ⚠️ Stok: {stock} — Bitmek üzere!
                    </p>
                  )}
                </div>
                <span className="text-2xl">{dose.taken || taken ? '✅' : '⏳'}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Undo bar — shown for 5 seconds after pressing İlacı İçtim */}
      {undoActive && (
        <div className="mb-6 space-y-2">
          <button
            onClick={handleUndo}
            className="w-full bg-destructive text-destructive-foreground font-extrabold text-2xl rounded-xl py-6 min-h-[72px] shadow-lg active:scale-95 transition-transform"
          >
            ❌ İPTAL ET (GERİ AL)
          </button>
          <Progress value={undoProgress} className="h-3 rounded-full" />
          <p className="text-center text-muted-foreground font-bold text-base">
            ⏳ {Math.ceil((undoProgress / 100) * 5)} saniye içinde otomatik kaydedilecek...
          </p>
        </div>
      )}

      {/* "İlacı İçtim" CTA — visible only after voice alert */}
      {showTakeButton && !taken && !undoActive && (
        <button
          onClick={handleTakeMedication}
          className="w-full bg-primary text-primary-foreground font-extrabold text-2xl rounded-xl py-6 min-h-[72px] mb-6 shadow-lg active:scale-95 transition-transform animate-pulse"
          style={{ animation: 'pulse 2s infinite' }}
        >
          {isOnline ? '✅ İlacı İçtim' : '📡 İlacı İçtim (Çevrimdışı)'}
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
