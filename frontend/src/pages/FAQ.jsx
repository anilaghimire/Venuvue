import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../style/FAQ.css';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'How do I browse and view available banquets?',
      answer:
        'To browse and view available banquets, simply visit our homepage where you can see a list of featured banquets. Click on any banquet to view more details and booking options.',
    },
    {
      question: 'How can I book a banquet hall?',
      answer:
        'Booking a banquet hall is easy! Navigate to the banquet\'s detail page and select your preferred date, number of guests, and any additional services you may need. Click on the "Book Now" button to proceed with your reservation.',
    },
    {
      question: 'What are the payment options available?',
      answer:
        'We accept various payment methods including credit/debit cards and online banking. You can securely make your payment during the booking process.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer:
        'Yes, you can modify or cancel your booking depending on the banquet hall\'s cancellation policy. Please check the specific terms and conditions mentioned on the booking page or contact our support team for assistance.',
    },
    {
      question: 'Is there a minimum or maximum number of guests for booking a banquet?',
      answer:
        'The capacity of each banquet hall varies. You can find information about the minimum and maximum number of guests allowed on each banquet\'s detail page.',
    }
  ];

  return (
    <div className="faq-container">
      <h3 className="faq-heading">Frequently Asked Questions</h3>
      <div className="faq-content">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {item.question}
              <span className="dropdown-icon">
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            <CSSTransition
              in={activeIndex === index}
              timeout={300}
              classNames="faq-answer"
              unmountOnExit
            >
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </CSSTransition>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
