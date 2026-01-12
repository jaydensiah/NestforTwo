import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real implementation, this would send to a backend API or email service
    console.log('Contact form submitted:', formData);

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-wellness-cream min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-4 text-center text-wellness-dark">
          Get in Touch
        </h1>

        <p className="font-source-sans text-wellness-text text-center mb-8">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        {submitted ? (
          <div className="bg-white p-8 rounded-lg shadow-md border-2 border-wellness-rose text-center">
            <div className="text-wellness-rose text-5xl mb-4">✓</div>
            <h2 className="font-playfair-bold text-2xl mb-2 text-wellness-dark">
              Thank You!
            </h2>
            <p className="font-source-sans text-wellness-text">
              Your message has been sent. We'll get back to you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            {/* Name Field */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 font-source-sans text-wellness-dark focus:outline-none focus:ring-2 focus:ring-wellness-rose"
                placeholder="Your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 font-source-sans text-wellness-dark focus:outline-none focus:ring-2 focus:ring-wellness-rose"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 font-source-sans text-wellness-dark focus:outline-none focus:ring-2 focus:ring-wellness-rose"
                placeholder="+65 1234 5678"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 font-source-sans text-wellness-dark focus:outline-none focus:ring-2 focus:ring-wellness-rose"
                placeholder="How can we help?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 font-source-sans text-wellness-dark resize-none focus:outline-none focus:ring-2 focus:ring-wellness-rose"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-wellness-rose text-white py-3 font-nunito-regular font-semibold hover:bg-rose-gold-700 transition-colors rounded"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Contact Information */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-playfair-bold text-2xl mb-6 text-center text-wellness-dark">
            Other Ways to Reach Us
          </h2>

          <div className="space-y-4 font-source-sans text-wellness-text">
            <div className="flex items-start">
              <div className="font-semibold text-wellness-dark w-24">Email:</div>
              <a
                href="mailto:hello@nestfortwo.com"
                className="text-wellness-rose hover:underline"
              >
                hello@nestfortwo.com
              </a>
            </div>

            <div className="flex items-start">
              <div className="font-semibold text-wellness-dark w-24">WhatsApp:</div>
              <a
                href="https://wa.me/6512345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wellness-rose hover:underline"
              >
                +65 1234 5678
              </a>
            </div>

            <div className="flex items-start">
              <div className="font-semibold text-wellness-dark w-24">Hours:</div>
              <div>
                Monday - Sunday, 9:00 AM - 8:00 PM SGT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
