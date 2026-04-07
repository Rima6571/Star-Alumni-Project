import { useEffect, useMemo, useState } from 'react';
import ChatWindow from '../../components/ChatWindow';
import LoadingState from '../../components/LoadingState';
import MessageList from '../../components/MessageList';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';
import { mockConversations } from './mockData';

const extractConversations = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.conversations)) return data.conversations;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapConversationsForUi = (conversations) =>
  conversations.map((conversation) => ({
    id: conversation.userId || conversation.id,
    participant: conversation.participant,
    branch: conversation.branch || '',
    unread: conversation.unread || 0,
    messages: [],
  }));

const mapMessagesForUi = (messages, currentUserId) =>
  messages.map((message) => ({
    id: message._id,
    sender: message.sender?._id === currentUserId ? 'alumni' : 'student',
    text: message.message,
    time: new Date(message.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

const Messages = () => {
  const { pushToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const loadConversationMessages = async (userId, authUserId) => {
    const response = await alumniApi.getConversation(userId);
    const apiMessages = response?.data?.messages || [];
    const mapped = mapMessagesForUi(apiMessages, authUserId);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === userId
          ? {
              ...conversation,
              messages: mapped,
            }
          : conversation,
      ),
    );
  };

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const meRes = await alumniApi.getProfile();
        const authUserId = meRes?.data?.profile?._id;
        setCurrentUserId(authUserId);

        const response = await alumniApi.getMessages();
        const payload = mapConversationsForUi(extractConversations(response, mockConversations));
        setConversations(payload);

        const firstId = payload[0]?.id || null;
        setSelectedId(firstId);

        if (firstId && authUserId) {
          await loadConversationMessages(firstId, authUserId);
        }
      } catch {
        setConversations(mockConversations);
        setSelectedId(mockConversations[0]?.id || null);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!selectedId || !currentUserId) return;

      const selected = conversations.find((conversation) => conversation.id === selectedId);
      if (selected?.messages?.length) return;

      try {
        await loadConversationMessages(selectedId, currentUserId);
      } catch {
        pushToast('Unable to load full conversation.', 'error');
      }
    };

    run();
  }, [selectedId, currentUserId, conversations, pushToast]);

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedId),
    [conversations, selectedId],
  );

  const handleSend = async (text) => {
    if (!selectedId) return;

    try {
      await alumniApi.sendMessage({ receiverId: selectedId, message: text });
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== selectedId) return conversation;

          const newMessage = {
            id: `m-${Date.now()}`,
            sender: 'alumni',
            text,
            time: 'Now',
          };

          return { ...conversation, messages: [...conversation.messages, newMessage] };
        }),
      );
      pushToast('Message sent', 'success');
    } catch {
      pushToast('Failed to send message.', 'error');
    }
  };

  if (loading) return <LoadingState label="Loading conversations..." />;

  return (
    <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <MessageList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
      <ChatWindow conversation={selectedConversation} onSend={handleSend} />
    </section>
  );
};

export default Messages;
