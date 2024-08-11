namespace FunLanguageZone.Server.Models
{
    public class Video
    {
        public int Id { get; set; }
        public string Language { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string YoutubeId { get; set; }
        public List<string> Genres { get; set; }
        public string? Lyric { get; set; }
    }
}

