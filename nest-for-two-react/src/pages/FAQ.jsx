import Accordion from '../components/ui/Accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'Does your bird\'s nest contain any preservatives or additives?',
      answer: 'No, our bird\'s nest is 100% natural with no preservatives or additives. We prepare each batch fresh to order, ensuring you receive the purest, most nutritious bird\'s nest possible. What you see in the bottle is pure bird\'s nest, sweetener (honey, rock sugar, or none), and purified water - nothing else.'
    },
    {
      question: 'What flavours are available?',
      answer: 'We offer three carefully crafted varieties to suit different preferences and needs: Honey Sachet (perfect for children with natural sweetness), Rock Sugar Sachet (traditional flavor beloved by the elderly), and Zero Sugar Sachet (specially designed for pregnant mothers and those managing diabetes). Each variety uses the same premium Indonesian bird\'s nest as our base.'
    },
    {
      question: 'How do I consume the bird\'s nest?',
      answer: 'Our bird\'s nest is ready to consume straight from the bottle! Simply refrigerate upon receiving and enjoy chilled for the best taste. You can also warm it up gently if you prefer. We recommend consuming it in the morning on an empty stomach or before bed for optimal absorption of nutrients.'
    },
    {
      question: 'How long can I store the bird\'s nest?',
      answer: 'Once received, please refrigerate immediately at 4°C and consume within 10-14 days for optimal freshness. Do not freeze as this can affect the texture and quality. Our fresh preparation means maximum nutrients, but also means a shorter shelf life compared to preserved alternatives.'
    },
    {
      question: 'Is it safe to consume during pregnancy?',
      answer: 'Yes, bird\'s nest is traditionally consumed during pregnancy for its nutritional benefits, including supporting skin health and immune system. Our Zero Sugar variant is specifically designed with pregnant mothers in mind. However, as with any dietary changes during pregnancy, please consult your doctor if you have any concerns or allergies.'
    },
    {
      question: 'How should I store the bird\'s nest?',
      answer: 'Store in the refrigerator at 4°C immediately upon receiving your delivery. Keep the bottles upright and do not freeze. For subscription orders, we deliver fresh batches regularly so you never need to worry about long-term storage. Once opened, consume within 24 hours for best quality.'
    },
    {
      question: 'How far in advance should I place my order?',
      answer: 'We require at least 24 hours notice for all deliveries to ensure freshness. For one-time purchases, you can select any date starting from tomorrow. For subscriptions, deliveries are scheduled for Sundays - you can choose your first delivery date when ordering, and we\'ll continue delivering every Sunday thereafter.'
    },
    {
      question: 'What are the health benefits of bird\'s nest?',
      answer: 'Bird\'s nest is rich in proteins, amino acids, and minerals that support multiple aspects of health: skin renewal and anti-aging, immune system strengthening, improved digestion, hormonal balance, respiratory health, and sustained energy. Our thick, fresh preparation ensures you get the maximum nutritional benefits from each bottle.'
    },
    {
      question: 'What is the difference between one-time purchase and subscription?',
      answer: 'One-time purchases are perfect for trying our product or gifting. You receive 6 bottles delivered on your chosen date. Subscriptions offer better value with 17% savings - you receive 30 bottles delivered over 3 months (10 bottles every Sunday). Subscriptions ensure you never run out and maintain a consistent wellness routine.'
    },
    {
      question: 'Can I pause or cancel my subscription?',
      answer: 'Yes, you have full control over your subscription. You can pause, skip a delivery, or cancel anytime through your account. We recommend ordering by Saturday 10pm to ensure Sunday delivery. If you need to make changes, please contact us at least 48 hours before your next scheduled delivery.'
    },
    {
      question: 'Do you offer free delivery?',
      answer: 'Yes! We offer free delivery for all orders above $120. For orders below $120, a small delivery fee applies. All subscription orders automatically qualify for free delivery as they exceed the minimum threshold.'
    },
    {
      question: 'What is your delivery coverage area?',
      answer: 'We currently deliver island-wide across Singapore. You can choose between two convenient time slots: 3-5PM or 7-9PM. We\'ll send you a notification when our driver is on the way, and you can leave special delivery instructions during checkout if needed.'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-wellness-cream min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-4 text-center text-wellness-dark">
          Frequently Asked Questions
        </h1>

        <p className="font-source-sans text-wellness-text text-center mb-12">
          Find answers to common questions about our products, delivery, and more.
        </p>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Accordion items={faqs} />
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-playfair-bold text-2xl mb-4 text-wellness-dark">
            Still Have Questions?
          </h2>
          <p className="font-source-sans text-wellness-text mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-wellness-rose text-white px-6 py-3 font-nunito-regular hover:bg-rose-gold-700 transition-colors rounded"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/6512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-wellness-rose text-wellness-rose px-6 py-3 font-nunito-regular hover:bg-wellness-blush transition-colors rounded"
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
