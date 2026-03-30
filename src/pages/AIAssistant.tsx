import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const quickQuestions = [
  '🍽️ Aç mı tok mu?',
  '💊 Yan etkiler?',
  '☕ Çay/kahve?',
  '😴 Uyku yapar mı?',
  '🍺 Alkol olur mu?',
  '💊 Dozu atladım',
  '⏰ Ne zaman içmeliyim?',
];

const aiResponses: Record<string, string> = {
  '🍽️ Aç mı tok mu?': 'Glucophage yemekle birlikte alınmalıdır. Beloc aç veya tok alınabilir. Coumadin genellikle aynı saatte, tercihen akşam alınır.',
  '💊 Yan etkiler?': 'Beloc: baş dönmesi, yorgunluk. Coumadin: kanama riski. Glucophage: mide bulantısı, ishal. Şikayetleriniz devam ederse doktorunuza danışın.',
  '☕ Çay/kahve?': 'Çay ve kahve ilaçlarınızla birlikte alınmamalıdır. İlaçlarınızı aldıktan en az 1 saat sonra çay/kahve içebilirsiniz.',
  '😴 Uyku yapar mı?': 'Beloc uyku hali yapabilir. Araç kullanırken dikkatli olun. Diğer ilaçlarınızın belirgin bir uyku etkisi yoktur.',
  '🍺 Alkol olur mu?': 'Coumadin kullanırken alkol kesinlikle önerilmez. Kanama riskini artırır. Diğer ilaçlarla da alkol tüketimini minimumda tutmanız önerilir.',
  '💊 Dozu atladım': 'Atladığınız dozu hatırladığınızda hemen alın. Bir sonraki doz zamanına yakınsa, atlanan dozu atlayın. Asla çift doz almayın!',
  '⏰ Ne zaman içmeliyim?': 'Beloc sabah 08:00\'de, Coumadin akşam 20:00\'de, Glucophage sabah 08:00 ve akşam 20:00\'de alınmalıdır. Her gün aynı saatte almaya özen gösterin.',
};

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Merhaba! 👋 Size ilaçlarınız hakkında yardımcı olabilirim. Bir soru sorun veya aşağıdaki hızlı sorulardan birini seçin.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const DISCLAIMER = '\n\n⚕️ Bu bir tıbbi tavsiye değildir, doktorunuza danışın.';

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    const rawResponse = aiResponses[text] || 'Bu konuda doktorunuza danışmanızı öneririm. Size genel bilgi verebilirim ama her durumda uzman görüşü önemlidir. 🩺';
    const aiMsg: Message = { role: 'ai', text: rawResponse + DISCLAIMER };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <button
          onClick={() => navigate('/')}
          className="text-secondary font-bold text-lg min-h-[56px] flex items-center"
        >
          ← Geri
        </button>
        <h1 className="text-2xl font-extrabold">🤖 AI Asistanım</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-lg ${
                msg.role === 'user'
                  ? 'bg-chat-user text-foreground rounded-br-md'
                  : 'bg-chat-ai text-foreground rounded-bl-md'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions — large buttons above input */}
      <div className="px-4 py-3 border-t border-border bg-muted/50">
        <p className="text-sm font-bold text-muted-foreground mb-2">Hızlı Sorular:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="bg-card text-foreground font-bold px-4 py-3 rounded-2xl text-base min-h-[48px] border border-border shadow-sm active:scale-95 transition-transform"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Sorunuzu yazın..."
            className="flex-1 border rounded-xl p-3 text-lg bg-background min-h-[56px] focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-muted text-foreground font-bold text-lg rounded-xl min-h-[56px] active:bg-border transition-colors">
            🎤 Sesli Sor
          </button>
          <button
            onClick={() => sendMessage(input)}
            className="flex-1 bg-nav-orange text-primary-foreground font-bold text-lg rounded-xl min-h-[56px] active:opacity-80 transition-opacity"
          >
            Gönder ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
