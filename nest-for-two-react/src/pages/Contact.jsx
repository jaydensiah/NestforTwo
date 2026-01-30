import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit functionality to be added later
    console.log('Form submitted:', formData);
  };

  // Count words in message
  const countWords = (text) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  const wordCount = countWords(formData.message);

  // Check if field has value or is focused (for floating label)
  const isActive = (field) => focused[field] || formData[field];

  return (
    <div className="pt-12 pb-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1
          className="font-playfair-bold text-3xl sm:text-4xl mb-12 text-center"
          style={{ color: '#636260' }}
        >
          Get in Touch
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Company Info (appears second on mobile) */}
          <div
            className="border rounded-2xl p-8 order-2 lg:order-1"
            style={{ borderColor: '#e5e5e5' }}
          >
            {/* Company Info Section */}
            <h2
              className="font-source-sans text-lg mb-4"
              style={{ color: '#B76E79' }}
            >
              Company Info
            </h2>
            <div
              className="font-source-sans space-y-1 mb-8"
              style={{ color: '#636260' }}
            >
              <p>Jem & San Pte. Ltd.</p>
              <p>202505457G</p>
              <p className="mt-4">190 CLEMENCEAU AVENUE #03-21</p>
              <p>SINGAPORE SHOPPING CENTRE</p>
              <p>SINGAPORE (239924)</p>
            </div>

            {/* Email Section */}
            <h2
              className="font-source-sans text-lg mb-4"
              style={{ color: '#B76E79' }}
            >
              Email
            </h2>
            <p
              className="font-source-sans"
              style={{ color: '#636260' }}
            >
              contact@nestfortwo.com
            </p>
          </div>

          {/* Right Column - Contact Form (appears first on mobile) */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className="w-full px-4 py-4 font-source-sans rounded-xl border-2 outline-none transition-colors peer bg-white"
                  style={{
                    color: '#636260',
                    borderColor: isActive('name') ? '#81775A' : '#e5e5e5'
                  }}
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                  style={{
                    color: isActive('name') ? '#81775A' : '#9ca3af',
                    top: isActive('name') ? '-0.5rem' : '1rem',
                    fontSize: isActive('name') ? '0.75rem' : '1rem'
                  }}
                >
                  Name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full px-4 py-4 font-source-sans rounded-xl border-2 outline-none transition-colors peer bg-white"
                  style={{
                    color: '#636260',
                    borderColor: isActive('email') ? '#81775A' : '#e5e5e5'
                  }}
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                  style={{
                    color: isActive('email') ? '#81775A' : '#9ca3af',
                    top: isActive('email') ? '-0.5rem' : '1rem',
                    fontSize: isActive('email') ? '0.75rem' : '1rem'
                  }}
                >
                  E-mail
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  className="w-full px-4 py-4 font-source-sans rounded-xl border-2 outline-none transition-colors resize-none peer bg-white"
                  style={{
                    color: '#636260',
                    borderColor: isActive('message') ? '#81775A' : '#e5e5e5'
                  }}
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                  style={{
                    color: isActive('message') ? '#81775A' : '#9ca3af',
                    top: isActive('message') ? '-0.5rem' : '1rem',
                    fontSize: isActive('message') ? '0.75rem' : '1rem'
                  }}
                >
                  Message
                </label>
              </div>

              {/* Word Count */}
              <p
                className="font-source-sans text-sm"
                style={{ color: '#636260' }}
              >
                {wordCount} / 300 words
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 font-source-sans text-white rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#B76E79' }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
