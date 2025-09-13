// Mock for nodemailer
const createTransporter = jest.fn(() => ({
  sendMail: jest.fn().mockResolvedValue({
    messageId: 'test-message-id',
    response: '250 OK',
  }),
  verify: jest.fn().mockResolvedValue(true),
}));

const nodemailer = {
  createTransporter,
};

export default nodemailer;