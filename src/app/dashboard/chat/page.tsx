
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '@/context/app-context';
import { users, chatConversations as allConversationsData, chatMessages as initialMessages } from '@/lib/data';
import type { User, ChatConversation, ChatMessage } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Search, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

export default function ChatPage() {
    const { user: currentUser, isAuthenticated } = useApp();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
    const [myConversations, setMyConversations] = useState<ChatConversation[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load data on the client side to prevent hydration issues
        setAllMessages(initialMessages);
        if (currentUser) {
            setMyConversations(allConversationsData.filter(c => c.participantIds.includes(currentUser.id)));
        }
    }, [currentUser]);


    const filteredConversations = useMemo(() => {
        if (!isAuthenticated) return [];
        return myConversations.filter(convo => {
            const otherParticipantId = convo.participantIds.find(id => id !== currentUser.id);
            const otherUser = users.find(u => u.id === otherParticipantId);
            return otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [myConversations, searchTerm, currentUser?.id, isAuthenticated]);

    useEffect(() => {
        if (selectedConversation) {
            setMessages(allMessages.filter(m => m.conversationId === selectedConversation.id).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
        } else {
            setMessages([]);
        }
    }, [selectedConversation, allMessages]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUser) return;

        setIsSending(true);
        
        setTimeout(() => {
            const message: ChatMessage = {
                id: `msg-${Date.now()}`,
                conversationId: selectedConversation.id,
                senderId: currentUser.id,
                timestamp: new Date().toISOString(),
                text: newMessage,
            };
            
            setAllMessages(prev => [...prev, message]);

            setNewMessage('');
            setIsSending(false);
        }, 500);
    };

    const getOtherParticipant = (convo: ChatConversation) => {
        if (!currentUser) return null;
        const otherId = convo.participantIds.find(id => id !== currentUser.id);
        return users.find(u => u.id === otherId);
    }
    
    const getLastMessage = (conversationId: string) => {
         return allMessages
            .filter(m => m.conversationId === conversationId)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    }

    return (
        <Card className="h-[85vh] flex">
            <div className="w-1/3 border-r flex flex-col">
                <CardHeader>
                    <CardTitle>{t('messages')}</CardTitle>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t('search') + " kontak..."}
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <ScrollArea className="flex-1">
                    {isAuthenticated && filteredConversations.map(convo => {
                        const otherUser = getOtherParticipant(convo);
                        const lastMessage = getLastMessage(convo.id);

                        if (!otherUser) return null;

                        return (
                             <div
                                key={convo.id}
                                className={cn(
                                    "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted mx-2 rounded-lg",
                                    selectedConversation?.id === convo.id && 'bg-muted'
                                )}
                                onClick={() => setSelectedConversation(convo)}
                            >
                                <Avatar>
                                    <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} data-ai-hint="person portrait" />
                                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-semibold truncate">{otherUser.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{lastMessage?.text || 'Tidak ada pesan'}</p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollArea>
            </div>
            <div className="w-2/3 flex flex-col">
                {selectedConversation ? (
                    <>
                        <CardHeader className="border-b">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                     <AvatarImage src={getOtherParticipant(selectedConversation)?.avatarUrl} />
                                     <AvatarFallback>{getOtherParticipant(selectedConversation)?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{getOtherParticipant(selectedConversation)?.name}</p>
                                    <p className="text-sm text-muted-foreground">{getOtherParticipant(selectedConversation)?.role}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={cn("flex items-end gap-2", msg.senderId === currentUser.id ? 'justify-end' : 'justify-start')}>
                                        {msg.senderId !== currentUser.id && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={getOtherParticipant(selectedConversation)?.avatarUrl} />
                                                <AvatarFallback>{getOtherParticipant(selectedConversation)?.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn(
                                            "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg",
                                            msg.senderId === currentUser.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        )}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={cn(
                                                "text-xs mt-1",
                                                msg.senderId === currentUser.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                            )}>
                                                {new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <div ref={messagesEndRef} />
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <Input
                                    placeholder="Ketik pesan Anda..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    disabled={isSending}
                                />
                                <Button type="submit" disabled={!newMessage.trim() || isSending}>
                                    {isSending ? <Loader2 className="animate-spin" /> : <Send />}
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                            <p>Pilih percakapan untuk memulai</p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
