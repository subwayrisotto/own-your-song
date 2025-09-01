import React, { useEffect, useState } from 'react';
import { getOrders, getUser, getUsers } from '../../api';
import { useUser } from '../../context/UserContext'; 
import VinylLoader from '../../components/VinylLoaderComponent/VinylLoader';
import styles from './AdminDashboard.module.scss';
import AvatarComponent from '../../components/AvatarComponent/AvatarComponent';
import UserOrder from '../../components/UserOrderComponent/UserOrder';
import OrdersSummary from '../../components/OrdersSummaryComponent/OrdersSummary';
import OrdersChart from '../../components/OrdersChartComponent/OrdersChart';
import LogoutButton from '../../components/LogoutButtonComponent/LogoutButton';

function AdminDashboard() {
  const {login } = useUser(); 
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);


  const [ordersSummary, setOrdersSummary] = useState({
    totalUsers: {
      id: 1,
      title: "Total Users",
      icon: 'globe.svg',
      prevValue: 0, 
      currentValue: 0,
      isMoney: false
    },
    todaySales: {
      id: 2,
      title: "Today's Sales",
      icon: 'wallet.svg',
      prevValue: 0,
      currentValue: 0,
      isMoney: true
    },
    totalSales: {
      id: 3,
      title: "Total Sales",
      icon: 'cart.svg',
      prevValue: 0,
      currentValue: 0,
      isMoney: true
    },
    totalOrders: {
      id: 3,
      title: "Total Orders",
      icon: 'cart.svg',
      prevValue: 0,
      currentValue: 0,
      isMoney: false
    }
  });

  const formatDate = (isoDate) => isoDate.split("T")[0];

  // Get today's and yesterday's dates
  const getFormattedDate = (daysAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString().split("T")[0];
  };
  
  const today = getFormattedDate(0);
  const yesterday = getFormattedDate(1);
  
  // Group and sum orders by day
  const groupOrdersByDay = (orders) => {
      return orders.reduce((acc, order) => {
          const date = formatDate(order.createdAt);
          acc[date] = (acc[date] || 0) + order.amount;
          return acc;
      }, {});
  };

  const calculateTotalSales = (orders) => {
    return orders.reduce((total, order) => total + order.amount, 0);
  };

  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);

    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

  async function fetchOrders() {
    try {
        const ordersData = await getOrders();
        setOrders(ordersData);
    } catch (error) {
        console.error("Error fetching orders:", error);
    } finally {
        setLoading(false); 
    }
  }

  async function fetchUsers() {
    try {
        const usersData = await getUsers();
        setUsers(usersData);
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        setLoading(false); 
    }
  }
  
  const fetchUserData = async () => {
    try {
        const user = await getUser(); 
        login(user); 
    } catch (error) {
        console.error("❌ Error fetching user data", error);
    }
  };
  
  useEffect(() => {
    fetchOrders();
    fetchUserData();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!orders.length) return; // Don't calculate if no orders

    const salesByDay = groupOrdersByDay(orders);
    const todaySales = salesByDay[today] || 0;
    const yesterdaySales = salesByDay[yesterday] || 0;
    const totalSales = calculateTotalSales(orders);

    setOrdersSummary((prevSummary) => ({
      ...prevSummary,
      todaySales: {
        ...prevSummary.todaySales,
        prevValue: yesterdaySales,
        currentValue: todaySales
      },
      totalSales: {
        ...prevSummary.totalSales,
        prevValue: prevSummary.totalSales.currentValue,
        currentValue: totalSales
      },
      totalUsers: {
        ...prevSummary.totalUsers,
        prevValue: prevSummary.totalUsers.currentValue,
        currentValue: users.length
      },
      totalOrders: {
        ...prevSummary.totalOrders,
        prevValue: prevSummary.totalOrders.currentValue,
        currentValue: orders.length
      }
    }));
  }, [orders]); 

  useEffect(() => {
    setPageHeight();

    window.addEventListener("resize", setPageHeight);
    return () => window.removeEventListener("resize", setPageHeight);
  }, [setPageHeight]);


  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        {
          loading ? (
            <VinylLoader/>
          ) : (
            <>
              <div className={styles.ordersSummary}>
                <OrdersSummary {...ordersSummary.totalUsers} />
                <OrdersSummary {...ordersSummary.todaySales} />
                <OrdersSummary {...ordersSummary.totalSales} />
                <OrdersSummary {...ordersSummary.totalOrders} />
              </div>

              <div className={styles.ordersChartWrapper}>
                <p className={styles.headerText}>Sales overview:</p>
                <OrdersChart orders={orders}/>
              </div>

              <div className={styles.orders}>
                {orders.length ? (
                    <div className={styles.ordersCtn}>
                      <UserOrder orders={orders}/>
                    </div>
                  ) : (
                    <p className={styles.noOrders}>No orders yet! 📦</p>
                  )}

                <LogoutButton/>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default AdminDashboard;