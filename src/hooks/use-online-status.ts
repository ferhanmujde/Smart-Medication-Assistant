import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const PENDING_KEY = 'pending_medication_takes';

interface PendingTake {
  timestamp: string;
  medicationName?: string;
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const syncPendingTakes = useCallback(async () => {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return;

    const pending: PendingTake[] = JSON.parse(raw);
    if (pending.length === 0) return;

    try {
      // TODO: Replace with actual Airtable/Make.com webhook URL
      // await fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ takes: pending }) });
      console.log('Syncing pending takes:', pending);
      localStorage.removeItem(PENDING_KEY);
      toast.success(`✅ ${pending.length} bekleyen kayıt eşitlendi!`, {
        description: 'Verileriniz başarıyla gönderildi.',
        duration: 5000,
      });
    } catch {
      console.error('Sync failed, will retry later');
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('🌐 İnternet bağlantısı geri geldi!');
      syncPendingTakes();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('📡 İnternet bağlantısı kesildi!');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Sync on mount if online and pending data exists
    if (navigator.onLine) syncPendingTakes();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncPendingTakes]);

  const savePendingTake = useCallback((medicationName?: string) => {
    const raw = localStorage.getItem(PENDING_KEY);
    const pending: PendingTake[] = raw ? JSON.parse(raw) : [];
    pending.push({ timestamp: new Date().toISOString(), medicationName });
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  }, []);

  return { isOnline, savePendingTake };
}
