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
    { label: '📷 İlaç Ekle', path: '/add', color: 'bg-nav-orange' },
    { label: '📋 Tüm İlaçlarım', path: '/medications', color: 'bg-nav-blue' },
    { label: '👨‍👩‍👧 Aile Görünümü', path: '/family', color: 'bg-nav-blue' },
  ];

  return (
    <div className="min-h-screen bg-background p-5 pb-28 max-w-lg mx-auto">
      {/* Offline banner */}
      {!isOnline && (
        <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-4 mb-5 text-center">
          <p className="text-xl font-extrabold text-destructive">📡 İnternet Bağlantısı Yok</p>
          <p className="text-base text-destructive/80 font-bold">Verileriniz yerel olarak saklanacak</p>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">💊 İlaç Asistanınız</h1>
        <p className="text-xl text-muted-foreground mt-2 font-bold">Günaydın, Ayşe Teyze!</p>
      </header>

      {/* Today's medications */}
      <section className="bg-card rounded-xl border-2 border-border p-5 mb-6 shadow-md">
        <h2 className="text-2xl font-extrabold mb-4 text-foreground">📅 Bugünkü İlaçlarınız</h2>
        <div className="space-y-4">
          {todayDoses.map((dose, i) => {
            const stock = stockLevels[dose.medicationId];
            const isLowStock = stock !== undefined && stock <= 5;
            return (
              <div
                key={i}
                className={`flex items-center justify-between rounded-xl p-4 ${
                  isLowStock ? 'bg-destructive/10 border-2 border-destructive/40' : 'bg-muted'
                }`}
              >
                <div>
                  <p className="font-extrabold text-xl text-foreground">{dose.medicationName} {dose.dose}</p>
                  <p className="text-muted-foreground font-bold text-lg">🕐 {dose.time}</p>
                  {isLowStock && (
                    <p className="text-destructive font-extrabold text-base animate-pulse mt-1">
                      ⚠️ Stok: {stock} — Bitmek üzere!
                    </p>
                  )}
                </div>
                <span className="text-3xl">{dose.taken || taken ? '✅' : '⏳'}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Undo bar */}
      {undoActive && (
        <div className="mb-8 space-y-3">
          <button
            onClick={handleUndo}
            className="w-full bg-destructive text-destructive-foreground font-extrabold text-2xl rounded-xl py-7 min-h-[80px] shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3"
          >
            ❌ İPTAL ET (GERİ AL)
          </button>
          <Progress value={undoProgress} className="h-4 rounded-full" />
          <p className="text-center text-muted-foreground font-extrabold text-lg">
            ⏳ {Math.ceil((undoProgress / 100) * 5)} saniye içinde otomatik kaydedilecek...
          </p>
        </div>
      )}

      {/* "İlacı İçtim" CTA — massive, 25%+ of screen */}
      {showTakeButton && !taken && !undoActive && (
        <button
          onClick={handleTakeMedication}
          className="w-full bg-primary text-primary-foreground font-extrabold text-3xl rounded-2xl py-10 min-h-[25vh] mb-8 shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-4 animate-pulse"
        >
          💊 {isOnline ? 'İlacı İçtim' : 'İlacı İçtim (Çevrimdışı)'}
        </button>
      )}

      {/* Navigation buttons */}
      <nav className="space-y-5 mb-8">
        {navButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            className={`w-full ${btn.color} text-white font-extrabold text-xl rounded-xl py-5 min-h-[64px] active:scale-95 transition-transform shadow-lg flex items-center justify-center gap-3`}
          >
            {btn.label}
          </button>
        ))}
      </nav>

      {/* Warning — separate area */}
      <div className="bg-muted rounded-xl p-4 border border-border">
        <p className="text-center text-muted-foreground text-base font-bold">
          ⚠️ Bu uygulama tıbbi tavsiye yerine geçmez.
        </p>
      </div>

      {/* AI Assistant FAB */}
      <button
        onClick={() => navigate('/assistant')}
        className="fixed bottom-6 right-6 w-18 h-18 rounded-full bg-nav-orange text-white shadow-2xl flex items-center justify-center text-3xl active:scale-90 transition-transform z-50"
        style={{ width: 72, height: 72 }}
        aria-label="AI Asistan"
      >
        🤖
      </button>
    </div>
  );
};

export default Home;
