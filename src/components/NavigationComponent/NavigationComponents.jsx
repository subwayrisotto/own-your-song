import React from 'react';
import styles from './NavigationComponents.module.scss';
import navigation from '../../data/navigation';
import logo from '../../assets/logo.svg'; 
import { Link, useLocation } from 'react-router-dom'

function NavigationComponents() {
    let location = useLocation(); 
    
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="Own Your S" />
                    </Link>
                </div>

                <ul className={styles.navList}>
                    {
                        navigation.map((nav, index) => {
                            return( 
                                <li key={index} className={
                                    nav.navigateTo === location.pathname 
                                        ? styles.navListItem + " " + styles.active
                                        : styles.navListItem
                                }>
                                    <Link to={nav.navigateTo}>{nav.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
  )
}

export default NavigationComponents