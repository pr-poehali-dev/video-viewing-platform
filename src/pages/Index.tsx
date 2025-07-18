import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [subscribedChannels, setSubscribedChannels] = useState<Set<number>>(new Set());
  const [currentView, setCurrentView] = useState<"videos" | "chat" | "kids">("videos");
  const [message, setMessage] = useState("");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: 1,
      title: "Общий чат",
      messages: [
        {
          id: 1,
          text: "Привет! Я ваш ИИ-помощник. Как дела? Чем могу помочь?",
          isUser: false,
          timestamp: new Date()
        }
      ],
      lastMessage: new Date()
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const kidsVideos = [
    {
      id: 101,
      title: "Алфавит для малышей | Учим буквы весело",
      channel: "Детские Песенки",
      views: "2.5M",
      duration: "15:30",
      thumbnail: "https://via.placeholder.com/320x180?text=Алфавит+ABC",
      description: "Изучаем русский алфавит с веселыми песенками и яркими картинками",
      uploadDate: "2 дня назад",
      category: "Обучающие",
      isVerified: true
    },
    {
      id: 102,
      title: "Сказки на ночь | Колобок",
      channel: "Добрые Сказки",
      views: "1.8M",
      duration: "12:45",
      thumbnail: "https://via.placeholder.com/320x180?text=Колобок+Сказка",
      description: "Классическая русская сказка с красивыми иллюстрациями",
      uploadDate: "1 день назад",
      category: "Сказки",
      isVerified: true
    },
    {
      id: 103,
      title: "Учим цвета и формы | Развивающие игры",
      channel: "Умные Малыши",
      views: "3.2M",
      duration: "18:20",
      thumbnail: "https://via.placeholder.com/320x180?text=Цвета+и+Формы",
      description: "Изучаем основные цвета и геометрические фигуры в игровой форме",
      uploadDate: "3 дня назад",
      category: "Развивающие",
      isVerified: true
    },
    {
      id: 104,
      title: "Песенки про животных | Кто как говорит",
      channel: "Веселые Зверята",
      views: "4.1M",
      duration: "14:15",
      thumbnail: "https://via.placeholder.com/320x180?text=Животные+Песни",
      description: "Учим названия животных и звуки, которые они издают",
      uploadDate: "1 неделю назад",
      category: "Музыкальные",
      isVerified: true
    },
    {
      id: 105,
      title: "Машинки и паровозики | Мультик для мальчиков",
      channel: "Транспорт ТВ",
      views: "2.7M",
      duration: "22:10",
      thumbnail: "https://via.placeholder.com/320x180?text=Машинки+Мультик",
      description: "Приключения веселых машинок и их друзей",
      uploadDate: "4 дня назад",
      category: "Мультфильмы",
      isVerified: true
    },
    {
      id: 106,
      title: "Принцессы и феи | Добрые мультики для девочек",
      channel: "Сказочный Мир",
      views: "1.9M",
      duration: "16:30",
      thumbnail: "https://via.placeholder.com/320x180?text=Принцессы+Феи",
      description: "Волшебные истории о принцессах и их приключениях",
      uploadDate: "2 дня назад",
      category: "Мультфильмы",
      isVerified: true
    },
    {
      id: 107,
      title: "Учим счет от 1 до 10 | Математика для малышей",
      channel: "Умный Счет",
      views: "2.1M",
      duration: "13:45",
      thumbnail: "https://via.placeholder.com/320x180?text=Счет+1-10",
      description: "Изучаем цифры и учимся считать с веселыми персонажами",
      uploadDate: "5 дней назад",
      category: "Обучающие",
      isVerified: true
    },
    {
      id: 108,
      title: "Времена года | Природа для детей",
      channel: "Природа и Дети",
      views: "1.6M",
      duration: "19:20",
      thumbnail: "https://via.placeholder.com/320x180?text=Времена+Года",
      description: "Изучаем особенности каждого времени года",
      uploadDate: "1 неделю назад",
      category: "Познавательные",
      isVerified: true
    }
  ];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock video data
  const videos = [
    {
      id: 1,
      title: "Удивительное путешествие в космос",
      channel: "Space Explorer",
      views: "2.5M",
      time: "3 дня назад",
      duration: "15:30",
      thumbnail: "/img/2f1e351c-b581-498d-a678-96dd8b4998fc.jpg",
      likes: 45000,
      isLive: false
    },
    {
      id: 2,
      title: "Секреты современной разработки",
      channel: "CodeMaster",
      views: "1.2M",
      time: "1 неделю назад",
      duration: "22:15",
      thumbnail: "/img/2f1e351c-b581-498d-a678-96dd8b4998fc.jpg",
      likes: 32000,
      isLive: false
    },
    {
      id: 3,
      title: "LIVE: Творческий стрим",
      channel: "ArtFlow",
      views: "15K",
      time: "В прямом эфире",
      duration: "LIVE",
      thumbnail: "/img/2f1e351c-b581-498d-a678-96dd8b4998fc.jpg",
      likes: 2500,
      isLive: true
    },
    {
      id: 4,
      title: "Музыкальные тренды 2024",
      channel: "MusicWave",
      views: "890K",
      time: "5 дней назад",
      duration: "8:45",
      thumbnail: "/img/2f1e351c-b581-498d-a678-96dd8b4998fc.jpg",
      likes: 28000,
      isLive: false
    },
    {
      id: 5,
      title: "Кулинарные шедевры мира",
      channel: "TasteGuru",
      views: "3.1M",
      time: "2 недели назад",
      duration: "18:20",
      thumbnail: "/img/2f1e351c-b581-498d-a678-96dd8b4998fc.jpg",
      likes: 67000,
      isLive: false
    },
    {
      id: 6,
      title: "Технологии будущего",
      channel: "TechVision",
      views: "1.8M",
      time: "4 дня назад",
      duration: "25:10",
      thumbnail: "/img/2f1e351c-b581-498d-a678-96dd8b4998fc.jpg",
      likes: 42000,
      isLive: false
    }
  ];

  const toggleLike = (videoId: number) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
  };

  const toggleSubscribe = (videoId: number) => {
    const newSubscribed = new Set(subscribedChannels);
    if (newSubscribed.has(videoId)) {
      newSubscribed.delete(videoId);
    } else {
      newSubscribed.add(videoId);
    }
    setSubscribedChannels(newSubscribed);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatSessions, currentChatId]);

  const getCurrentChat = () => {
    return chatSessions.find(chat => chat.id === currentChatId) || chatSessions[0];
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentChat = getCurrentChat();
    const userMessage: Message = {
      id: Date.now(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date()
    };

    // Add user message
    setChatSessions(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, userMessage], lastMessage: new Date() }
        : chat
    ));

    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Интересный вопрос! Дайте мне подумать над этим...",
        "Я понимаю вашу точку зрения. Вот что я думаю по этому поводу:",
        "Отличная идея! Давайте разберем это подробнее.",
        "Это напоминает мне о том, что...",
        "Согласен с вами! А что если мы посмотрим на это с другой стороны?",
        "Хороший момент. Вот несколько мыслей на эту тему:",
        "Понятно! Позвольте мне объяснить это более детально."
      ];

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setChatSessions(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, aiMessage], lastMessage: new Date() }
          : chat
      ));
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now(),
      title: `Чат ${chatSessions.length + 1}`,
      messages: [
        {
          id: 1,
          text: "Привет! Новый чат создан. О чем поговорим?",
          isUser: false,
          timestamp: new Date()
        }
      ],
      lastMessage: new Date()
    };
    setChatSessions(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">VideoStream</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-400 pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute right-1 top-1 bg-gray-800 hover:bg-gray-700"
                >
                  <Icon name="Search" size={16} />
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
                onClick={() => setCurrentView("videos")}
              >
                <Icon name="Play" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
                onClick={() => setCurrentView("kids")}
              >
                <Icon name="Baby" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
                onClick={() => setCurrentView("chat")}
              >
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Icon name="Upload" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-red-600">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex space-x-6 overflow-x-auto">
            {currentView === "videos" ? (
              ["Главная", "Тренды", "Подписки", "Библиотека", "История", "Ваши видео", "Понравившиеся", "Посмотреть позже"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="text-gray-300 hover:text-white whitespace-nowrap"
                >
                  {item}
                </Button>
              ))
            ) : (
              <div className="flex items-center space-x-4">
                <Badge className="bg-red-600 text-white">
                  <Icon name="Bot" size={16} className="mr-1" />
                  ИИ Чат
                </Badge>
                <span className="text-gray-400">Умный помощник для ваших вопросов</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {currentView === "kids" ? (
          <>
            {/* Kids Content Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Детские каналы</h1>
              <p className="text-gray-400">Безопасный и развивающий контент для детей</p>
            </div>

            {/* Kids Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                Обучающие
              </Badge>
              <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-700">
                Сказки
              </Badge>
              <Badge variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">
                Мультфильмы
              </Badge>
              <Badge variant="secondary" className="bg-orange-600 text-white hover:bg-orange-700">
                Песенки
              </Badge>
              <Badge variant="secondary" className="bg-pink-600 text-white hover:bg-pink-700">
                Развивающие
              </Badge>
            </div>

            {/* Kids Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kidsVideos.map((video, index) => (
                <Card 
                  key={video.id} 
                  className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 group animate-fade-in hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                        {video.duration}
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-blue-600 text-white text-xs">
                          {video.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Icon name="Play" size={40} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.channel}`} />
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {video.channel.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          {video.channel}
                          {video.isVerified && <Icon name="BadgeCheck" size={14} className="text-blue-500" />}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-gray-500 text-sm">
                        <span>{video.views} просмотров</span>
                        <span>{video.uploadDate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                          onClick={() => {
                            setLikedVideos(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(video.id)) {
                                newSet.delete(video.id);
                              } else {
                                newSet.add(video.id);
                              }
                              return newSet;
                            });
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={16} 
                            className={likedVideos.has(video.id) ? "fill-red-500 text-red-500" : ""}
                          />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                        >
                          <Icon name="Share" size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 ml-auto"
                        >
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : currentView === "chat" ? (
          <div className="flex h-[calc(100vh-200px)] bg-gray-900 rounded-lg overflow-hidden">
            {/* Chat Sidebar */}
            <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <Button onClick={createNewChat} className="w-full bg-red-600 hover:bg-red-700">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новый чат
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {chatSessions.map((chat) => (
                    <Button
                      key={chat.id}
                      variant="ghost"
                      className={`w-full justify-start mb-2 h-auto p-3 ${
                        currentChatId === chat.id ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setCurrentChatId(chat.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium truncate">{chat.title}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {chat.messages[chat.messages.length - 1]?.text.substring(0, 50)}...
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-red-600">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{getCurrentChat().title}</h3>
                    <p className="text-sm text-gray-400">
                      {isTyping ? "Печатает..." : "В сети"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {getCurrentChat().messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[70%] ${
                          msg.isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                        }`}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={msg.isUser ? "bg-blue-600" : "bg-red-600"}>
                            {msg.isUser ? "U" : "AI"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`p-3 rounded-lg ${
                            msg.isUser
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800 text-gray-100 border border-gray-700'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-2 opacity-70">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-pulse">
                      <div className="flex items-start space-x-3 max-w-[70%]">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-red-600">AI</AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex space-x-3">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 min-h-[44px] max-h-32 bg-gray-900 border-gray-600 text-white placeholder-gray-400 resize-none"
                    rows={1}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!message.trim() || isTyping}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <Card 
              key={video.id} 
              className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 group animate-fade-in hover:scale-105 hover:shadow-xl hover:shadow-red-600/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {video.isLive && (
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                      <Icon name="Radio" size={12} className="mr-1" />
                      LIVE
                    </Badge>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarFallback className="bg-red-600 text-white text-sm">
                        {video.channel[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white line-clamp-2 mb-1 group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-1">{video.channel}</p>
                      <p className="text-sm text-gray-500">
                        {video.views} просмотров • {video.time}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(video.id)}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          likedVideos.has(video.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Icon name="Heart" size={16} />
                        <span>{(video.likes + (likedVideos.has(video.id) ? 1 : 0)).toLocaleString()}</span>
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Icon name="MessageCircle" size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Icon name="Share" size={16} />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      variant={subscribedChannels.has(video.id) ? "secondary" : "default"}
                      onClick={() => toggleSubscribe(video.id)}
                      className={subscribedChannels.has(video.id) ? "bg-gray-700 text-white" : "bg-red-600 hover:bg-red-700"}
                    >
                      {subscribedChannels.has(video.id) ? "Подписан" : "Подписаться"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gray-900 border-gray-800 max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Upload" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Загрузить видео</h3>
              <p className="text-gray-400 mb-4">Поделитесь своим контентом с миллионами зрителей</p>
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                Выбрать файл
              </Button>
            </CardContent>
          </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;