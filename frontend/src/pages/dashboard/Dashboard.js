import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getUser, getUserOrders } from '../../api';
import { useUser } from '../../context/UserContext'; 
import VinylLoader from '../../components/VinylLoaderComponent/VinylLoader';
import styles from './Dashboard.module.scss';
import UserOrder from '../../components/UserOrderComponent/UserOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import AvatarComponent from '../../components/AvatarComponent/AvatarComponent';
import LogoutButton from '../../components/LogoutButtonComponent/LogoutButton';
import { faCartShopping, faEllipsis, faReceipt } from '@fortawesome/free-solid-svg-icons';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

function Dashboard() {
  const { currentUser, login } = useUser(); 
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);

    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const navigationClick = (path) => {
    return navigate(`/dashboard/${path}`)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser(); // ✅ Get user first
        login(user); // ✅ Save user in context
  
        try {
          const userOrders = await getUserOrders(); // Fetch orders separately
          setOrders(userOrders);
        } catch (error) {
          console.warn("⚠️ No orders found for this user.");
        }
      } catch (error) {
        console.error("❌ Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    setPageHeight();

    window.addEventListener("resize", setPageHeight);
    return () => window.removeEventListener("resize", setPageHeight);
  }, [setPageHeight]);


  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        {loading ? (
            <VinylLoader />
          ) : currentUser ? (
            <div className={styles.userInfo}>
              <h2>Welcome, {currentUser.fullName} 👋</h2>
              <div className={styles.card}>
                <div className={styles.topCtn}>
                  <div className={styles.leftUserCtn}>
                    <div className={styles.avatar}>
                      <AvatarComponent fullName={currentUser.fullName} size={58} />
                    </div>
                    <div className={styles.userTextCtn}>
                      <p className={styles.fullName}>{currentUser.fullName}</p>
                      <p className={styles.email}>{currentUser.email}</p>
                    </div>
                  </div>
                  <div className={styles.rightUserCtn}>
                    <div className={location.pathname.endsWith('orders') ? `${styles.iconWrapper} ${styles.iconWrapperActive}`  : styles.iconWrapper} onClick={() => navigationClick('orders')}>
                      <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                    <div className={location.pathname.endsWith('calendar') ? `${styles.iconWrapper} ${styles.iconWrapperActive}`  : styles.iconWrapper} onClick={() => navigationClick('calendar')}>
                      <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <div className={styles.iconWrapper + " " + styles.rotated}><FontAwesomeIcon icon={faEllipsis} /></div>
                  </div>
                </div>

                <div className={styles.details}>
                  <div className={styles.detailsLeftCtn}>
                    <p><strong>Full Name:</strong> {currentUser.fullName}</p>
                    <p><strong>Gender:</strong> {currentUser.gender}</p>
                    <p><strong>DOB:</strong> {new Date(currentUser.dob).toLocaleDateString()}</p>
                    <p><strong>Country:</strong> {currentUser.country}</p>
                  </div>
                  <div className={styles.detailsRightCtn}>
                    <img className={styles.detailsImage} src={`${process.env.PUBLIC_URL}/piano.png`} alt="Piano" />
                  </div>
                </div>
              </div>

              {location.pathname === '/dashboard' && (
                <div className={styles.defaultDashboard}>
                  <h3>Your personalized dashboard ✨</h3>
                  <p>Use the icons above to view your orders (<FontAwesomeIcon icon={faCartShopping} />) or event calendar (<FontAwesomeIcon icon={faCalendar} />).</p>
                  <p>More features coming soon...</p>
                </div>
              )}

              {location.pathname.endsWith('/orders') && (
                <UserOrder orders={orders} />
              )}

              {location.pathname.endsWith('/calendar') && (
                <CalendarComponent currentUser={currentUser}/>
              )}

              <div className={styles.buttonsCtn}>
                <LogoutButton />
              </div>
            </div>
          ) : (
            <p className={styles.noUser}>No user data found.</p>
          )}
      </div>
    </div>
  );
}

export default Dashboard;