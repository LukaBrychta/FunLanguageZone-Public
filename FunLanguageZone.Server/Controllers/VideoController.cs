using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FunLanguageZone.Server.Data;
using FunLanguageZone.Server.Models;

namespace FunLanguageZone.Server.Controllers
{
    [ApiController]
    [Route("api/")]
    public class VideoController : ControllerBase
    {
        private readonly VideoService _videoService;

        public VideoController()
        {
            _videoService = new VideoService();
        }

        [HttpGet("videos")]
        public async Task<ActionResult<List<Video>>> GetVideosAsync()
        {
            var videos = await _videoService.GetVideosAsync();

            if (videos == null || videos.Count == 0)
            {
                return NotFound();
            }
            return Ok(videos);
        }
        [HttpGet("videos/random/{skipId}/{language}/{countVideos}")]
        public async Task<ActionResult<List<Video>>> GetVideosAsync(int skipId, string language, int countVideos)
        {
            var videos = await _videoService.GetVideosAsync(skipId, language, countVideos);

            if (videos == null || videos.Count == 0)
            {
                return NotFound();
            }
            return Ok(videos);
        }

        [HttpGet("video/{id}")]
        public async Task<ActionResult<Video>> GetVideoByIdAsyc(int id)
        {
            
            var searchVideo = await _videoService.GetVideoByIdAsync(id);

            if (searchVideo == null)
            {
                return NotFound();
            }
            return Ok(searchVideo);
        }
    }
}
