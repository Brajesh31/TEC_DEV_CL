import express from 'express';
import axios from 'axios';

const router = express.Router();

// Mailchimp configuration
const MAILCHIMP_API_KEY = '045bd4b4943bd534ae315b1a1a12b76f-us12';
const MAILCHIMP_AUDIENCE_ID = '7af138e222';
const MAILCHIMP_SERVER_PREFIX = 'us12'; // Extract from API key

// Brevo configuration
const BREVO_API_KEY = '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';

// Subscribe to Mailchimp newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { subscriber } = req.body;
    const { email, firstName, lastName, tags } = subscriber;

    const mailchimpData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        LNAME: lastName || '',
      },
      tags: tags || [],
    };

    const response = await axios.post(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      mailchimpData,
      {
        headers: {
          'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: response.data,
    });
  } catch (error) {
    console.error('Mailchimp subscription error:', error.response?.data || error.message);
    
    // Handle already subscribed case
    if (error.response?.data?.title === 'Member Exists') {
      return res.json({
        success: true,
        message: 'Email is already subscribed',
      });
    }

    res.status(400).json({
      success: false,
      message: 'Failed to subscribe to newsletter',
      error: error.response?.data?.detail || error.message,
    });
  }
});

// Add contact to Brevo
router.post('/brevo-contact', async (req, res) => {
  try {
    const { contact } = req.body;
    const { email, attributes, listIds } = contact;

    const brevoData = {
      email,
      attributes: attributes || {},
      listIds: listIds || [1],
      updateEnabled: true,
    };

    const response = await axios.post(
      'https://api.brevo.com/v3/contacts',
      brevoData,
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      message: 'Contact added to Brevo successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Brevo contact creation error:', error.response?.data || error.message);
    
    // Handle already exists case
    if (error.response?.data?.code === 'duplicate_parameter') {
      return res.json({
        success: true,
        message: 'Contact already exists in Brevo',
      });
    }

    res.status(400).json({
      success: false,
      message: 'Failed to add contact to Brevo',
      error: error.response?.data?.message || error.message,
    });
  }
});

// Send welcome email via Brevo
router.post('/send-welcome', async (req, res) => {
  try {
    const { email, name } = req.body;

    const emailData = {
      sender: {
        name: 'Tech Dev Club',
        email: 'techdevclub2025@gmail.com',
      },
      to: [
        {
          email,
          name,
        },
      ],
      subject: 'Welcome to Tech Dev Club! 🚀',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #0d9488 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Tech Dev Club!</h1>
          </div>
          
          <div style="padding: 40px 20px; background: #f8fafc;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${name || 'there'}! 👋</h2>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining our amazing community of developers, designers, and tech enthusiasts! 
              We're excited to have you on board.
            </p>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
              Here's what you can expect as a member:
            </p>
            
            <ul style="color: #475569; line-height: 1.8; margin-bottom: 30px;">
              <li>🎯 Access to exclusive workshops and bootcamps</li>
              <li>🤝 Networking opportunities with industry professionals</li>
              <li>💻 Collaborative open-source projects</li>
              <li>📚 Curated learning resources and tutorials</li>
              <li>🎤 Speaking opportunities at our events</li>
              <li>🏆 Recognition for your contributions</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://techdevclub.com/events" 
                 style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Explore Upcoming Events
              </a>
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Don't forget to join our Discord community for real-time discussions and networking!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://discord.gg/6MVn2N9q" 
                 style="background: #5865f2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Join Discord
              </a>
            </div>
          </div>
          
          <div style="background: #1e293b; padding: 30px 20px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Happy coding! 🚀<br>
              The Tech Dev Club Team
            </p>
          </div>
        </div>
      `,
    };

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      emailData,
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      message: 'Welcome email sent successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Brevo email sending error:', error.response?.data || error.message);
    
    res.status(400).json({
      success: false,
      message: 'Failed to send welcome email',
      error: error.response?.data?.message || error.message,
    });
  }
});

// Send email campaign via Brevo
router.post('/send-campaign', async (req, res) => {
  try {
    const { name, subject, htmlContent, listIds, scheduledAt } = req.body;

    const campaignData = {
      name,
      subject,
      sender: {
        name: 'Tech Dev Club',
        email: 'techdevclub2025@gmail.com',
      },
      type: 'classic',
      htmlContent,
      recipients: {
        listIds: listIds || [1],
      },
    };

    if (scheduledAt) {
      campaignData.scheduledAt = scheduledAt;
    }

    const response = await axios.post(
      'https://api.brevo.com/v3/emailCampaigns',
      campaignData,
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      message: 'Email campaign created successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Brevo campaign creation error:', error.response?.data || error.message);
    
    res.status(400).json({
      success: false,
      message: 'Failed to create email campaign',
      error: error.response?.data?.message || error.message,
    });
  }
});

export default router;