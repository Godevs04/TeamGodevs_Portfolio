import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LocalePricingProvider } from "@/contexts/LocalePricingContext";
import RouterBridge from "@/components/layout/RouterBridge";
import { IS_COLLEGE_PROJECT, STUDENT_PROJECTS_PATH } from "@/lib/features";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const StudentProjects = lazy(() => import("./pages/StudentProjects"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <LocalePricingProvider>
        <TooltipProvider>
          <HotToaster position="top-right" />
          <BrowserRouter>
            <RouterBridge />
            <Routes>
              <Route path="/" element={<Index />} />
              {IS_COLLEGE_PROJECT && (
                <Route
                  path={STUDENT_PROJECTS_PATH}
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-background" />}>
                      <StudentProjects />
                    </Suspense>
                  }
                />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocalePricingProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
