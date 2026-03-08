'use server';

import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    intent?: string[];
    otherIntent?: string[];
    message?: string[];
  };
  message?: string | null;
  success?: boolean;
  fields?: {
    name?: string;
    email?: string;
    intent?: string;
    otherIntent?: string;
    message?: string;
  };
};

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  intent: z.enum(
    ['full-time', 'freelance', 'open-source', 'networking', 'other'] as const,
    {
      message: 'Please select an intent',
    },
  ),
  otherIntent: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const rawFields = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    intent: String(formData.get('intent') ?? ''),
    otherIntent: String(formData.get('otherIntent') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const validatedFields = contactSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
      fields: rawFields,
    };
  }

  const { name, email, intent, otherIntent, message } = validatedFields.data;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO contacts (name, email, intent, other_intent, message) 
      VALUES (${name}, ${email}, ${intent}, ${otherIntent || ''}, ${message})
    `;

    // Send to me
    const adminResult = await resend.emails.send({
      from: 'Md Umar Siddique <contact@umarsiddique.dev>',
      to: 'us70763@gmail.com',
      subject: `New Contact Form: ${intent}`,
      replyTo: email,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Intent:</strong> ${intent}</p>
        ${intent === 'other' ? `<p><strong>Other Intent:</strong> ${otherIntent ?? ''}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="padding: 12px; border-left: 4px solid #333; background-color: #f9f9f9;">${message}</p>
      `,
    });

    if (adminResult.error) throw adminResult.error;

    // Auto-reply to USER
    const displayIntent =
      intent === 'other'
        ? otherIntent || 'your inquiry'
        : intent.replace('-', ' ');

    const userResult = await resend.emails.send({
      from: 'Md Umar Siddique <contact@umarsiddique.dev>',
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #111; margin-bottom: 24px;">Hi ${name},</h2>
          
          <p style="font-size: 16px;">Thanks for reaching out! I've successfully received your message regarding <strong>${displayIntent}</strong>.</p>
          
          <p style="font-size: 16px;">I always appreciate connecting with great people and discussing new opportunities. I will review your message and get back to you within 24-48 hours.</p>
          
          <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 32px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;"><strong>A copy of your message:</strong></p>
            <p style="margin: 0; font-size: 15px; font-style: italic; color: #444;">"${message}"</p>
          </div>
          
          <p style="font-size: 16px; margin-top: 32px;">Best regards,<br/>
          <strong>Md Umar Siddique</strong><br/>
          <span style="color: #666; font-size: 14px;">Full-Stack Engineer</span><br/>
          <a href="https://www.umarsiddique.dev" style="color: #0070f3; text-decoration: none;">umarsiddique.dev</a></p>
        </div>
      `,
    });

    if (userResult.error) throw userResult.error;

    return {
      success: true,
      message: 'Message sent successfully!',
      fields: { name: '', email: '', intent: '', otherIntent: '', message: '' },
    };
  } catch (error) {
    console.error('Database/Resend Error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      fields: rawFields,
    };
  }
}
