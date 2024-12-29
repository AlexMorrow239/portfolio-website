import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Terminal, Send, AlertCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Implement form submission
    console.log(data);
  };

  return (
    <div className="contact">
      <motion.section
        className="contact__intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Terminal className="contact__icon" size={48} />
        <h1 className="contact__title">Let's Discuss Architecture</h1>
        <p className="contact__description">
          Interested in building scalable backend systems? Let's connect and
          explore how we can work together.
        </p>
      </motion.section>

      <section className="contact__form-section">
        <div className="container">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                {...register("subject", { required: "Subject is required" })}
                className={errors.subject ? "error" : ""}
              />
              {errors.subject && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                {...register("message", { required: "Message is required" })}
                className={errors.message ? "error" : ""}
              />
              {errors.message && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.message.message}
                </span>
              )}
            </div>

            <button type="submit" className="button button--primary">
              <Send size={18} />
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
