import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

const NavBar = ({ categories, onCategorySelect, languages, onLanguageSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [selectedLanguage, setSelectedLanguage] = useState("All languages");
    const navigate = useNavigate();

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (onCategorySelect) {
            onCategorySelect(category);
            navigate('/');
        }
    };
    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        if (onLanguageSelect) {
            onLanguageSelect(language);
            navigate('/');
        }
    }

    let classLanguage = "";
    if (selectedLanguage == "CZ") {
        classLanguage = "SelectedLanguageCZ";
    }

    else if (selectedLanguage == "EN") {
        classLanguage = "SelectedLanguageEN";
    }

    else if (selectedLanguage == "DE") {
        classLanguage = "SelectedLanguageDE";
    }


    return (
        <Navbar className="StyledNavbar">
            <Nav.Link className="d-none d-md-block" href="/"><img src={"../FunLanguageZone_Logo.jpg"} width="50" height="50" /> FunLanguageZone</Nav.Link>
            <Nav.Link className="d-block d-md-none" href="/"><img src={"../FunLanguageZone_Logo.jpg"} width="50" height="50" /></Nav.Link>

            <NavDropdown title={selectedCategory}>
                {categories.map(category => (
                    <NavDropdown.Item key={category} onClick={() => handleCategorySelect(category)}>
                        {category}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
            <NavDropdown className={classLanguage} title={selectedLanguage}>
                {languages.map(language => (
                    <NavDropdown.Item key={language} onClick={() => handleLanguageSelect(language)}>
                        {language}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </Navbar>
    );
};

export default NavBar;