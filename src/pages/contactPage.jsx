import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://computers-backend.onrender.com/api/contact", formData);

      if (response.status === 200 || response.data.success) {
        alert("Thank you! Your message has been sent successfully to i-Computers.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Oops! Something went wrong. Please check your backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-slate-50 text-slate-800 py-12 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600 mb-2">
          Get In Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Contact <span className="text-cyan-600">i-Computers</span>
        </h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
          Have a question about a custom PC build, component availability, or warranty? Reach out to our tech squad!
        </p>
        <div className="w-24 h-1 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-8">
            <h2 className="text-2xl font-bold border-b border-slate-700 pb-4">Contact Information</h2>

            <div className="flex items-start gap-4">
              <span className="bg-cyan-500/20 p-3 rounded-xl text-cyan-400 mt-1">
                <FaPhoneAlt size={20} />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Call Us</h4>
                <p className="text-lg font-bold text-slate-100 mt-1">+94 11 234 5678</p>
                <p className="text-sm text-slate-400">+94 77 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="bg-cyan-500/20 p-3 rounded-xl text-cyan-400 mt-1">
                <FaEnvelope size={20} />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Email Us</h4>
                <p className="text-lg font-bold text-slate-100 mt-1">support@icomputers.com</p>
                <p className="text-sm text-slate-400">sales@icomputers.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="bg-cyan-500/20 p-3 rounded-xl text-cyan-400 mt-1">
                <FaMapMarkerAlt size={20} />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Visit Our Store</h4>
                <p className="text-md text-slate-200 mt-1 leading-relaxed">
                  No. 123, Galle Road,<br />
                  Colombo 03, Sri Lanka.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-slate-700 pt-6">
              <span className="bg-cyan-500/20 p-3 rounded-xl text-cyan-400 mt-1">
                <FaClock size={20} />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Opening Hours</h4>
                <p className="text-sm text-slate-200 mt-1">Mon - Sat: 9:00 AM - 6:30 PM</p>
                <p className="text-sm text-amber-400">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
          <p className="text-sm text-slate-500 mb-8">Fill out the form below and we will respond within 24 hours.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Custom PC Build Quote / Inquiry"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 hover:shadow-cyan-500/30 transition duration-200 disabled:bg-slate-400 disabled:shadow-none"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>

      {/* Real Google Map Component */}
      <div className="max-w-6xl mx-auto mt-16 rounded-2xl overflow-hidden shadow-md border border-slate-200 h-80 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902932223737!2d79.8488052!3d6.9021464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259411603ba07%3A0x8e2358cb2fa874cf!2si-Computers!5e0!3m2!1sen!2slk!4v1717871234567!5m2!1sen!2slk"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="i-Computers Location Map"
        ></iframe>
      </div>
    </div>
  );
}