import React from 'react';
import styles from './NavigationComponenets.module.scss';
import navigation from '../../data/navigation';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

function NavigationComponents() {
    return (
        <div className={styles.navigationContainer}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/">OWNYOURSONG</Link>
                </div>

                <ul className={styles.navigationList}>
                    {
                        navigation.map((nav, index) => {
                            return( 
                                <li key={index}>
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