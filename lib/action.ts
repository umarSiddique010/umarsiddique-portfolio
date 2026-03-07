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
      from: 'Md Umar Siddique <onboarding@resend.dev>',
      to: 'us70763@gmail.com',
      subject: `New Contact Form: ${intent}`,
      replyTo: email,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Intent:</strong> ${intent}</p>
        ${intent === 'other' ? `<p><strong>Other Intent:</strong> ${otherIntent ?? ''}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (adminResult.error) throw adminResult.error;

    // Auto-reply to USER
    const userResult = await resend.emails.send({
      from: 'Md Umar Siddique <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting me. I’ll get back to you soon.</p>
        <p>— Umar</p>
      `,
    });

    if (userResult.error) throw userResult.error;

    return {
      success: true,
      message: 'Message sent successfully!',
      fields: { name: '', email: '', intent: '', otherIntent: '', message: '' },
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      fields: rawFields,
    };
  }
}
