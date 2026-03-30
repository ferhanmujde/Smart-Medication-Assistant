import { useParams, useNavigate } from 'react-router-dom';
import { mockMedications, RiskLevel } from '@/data/medications';
import { useState } from 'react';

const riskBg: Record<RiskLevel, string> = {
  safe: 'bg-risk-safe/15 border-risk-safe',
  caution: 'bg-risk-caution/15 border-risk-caution',
  danger: 'bg-risk-danger/15 border-risk-danger',
};

const MedicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const med = mockMedications.find((m) => m.id === id);
  const [taken, setTaken] = useState(false);
  const [takenTime, setTakenTime] = useState(med?.lastTaken || '');

  if (!med) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <p className="text-xl">İlaç bulunamadı.</p>
        <button onClick={() => navigate('/')} className="text-secondary font-bold mt-4 min-h-[56px]">← Ana Sayfa</button>
      </div>
    );
  }

  const handleTaken = () => {
    setTaken(true);
    setTakenTime(new Date().toLocaleString('tr-TR'));
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-secondary font-bold text-lg mb-4 min-h-[56px] flex items-center"
      >
        ← Geri
      </button>

      <h1 className="text-3xl font-extrabold mb-2">{med.name}</h1>

      <div className="space-y-3 mb-6">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-lg"><span className="font-bold">Dozaj:</span> {med.dose}</p>
          <p className="text-lg"><span className="font-bold">Kullanım:</span> {med.frequency}</p>
          <p className="text-lg"><span className="font-bold">Saatler:</span> {med.schedule.join(', ')}</p>
          <p className="text-lg"><span className="font-bold">Stok:</span> {med.stock} adet</p>
        </div>

        <div className={`border-2 rounded-lg p-4 ${riskBg[med.risk]}`}>
          <p className="font-bold text-lg mb-1">⚠️ Uyarı</p>
          <p className="text-lg">{med.riskNote}</p>
        </div>
      </div>

      <button
        onClick={handleTaken}
        disabled={taken}
        className={`w-full font-bold text-xl rounded-lg min-h-[64px] transition-opacity shadow-md ${
          taken
            ? 'bg-muted text-muted-foreground'
            : 'bg-primary text-primary-foreground active:opacity-80'
        }`}
      >
        {taken ? '✅ Alındı!' : '✅ İlacı İçtim'}
      </button>

      {(taken || med.lastTaken) && (
        <p className="text-center text-muted-foreground mt-3 text-lg">
          Son alım: {taken ? takenTime : new Date(med.lastTaken!).toLocaleString('tr-TR')}
        </p>
      )}
    </div>
  );
};

export default MedicationDetail;
