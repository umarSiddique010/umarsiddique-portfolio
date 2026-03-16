'use client';

import { useState, useActionState, useEffect } from 'react';
import { Send, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { State, submitContactForm } from '@/lib/action';
import clsx from 'clsx';
import { toast } from 'sonner';

const initialState: State = {
  errors: {},
  message: null,
  success: false,
  fields: { name: '', email: '', intent: '', otherIntent: '', message: '' },
};

export default function ContactForm() {
  const [intent, setIntent] = useState('');

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  useEffect(() => {
    if (state?.message) {
      setIntent(state?.fields?.intent || '');
      if (state.success) {
        toast.success("Message received! I'll get back to you soon.");
      } else {
        toast.error('Oops! That didn’t send. Please try again.');
      }
    }
  }, [state?.message, state?.success, state?.fields?.intent]);

  return (
    <form
      className={clsx('flex flex-col gap-6', {
        'cursor-not-allowed': isPending,
      })}
      action={formAction}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-foreground"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            defaultValue={state?.fields?.name || ''}
            className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground placeholder:text-muted-foreground"
            disabled={isPending}
            aria-describedby="name-error"
          />
          <div
            className="h-1"
            id="name-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.errors?.name?.map((error) => (
              <p key={error} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            defaultValue={state?.fields?.email || ''}
            className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground placeholder:text-muted-foreground"
            disabled={isPending}
            aria-describedby="email-error"
          />
          <div
            className="h-1"
            id="email-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.errors?.email?.map((error) => (
              <p key={error} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Intent Dropdown */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="intent"
          className="text-sm font-semibold text-foreground"
        >
          Intent
        </label>
        <div className="relative">
          <select
            id="intent"
            name="intent"
            defaultValue={state?.fields?.intent || ''}
            onChange={(e) => setIntent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground appearance-none cursor-pointer"
            disabled={isPending}
            aria-describedby="intent-error"
          >
            <option value="" disabled>
              Select the purpose of your message...
            </option>
            <option value="full-time">Full-Time Role Opportunity</option>
            <option value="freelance">Freelance / Contract Project</option>
            <option value="open-source">Open Source Collaboration</option>
            <option value="networking">Networking / Intro</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-1 text-muted-foreground pointer-events-none" />
        </div>
        <div
          className="h-1"
          id="intent-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.errors?.intent?.map((error) => (
            <p key={error} className="text-red-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Conditional Input for 'Other' */}
      {intent === 'other' && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label
            htmlFor="otherIntent"
            className="text-sm font-semibold text-foreground"
          >
            Please Specify
          </label>
          <input
            type="text"
            id="otherIntent"
            name="otherIntent"
            placeholder="Type your specific intent..."
            defaultValue={state?.fields?.otherIntent || ''}
            className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground placeholder:text-muted-foreground"
            disabled={isPending}
            aria-describedby="otherIntent-error"
          />
          <div
            className="h-1"
            id="otherIntent-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.errors?.otherIntent?.map((error) => (
              <p key={error} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Message Textarea */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          defaultValue={state?.fields?.message || ''}
          className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground placeholder:text-muted-foreground resize-none"
          disabled={isPending}
          aria-describedby="message-error"
        ></textarea>
        <div
          className="h-1"
          id="message-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.errors?.message?.map((error) => (
            <p key={error} className="text-red-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl h-12 text-base font-semibold mt-2 group"
        disabled={isPending}
      >
        {isPending ? (
          <>
            Sending...
            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
          </>
        ) : (
          <>
            Submit Message
            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
}
