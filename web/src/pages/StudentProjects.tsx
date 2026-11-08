import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  FileText,
  Headphones,
  MessageCircle,
  Search,
  SearchX,
  Sparkles,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';
import PageMeta from '@/components/seo/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StudentProjectCard from '@/components/student-projects/StudentProjectCard';
import StudentProjectDialog from '@/components/student-projects/StudentProjectDialog';
import { DOMAIN_ICONS, searchWhatsAppUrl } from '@/components/student-projects/helpers';
import CustomProjectCard from '@/components/student-projects/CustomProjectCard';
import NeedSomethingElse from '@/components/student-projects/NeedSomethingElse';
import WhatsAppFab from '@/components/student-projects/WhatsAppFab';
import {
  DOMAINS,
  DOMAIN_COUNTS,
  LEVEL_LABELS,
  PRICE_TIERS,
  PRICE_TIER_IDS,
  TEAM_SIZE,
  perPersonPrice,
  type PriceTier,
  STARTING_PRICE,
  STUDENT_PROJECTS,
  STUDENT_PROJECT_COUNT_LABEL,
  formatINR,
  type StudentDomain,
  type StudentLevel,
  type StudentProject,
} from '@/components/student-projects/data';
import { STUDENT_PROJECTS_PATH } from '@/lib/features';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'name';
const PAGE_SIZE = 24;
/** Grid slot for the "Didn't find your project?" card */
const CUSTOM_CARD_SLOT = 7;

const STEPS = [
  { title: 'Pick a project', text: 'Filter by domain, level and tech stack.' },
  { title: 'Confirm on WhatsApp / email', text: 'Share your deadline & changes — we confirm the scope, price and delivery date.' },
  { title: 'Get your package', text: 'Abstract, documentation & source code — with setup help.' },
];

const HIGHLIGHTS = [
  { icon: FileText, label: 'Abstract' },
  { icon: BookOpen, label: 'Documentation' },
  { icon: Code2, label: 'Source code' },
  { icon: Headphones, label: 'Setup support' },
];

const chipClass = (active: boolean) =>
  cn(
    'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
  );

