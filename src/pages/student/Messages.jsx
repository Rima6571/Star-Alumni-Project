import { useEffect, useMemo, useState } from 'react';
import MessageList from '../../components/MessageList';
import ChatWindow from '../../components/ChatWindow';
import LoadingState from '../../components/LoadingState';
import { messageApi } from '../../services/api';
import { conversations as fallbackConversations } from '../../data/studentMockData';
import { useToast } from '../../components/ToastProvider';

const extractConversations = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.conversations)) return data.conversations;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapConversationForUi = (item) => ({
  id: item.id || item.userId,
  participant: item.participant || 'Conversation',
  branch: item.branch || '',
  unread: item.unread || 0,
  messages: item.messages || [],
});

const Messages = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messageApi.getMessages();
        const data = extractConversations(response, fallbackConversations).map(mapConversationForUi);
        setConversations(data);
        setSelectedId(data[0]?.id || '');
      } catch {
        setConversations(fallbackConversations);
        setSelectedId(fallbackConversations[0]?.id || '');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const activeConversation = useMemo(() => conversations.find((item) => item.id === selectedId), [conversations, selectedId]);

  const handleSend = (text) => {
    setConversations((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              messages: [...item.messages, { id: Date.now(), sender: 'student', text, time: 'Now' }],
            }
          : item,
      ),
    );
    showToast('Message sent', 'success');
  };

  if (loading) return <LoadingState label="Loading messages..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-sm text-slate-600 mt-1">Chat with alumni mentors and recruiters in real time.</p>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-4">
        <MessageList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
        <ChatWindow conversation={activeConversation} onSend={handleSend} />
      </div>
    </section>
  );
};

export default Messages;

