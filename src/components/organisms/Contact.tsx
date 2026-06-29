"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SocialLink } from "@/components/molecules/SocialLink";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";
import { ParallaxItem } from "@/components/animations/ParallaxItem";
import { person, socialEntries } from "@/data/placeholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email address"),
  subject: z.string().min(2, "Add a subject"),
  message: z.string().min(10, "Your message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export function Contact() {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onValid = (data: FormValues) => {
    // Placeholder submission. Wire a real handler here, e.g.:
    //   await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
    console.info("[contact] submission", data);
  };

  const onInvalid = () => {
    if (reduced) return;
    controls.start({
      x: [0, -8, 8, -6, 6, 0],
      transition: { duration: 0.4 },
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="contact"
        num="08"
        title="Get in touch"
        headingId="contact-heading"
        kicker="Have something to build? Let's talk."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: copy + socials */}
        <div>
          <ScrollTextReveal 
            text={`I'm ${person.availability.toLowerCase()}. The fastest way to reach me is the form — or any of the channels below.`}
            className="max-w-md text-pretty text-lg text-foreground leading-relaxed"
          />
          <p className="mt-6 font-mono text-sm text-muted-foreground">
            Prefer email?{" "}
            <span className="text-foreground">{person.email}</span>
          </p>
          <div className="mt-8 max-w-md">
            {socialEntries.map((entry) => (
              <SocialLink key={entry.platform} entry={entry} />
            ))}
          </div>
        </div>

        {/* Right: form / success */}
        <ParallaxItem yRange={[40, -40]}>
          <AnimatePresence mode="wait">
            {isSubmitSuccessful ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start justify-center rounded-md border border-border bg-card p-8"
              >
                <motion.span
                  initial={reduced ? undefined : { scale: 0 }}
                  animate={reduced ? undefined : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-red-500 text-red-400"
                >
                  <Icon icon={Check} size={22} label="Sent" />
                </motion.span>
                <h3 className="mt-5 font-mono text-xl font-medium text-foreground">
                  Message sent
                </h3>
                <p className="mt-2 text-pretty text-sm text-muted-foreground">
                  Thanks for reaching out — I&apos;ll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                animate={controls}
                onSubmit={handleSubmit(onValid, onInvalid)}
                noValidate
                className="space-y-5 rounded-md border border-border bg-card p-6 sm:p-8"
              >
                {FIELDS.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      aria-invalid={Boolean(errors[field.name])}
                      {...register(field.name)}
                      className={cn(
                        "w-full rounded-md border bg-input px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-graphite-600 focus-visible:border-ring",
                        errors[field.name] ? "border-destructive" : "border-border",
                      )}
                    />
                    {errors[field.name] && (
                      <p
                        role="alert"
                        className="mt-2 font-mono text-xs text-destructive"
                      >
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    {...register("message")}
                    className={cn(
                      "w-full resize-none rounded-md border bg-input px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-graphite-600 focus-visible:border-ring",
                      errors.message ? "border-destructive" : "border-border",
                    )}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-2 font-mono text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Send message
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </ParallaxItem>
      </div>
    </section>
  );
}
