import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import VideoThumbnail from './VideoThumbnail';

const VideoListFooter = ({ skipId, countVideos, language }) => {
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch(`/api/videos/random/${skipId}/${language}/${countVideos}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setVideos(data);
                }
            }
        }
        fetchVideos();
    }, []);


    return (
        <Container>
            <Row>
                {Array.isArray(videos) && videos.length > 0 ? (
                    videos.map(video => (
                        <Col key={video.id}>
                            <VideoThumbnail video={video} />
                        </Col>
                    ))
                ) : (
                    <p>No videos available.</p>
                )}
            </Row>
        </Container>
    );
};

export default VideoListFooter;