import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getUserOrders } from '../../api';
import { useUser } from '../../context/UserContext'; 
import VinylLoader from '../../components/VinylLoaderComponent/VinylLoader';
import styles from './Dashboard.module.scss';
import UserOrder from '../../components/UserOrderComponent/UserOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function Dashboard() {
  const { currentUser, login, logout } = useUser(); 
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); 

  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);

    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

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

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        {loading ? (
            <VinylLoader />
          ) : currentUser ? (
            <div className={styles.userInfo}>
              <div className={styles.card}>
                <div className={styles.avatar}>
                  {/* <img src="/avatar-placeholder.png" alt="User Avatar" /> */}
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <h2>Welcome, {currentUser.fullName} 👋</h2>
                <p className={styles.email}>{currentUser.email}</p>
                
                <div className={styles.details}>
                  <p><strong>Full Name:</strong> {currentUser.fullName}</p>
                  <p><strong>Gender:</strong> {currentUser.gender}</p>
                  <p><strong>DOB:</strong> {new Date(currentUser.dob).toLocaleDateString()}</p>
                  <p><strong>Country:</strong> {currentUser.country}</p>
                </div>
              </div>

              {orders.length ? (
                <div className={styles.ordersCtn}>
                  <h3>Total Orders: {orders.length}</h3>
                  <UserOrder orders={orders} />
                </div>
              ) : (
                <p className={styles.noOrders}>No orders yet! 📦</p>
              )}

              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <p className={styles.noUser}>No user data found.</p>
          )}
      </div>
    </div>
  );
}

export default Dashboard;