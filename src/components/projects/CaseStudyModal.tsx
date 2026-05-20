import { ExternalLink, Lightbulb, Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LazyImage from '@/components/ui/lazy-image';
import { Button } from '@/components/ui/button';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';
import { scrollToSection } from '@/lib/scroll';
import type { CaseStudy } from './caseStudies';

type CaseStudyModalProps = {
  study: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CaseStudyModal = ({ study, open, onOpenChange }: CaseStudyModalProps) => {
  if (!study) return null;

  const openLive = () => {
    trackClarityEvent(CLARITY_EVENTS.PROJECT_CLICK, {
      project_id: study.id,
      action: study.website ? 'live_modal' : 'contact_modal',
    });
    if (study.website) {
      window.open(study.website, '_blank', 'noopener,noreferrer');
    } else {
      onOpenChange(false);
      scrollToSection('contact');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="project-modal-content max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto border-0 p-0 sm:rounded-[28px]">
        <div className="project-modal-hero relative aspect-[16/9] max-h-[280px] w-full overflow-hidden rounded-t-[28px]">
          <LazyImage
            src={study.image}
            alt={`${study.title} preview`}
            className="h-full w-full object-cover object-top"
          />
          <div className="project-media-treatment pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071018] via-[#071018]/40 to-transparent" />
          <span className="project-category-badge absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide">
            {study.category}
          </span>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {study.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {study.shortDescription}
            </DialogDescription>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Client · {study.client}
            </p>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="project-modal-insight--problem rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-500/90 dark:text-red-400/90">
                <Target className="h-4 w-4" aria-hidden />
                Challenge
              </div>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{study.problem}</p>
            </div>
            <div className="project-modal-insight--solution rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600/90 dark:text-emerald-400/90">
                <Lightbulb className="h-4 w-4" aria-hidden />
                Solution
              </div>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{study.solution}</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
              Impact
            </p>
            <div className="grid grid-cols-3 gap-3">
              {study.results.map((m) => (
                <div key={m.label} className="project-metric-cell rounded-2xl px-3 py-4 text-center">
                  <p className="text-xl font-semibold text-green-600 dark:text-emerald-400">{m.value}</p>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span key={tag} className="project-tech-pill rounded-full px-3 py-1.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200/80 pt-6 dark:border-white/10 sm:flex-row">
            <Button
              className="project-btn-primary h-11 flex-1 rounded-2xl text-sm font-semibold"
              onClick={openLive}
            >
              {study.website ? 'Visit live product' : 'Request similar build'}
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="project-btn-secondary h-11 flex-1 rounded-2xl text-sm font-semibold"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
