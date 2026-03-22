import { useNavigate } from 'react-router-dom';
import { mockMedications, RiskLevel } from '@/data/medications';

const riskConfig: Record<RiskLevel, { label: string; emoji: string; className: string }> = {
  safe: { label: 'Güvenli', emoji: '🟢', className: 'bg-risk-safe text-primary-foreground' },
  caution: { label: 'Dikkat', emoji: '🟡', className: 'bg-risk-caution text-foreground' },
  danger: { label: 'Tehlikeli', emoji: '🔴', className: 'bg-risk-danger text-primary-foreground' },
};

const MedicationList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-secondary font-bold text-lg mb-4 inline-block min-h-[56px] flex items-center"
      >
        ← Geri
      </button>
      <h1 className="text-2xl font-extrabold mb-4">💊 Tüm İlaçlarım</h1>

      <div className="space-y-3">
        {mockMedications.map((med) => {
          const risk = riskConfig[med.risk];
          return (
            <button
              key={med.id}
              onClick={() => navigate(`/medications/${med.id}`)}
              className="w-full bg-card border rounded-lg p-4 text-left shadow-sm active:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">{med.name} {med.dose}</h2>
                <span className={`text-base font-bold px-3 py-1 rounded-full ${risk.className}`}>
                  {risk.emoji} {risk.label}
                </span>
              </div>
              <p className="text-muted-foreground">{med.frequency}</p>
              <p className="text-muted-foreground">📦 Stok: {med.stock} adet</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MedicationList;
