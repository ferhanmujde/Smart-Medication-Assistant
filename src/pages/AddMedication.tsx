import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const AddMedication = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dose: '',
    frequency: 'Günde 1 kez',
    stock: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('İlaç kaydedildi! (Demo)');
    navigate('/');
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
            placeholder="örn. Beloc"
            required
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block font-bold text-lg mb-1">Dozaj</label>
          <input
            type="text"
            value={form.dose}
            onChange={(e) => handleChange('dose', e.target.value)}
            placeholder="örn. 50mg"
            required
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring"
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
            required
            className="w-full border rounded-lg p-3 text-lg bg-card min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-bold text-xl rounded-lg min-h-[64px] active:opacity-80 transition-opacity shadow-md mt-4"
        >
          💾 Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddMedication;
