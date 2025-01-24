import React from 'react'
import navigation from '../../data/navigation';
import styles from './FooterComponent.module.scss';
import { Link, useLocation } from 'react-router-dom'
import socialMedia from '../../data/social-media';
import instagram from '../../assets/social-media/instagram.svg';
import telegram from '../../assets/social-media/telegram.svg';
import youtube from '../../assets/social-media/youtube.svg';

const socialMediaIcons = [
  instagram, telegram, youtube
];

function FooterComponent() {
  let location = useLocation(); 
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerNavigationCtn}>
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
        </div>

        <div className={styles.footerSocialMediaCtn}>
          <ul className={styles.navList}>
              {
                socialMedia.map((sm, index) => {
                    return( 
                        <li key={index} className={styles.navListItem}>
                            <Link to={sm.link} target="_blank">
                              <img src={socialMediaIcons[index]} alt={sm.name} />
                            </Link>
                        </li>
                    )
                })
              }
          </ul>
        </div>

        <div className={styles.rightsCtn}>
          <p className={styles.rightsText}>© 2024 OWNYOURSONG. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
