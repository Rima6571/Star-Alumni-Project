const MessageList = ({ conversations, selectedId, onSelect }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">Conversations</h3>
      </div>
      <div className="max-h-[560px] overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 ${selectedId === conversation.id ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{conversation.participant}</p>
                <p className="text-xs text-slate-500">{conversation.branch}</p>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">{conversation.messages.at(-1)?.text}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="min-w-5 h-5 rounded-full bg-accent-gold text-slate-900 text-xs font-bold grid place-items-center px-1.5">
                  {conversation.unread}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessageList;

