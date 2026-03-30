import { useNavigate } from 'react-router-dom';
import { useState, useRef, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

const WEBHOOK_URL = 'https://hook.eu1.make.com/cv53gsneecdp9ggkapnyjj8d1fp9wa8j';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

const FREQUENCY_MAP: Record<string, number> = {
  'Günde 1 kez': 1,
  'Günde 2 kez': 2,
  'Günde 3 kez': 3,
  'Haftada 1 kez': 1,
};

const DEFAULT_TIMES: Record<string, string[]> = {
  'Günde 1 kez': ['08:00'],
  'Günde 2 kez': ['08:00', '20:00'],
  'Günde 3 kez': ['08:00', '14:00', '20:00'],
  'Haftada 1 kez': ['09:00'],
};

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  active: boolean;
  onFocus: () => void;
}

const TimePicker = ({ value, onChange, label, active, onFocus }: TimePickerProps) => {
  const [hour, minute] = value.split(':');
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={onFocus}
      className={`flex-1 rounded-xl p-3 transition-all cursor-pointer ${
        active
          ? 'ring-2 ring-secondary shadow-lg bg-card'
          : 'bg-muted shadow-sm'
      }`}
    >
      <p className="text-sm font-bold text-muted-foreground mb-2 text-center">{label}</p>
      <div className="flex items-center justify-center gap-1">
        {/* Hour scroller */}
        <div
          ref={hourRef}
          className="h-[120px] overflow-y-auto snap-y snap-mandatory scrollbar-hide rounded-lg bg-background w-16"
        >
          {HOURS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onChange(`${h}:${minute}`)}
              className={`w-full snap-center flex items-center justify-center h-10 text-2xl font-extrabold transition-colors ${
                h === hour
                  ? 'bg-secondary text-secondary-foreground rounded-lg'
                  : 'text-foreground/60'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
        <span className="text-3xl font-extrabold text-foreground">:</span>
        {/* Minute scroller */}
        <div
          ref={minuteRef}
          className="h-[120px] overflow-y-auto snap-y snap-mandatory scrollbar-hide rounded-lg bg-background w-16"
        >
          {MINUTES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChange(`${hour}:${m}`)}
              className={`w-full snap-center flex items-center justify-center h-10 text-2xl font-extrabold transition-colors ${
                m === minute
                  ? 'bg-secondary text-secondary-foreground rounded-lg'
                  : 'text-foreground/60'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-xl font-extrabold mt-2 text-foreground">{value}</p>
    </div>
  );
};

const AddMedication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    dose: '',
    frequency: 'Günde 1 kez',
    stock: '',
  });
  const [times, setTimes] = useState<string[]>(DEFAULT_TIMES['Günde 1 kez']);
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<{ name: string; dose: string } | null>(null);

  const timeCount = useMemo(() => FREQUENCY_MAP[form.frequency] || 1, [form.frequency]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'frequency') {
      const defaults = DEFAULT_TIMES[value] || ['08:00'];
      setTimes(defaults);
      setActiveTimeIndex(0);
    }
  };

  const handleTimeChange = (index: number, value: string) => {
    setTimes((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const analyzePhoto = async (file: File) => {
    setAnalyzing(true);
    toast({
      title: '📋 İlaç analiz ediliyor...',
      description: 'Fotoğraf Gemini ile inceleniyor.',
    });
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('action', 'analyze');

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const analyzedName = data.name || data.ilac_adi || '';
        const analyzedDose = data.dose || data.dozaj || '';
        setPendingAnalysis({ name: analyzedName, dose: analyzedDose });
      } else {
        toast({
          title: '⚠️ Analiz başarısız',
          description: 'Bilgileri manuel olarak girebilirsiniz.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: '❌ Bağlantı hatası',
        description: 'Analiz yapılamadı. Bilgileri manuel girebilirsiniz.',
        variant: 'destructive',
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleConfirmAnalysis = () => {
    if (pendingAnalysis) {
      setForm((prev) => ({
        ...prev,
        name: pendingAnalysis.name,
        dose: pendingAnalysis.dose,
      }));
      toast({ title: '✅ Bilgiler onaylandı' });
      setPendingAnalysis(null);
    }
  };

  const handleRejectAnalysis = () => {
    setPendingAnalysis(null);
    toast({ title: '✏️ Bilgileri kendiniz girebilirsiniz' });
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
      analyzePhoto(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const formData = new FormData();
      formData.append('action', 'save');
      formData.append('name', form.name);
      formData.append('dose', form.dose);
      formData.append('frequency', form.frequency);
      formData.append('stock', form.stock);
      formData.append('hatirlatma_saatleri', JSON.stringify(times.slice(0, timeCount)));
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: '✅ İlaç kaydedildi',
          description: 'Airtable\'a başarıyla gönderildi.',
        });
        navigate('/');
      } else {
        toast({
          title: '❌ Gönderim başarısız',
          description: 'Lütfen tekrar deneyin.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: '❌ Bağlantı hatası',
        description: 'İnternet bağlantınızı kontrol edin.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-secondary font-bold text-lg mb-4 min-h-[56px] flex items-center"
      >
        ← Geri
      </button>

      <h1 className="text-2xl font-extrabold mb-4">📷 İlaç Ekle</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handlePhotoSelect}
      />

      {photoPreview ? (
        <div className="relative mb-6">
          <img src={photoPreview} alt="İlaç fotoğrafı" className="w-full rounded-lg border shadow-sm max-h-[240px] object-cover" />
          {analyzing && (
            <div className="absolute inset-0 bg-background/70 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold animate-pulse">🔍 Analiz ediliyor...</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 bg-primary text-primary-foreground font-bold text-base rounded-lg px-4 py-2 min-h-[44px] active:opacity-80 shadow-md"
          >
            📷 Değiştir
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-muted border-2 border-dashed border-border rounded-lg min-h-[80px] text-xl font-bold text-muted-foreground mb-6 active:bg-border transition-colors"
        >
          📷 Fotoğraf Çek
        </button>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold text-lg mb-1">İlaç Adı</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={analyzing ? 'Analiz ediliyor...' : 'örn. Beloc'}
            disabled={analyzing}
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block font-bold text-lg mb-1">Dozaj</label>
          <input
            type="text"
            value={form.dose}
            onChange={(e) => handleChange('dose', e.target.value)}
            placeholder={analyzing ? 'Analiz ediliyor...' : 'örn. 50mg'}
            disabled={analyzing}
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block font-bold text-lg mb-1">Kullanım Sıklığı</label>
          <select
            value={form.frequency}
            onChange={(e) => handleChange('frequency', e.target.value)}
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Günde 1 kez</option>
            <option>Günde 2 kez</option>
            <option>Günde 3 kez</option>
            <option>Haftada 1 kez</option>
          </select>
        </div>

        {/* Hatırlatma Saatleri */}
        <div>
          <label className="flex items-center gap-2 font-bold text-lg mb-3">
            <Clock size={22} className="text-nav-orange" />
            İlaç Saatleri
          </label>
          <div className={`grid gap-3 ${timeCount === 1 ? 'grid-cols-1' : timeCount === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {times.slice(0, timeCount).map((t, i) => (
              <TimePicker
                key={i}
                value={t}
                onChange={(v) => handleTimeChange(i, v)}
                label={`${i + 1}. Doz`}
                active={activeTimeIndex === i}
                onFocus={() => setActiveTimeIndex(i)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block font-bold text-lg mb-1">Stok Sayısı</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            placeholder="örn. 30"
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={sending || analyzing}
          className="w-full bg-primary text-primary-foreground font-bold text-xl rounded-lg min-h-[64px] active:opacity-80 transition-opacity shadow-md mt-4 disabled:opacity-50"
        >
          {sending ? '⏳ Gönderiliyor...' : '💾 Kaydet'}
        </button>
      </form>
    </div>
  );
};

export default AddMedication;
