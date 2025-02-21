import React, { useEffect, useState } from 'react';
import styles from './UserOrder.module.scss';

const Order = ({ order }) => {
  const [orderedDate, setOrderedDate] = useState("");

  useEffect(() => {
    if (order.createdAt) {
      const date = new Date(order.createdAt);
      setOrderedDate(date.toLocaleString()); // Formats into a readable date-time
    }
  }, [order.createdAt]);

  return (
    <tr className={styles.orderTr}>
      <td className={styles.orderTd}>{order.orderId}</td>
      <td className={styles.orderTd}>{order.amount.toFixed(2)}$</td> {/* Ensuring proper currency format */}
      <td className={styles.orderTd}>{order.status}</td>
      <td className={styles.orderTd}>{orderedDate}</td>
    </tr>
  );
};

function UserOrder(props) {
  const {orders} = props
  console.log(orders)
  return (
    <div className={styles.ordersCtn}>
      <table className={styles.ordersTable}>
        <thead>
          <tr className={styles.orderTr}>
            <th className={styles.orderTh}>ID</th>
            <th className={styles.orderTh}>Amount</th>
            <th className={styles.orderTh}>Status</th>
            <th className={styles.orderTh}>Ordered at</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => <Order order={order} key={order.orderId || index} />)
          ) : (
            <tr>
              <td className={styles.noOrders} colSpan="4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrder;