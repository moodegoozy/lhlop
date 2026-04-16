'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface ChildProfile {
  id: string;
  name: string;
  avatar?: string;
  grade?: string;
  age?: number;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  voiceUrl?: string;
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: 'teacher' | 'support';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderRole: 'user' | 'support';
    message: string;
    timestamp: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'learning' | 'engagement' | 'special';
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}

interface DashboardState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Current child profile (for parent accounts)
  activeChildId: string | null;
  children: ChildProfile[];
  
  // Wallet
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  
  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  
  // Chat
  conversations: ChatConversation[];
  activeConversationId: string | null;
  
  // Favorites
  favoriteTeacherIds: string[];
  
  // Support tickets
  tickets: Ticket[];
  
  // Achievements
  achievements: Achievement[];
  
  // Forum
  forumPosts: ForumPost[];
  
  // Affiliate
  referralCode: string;
  referralEarnings: number;
  referralCount: number;
  
  // Coupon
  appliedCoupon: string | null;
  couponDiscount: number;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveChild: (childId: string | null) => void;
  addChild: (child: ChildProfile) => void;
  removeChild: (childId: string) => void;
  updateChild: (childId: string, data: Partial<ChildProfile>) => void;
  addWalletTransaction: (transaction: WalletTransaction) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  setActiveConversation: (conversationId: string | null) => void;
  addChatMessage: (conversationId: string, message: ChatMessage) => void;
  toggleFavoriteTeacher: (teacherId: string) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: false,
      sidebarCollapsed: false,
      activeChildId: null,
      children: [],
      walletBalance: 500,
      walletTransactions: [
        {
          id: '1',
          type: 'deposit',
          amount: 500,
          description: 'إيداع أولي',
          date: '2024-01-15T10:00:00Z',
          status: 'completed',
        },
        {
          id: '2',
          type: 'payment',
          amount: -150,
          description: 'حصة رياضيات - أ. محمد',
          date: '2024-01-18T14:00:00Z',
          status: 'completed',
        },
      ],
      notifications: [
        {
          id: '1',
          title: 'تذكير بالحصة',
          message: 'حصتك القادمة مع أ. محمد بعد ساعة',
          type: 'info',
          read: false,
          date: '2024-01-20T15:00:00Z',
        },
        {
          id: '2',
          title: 'إنجاز جديد!',
          message: 'حصلت على شارة "متعلم نشط"',
          type: 'success',
          read: false,
          date: '2024-01-19T12:00:00Z',
        },
      ],
      unreadNotificationsCount: 2,
      conversations: [],
      activeConversationId: null,
      favoriteTeacherIds: [],
      tickets: [],
      achievements: [
        {
          id: '1',
          title: 'متعلم نشط',
          description: 'أكمل 10 حصص',
          icon: '🎯',
          progress: 8,
          maxProgress: 10,
          unlocked: false,
          category: 'learning',
        },
        {
          id: '2',
          title: 'نجم الأسبوع',
          description: 'حافظ على 7 أيام متتالية',
          icon: '⭐',
          progress: 5,
          maxProgress: 7,
          unlocked: false,
          category: 'engagement',
        },
        {
          id: '3',
          title: 'مستكشف',
          description: 'جرب 5 مواد مختلفة',
          icon: '🔍',
          progress: 5,
          maxProgress: 5,
          unlocked: true,
          unlockedAt: '2024-01-10T00:00:00Z',
          category: 'learning',
        },
        {
          id: '4',
          title: 'محترف',
          description: 'أكمل 50 حصة',
          icon: '🏆',
          progress: 42,
          maxProgress: 50,
          unlocked: false,
          category: 'learning',
        },
      ],
      forumPosts: [],
      referralCode: 'STUDENT2024',
      referralEarnings: 150,
      referralCount: 3,
      appliedCoupon: null,
      couponDiscount: 0,

      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      setActiveChild: (childId) => set({ activeChildId: childId }),
      
      addChild: (child) =>
        set((state) => ({
          children: [...state.children, child],
        })),
      
      removeChild: (childId) =>
        set((state) => ({
          children: state.children.filter((c) => c.id !== childId),
          activeChildId: state.activeChildId === childId ? null : state.activeChildId,
        })),
      
      updateChild: (childId, data) =>
        set((state) => ({
          children: state.children.map((c) =>
            c.id === childId ? { ...c, ...data } : c
          ),
        })),
      
      addWalletTransaction: (transaction) =>
        set((state) => ({
          walletTransactions: [transaction, ...state.walletTransactions],
          walletBalance:
            state.walletBalance +
            (transaction.type === 'deposit' || transaction.type === 'refund'
              ? Math.abs(transaction.amount)
              : -Math.abs(transaction.amount)),
        })),
      
      markNotificationRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
          unreadNotificationsCount: state.notifications.filter(
            (n) => !n.read && n.id !== notificationId
          ).length,
        })),
      
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadNotificationsCount: 0,
        })),
      
      setActiveConversation: (conversationId) =>
        set({ activeConversationId: conversationId }),
      
      addChatMessage: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [...c.messages, message],
                  lastMessage: message.text || (message.voiceUrl ? '🎤 رسالة صوتية' : '📎 مرفق'),
                  lastMessageTime: message.timestamp,
                }
              : c
          ),
        })),
      
      toggleFavoriteTeacher: (teacherId) =>
        set((state) => ({
          favoriteTeacherIds: state.favoriteTeacherIds.includes(teacherId)
            ? state.favoriteTeacherIds.filter((id) => id !== teacherId)
            : [...state.favoriteTeacherIds, teacherId],
        })),
      
      addTicket: (ticket) =>
        set((state) => ({
          tickets: [ticket, ...state.tickets],
        })),
      
      updateTicketStatus: (ticketId, status) =>
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t
          ),
        })),
      
      applyCoupon: (code, discount) =>
        set({ appliedCoupon: code, couponDiscount: discount }),
      
      removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeChildId: state.activeChildId,
        children: state.children,
        favoriteTeacherIds: state.favoriteTeacherIds,
      }),
    }
  )
);
