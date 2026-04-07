import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatWindow = ({ conversation, onSend }) => {
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  };

  if (!conversation) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm grid place-items-center min-h-[420px] text-slate-500">
        Select a conversation to start messaging.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col min-h-[420px] max-h-[560px]">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">{conversation.participant}</h3>
        <p className="text-xs text-slate-500">{conversation.branch}</p>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-white to-slate-50/80">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'alumni' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${message.sender === 'alumni' ? 'bg-college-blue text-white' : 'bg-slate-100 text-slate-800'}`}>
              <p>{message.text}</p>
              <p className={`text-[11px] mt-1 ${message.sender === 'alumni' ? 'text-blue-100' : 'text-slate-500'}`}>{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="h-10 w-10 rounded-xl bg-college-blue text-white grid place-items-center hover:bg-blue-800" aria-label="Send">
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

