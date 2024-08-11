import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import './VideoPlayer.css';
import VideoListFooter from './VideoListFooter';
import flagCZ from '../../public/Flag_CZ.png';
import flagDE from '../../public/Flag_DE.png';
import flagEN from '../../public/Flag_EN.png';

const VideoPlayer = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const response = await fetch(`/api/video/${id}`);
            if (response.ok) {
                const data = await response.json();
                setVideo(data);
            }
        };

        fetchVideo();
    }, [id]);

    if (!video) return <div>Loading...</div>;

    let flag = "";
    if (video.language == "CZ") {
        flag = flagCZ;
    }

    else if (video.language == "EN") {
        flag = flagEN;
    }

    else if (video.language == "DE") {
        flag = flagDE;
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} lg={6}>
                    <h1>{video.title}</h1>
                    <h2>{video.artist}</h2>
                    <img src={flag} alt="Flag" width="50" height="50" />
                    <p>{video.genres.join(', ')}</p>
                    <div className="video-container">
                        <iframe
                            title={video.title}
                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
                <Col className="lyrics-container" xs={12} md={6} lg={6}>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>{video.lyric}</pre>
                </Col>
            </Row>
            <Row className="my-5">
                <Col xs={12} className="d-block d-md-none">
                    <VideoListFooter skipId={id} countVideos={2} language={video.language} />
                </Col>
                <Col md={12} className="d-none d-md-block d-lg-none">
                    <VideoListFooter skipId={id} countVideos={3} language={video.language} />
                </Col>
                <Col lg={12} className="d-none d-lg-block">
                    <VideoListFooter skipId={id} countVideos={4} language={video.language} />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoPlayer;