import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { markOrderAsComplete } from '../../api';
import { useUser } from '../../context/UserContext';
import styles from './UserOrder.module.scss';

const DEFAULT_PLAN = 'gold'
const DEFAULT_CURRENCY = '$'

const Order = ({ order, onClick, isActive, isAdmin }) => {
  const [orderedDate, setOrderedDate] = useState("");

  useEffect(() => {
    if (order.createdAt) {
      const date = new Date(order.createdAt);
      setOrderedDate(date.toLocaleString());
    }
  }, [order.createdAt]);
  return (
    <tr
      className={`${styles.orderTr} ${isActive ? styles.activeOrder : ""}`}
      onClick={() => onClick(order)}
    >
      <td className={styles.orderTd}>{order.orderId}</td>
      <td className={styles.orderTd}>{orderedDate}</td>
      { isAdmin && <td className={styles.orderTd}>{order.customerName}</td> }
      <td className={styles.orderTd}>{order.currentPlan}</td> 
      { !isAdmin && <td className={styles.orderTd}>{order.amount}{DEFAULT_CURRENCY}</td>  }
      <td className={styles.orderTd}>{order.formData?.dateDelivery}</td>
      <td className={`${styles.orderTd} ${order.isCompleted ? styles.orderCompleted : styles.orderInProgress}`}>{order.isCompleted ? "Completed" : "In Progress"}</td> 
    </tr>
  );
};



const OrderDetails = ({ formData, orderId, onUpdate, isCompleted, isAdmin }) => {
  const {
    funnyStory, characterTraits, hobbies, email, recipient,
    recipientRole, songMood, songStyle, songTempo, instruments, story, songLanguage
  } = formData;

  const [isUpdating, setIsUpdating] = useState(false);

  const handleMarkAsComplete = async () => {
    setIsUpdating(true);
  
    const updatedOrder = await markOrderAsComplete(orderId);
  
    if (updatedOrder) {
      onUpdate(updatedOrder); // Update the order state in UserOrder
    }
  
    setIsUpdating(false);
  };

  return (
    <div className={styles.detailsContent}>
      <p className={styles.headerText}>Order overview:</p>
      <ul className={styles.orderDetailsList}>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Hobbies:</p>
          <p className={styles.detailsValue}>{hobbies || "No hobbies provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Character Traits:</p>
          <p className={styles.detailsValue}>{characterTraits || "No character traits provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Email:</p>
          <p className={styles.detailsValue}>{email || "No email provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Recipient:</p>
          <p className={styles.detailsValue}>{recipient || "No recipient provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Recipient Role:</p>
          <p className={styles.detailsValue}>{recipientRole || "No recipient role provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Song Mood:</p>
          <p className={styles.detailsValue}>{songMood || "No song mood provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Song Style:</p>
          <p className={styles.detailsValue}>{songStyle || "No song style provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Song Language:</p>
          <p className={styles.detailsValue}>{songLanguage || "No song language provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Song Tempo:</p>
          <p className={styles.detailsValue}>{songTempo || "No song tempo provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Instruments:</p>
          <p className={styles.detailsValue}>{instruments || "No instruments provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Funny Story:</p>
          <p className={styles.detailsValue}>{funnyStory || "No funny story provided"}</p>
        </li>
        <li className={styles.orderDetailsListItem}>
          <p className={styles.detailsHeader}>Story:</p>
          <p className={styles.detailsValue}>{story || "No story provided"}</p>
        </li>
      </ul>

      {(!isCompleted && isAdmin) && (
        <button onClick={handleMarkAsComplete} disabled={isUpdating} className={styles.completeBtn}>
          {isUpdating ? "Updating..." : "Mark as Complete"}
        </button>
      )}
    </div>
  );
};

const SearchOrders = ({ orders, setFilteredOrders, setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.currentPlan?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchQuery, orders, setFilteredOrders, setCurrentPage]);

  return (
    <div className={styles.searchInputCtn}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

function UserOrder({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState('orderId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedOrders, setSortedOrders] = useState(orders);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [ordersDoneThisMonth, setOrdersDoneThisMonth] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  
  const { currentUser } = useUser();
  const isAdmin = currentUser.role === "admin" ? true : false;

  const [currentPage, setCurrentPage] = useState(() => {
    return Number(localStorage.getItem("currentPage")) || 1;
  });
  const ordersPerPage = 5;

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage); 

  const filteredPaginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  useEffect(() => {
    let updatedOrders = sortedOrders;

    if (filterStatus === "completed") {
      updatedOrders = sortedOrders.filter((order) => order.isCompleted);
    } else if (filterStatus === "inProgress") {
      updatedOrders = sortedOrders.filter((order) => !order.isCompleted);
    }

    setFilteredOrders(updatedOrders);
  }, [filterStatus, orders]);

  const handleSort = (column) => {
    const newDirection = (column === sortColumn && sortDirection === 'asc') ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);

    // const sorted = [...orders].sort((a, b) => {
    //   switch(column){
    //     case 'orderId': 
    //       return newDirection === 'asc' ? a.orderId.localeCompare(b.orderId) : b.orderId.localeCompare(a.orderId);
    //     case 'createdAt':
    //       return newDirection === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
    //     case 'customerName':
    //       return newDirection === 'asc' ? a.customerName.localeCompare(b.customerName) : b.customerName.localeCompare(a.customerName);
    //     case 'currentPlan':
    //       return newDirection === 'asc' ? a.currentPlan.localeCompare(b.currentPlan) : b.currentPlan.localeCompare(a.currentPlan);
    //     case 'dateDelivery':
    //       return newDirection === 'asc' ? new Date(a.formData.dateDelivery) - new Date(b.formData.dateDelivery) : new Date(b.formData.dateDelivery) - new Date(a.formData.dateDelivery);
    //     case 'isCompleted':
    //       return newDirection === 'asc' ? a.isCompleted - b.isCompleted : b.isCompleted - a.isCompleted;
    //     default:
    //       return newDirection === 'asc' ? a.orderId.localeCompare(b.orderId) : b.orderId.localeCompare(a.orderId);
    //   }
    // });

    // // Update the sorted orders state
    // setSortedOrders(sorted);
    setSelectedOrder(null); // reset selected order after sorting
  };

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (orders.length > 0) {
      const savedPage = Number(localStorage.getItem("currentPage")) || 1;
      const maxPage = Math.ceil(orders.length / ordersPerPage);

      setCurrentPage(savedPage > maxPage ? 1 : savedPage);
    }

    const sorted = [...orders].sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.isCompleted ? 1 : -1; // Move "In Progress" to the top
    });
  
    setFilteredOrders(sorted);
    setSortedOrders(sorted);
  }, [orders]);

  useEffect(() => {
    if (filteredOrders.length > 0) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
  
      const completedOrdersThisMonth = filteredOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return order.isCompleted && orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
      }).length;
  
      setOrdersDoneThisMonth(completedOrdersThisMonth);
    }
  }, [filteredOrders]);

  const handleCreateNewSong = () => {
    navigate(`/form?plan=${DEFAULT_PLAN}`)
  }

  const handleOrderUpdate = (updatedOrder) => {
    setSelectedOrder(null);
  
    // Update the orders list to reflect the status change
    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  
    setSortedOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  
    // Check if the updated order is completed in the current month
    const completionDate = new Date();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
  
    if (
      updatedOrder.isCompleted &&
      completionDate.getMonth() === currentMonth &&
      completionDate.getFullYear() === currentYear
    ) {
      setOrdersDoneThisMonth((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className={styles.ordersCtn}>
      <div className={`${styles.ordersLeft} ${selectedOrder ? styles.shrink : ""}`}>
        <div className={styles.ordersTop}>
          <div className={styles.leftCtn}>
            <p className={styles.headerText}>Orders:</p>
            {
              ordersDoneThisMonth > 0 && isAdmin && (
                <div className={styles.doneThisMonth}>
                  <img src={`${process.env.PUBLIC_URL}/orders/checkmark.svg`} alt="checkmark" className={styles.checkmarkImage}/> 
                  <p className={styles.doneOrdersText}>{ordersDoneThisMonth} {ordersDoneThisMonth === 1 ? "order" : "orders"} done this month</p>
                </div>
              )
            }
          </div>
          {
            !isAdmin && <div className={styles.createNewSongBtnCtn}>
              <button type='button' className={styles.dashboardBtn} onClick={handleCreateNewSong}>New Song</button>
            </div>
          }
        </div>
        {
          isAdmin && (
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${filterStatus === "all" ? styles.active : ""}`}
                onClick={() => setFilterStatus("all")}
              >
                All Orders
              </button>
              <button
                className={`${styles.filterButton} ${filterStatus === "completed" ? styles.active : ""}`}
                onClick={() => setFilterStatus("completed")}
              >
                Completed Orders
              </button>
              <button
                className={`${styles.filterButton} ${filterStatus === "inProgress" ? styles.active : ""}`}
                onClick={() => setFilterStatus("inProgress")}
              >
                Orders In Progress
              </button>
            </div>
          )
        }
        
        <SearchOrders orders={sortedOrders} setFilteredOrders={setFilteredOrders} setCurrentPage={setCurrentPage} />
        <div className={styles.ordersTableContainer}>
          <table className={styles.ordersTable}>
            <thead>
              <tr className={styles.orderTr}>
                <th className={styles.orderTh} onClick={() => handleSort('orderId')}>Order ID</th>
                <th className={styles.orderTh} onClick={() => handleSort('createdAt')}>Date</th>
                { isAdmin && <th className={styles.orderTh} onClick={() => handleSort('customerName')}>Customer</th> }
                <th className={styles.orderTh} onClick={() => handleSort('currentPlan')}>Plan</th> 
                { !isAdmin && <th className={styles.orderTh}>Amount</th>  }
                <th className={styles.orderTh} onClick={() => handleSort('dateDelivery')}>Date Delivery</th>
                <th className={styles.orderTh} onClick={() => handleSort('isCompleted')}>Status</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
            {filteredPaginatedOrders.length > 0 ? (
              filteredPaginatedOrders.map((order) => (
                <Order
                  order={order}
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  isActive={selectedOrder && selectedOrder.orderId === order.orderId}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <tr>
                <td className={styles.noOrders} colSpan="6">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>{'<'}</button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? styles.activePage : ""}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>{'>'}</button>
          </div>
        )}
        </div>
      </div>

      <div className={`${styles.ordersRight} ${selectedOrder ? styles.expand : ""}`}>
        {selectedOrder && (
          <>
            <div className={styles.closeButton} onClick={() => setSelectedOrder(null)}>
              <FontAwesomeIcon icon={faClose} />
            </div>
            <OrderDetails formData={selectedOrder.formData} orderId={selectedOrder._id} onUpdate={handleOrderUpdate} isCompleted={selectedOrder.isCompleted} isAdmin={isAdmin}/>
          </>
        )}
      </div>
    </div>
  );
}

export default UserOrder;