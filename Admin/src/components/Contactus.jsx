import "../CSS/Contactus.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Contactus() {
  const { data: Contacts } = useSelector((state) => state.contactus);
  const [messages, setMessages] = useState(Contacts || []);

  const handleResolve = (id) => {
    alert(`Marked as resolved: ${id}`);
  };

  return (
    <div className="contactus-container">
      <div className="table-wrapper">
        <table className="contactus-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((contact, index) => (
              <tr key={contact._id || index}>
                <td className="wrap-text">{contact.name}</td>
                <td className="wrap-text">{contact.email}</td>
                <td className="wrap-text">{contact.phone}</td>
                <td className="wrap-text">{contact.subject}</td>
                <td className="message-column">{contact.message}</td>
                <td className="button-cell">
                  <button
                    className="resolve-btn"
                    onClick={() => handleResolve(contact._id || index)}
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
