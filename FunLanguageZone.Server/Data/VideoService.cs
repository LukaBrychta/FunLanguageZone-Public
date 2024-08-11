using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;
using FunLanguageZone.Server.Models;
using System.Runtime.CompilerServices;
using System.IO;
using System.Text.Json;

namespace FunLanguageZone.Server.Data
{
    public class VideoService
    {
        private List<Video> _videos = new List<Video>();
        public VideoService()
        {
            LoadVideosData();
        }
        public async Task<List<Video>> GetVideosAsync()
        {
            foreach (var video in _videos)
            {
                video.Lyric = null;
            }

            return _videos.OrderBy(v => v.Title).ToList();
        }
        public async Task<List<Video>> GetVideosAsync(int skipId, string language, int countVideos)
        {
            Random random = new Random();
            List<Video> randomVideos = _videos.Where(v => v.Language == language && v.Id != skipId).OrderBy(x => random.Next()).Take(countVideos).ToList();
            foreach (var video in randomVideos)
            {
                video.Lyric = null;
            }

            return randomVideos;
        }

        public async Task<Video> GetVideoByIdAsync(int id)
        {
            Video searchVideo = _videos.Find(video => video.Id == id);
            if (searchVideo == null)
            {
                return null;
            }
            else if (await GetLyricsFromDocument(searchVideo.Title) != null)
            {
                searchVideo.Lyric = await GetLyricsFromDocument(searchVideo.Title);
            }
            else
            {
                searchVideo.Lyric = await GetLyricsFromApiAsync(searchVideo.Title, searchVideo.Artist);
            }
            return searchVideo;
        }

        private async Task<string> GetLyricsFromApiAsync(string title, string artist)
        {
            string apiUrl = $"https://api.lyrics.ovh/v1/{artist}/{title}";
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string stringData = await response.Content.ReadAsStringAsync();
                    var json = JsonDocument.Parse(stringData);
                    if (json.RootElement.TryGetProperty("lyrics", out JsonElement lyricElement))
                    {
                        var filtredLyric = await FilterLyrics(lyricElement.GetString());
                        return filtredLyric;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            return null;
        }
        private async Task<string> GetLyricsFromDocument(string title)
        {
            //string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "Lyrics", title + ".txt");
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "Data", "Lyrics", title + ".txt");
            if (File.Exists(path))
            {
                using (StreamReader sr = new StreamReader(path))
                {
                    return sr.ReadToEnd();
                }
            }
            else return null;
        }

        private async Task<string> FilterLyrics(string lyric)
        {
            var lines = lyric.Split('\n');
            if (lines[0].ToLower().Contains("paroles de la chanson"))
                return string.Join("\n", lines, 1, lines.Length - 1);
            else return lyric;
        }

        private void LoadVideosData()
        {
            int line = 0;
            string s = "";
            int id = 0;
            string language = "";
            string title = "";
            string artist = "";
            List<string> genres = new List<string>();
            using (StreamReader sr = new StreamReader(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "Videos.Data.txt")))
            {
                while ((s = sr.ReadLine()) != null)
                {
                    line++;

                    //1st line loads language
                    if (line == 1)
                    {
                        language = s.Trim();
                    }
                    //2st line loads title
                    else if (line == 2)
                    {
                        title = s.Trim();
                    }
                    //2st line loads artist
                    else if (line == 3)
                        artist = s.Trim();
                    //3st line loads genres
                    else if (line == 4)
                        genres = new List<string>(s.Trim().Split(','));
                    //4st line loads youtubeId and save video
                    else if (line == 5)
                    {
                        Video video = new Video
                        {
                            Id = ++id,
                            Language = language,
                            Title = title,
                            Artist = artist,
                            Genres = genres,
                            YoutubeId = s.Trim(),
                        };
                        _videos.Add(video);
                    }
                    else
                        line = 0;
                }
            }
        }
    }
}