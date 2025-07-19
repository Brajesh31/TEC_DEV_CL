export const getCommunityLinks = async (req, res) => {
  try {
    const links = {
      whatsapp: process.env.WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
      discord: process.env.DISCORD_INVITE_URL || 'https://discord.gg/6MVn2N9q',
      instagram: process.env.INSTAGRAM_URL || 'https://www.instagram.com/techdevclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      linkedin: process.env.LINKEDIN_URL || 'https://www.linkedin.com/company/tech-dev-club/',
      email: process.env.EMAIL || 'techdevclub2025@gmail.com'
    };

    res.json({
      success: true,
      data: { links }
    });
  } catch (error) {
    console.error('Get community links error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateCommunityLinks = async (req, res) => {
  try {
    const { whatsapp, discord, instagram, linkedin, email } = req.body;

    // In a real application, you might want to store these in a database
    // For now, we'll just validate and return them
    const links = {};
    
    if (whatsapp) {
      if (!whatsapp.startsWith('https://chat.whatsapp.com/')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid WhatsApp group link format'
        });
      }
      links.whatsapp = whatsapp;
    }

    if (discord) {
      if (!discord.startsWith('https://discord.gg/')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Discord invite link format'
        });
      }
      links.discord = discord;
    }
    
    if (instagram) {
      links.instagram = instagram;
    }
    
    if (linkedin) {
      links.linkedin = linkedin;
    }
    
    if (email) {
      if (!email.includes('@')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
      links.email = email;
    }

    res.json({
      success: true,
      message: 'Community links updated successfully',
      data: { links }
    });
  } catch (error) {
    console.error('Update community links error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};