import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const WEBHOOK_URL = 'https://hook.eu1.make.com/cv53gsneecdp9ggkapnyjj8d1fp9wa8j';

const AddMedication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    dose: '',
    frequency: 'Günde 1 kez',
    stock: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
        setForm((prev) => ({
          ...prev,
          name: data.name || data.ilac_adi || prev.name,
          dose: data.dose || data.dozaj || prev.dose,
        }));
        toast({
          title: '✅ Analiz tamamlandı',
          description: 'İlaç bilgileri otomatik dolduruldu. Kontrol edip kaydedin.',
        });
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
