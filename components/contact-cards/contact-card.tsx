import { Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { socialLinks } from '@/constants/socials-links';
import clsx from 'clsx';

export default function ContactCard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <Badge
          variant="secondary"
          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 px-4 py-1.5 text-sm font-medium border-0 w-fit"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Currently Available for New Opportunities
        </Badge>

        <div className="flex flex-col gap-5 pt-4">
          {/* Email */}
          <div className="flex items-center gap-4 text-muted-foreground group">
            <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10 group-hover:border-foreground/20 transition-colors">
              <Mail className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <a
                href="mailto:us70763@gmail.com"
                className="text-foreground font-semibold hover:underline"
              >
                us70763@gmail.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 text-muted-foreground group">
            <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10 group-hover:border-foreground/20 transition-colors">
              <MapPin className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-foreground font-semibold">
                Giridih, Jharkhand, India • Remote
              </p>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-4 text-muted-foreground group">
            <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10 group-hover:border-foreground/20 transition-colors">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Timezone</p>
              <p className="text-foreground font-semibold">IST (UTC +5:30)</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-foreground/10" />

      {/* Dynamic Social Links */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-foreground tracking-wider uppercase">
          Digital Presence
        </p>
        <ul className="flex gap-4">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
                className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-full bg-accent/50 text-foreground/60 hover:bg-accent hover:scale-110 transition-all duration-300 border border-transparent hover:border-accent-foreground/10 group',
                  link.color,
                )}
              >
                <span className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
