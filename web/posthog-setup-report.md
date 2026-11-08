<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the TeamGoDevs portfolio site. PostHog (`posthog-js` + `@posthog/react`) was installed and initialized in `src/main.tsx` using environment variables. Ten business-critical events were instrumented across nine components, covering the full visitor-to-lead conversion journey: from CTA clicks through each contact form step to final submission. User identification (`posthog.identify`) is called on form submission using the visitor's email and name. The existing Microsoft Clarity integration was left untouched; PostHog events were added alongside it.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicks "Start your project" or "Book a call" in the Hero section | `src/components/Hero.tsx` |
| `final_cta_clicked` | User clicks a CTA button in the bottom FinalCTA section | `src/components/FinalCTA.tsx` |
| `mobile_cta_clicked` | User taps the sticky mobile CTA bar's "Get started" button | `src/components/MobileCTABar.tsx` |
| `navbar_cta_clicked` | User clicks "Get started" in the navbar (desktop or mobile menu) | `src/components/Navbar.tsx` |
| `contact_form_step_completed` | User advances a step in the multi-step contact form | `src/components/contact/MultiStepForm.tsx` |
| `contact_form_submitted` | User submits the lead inquiry form (project type + budget captured) | `src/components/contact/MultiStepForm.tsx` |
| `whatsapp_chat_clicked` | User clicks "Chat on WhatsApp" in the contact side panel | `src/components/contact/ContactSidePanel.tsx` |
| `case_study_opened` | User clicks "View case study" on a featured project card | `src/components/projects/FeaturedProject.tsx` |
| `newsletter_subscribed` | User subscribes to the newsletter from the footer | `src/components/Footer.tsx` |
| `book_call_viewed` | User views the book-a-call panel (Calendly embed loaded) | `src/components/contact/BookCallPanel.tsx` |

## Next steps

We've built a dashboard and five insights to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/project/433168/dashboard/1609097)
- [CTA Clicks Over Time](/project/433168/insights/V9ebAHle) — all CTA entry points compared side-by-side
- [Lead Conversion Funnel](/project/433168/insights/QN33R1aa) — CTA click → form step completed → form submitted
- [Contact Form Submissions](/project/433168/insights/XgGvQc6q) — daily lead form completions
- [Case Study Opens](/project/433168/insights/X7I8MM9z) — portfolio engagement over time
- [Newsletter Subscriptions](/project/433168/insights/oam7EnJZ) — audience growth from footer

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
