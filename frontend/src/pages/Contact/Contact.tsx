import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Terminal, AlertCircle, Send } from 'lucide-react';
import { APP_CONFIG } from '../../config';
import Loader from '@/components/common/Loader/Loader';
import './Contact.scss';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(APP_CONFIG.endpoints.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        setIsSuccess(false);
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setIsSuccess(true);
      reset();
    } catch (error) {
      setIsSubmitting(false);
      setIsSuccess(false);
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
  };

  if (isSubmitting) {
    return (
      <Loader
        messages={[
          'Sending your message...',
          'Establishing connection...',
          'Processing request...',
        ]}
        completionMessage="Message sent successfully!"
        duration={3000}
        onComplete={() => {
          setIsSubmitting(false);
          setIsSuccess(false);
        }}
        isSuccess={isSuccess}
      />
    );
  }

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
          Interested in reaching out to me, or have a project in mind? Lets connect and explore how
          we can work together.
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
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name is too short' },
                })}
                className={errors.name ? 'error' : ''}
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
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={errors.email ? 'error' : ''}
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
                {...register('subject', { required: 'Subject is required' })}
                className={errors.subject ? 'error' : ''}
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
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 20, message: 'Message is too short' },
                })}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.message.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              <>
                <Send size={20} />
                Send Message
              </>
            </button>

            {submitStatus === 'success' && (
              <motion.div
                className="form-status form-status--success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Message sent successfully!
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="form-status form-status--error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Failed to send message. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
