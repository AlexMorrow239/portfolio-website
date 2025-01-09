import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { AlertCircle, Send, Terminal } from 'lucide-react';
import { useForm } from 'react-hook-form';

import Loader from '@/components/common/Loader/Loader';
import { API_BASE_URL } from '@/config';
import { defaultTransition, fadeInUp, staggerContainer } from '@/utils/animations';

import './Contact.scss';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
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
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={defaultTransition}
      >
        <Terminal className="contact__icon" size={48} />
        <h1 className="contact__title">Let's Discuss Architecture</h1>
        <p className="contact__description">
          Interested in reaching out to me? Have a project/idea in mind? Let's connect and explore
          how we can work together!
        </p>
      </motion.section>

      <section className="contact__form-section">
        <div className="container">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.name.message}
                </span>
              )}
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
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
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
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
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters',
                  },
                })}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.message.message}
                </span>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={isSubmitting}
              variants={fadeInUp}
            >
              <Send size={20} />
              Send Message
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div
                className="form-status form-status--success"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                Message sent successfully!
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="form-status form-status--error"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
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
