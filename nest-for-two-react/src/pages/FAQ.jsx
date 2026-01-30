import { useEffect } from 'react';
import Accordion from '../components/ui/Accordion';

const FAQ = () => {
  useEffect(() => {
    document.title = "Nest for Two - Faqs";
  }, []);
  const faqs = [
    {
      question: 'Do your Bird\'s Nest contain preservatives or additives?',
      answer: 'We do not add any preservatives or additives. Every order is freshly prepared with only natural ingredients.'
    },
    {
      question: 'How many flavours are there?',
      answer: 'We offer 3 flavours to suit different preferences and needs: Honey (perfect for children with natural sweetness), Rock Sugar (traditional flavor beloved by the elderly), and Zero Sugar (specially designed for pregnant mothers and those managing diabetes).'
    },
    {
      question: 'How should I consume the bird\'s nest?',
      answer: 'Consumption methods may vary by product. On each product page, refer to the “How to Consume” section below for the recommended way to enjoy your bird’s nest.'
    },
    {
      question: 'How long can I store the bird\'s nest?',
      answer: 'Storage methods may vary by product. On each product page, refer to the “How to Store" section below for the recommended way to store your bird’s nest.'
    },
    {
      question: 'Is it safe to consume during pregnancy?',
      answer: 'Yes, bird\'s nest is traditionally consumed during pregnancy for its nutritional benefits, including supporting skin health and immune system. Our Zero Sugar variant is specifically designed with pregnant mothers in mind.'
    },
    {
      question: 'Can I purchase them as a gift?',
      answer: 'Absolutely. After you place an order, our team will confirm details with you, including any special delivery requests.'
    },
    {
      question: 'Is there same-day delivery?',
      answer: 'No. Orders require one day\'s notice for fresh preparation and delivery. The earliest available delivery is the next day.'
    },
    {
      question: 'What are your delivery hours?',
      answer: 'You may choose between two convenient time slots: 1-5PM or 6-10PM, Monday to Sunday.'
    },
    {
      question: 'What is your delivery coverage area?',
      answer: 'We currently deliver island-wide across Singapore.'
    },
    {
      question: 'Do you offer free delivery?',
      answer: 'We offer free delivery for all orders above $120. For orders below $120, a $10 delivery fee applies.'
    },
     {
      question: 'Can I choose a specific delivery time slot?',
      answer: 'Please contact us for special time requests before you place an order via Whatsapp.'
    },
     {
      question: 'Can I change my delivery address after placing an order?',
      answer: 'Please contact us immediately if you need to change your delivery address. Changes are not possible once preparation begins.'
    },
      {
      question: 'What happens if I miss my delivery?',
      answer: 'Our delivery team will contact you to arrange a redelivery. Additional charges may apply for missed deliveries.'
    }
  ];

  return (
    <div className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Responsive Title */}
        <h1 className="font-playfair-bold text-2xl sm:text-3xl md:text-4xl mb-10 text-center text-wellness-dark">
          Frequently Asked Questions
        </h1>

        {/* FAQ Accordion - Clean design without containers */}
        <Accordion items={faqs} defaultOpenIndex={0} />

        {/* Still Have Questions Section */}
        <div className="mt-16 text-center">
          <h2 className="font-playfair-bold text-xl sm:text-2xl mb-4 text-wellness-dark">
            Still Have Questions?
          </h2>
          <p className="font-source-sans text-wellness-text mb-6" style={{ fontSize: '14px' }}>
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-wellness-rose text-white px-6 py-3 font-source-sans hover:opacity-90 transition-opacity"
              style={{ fontSize: '14px' }}
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/80336503"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-wellness-rose text-wellness-rose px-6 py-3 font-source-sans hover:bg-wellness-blush transition-colors"
              style={{ fontSize: '14px' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
