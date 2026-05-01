import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, FileText } from "lucide-react";

const SupportCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Need Help?
        </CardTitle>
        <CardDescription>
          Have questions about your orders, templates, or account? We're here to help.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="default" className="gap-2 flex-1">
            <Link to="/contact">
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 flex-1">
            <Link to="/faq">
              <FileText className="w-4 h-4" />
              View FAQ
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 flex-1">
            <Link to="/refunds">
              <HelpCircle className="w-4 h-4" />
              Refund Policy
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportCard;
