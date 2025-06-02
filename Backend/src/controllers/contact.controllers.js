import { Contact, allowedSubjects } from "../models/contact.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/Apierror.js";

const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      throw new ApiError(400, "All fields are required.");
    }

    if (!allowedSubjects.includes(subject)) {
      throw new ApiError(400, "Invalid subject selected.");
    }

    const contactData = { name, email, phone, subject, message };
    if (req.user) contactData.user = req.user._id;

    const contact = await Contact.create(contactData);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          contact,
          "Your message has been sent. We'll get back to you soon!"
        )
      );
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          contacts,
          "All contact submissions fetched successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

// Admin: Mark Contact as Resolved (optional)
const markContactResolved = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { isResolved: true },
      { new: true }
    ).populate("user", "name email");

    if (!contact) throw new ApiError(404, "Contact submission not found.");

    return res
      .status(200)
      .json(new ApiResponse(200, contact, "Contact marked as resolved."));
  } catch (error) {
    next(error);
  }
};

export { submitContactForm, getAllContacts, markContactResolved };
