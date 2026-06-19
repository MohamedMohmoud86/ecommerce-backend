import React, { useState } from "react";
import './Contact.css';
import AboutFooterSection from "../aboutPage/AboutFooterSection";
import toast from "react-hot-toast";
import axios from "axios"; 

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const { name, email, message } = formData;

   
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters long");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://192.168.1.13:5000/api/contact", formData);
      
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
      }

    } catch (error) {
      console.error("Contact Error:", error);
      
     
      if (error.response && error.response.data && error.response.data.errors) {
        
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      } else {
       
        toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact_page">
        <div className="container">
          <h1>Contact Us</h1>

          <div className="contact_content">
            <form className="contact_form" onSubmit={handleSubmit}>
              
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
              />
              
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
              />
              
              <textarea 
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>
        </div>
      </div>

      <AboutFooterSection />
    </>
  );
}

export default Contact;