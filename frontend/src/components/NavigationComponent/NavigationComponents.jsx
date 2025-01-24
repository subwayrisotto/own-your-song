import React, { useRef, useState, useEffect } from 'react';
import styles from './NavigationComponents.module.scss';
import navigation from '../../data/navigation';
import logo from '../../assets/logo.svg'; 
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavigationComponents() {
    let location = useLocation(); 
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const showNavbar = () => {
        if (!isOpen) {
            navRef.current.classList.add(styles.responsiveNavOpen);
            navRef.current.classList.remove(styles.responsiveNavClose);
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            navRef.current.classList.add(styles.responsiveNavClose);
            navRef.current.classList.remove(styles.responsiveNavOpen);
            document.body.style.overflow = ''; // Re-enable scrolling
        }
        setIsOpen(!isOpen);
    };

    const hideNavbar = () => {
        navRef.current.classList.add(styles.responsiveNavClose);
        navRef.current.classList.remove(styles.responsiveNavOpen);
        document.body.style.overflow = ''; // Re-enable scrolling
        setIsOpen(false);
    };

    useEffect(() => {
        // Clean up body styles when the component unmounts or isOpen changes
        return () => {
            document.body.style.overflow = ''; // Ensure scrolling is re-enabled
        };
    }, []);

    return (
        <div className={styles.navContainer}>
            {/* Hamburger menu button */}
            <button className={styles.navButton} onClick={showNavbar}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Navigation menu */}
            <nav className={styles.nav} ref={navRef}>
                {/* Logo */}
                <div className={styles.logo}>
                    <Link to="/" onClick={hideNavbar}>
                        <img src={logo} alt="Own Your Song" />
                    </Link>
                </div>

                {/* Navigation links */}
                <ul className={styles.navList}>
                    {navigation.map((nav, index) => (
                        <li 
                            key={index} 
                            className={
                                nav.navigateTo === location.pathname 
                                    ? styles.navListItem + " " + styles.active
                                    : styles.navListItem
                            }
                        >
                            <Link 
                                to={nav.navigateTo} 
                                onClick={hideNavbar} // Close navbar and enable scrolling
                            >
                                {nav.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Close button */}
                <button className={styles.navButton} onClick={showNavbar}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </nav>
        </div>
    );
}

export default NavigationComponents;