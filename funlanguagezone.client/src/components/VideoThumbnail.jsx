import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './VideoThumbnail.css';

const VideoThumbnail = ({ video }) => {
    return (
        <div className="styledCard">
            <a href={`/video/${video.id}`}>
                <Card.Body>
                    <Card.Img className="styledImg" style={{ borderRadius: '10px', overflow: 'hidden' }} variant="top" src={`https://img.youtube.com/vi/${video.youtubeId}/0.jpg`} />
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text>{video.artist}</Card.Text>
                </Card.Body>
            </a>
        </div>
    );
};

export default VideoThumbnail;