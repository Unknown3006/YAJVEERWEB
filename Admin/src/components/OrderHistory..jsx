import "../CSS/OrderHistory.css";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const { data: orderhistory } = useSelector((state) => state.orderhistory);

  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + (product.actualPrice || 0),
      0
    );
  };

  return (
    <div className="order-history-dashboard">
      <h1 className="dashboard-title">Order History</h1>

      {orderhistory && orderhistory.length > 0 ? (
        <div className="table-container">
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Products</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderhistory.map((order) => (
                <tr key={order.orderId}>
                  <td className="order-id">{order.orderId}</td>
                  <td className="customer-info">
                    <div className="customer-name">{order.fullname}</div>
                    <div className="customer-email">{order.email}</div>
                  </td>
                  <td className="customer-phone">{order.mobilenumber}</td>
                  <td className="products-info">
                    {order.products.map((product, index) => (
                      <div key={index} className="product-item">
                        <div className="product-name">
                          {product.productId?.productName || "N/A"}
                        </div>
                        <div className="product-details">
                          <span>{product.weightInGrams}g</span>
                          <span>Qty: {product.quantity}</span>
                          <span>₹{product.basePrice}</span>
                          <span>₹{product.actualPrice}</span>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="order-total">
                    ₹{calculateTotal(order.products)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders">No order history found</div>
      )}
    </div>
  );
}
