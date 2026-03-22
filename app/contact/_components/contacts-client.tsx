'use client';

import { motion } from 'motion/react';
import ContactCard from '@/components/contact-cards/contact-card';
import ContactForm from '@/components/contact-cards/contact-form';

export default function ContactClient() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-20 pb-20 md:pt-32 md:pb-24">
      {/* --- HEADER --- */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 md:mb-24 max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Initiate Contact.
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
          Whether you have a specific project in mind, a full-time role, or just
          want to discuss web architecture—I&apos;m always open to talking about
          building solid systems.
        </p>
      </motion.header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* LEFT PANEL: Contact Card Component */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <ContactCard />
        </motion.div>

        {/* RIGHT PANEL: Contact Form Component */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 bg-foreground/5 border border-foreground/10 rounded-3xl p-6 md:p-8 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:bg-foreground/10 group-hover:scale-105 shadow-xl"
        >
          <ContactForm />
        </motion.div>
      </section>
    </section>
  );
}
