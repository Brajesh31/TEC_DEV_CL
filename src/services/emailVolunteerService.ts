import emailjs from '@emailjs/browser';

// EmailJS configuration - ONLY for Volunteer Form
const VOLUNTEER_EMAILJS_CONFIG = {
  SERVICE_ID: 'service_u1ipj53',
  TEMPLATE_ID: 'template_ng44g7p',
  PUBLIC_KEY: '9cs7aPOWndb7SKcvJ'
};

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  skills: string;
  availability: string;
  motivation: string;
  previousVolunteering: string;
  linkedin: string;
  portfolio: string;
}

/**
 * Dedicated EmailJS service for Volunteer Form submissions
 * This service is isolated and should NOT be used for other forms
 */
export class EmailVolunteerService {
  /**
   * Send volunteer application email using EmailJS
   * @param formData - Volunteer form data
   * @returns Promise<boolean> - Success status
   */
  static async sendVolunteerEmail(formData: VolunteerFormData): Promise<boolean> {
    try {
      // Initialize EmailJS with public key
      emailjs.init(VOLUNTEER_EMAILJS_CONFIG.PUBLIC_KEY);

      // Prepare template parameters for EmailJS template
      const templateParams = {
        // Basic info
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        
        // Volunteer specific info
        volunteer_role: formData.role,
        experience: formData.experience,
        skills: formData.skills,
        availability: formData.availability,
        motivation: formData.motivation,
        previous_volunteering: formData.previousVolunteering || 'None mentioned',
        
        // Social links
        linkedin: formData.linkedin || 'Not provided',
        portfolio: formData.portfolio || 'Not provided',
        
        // Email metadata
        to_name: 'Tech Dev Club Volunteer Team',
        to_email: 'techdevclub2025@gmail.com',
        subject: `New Volunteer Application - ${formData.role}`,
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        
        // Message summary
        message: `New volunteer application received for ${formData.role} position from ${formData.name}.`,
      };

      console.log('Sending volunteer email with params:', templateParams);

      // Send email using EmailJS send method (not sendForm)
      const response = await emailjs.send(
        VOLUNTEER_EMAILJS_CONFIG.SERVICE_ID,
        VOLUNTEER_EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        VOLUNTEER_EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Volunteer email sent successfully:', response);
      return response.status === 200;
    } catch (error) {
      console.error('EmailJS Error (Volunteer Form):', error);
      return false;
    }
  }

  /**
   * Validate volunteer form data before sending
   * @param formData - Volunteer form data to validate
   * @returns boolean - Validation status
   */
  static validateVolunteerData(formData: VolunteerFormData): boolean {
    const requiredFields = ['name', 'email', 'role', 'experience', 'skills', 'availability', 'motivation'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof VolunteerFormData]?.trim()) {
        console.error(`Volunteer form validation failed: ${field} is required`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error('Volunteer form validation failed: Invalid email format');
      return false;
    }

    return true;
  }

  /**
   * Get service configuration (for debugging purposes)
   * @returns Object with service info (without sensitive data)
   */
  static getServiceInfo() {
    return {
      serviceName: 'Volunteer EmailJS Service',
      serviceId: VOLUNTEER_EMAILJS_CONFIG.SERVICE_ID,
      templateId: VOLUNTEER_EMAILJS_CONFIG.TEMPLATE_ID,
      initialized: true,
    };
  }
}

export default EmailVolunteerService;