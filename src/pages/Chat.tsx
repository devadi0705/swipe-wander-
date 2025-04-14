
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Send, Phone, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { travelProfiles } from '@/utils/mockData';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState(travelProfiles.find(p => p.id === id));
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate some initial messages for demo purposes
  useEffect(() => {
    if (match) {
      const initialMessages: Message[] = [
        {
          id: '1',
          senderId: match.id,
          text: `Hey there! I see we both want to visit ${match.dreamDestination}! When are you planning to go?`,
          timestamp: new Date(Date.now() - 1000000)
        },
        {
          id: '2',
          senderId: 'me',
          text: `Hi ${match.name}! Yes, I've been dreaming about ${match.dreamDestination} for ages! I'm thinking sometime this summer.`,
          timestamp: new Date(Date.now() - 900000)
        },
        {
          id: '3',
          senderId: match.id,
          text: "That sounds perfect! I'd love to hear more about what you want to experience there.",
          timestamp: new Date(Date.now() - 800000)
        }
      ];
      setMessages(initialMessages);
    }
  }, [match]);
  
  if (!match) {
    return <div className="p-6 text-center">Match not found</div>;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate a response after 1-3 seconds
    setTimeout(() => {
      const responses = [
        `That sounds great! I'm excited to talk more about our travel plans.`,
        `I love that idea! What else do you like to do when traveling?`,
        `Have you been to ${match.dreamDestination} before? It's my first time!`,
        `I've heard the food in ${match.dreamDestination} is amazing. Are you a foodie too?`,
      ];
      
      const responseMessage: Message = {
        id: Date.now().toString(),
        senderId: match.id,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, Math.random() * 2000 + 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 flex items-center gap-4 shadow-sm">
        <Link to="/matches" className="text-gray-600">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        
        <img 
          src={match.image} 
          alt={match.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-wander-purple"
        />
        
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{match.name}</h2>
          <p className="text-xs text-gray-500">
            {match.location} • Dream destination: {match.dreamDestination}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-green-600" onClick={() => toast.info("Video calls coming soon!")}>
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => toast.info("Voice calls coming soon!")}>
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => toast.info("Profile details coming soon!")}>
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-2xl p-3 ${
                message.senderId === 'me' 
                  ? 'bg-wander-purple text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs ${message.senderId === 'me' ? 'text-white/70' : 'text-gray-500'} text-right mt-1`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="bg-white p-4 flex items-center gap-2 border-t">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" variant="ghost" size="icon">
          <Send className="h-5 w-5 text-wander-purple" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
