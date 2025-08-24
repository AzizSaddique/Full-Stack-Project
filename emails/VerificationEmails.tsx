import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface VerificationEmail {
  username: string;
  otp: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmail>> = ({
  username,
  otp,
}) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Email Verification</Heading>
        <Text style={text}>
          Hi {username}, please verify your email address by clicking the link below:
        </Text>
        <Text style={link}>
          <a href={otp} style={linkStyle}>Verify Email</a>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

const main = {
  backgroundColor: '#f4f4f4',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: 'auto',
  padding: '40px 20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const h1 = {
  color: '#333333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '0 0 20px',
};

const text = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
};

const link = {
  margin: '20px 0',
};

const linkStyle = {
  color: '#1a73e8',
  textDecoration: 'none',
  fontWeight: 'bold',
};