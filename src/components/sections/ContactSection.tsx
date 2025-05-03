import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  error: string;
}

export const ContactSection = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormField[]>([
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      value: '',
      error: '',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      value: '',
      error: '',
    },
    {
      id: 'organization',
      label: 'Organization',
      type: 'text',
      placeholder: 'Enter your organization name',
      required: false,
      value: '',
      error: '',
    },
    {
      id: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'How can we help you?',
      required: true,
      value: '',
      error: '',
    },
  ]);

  const handleInputChange = (id: string, value: string) => {
    setFormData(
      formData.map((field) =>
        field.id === id ? { ...field, value, error: '' } : field
      )
    );
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const updatedFormData = formData.map((field) => {
      let error = '';
      if (field.required && !field.value.trim()) {
        error = `${field.label} is required`;
        isValid = false;
      } else if (field.id === 'email' && field.value && !/\S+@\S+\.\S+/.test(field.value)) {
        error = 'Please enter a valid email address';
        isValid = false;
      }
      return { ...field, error };
    });

    setFormData(updatedFormData);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormState('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormState(Math.random() > 0.2 ? 'success' : 'error');
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      label: "Address",
      value: "1234 Health Avenue, San Francisco, CA 94107",
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+1-234-567-8901",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "contact@onehealth.com",
    },
    {
      icon: <Clock size={20} />,
      label: "Hours",
      value: "Mon-Fri: 9am - 6pm ET",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 40%)'
        }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400 inline-block mb-4"
          >
            Contact Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Have questions or ready to explore how we can help transform your organization?
            Our team is here to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Send Us a Message
            </h3>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800 p-6 md:p-8">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 size={64} className="text-success-500" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-neutral-400 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setFormState('idle');
                      setFormData(formData.map(field => ({ ...field, value: '' })));
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : formState === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="flex justify-center mb-4">
                    <AlertCircle size={64} className="text-error-500" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">
                    Oops, Something Went Wrong
                  </h4>
                  <p className="text-neutral-400 mb-6">
                    We couldn't send your message. Please try again or contact us directly.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {formData.slice(0, 3).map((field) => (
                      <div key={field.id} className={field.id === 'message' ? 'md:col-span-2' : ''}>
                        <label 
                          htmlFor={field.id} 
                          className="block text-neutral-300 mb-2"
                        >
                          {field.label} {field.required && <span className="text-error-500">*</span>}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg bg-neutral-800 border ${
                            field.error ? 'border-error-500' : 'border-neutral-700'
                          } text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        />
                        {field.error && (
                          <p className="mt-1 text-sm text-error-500">{field.error}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <label 
                      htmlFor="message" 
                      className="block text-neutral-300 mb-2"
                    >
                      {formData[3].label} {formData[3].required && <span className="text-error-500">*</span>}
                    </label>
                    <textarea
                      id="message"
                      placeholder={formData[3].placeholder}
                      value={formData[3].value}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg bg-neutral-800 border ${
                        formData[3].error ? 'border-error-500' : 'border-neutral-700'
                      } text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    />
                    {formData[3].error && (
                      <p className="mt-1 text-sm text-error-500">{formData[3].error}</p>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-glow"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Contact Information
            </h3>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800 p-6 md:p-8 mb-8">
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.label}</h4>
                      <p className="text-neutral-400">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800 p-6 md:p-8 aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-500/5"></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    Visit Our Global Headquarters
                  </h4>
                  <p className="text-neutral-400 mb-6">
                    Schedule an in-person meeting to learn more about our solutions.
                  </p>
                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-glow"
                  >
                    <MapPin size={18} />
                    View on Map
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};