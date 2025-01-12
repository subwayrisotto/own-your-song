import React from 'react';
import styles from './NavigationComponenets.module.scss';
import navigation from '../../data/navigation';
import { Link } from 'react-router-dom'

function NavigationComponents() {
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/">OWNYOURSONG</Link>
                </div>

                <ul className={styles.navList}>
                    {
                        navigation.map((nav, index) => {
                            return( 
                                <li key={index} className={styles.navListItem}>
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