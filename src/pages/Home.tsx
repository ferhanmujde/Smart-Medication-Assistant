import { useNavigate } from 'react-router-dom';
import { mockMedications, getTodayDoses } from '@/data/medications';

const Home = () => {
  const navigate = useNavigate();
  const todayDoses = getTodayDoses(mockMedications);

  const navButtons = [
    { label: '📷 İlaç Ekle', path: '/add', color: 'bg-nav-green' },
    { label: '💊 Tüm İlaçlarım', path: '/medications', color: 'bg-nav-blue' },
    { label: '👨‍👩‍👧 Aile Görünümü', path: '/family', color: 'bg-nav-purple' },
    { label: '💬 AI Asistanım', path: '/assistant', color: 'bg-nav-orange' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-8 max-w-lg mx-auto">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">💊 İlaç Asistanınız</h1>
        <p className="text-xl text-muted-foreground mt-1">Günaydın, Ayşe Teyze!</p>
      </header>

      {/* Today's medications */}
      <section className="bg-card rounded-lg border p-4 mb-6 shadow-sm">
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
              <span className="text-2xl">{dose.taken ? '✅' : '⏳'}</span>
            </div>
          ))}
        </div>
      </section>

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
    </div>
  );
};

export default Home;
