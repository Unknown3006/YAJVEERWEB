import "../CSS/Order.css";
import { useSelector, useDispatch } from "react-redux";
import LoadingAnimation from "./LoadingAnimation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { deleteOrder } from "../Redux/Order.js";
import { orderhistorydata } from "../Redux/OrderHistory.js";
import axios from "axios";


export default function Order() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: orders } = useSelector((state) => state.order);

  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + (product.actualPrice || 0),
      0
    );
  };

  const handleStatusChange = async (orderId) => {
    console.log(orderId);
    setIsLoading(true);
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_SERVER
        }/api/v1/users/admin/orders/${orderId}/markdone`
      );
      dispatch(deleteOrder(orderId));
      dispatch(orderhistorydata());
      toast.success("Order Archievd successfully.");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to Archive Order!!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <>
      <div className="orders-dashboard">
        <h1 className="dashboard-title">Customer Orders</h1>

        {orders && orders.length > 0 ? (
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th className="payment-status-header">
                    <div>Payment</div>
                    <div>Status</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
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
                    <td className="order-status">
                      <button
                        className="status-button pending"
                        onClick={() => handleStatusChange(order.orderId)}
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-orders">No orders found</div>
        )}
      </div>
    </>
  );
}
