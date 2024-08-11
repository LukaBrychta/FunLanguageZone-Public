import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [languages, setLanguages] = useState(["EN", "DE", "CZ"]);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch('/api/videos');
            const videos = await response.json();

            const genresArray = videos.flatMap(video => video.genres);
            const uniqueGenresSet = new Set(genresArray);
            const allCategories = [...uniqueGenresSet];

            const sortedAllCategories = allCategories.sort((a, b) => a.localeCompare(b));

            setCategories(sortedAllCategories);
        };

        fetchVideos();
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <Router>
            <div className="main-content">
                <NavBar categories={categories} onCategorySelect={handleCategorySelect} languages={languages} onLanguageSelect={handleLanguageSelect} />
                <Routes>
                    <Route path="/" element={<VideoList selectedCategory={selectedCategory} selectedLanguage={selectedLanguage} />} />
                    <Route path="/video/:id" element={<VideoPlayer />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;