const StudentProjects = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<StudentProject | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const domainParam = params.get('domain') as StudentDomain | null;
  const domain: StudentDomain | 'all' =
    domainParam && DOMAINS.some((d) => d.id === domainParam) ? domainParam : 'all';
  const levelParam = params.get('level') as StudentLevel | null;
  const level: StudentLevel | 'all' =
    levelParam === 'mini' || levelParam === 'final-year' ? levelParam : 'all';
  const sort = (params.get('sort') as SortKey | null) ?? 'popular';
  const tierParam = Number(params.get('tier'));
  const tier: PriceTier | 'all' = (PRICE_TIER_IDS as readonly number[]).includes(tierParam)
    ? (tierParam as PriceTier)
    : 'all';
  const q = (params.get('q') ?? '').toLowerCase();

  const setParam = (key: string, value: string | null) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'all') next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );
  };

  // Debounce search text into the URL
  useEffect(() => {
    const id = window.setTimeout(() => setParam('q', query.trim() || null), 250);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Deep link: /student-projects?project=<id>
  useEffect(() => {
    const id = params.get('project');
    if (!id) return;
    const match = STUDENT_PROJECTS.find((p) => p.id === id);
    if (match) {
      setSelected(match);
      setDialogOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filtered = useMemo(() => {
    const list = STUDENT_PROJECTS.filter((p) => {
      if (domain !== 'all' && p.domain !== domain) return false;
      if (level !== 'all' && p.level !== level) return false;
      if (tier !== 'all' && p.tier !== tier) return false;
      if (!q) return true;
      return [p.title, p.abstract, p.code, ...p.tech].some((v) => v.toLowerCase().includes(q));
    });
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'name') sorted.sort((a, b) => a.title.localeCompare(b.title));
    else sorted.sort((a, b) => Number(b.popular) - Number(a.popular));
    return sorted;
  }, [domain, level, tier, sort, q]);

  useEffect(() => setVisible(PAGE_SIZE), [domain, level, tier, sort, q]);

  const openProject = (project: StudentProject) => {
    setSelected(project);
    setDialogOpen(true);
    setParam('project', project.id);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setParam('project', null);
  };

  const resetFilters = () => {
    setQuery('');
    setParams(new URLSearchParams(), { replace: true });
  };

  const hasFilters = domain !== 'all' || level !== 'all' || tier !== 'all' || Boolean(q);

  const tierCounts = useMemo(
    () =>
      STUDENT_PROJECTS.reduce<Record<number, number>>((acc, p) => {
        acc[p.tier] = (acc[p.tier] ?? 0) + 1;
        return acc;
      }, {}),
    []
  );

  return (
    <>
      <PageMeta
        title={`Final Year & Mini Projects for Students from ${formatINR(STARTING_PRICE)} | ${SITE.name}`}
        description={`${STUDENT_PROJECT_COUNT_LABEL} college projects in AI/ML, web, Android, IoT, cyber security, blockchain and cloud — each with abstract, full documentation and source code, starting at ${formatINR(STARTING_PRICE)}.`}
        canonicalPath={STUDENT_PROJECTS_PATH}
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        <main id="main-content" className="pb-20 pt-28 sm:pt-32">
          <PageContainer>
            {/* Hero */}
            <header className="mx-auto max-w-3xl text-center">
              <span className="badge-pill mb-5 inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                For college students
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {STUDENT_PROJECT_COUNT_LABEL} ready-to-submit projects
                <span className="mt-1 block text-gradient">starting at {formatINR(STARTING_PRICE)}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Mini and final-year projects for B.E / B.Tech, MCA, BCA, B.Sc and M.Tech. Every project
                comes with an abstract, complete documentation and working source code.
              </p>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </header>

            <ol className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-4">
                  <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>

            {/* Pick by budget */}
            <section aria-labelledby="budget-heading" className="mt-14">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 id="budget-heading" className="text-lg font-semibold text-foreground sm:text-xl">
                    Pick by budget
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Same complete package in every tier — split it with your team of {TEAM_SIZE}.
                  </p>
                </div>
                {tier !== 'all' && (
                  <button type="button" onClick={() => setParam('tier', null)} className="text-sm font-medium text-primary hover:underline">
                    Show all budgets
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" role="group" aria-label="Filter by budget">
                {PRICE_TIER_IDS.map((id) => {
                  const info = PRICE_TIERS[id];
                  const active = tier === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setParam('tier', active ? null : String(id))}
                      className={cn(
                        'group relative flex flex-col items-start justify-start overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5',
                        active
                          ? 'border-primary bg-primary/[0.08] shadow-glow'
                          : 'border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-medium'
                      )}
                    >
                      {id === 1 && (
                        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                          Best value
                        </span>
                      )}
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{info.label}</p>
                      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {formatINR(info.price)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatINR(perPersonPrice(info.price))} each · team of {TEAM_SIZE}
                      </p>
                      <p className="mt-3 text-sm leading-snug text-foreground/80">{info.description}</p>
                      <p className="mt-auto pt-3 text-xs font-medium text-muted-foreground group-hover:text-primary">
                        {tierCounts[id] ?? 0} projects →
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Filters */}
            <section aria-label="Filter projects" className="mt-10 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <Input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, technology (e.g. Python, React, Arduino) or code"
                    className="h-11 rounded-full pl-10"
                    aria-label="Search projects"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={level}
                    onChange={(e) => setParam('level', e.target.value)}
                    className="h-11 rounded-full border border-input bg-background px-4 text-sm"
                    aria-label="Project level"
                  >
                    <option value="all">All levels</option>
                    <option value="mini">{LEVEL_LABELS.mini}</option>
                    <option value="final-year">{LEVEL_LABELS['final-year']}</option>
                  </select>
                  <select
                    value={sort}
                    onChange={(e) => setParam('sort', e.target.value === 'popular' ? null : e.target.value)}
                    className="h-11 rounded-full border border-input bg-background px-4 text-sm"
                    aria-label="Sort projects"
                  >
                    <option value="popular">Popular first</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Name A–Z</option>
                  </select>
                </div>
              </div>

              <div
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
                role="group"
                aria-label="Project domain"
              >
                <button type="button" className={chipClass(domain === 'all')} onClick={() => setParam('domain', null)} aria-pressed={domain === 'all'}>
                  All domains
                  <span className="opacity-70">{STUDENT_PROJECTS.length}</span>
                </button>
                {DOMAINS.map((d) => {
                  const Icon = DOMAIN_ICONS[d.id];
                  const active = domain === d.id;
                  return (
                    <button key={d.id} type="button" className={chipClass(active)} onClick={() => setParam('domain', d.id)} aria-pressed={active}>
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {d.short}
                      <span className="opacity-70">{DOMAIN_COUNTS[d.id]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p aria-live="polite">
                  Showing <span className="font-semibold text-foreground">{Math.min(visible, filtered.length)}</span> of{' '}
                  {filtered.length} projects
                </p>
                {hasFilters && (
                  <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                    <X className="h-3.5 w-3.5" aria-hidden />
                    Clear filters
                  </button>
                )}
              </div>
            </section>

            {/* Grid */}
            {filtered.length > 0 ? (
              <>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.slice(0, visible).flatMap((project, i) => {
                    const card = (
                      <StudentProjectCard key={project.id} project={project} onOpen={openProject} priority={i < 4} />
                    );
                    return i === CUSTOM_CARD_SLOT ? [<CustomProjectCard key="custom-card" query={q} />, card] : [card];
                  })}
                  {Math.min(visible, filtered.length) <= CUSTOM_CARD_SLOT && <CustomProjectCard query={q} />}
                </div>
                {visible < filtered.length && (
                  <div className="mt-10 text-center">
                    <Button variant="ctaOutline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                      Load more projects ({filtered.length - visible} left)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                <SearchX className="mb-3 h-8 w-8 text-muted-foreground" aria-hidden />
                <p className="font-semibold text-foreground">No matching project in our list</p>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  We can build it for you — on your own idea, title or IEEE paper. DM us on WhatsApp and we&apos;ll
                  reply with a quote.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <Button variant="ctaOutline" onClick={resetFilters}>Clear filters</Button>
                  <Button asChild variant="cta">
                    <a href={searchWhatsAppUrl(params.get('q') ?? '')} target="_blank" rel="noopener noreferrer">
                      <MessageCircle aria-hidden />
                      DM us on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}

            <NeedSomethingElse />
          </PageContainer>
        </main>

        <Footer />
      </div>

      <WhatsAppFab />
      <StudentProjectDialog project={selected} open={dialogOpen} onOpenChange={handleDialogChange} />
    </>
  );
};

export default StudentProjects;
