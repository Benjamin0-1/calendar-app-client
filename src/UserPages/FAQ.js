import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  { 
    question: 'Como apartar una fecha?', 
    answer: 'To place an order, simply browse our products, select the items you want to purchase, and proceed to checkout. You will need to provide your shipping address and payment information to complete the order.' 
  },
  { 
    question: 'What payment methods do you accept?', 
    answer: 'We accept a variety of payment methods including Visa, MasterCard, American Express, PayPal, and Apple Pay. You can choose your preferred payment method during checkout.' 
  },
  { 
    question: 'Can I modify or cancel my order after it has been placed?', 
    answer: 'Once an order has been placed, it is immediately processed for shipping. Therefore, we are unable to modify or cancel orders after they have been submitted. Please review your order carefully before completing the purchase.' 
  },
  { 
    question: 'How long will it take to receive my order?', 
    answer: 'The delivery time depends on your location and the shipping method selected during checkout. Typically, orders are processed and shipped within 1-2 business days. You will receive a tracking number via email once your order has been dispatched.' 
  },
  { 
    question: 'What is your return policy?', 
    answer: 'We offer a 30-day return policy for most items. If you are not satisfied with your purchase, you may return the item(s) within 30 days of receipt for a full refund or exchange. Please note that certain items may be subject to restocking fees or ineligible for return.' 
  },
  {
    question: 'Do I need to have shipping information before buying a product?',
    answer: 'Yes, in order for us to know exactly where to send your products, we first need a valid shipping address.'
  }
];

const FAQ = () => {
  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
   
      <Typography variant="h3" component="h1" gutterBottom>
        FAQs
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
