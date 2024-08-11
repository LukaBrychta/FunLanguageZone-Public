import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import VideoThumbnail from './VideoThumbnail';

const VideoList = ({ selectedCategory, selectedLanguage }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch('/api/videos');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setVideos(data);
                }
            }
        }
        fetchVideos();
    }, []);

    const filteredVideos = selectedCategory
        ? videos.filter(video => video.genres.includes(selectedCategory))
        : videos;

    const finalFilteredVideos = selectedLanguage
        ? filteredVideos.filter(video => video.language.includes(selectedLanguage))
        : filteredVideos;

    return (
        <Container>
            <Row>
                {Array.isArray(finalFilteredVideos) && finalFilteredVideos.length > 0 ? (
                    finalFilteredVideos.map(video => (
                        <Col key={video.id} xs={6} md={4} lg={3}>
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

export default VideoList;