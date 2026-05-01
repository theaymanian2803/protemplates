import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  ExternalLink,
  Copy,
  Terminal,
  Upload,
  FolderOpen,
  Loader2,
  Crown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHostingSettings, HostingPlatform } from "@/hooks/useSiteSettings";
import { useNavigate } from "react-router-dom";

interface HostingWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateTitle?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "Extract": <FolderOpen className="w-5 h-5" />,
  "Build": <Terminal className="w-5 h-5" />,
  "Push": <Upload className="w-5 h-5" />,
  "Create": <Upload className="w-5 h-5" />,
  "Import": <Globe className="w-5 h-5" />,
  "Deploy": <Rocket className="w-5 h-5" />,
  "Publish": <Rocket className="w-5 h-5" />,
  "Configure": <Rocket className="w-5 h-5" />,
};

const getStepIcon = (title: string) => {
  for (const [key, icon] of Object.entries(iconMap)) {
    if (title.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return <Globe className="w-5 h-5" />;
};

const HostingWizard = ({ open, onOpenChange, templateTitle }: HostingWizardProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<HostingPlatform | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { data: settings, isLoading } = useHostingSettings();
  const navigate = useNavigate();

  const platforms = (settings?.platforms || []).filter((p) => p.enabled);
  const proService = settings?.pro_service;

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSelectedPlatform(null);
      setCurrentStep(0);
    }, 300);
  };

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({ title: "Copied!", description: "Command copied to clipboard." });
  };

  const steps = selectedPlatform?.steps || [];
  const progress = selectedPlatform ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {!selectedPlatform ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-display flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Start Hosting
              </DialogTitle>
              <DialogDescription>
                {templateTitle
                  ? `Choose a platform to host "${templateTitle}"`
                  : "Choose a hosting platform for your template"}
              </DialogDescription>
            </DialogHeader>

            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : platforms.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No hosting platforms configured.</p>
            ) : (
              <div className="grid gap-3 mt-4">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.tagline}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}

                {/* Hire a Pro */}
                {proService?.enabled && (
                  <div className="mt-2 p-4 rounded-xl border-2 border-accent/50 bg-accent/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-0.5 rounded-bl-lg">
                      POPULAR
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground">{proService.title}</div>
                        <p className="text-xs text-muted-foreground mt-1">{proService.description}</p>
                        <ul className="mt-2 space-y-1">
                          {proService.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                              <Check className="w-3 h-3 text-accent shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-foreground">${proService.price}</span>
                            <span className="text-xs text-muted-foreground">one-time</span>
                          </div>
                          <Button
                            size="sm"
                            variant="accent"
                            className="gap-1"
                            onClick={() => {
                              handleClose();
                              navigate(`/checkout/pro-hosting${templateTitle ? `?template=${encodeURIComponent(templateTitle)}` : ""}`);
                            }}
                          >
                            {proService.cta_text}
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={selectedPlatform.color}>
                  {selectedPlatform.name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-1.5 mb-2" />
              <DialogTitle className="text-lg font-display flex items-center gap-2">
                {getStepIcon(steps[currentStep].title)}
                {steps[currentStep].title}
              </DialogTitle>
              <DialogDescription>{steps[currentStep].description}</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              {steps[currentStep].details.map((detail, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{detail}</p>
                </div>
              ))}

              {steps[currentStep].command && (
                <div className="mt-4 bg-muted rounded-lg p-3 flex items-center gap-2">
                  <code className="text-xs text-foreground flex-1 font-mono break-all">
                    {steps[currentStep].command}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8"
                    onClick={() => handleCopyCommand(steps[currentStep].command!)}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}

              {steps[currentStep].link_url && (
                <a href={steps[currentStep].link_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 mt-2">
                    <ExternalLink className="w-3.5 h-3.5" />
                    {steps[currentStep].link_label || "Open Link"}
                  </Button>
                </a>
              )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentStep === 0) setSelectedPlatform(null);
                  else setCurrentStep((s) => s - 1);
                }}
                className="gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 0 ? "Back" : "Previous"}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button size="sm" onClick={() => setCurrentStep((s) => s + 1)} className="gap-1">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleClose} className="gap-1">
                  <Check className="w-4 h-4" /> Done
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HostingWizard;
