// Email service integrations for Mailchimp and Brevo

interface MailchimpSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

interface BrevoContact {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    [key: string]: any;
  };
  listIds?: number[];
}

class EmailService {
  private mailchimpApiKey = '045bd4b4943bd534ae315b1a1a12b76f-us12';
  private mailchimpAudienceId = '7af138e222';
  private brevoApiKey = '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';

  // Subscribe to Mailchimp newsletter
  async subscribeToNewsletter(subscriber: MailchimpSubscriber): Promise<boolean> {
    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'mailchimp',
          subscriber,
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      return false;
    }
  }

  // Add contact to Brevo
  async addBrevoContact(contact: BrevoContact): Promise<boolean> {
    try {
      const response = await fetch('/api/email/brevo-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact,
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Brevo contact creation failed:', error);
      return false;
    }
  }

  // Send welcome email via Brevo
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
      const response = await fetch('/api/email/send-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          to_email: 'techdevclub2025@gmail.com'
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Welcome email failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export default EmailService;