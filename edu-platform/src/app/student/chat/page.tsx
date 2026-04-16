'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, EmptyState } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Mic,
  Paperclip,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Search,
  ChevronRight,
  Check,
  CheckCheck,
  Clock,
  X,
  Play,
  Pause,
  File,
  Smile,
  ArrowLeft,
} from 'lucide-react';

// Mock conversations
const mockConversations = [
  {
    id: '1',
    name: 'أ. محمد العلي',
    avatar: '',
    role: 'teacher' as const,
    subject: 'الرياضيات',
    lastMessage: 'أهلاً! هل لديك أي أسئلة حول الدرس؟',
    lastMessageTime: '10:30 ص',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'أ. نورة الخالد',
    avatar: '',
    role: 'teacher' as const,
    subject: 'اللغة الإنجليزية',
    lastMessage: 'شكراً على الحضور في الحصة اليوم',
    lastMessageTime: 'أمس',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'الدعم الفني',
    avatar: '',
    role: 'support' as const,
    subject: null,
    lastMessage: 'تم حل مشكلتك بنجاح. هل تحتاج مساعدة أخرى؟',
    lastMessageTime: 'منذ يومين',
    unread: 0,
    online: true,
  },
];

// Mock messages
const mockMessages: Record<string, Array<{
  id: string;
  senderId: string;
  type: 'text' | 'voice' | 'image' | 'file';
  content: string;
  fileName?: string;
  duration?: number;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}>> = {
  '1': [
    {
      id: 'm1',
      senderId: 'teacher',
      type: 'text',
      content: 'مرحباً أحمد! كيف حالك؟',
      timestamp: '10:00 ص',
      status: 'read',
    },
    {
      id: 'm2',
      senderId: 'me',
      type: 'text',
      content: 'مرحباً أستاذ! الحمد لله بخير، شكراً لسؤالك',
      timestamp: '10:05 ص',
      status: 'read',
    },
    {
      id: 'm3',
      senderId: 'teacher',
      type: 'text',
      content: 'ممتاز! هل راجعت المسائل التي أرسلتها لك؟',
      timestamp: '10:10 ص',
      status: 'read',
    },
    {
      id: 'm4',
      senderId: 'me',
      type: 'text',
      content: 'نعم، حليت معظمها لكن عندي سؤال عن المسألة الخامسة',
      timestamp: '10:15 ص',
      status: 'read',
    },
    {
      id: 'm5',
      senderId: 'me',
      type: 'image',
      content: '/images/math-problem.jpg',
      timestamp: '10:16 ص',
      status: 'read',
    },
    {
      id: 'm6',
      senderId: 'teacher',
      type: 'voice',
      content: '/audio/explanation.mp3',
      duration: 45,
      timestamp: '10:20 ص',
      status: 'read',
    },
    {
      id: 'm7',
      senderId: 'teacher',
      type: 'text',
      content: 'تجد في الرسالة الصوتية شرح للحل. إذا احتجت توضيح أكثر أخبرني',
      timestamp: '10:21 ص',
      status: 'read',
    },
    {
      id: 'm8',
      senderId: 'me',
      type: 'text',
      content: 'شكراً جزيلاً أستاذ! الشرح واضح جداً 🙏',
      timestamp: '10:25 ص',
      status: 'read',
    },
    {
      id: 'm9',
      senderId: 'teacher',
      type: 'file',
      content: '/files/exercises.pdf',
      fileName: 'تمارين إضافية.pdf',
      timestamp: '10:28 ص',
      status: 'read',
    },
    {
      id: 'm10',
      senderId: 'teacher',
      type: 'text',
      content: 'أهلاً! هل لديك أي أسئلة حول الدرس؟',
      timestamp: '10:30 ص',
      status: 'delivered',
    },
  ],
};

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const [playingVoice, setPlayingVoice] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const activeConversation = selectedConversation
    ? mockConversations.find((c) => c.id === selectedConversation)
    : null;

  const messages = selectedConversation ? mockMessages[selectedConversation] || [] : [];

  // Auto scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedConversation]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3.5 h-3.5" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5" />;
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const filteredConversations = mockConversations.filter((c) =>
    c.name.includes(searchQuery) || c.subject?.includes(searchQuery)
  );

  // Mobile: Show conversation list or chat based on selection
  const showMobileChat = selectedConversation !== null;

  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-8rem)] -m-4 md:-m-6 lg:-m-8 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Conversations List */}
        <div
          className={cn(
            'w-full md:w-80 lg:w-96 border-l border-gray-200 dark:border-gray-800 flex flex-col',
            showMobileChat && 'hidden md:flex'
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">المحادثات</h2>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث..."
                className={cn(
                  'w-full h-10 pr-10 pl-4 rounded-xl',
                  'bg-gray-100 dark:bg-gray-800 border-0',
                  'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                )}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-4 transition-colors text-right',
                  'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                  selectedConversation === conversation.id && 'bg-primary-50 dark:bg-primary-900/20'
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback
                      className={cn(
                        'font-semibold',
                        conversation.role === 'support'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      )}
                    >
                      {conversation.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 mr-2">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="shrink-0 mr-2 w-5 h-5 flex items-center justify-center text-xs font-bold bg-primary-500 text-white rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={cn(
            'flex-1 flex flex-col',
            !showMobileChat && 'hidden md:flex'
          )}
        >
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                {/* Mobile Back Button */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
                </Button>

                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={activeConversation.avatar} />
                    <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-semibold">
                      {activeConversation.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {activeConversation.online && (
                    <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {activeConversation.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeConversation.online ? 'متصل الآن' : 'غير متصل'}
                    {activeConversation.subject && ` • ${activeConversation.subject}`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                {messages.map((msg) => {
                  const isMe = msg.senderId === 'me';

                  return (
                    <div
                      key={msg.id}
                      className={cn('flex', isMe ? 'justify-start' : 'justify-end')}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] md:max-w-[60%]',
                          isMe ? 'order-1' : 'order-2'
                        )}
                      >
                        {/* Text Message */}
                        {msg.type === 'text' && (
                          <div
                            className={cn(
                              'px-4 py-2.5 rounded-2xl',
                              isMe
                                ? 'bg-primary-500 text-white rounded-br-sm'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm shadow-sm'
                            )}
                          >
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            <div
                              className={cn(
                                'flex items-center justify-end gap-1 mt-1',
                                isMe ? 'text-white/70' : 'text-gray-400'
                              )}
                            >
                              <span className="text-[10px]">{msg.timestamp}</span>
                              {isMe && getStatusIcon(msg.status)}
                            </div>
                          </div>
                        )}

                        {/* Voice Message */}
                        {msg.type === 'voice' && (
                          <div
                            className={cn(
                              'flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[200px]',
                              isMe
                                ? 'bg-primary-500 text-white rounded-br-sm'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm shadow-sm'
                            )}
                          >
                            <button
                              onClick={() => setPlayingVoice(playingVoice === msg.id ? null : msg.id)}
                              className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                                isMe ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-900'
                              )}
                            >
                              {playingVoice === msg.id ? (
                                <Pause className={cn('w-5 h-5', isMe ? 'text-white' : 'text-primary-600')} />
                              ) : (
                                <Play className={cn('w-5 h-5', isMe ? 'text-white' : 'text-primary-600')} />
                              )}
                            </button>
                            <div className="flex-1">
                              {/* Waveform placeholder */}
                              <div className="flex items-center gap-0.5 h-6">
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={cn(
                                      'w-1 rounded-full transition-all',
                                      isMe ? 'bg-white/40' : 'bg-gray-300 dark:bg-gray-600'
                                    )}
                                    style={{
                                      height: `${Math.random() * 100}%`,
                                      minHeight: '4px',
                                    }}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className={cn('text-[10px]', isMe ? 'text-white/70' : 'text-gray-400')}>
                                  {msg.duration ? `0:${String(msg.duration).padStart(2, '0')}` : '0:00'}
                                </span>
                                <span className={cn('text-[10px]', isMe ? 'text-white/70' : 'text-gray-400')}>
                                  {msg.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Image Message */}
                        {msg.type === 'image' && (
                          <div className={cn('rounded-2xl overflow-hidden', isMe ? 'rounded-br-sm' : 'rounded-bl-sm')}>
                            <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <div
                              className={cn(
                                'px-3 py-1.5 flex items-center justify-end gap-1',
                                isMe ? 'bg-primary-500 text-white/70' : 'bg-white dark:bg-gray-800 text-gray-400'
                              )}
                            >
                              <span className="text-[10px]">{msg.timestamp}</span>
                              {isMe && getStatusIcon(msg.status)}
                            </div>
                          </div>
                        )}

                        {/* File Message */}
                        {msg.type === 'file' && (
                          <div
                            className={cn(
                              'flex items-center gap-3 px-4 py-3 rounded-2xl',
                              isMe
                                ? 'bg-primary-500 text-white rounded-br-sm'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm shadow-sm'
                            )}
                          >
                            <div
                              className={cn(
                                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                                isMe ? 'bg-white/20' : 'bg-red-100 dark:bg-red-900/30'
                              )}
                            >
                              <File className={cn('w-5 h-5', isMe ? 'text-white' : 'text-red-600')} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{msg.fileName}</p>
                              <p className={cn('text-[10px]', isMe ? 'text-white/70' : 'text-gray-400')}>
                                PDF • {msg.timestamp}
                              </p>
                            </div>
                            {isMe && (
                              <div className="text-white/70">{getStatusIcon(msg.status)}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-end gap-2">
                  {/* Attachment Button */}
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالتك..."
                      rows={1}
                      className={cn(
                        'w-full px-4 py-2.5 rounded-2xl resize-none',
                        'bg-gray-100 dark:bg-gray-800 border-0',
                        'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                        'max-h-32'
                      )}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          // Handle send
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon-sm" className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Smile className="w-5 h-5 text-gray-400" />
                    </Button>
                  </div>

                  {/* Send/Record Button */}
                  {message.trim() ? (
                    <Button size="icon" className="rounded-full w-10 h-10 shrink-0">
                      <Send className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant={isRecording ? 'destructive' : 'default'}
                      className="rounded-full w-10 h-10 shrink-0"
                      onMouseDown={() => setIsRecording(true)}
                      onMouseUp={() => setIsRecording(false)}
                      onMouseLeave={() => setIsRecording(false)}
                    >
                      <Mic className={cn('w-5 h-5', isRecording && 'animate-pulse')} />
                    </Button>
                  )}
                </div>
                {isRecording && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-red-500">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm">جاري التسجيل...</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={<MessageIcon className="w-12 h-12 text-gray-300 dark:text-gray-700" />}
                title="اختر محادثة"
                description="اختر محادثة من القائمة للبدء في الدردشة"
              />
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}
