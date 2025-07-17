import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [subscribedChannels, setSubscribedChannels] = useState<Set<number>>(new Set());

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
            {["Главная", "Тренды", "Подписки", "Библиотека", "История", "Ваши видео", "Понравившиеся", "Посмотреть позже"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="text-gray-300 hover:text-white whitespace-nowrap"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
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
      </main>
    </div>
  );
};

export default Index;