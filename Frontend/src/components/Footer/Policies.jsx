import React from 'react';
import { useState } from 'react';
import "../../CSS/Footer/Policies.css";
import Navbar from '../Navbar';
import Navbar2 from '../Navbar2';
import MainNav from '../MainNav';
import Footer from './Footer';
import Sidebar from '../Home/sidebar';
import Sidebar1 from '../Home/sidebar1';

function Policies() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);
  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2></Navbar2>
      <MainNav></MainNav>
      <div className="policies-container">
        <h1>Return and Refund Policy</h1>
        <p className="policy-intro">
          At Yajveer, we are committed to ensuring customer satisfaction with our Ayurvedic products.
          If you are not entirely satisfied with your purchase, we're here to help with our return and refund policy outlined below.
        </p>

        <section className="policy-section">
          <h2>1. Return Policy</h2>
          <h3>1.1 Eligibility for Returns</h3>
          <p>You may return products within 7 days of receiving your order if they meet the following conditions:</p>
          <ul>
            <li>The product is unused, unopened, and in its original packaging.</li>
            <li>The product is not a perishable or hygiene-related item (e.g., personal care items).</li>
            <li>Proof of purchase (order receipt or invoice) is provided.</li>
          </ul>

          <h3>1.2 Non-Returnable Items</h3>
          <p>Certain items are non-returnable for hygiene and safety reasons, including but not limited to:</p>
          <ul>
            <li>Opened or used products.</li>
            <li>Products without original packaging.</li>
          </ul>

          <h3>1.3 How to Initiate a Return</h3>
          <p>To request a return, please follow these steps:</p>
          <ol>
            <li>Contact our customer support at amarvira@gmail.com within the return period.</li>
            <li>Provide your order number and a brief reason for the return.</li>
            <li>Our team will guide you through the return process and provide shipping instructions.</li>
          </ol>
          <p><strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless the product is defective or received in damaged condition.</p>
        </section>

        <section className="policy-section">
          <h2>2. Refund Policy</h2>
          <h3>2.1 Refund Eligibility</h3>
          <p>Once we receive and inspect the returned product, we will process your refund if:</p>
          <ul>
            <li>The product meets all return eligibility criteria.</li>
            <li>There are no signs of damage, tampering, or use.</li>
          </ul>

          <h3>2.2 Refund Process</h3>
          <ul>
            <li>Approved refunds will be credited within 15 business days after we receive the product.</li>
            <li>Refunds will be credited to the original payment method used during the purchase.</li>
            <li>Shipping charges are non-refundable.</li>
          </ul>

          <h3>2.3 Late or Missing Refunds</h3>
          <p>If you haven't received a refund after the stated processing time:</p>
          <ul>
            <li>Check your bank account or credit card statement.</li>
            <li>Contact your payment provider, as processing times may vary.</li>
            <li>If you still have concerns, please reach out to us at amarvira@gmail.com.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Damaged or Incorrect Products</h2>
          <p>If you receive a damaged or incorrect product, please contact us within 15 days of receiving your order with:</p>
          <ul>
            <li>A clear photo of the damaged or wrong item.</li>
            <li>Your order details.</li>
          </ul>
          <p>Exchange/replacement product will be within 5 business days</p>
        </section>

        <section className="policy-section">
          <h2>4. Order Cancellations</h2>
          <p>Orders can be canceled within 24 hours of placing them, provided they have not been shipped. Once shipped, the order will follow our return policy guidelines.</p>
        </section>

        <section className="policy-section">
          <h2>5. Contact Us</h2>
          <p>For any questions regarding our Return and Refund Policy, feel free to contact us at:</p>
          <div className="contact-info">
            <p><strong>Yajveer</strong></p>
            <p>3037, Palledium mall, yogi chowk, Surat,395006</p>
            <p>Email: Yajveer@gmail.com</p>
            <p>Phone: +91 98248 48145</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Policies;