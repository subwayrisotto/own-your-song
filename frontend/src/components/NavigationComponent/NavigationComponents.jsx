import React, { useRef, useState, useEffect } from 'react';
import styles from './NavigationComponents.module.scss';
import navigation from '../../data/navigation';
import logo from '../../assets/logo.svg'; 
import { useUser } from '../../context/UserContext';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import AvatarComponent from '../AvatarComponent/AvatarComponent';

function NavigationComponents() {
    let location = useLocation(); 
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useUser();

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
                    {navigation.map((nav) => {
                        if (nav.name === "Auth") {
                            const authLink = currentUser
                                ? { name: currentUser.fullName, navigateTo: currentUser.role === "admin" ? "/dashboard/admin" : "/dashboard" }
                                : { name: "Sign In", navigateTo: "/sign-in" };
                            
                            const isActive = location.pathname === authLink.navigateTo;
                        
                            return (
                                currentUser ? (
                                    <li key={nav.id}>
                                        <Link to={authLink.navigateTo} onClick={hideNavbar}>
                                            <AvatarComponent fullName={authLink.name} isActive={isActive} />
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={nav.id} className={isActive ? `${styles.navListItem} ${styles.active}` : styles.navListItem}>
                                        <Link to={authLink.navigateTo} onClick={hideNavbar}>{authLink.name}</Link>
                                    </li>
                                )
                                
                            );
                        }

                        if (nav.name === "Privacy Policy" || nav.name === "Terms of Use") return;

                        const isActive = location.pathname === nav.navigateTo;

                        return (
                            <li key={nav.id} className={isActive ? `${styles.navListItem} ${styles.active}` : styles.navListItem}>
                                <Link to={nav.navigateTo} onClick={hideNavbar}>{nav.name}</Link>
                            </li>
                        );
                    })}
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
