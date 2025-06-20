"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  Clock,
  FileText,
  PoundSterlingIcon as PhilippinePeso,
  Send,
  FileCheck,
  Eye,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Download,
  Building,
  Calendar,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function InterceptionClientTrackScholarship() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const scholarshipData = {
    id: "111",
    name: "Kuya Wil Scholarship Program",
    provider: "Wally Revillame Foundation",
    amount: 3000,
    status: "pending",
    applicationDate: "2025-02-12",
    deadline: "2025-03-15",
    description:
      "Merit-based scholarship program supporting outstanding students in their academic journey. This scholarship aims to provide financial assistance to deserving students who demonstrate academic excellence and leadership potential.",
    coverImage: "/placeholder.svg?height=300&width=800",
    progress: 75,
    currentStage: "Document Review",
    nextAction: "Wait for review completion",
    estimatedDecision: "2025-03-01",
    documents: [
      {
        id: "1",
        name: "Certificate of Registration (COR)",
        status: "approved",
        uploadDate: "2025-02-10",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        id: "2",
        name: "Transcript of Records",
        status: "approved",
        uploadDate: "2025-02-10",
        size: "1.8 MB",
        type: "PDF",
      },
      {
        id: "3",
        name: "Personal Statement",
        status: "pending",
        uploadDate: "2025-02-12",
        size: "856 KB",
        type: "PDF",
      },
    ],
    timeline: [
      {
        id: "1",
        title: "Application Submitted",
        description: "Your application has been successfully submitted",
        date: "2025-02-12",
        status: "completed",
        icon: Send,
      },
      {
        id: "2",
        title: "Document Verification",
        description: "Documents are being verified by our team",
        date: "2025-02-15",
        status: "completed",
        icon: FileCheck,
      },
      {
        id: "3",
        title: "Initial Review",
        description: "Application is under initial review",
        date: "2025-02-18",
        status: "current",
        icon: Eye,
      },
      {
        id: "4",
        title: "Final Decision",
        description: "Final decision will be communicated",
        date: "2025-03-01",
        status: "pending",
        icon: CheckCircle,
      },
    ],
  };

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        router.back();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open, router]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Approved
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="sr-only">
        <DrawerHeader>
          <DrawerTitle>Scholarship Application</DrawerTitle>
          <DrawerDescription>
            Merit Excellence Scholarship Details
          </DrawerDescription>
        </DrawerHeader>
      </div>

      <DrawerContent className="max-w-4xl mx-auto max-h-[95vh]">
        <div className="overflow-auto">
          {/* Hero Section - Consistent with other components */}
          <div className="relative mb-6">
            <div className="relative h-48 md:h-64 rounded-t-lg overflow-hidden">
              <img
                src={scholarshipData.coverImage || "/placeholder.svg"}
                alt="Scholarship Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {scholarshipData.status.toUpperCase()}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white/10 text-white border-white/20"
                  >
                    ID: {scholarshipData.id}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {scholarshipData.name}
                </h1>
                <p className="text-white/90 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  by {scholarshipData.provider}
                </p>
              </div>
            </div>
          </div>

          {/* Container with consistent padding */}
          <div className="container mx-auto max-w-4xl px-6 space-y-8">
            {/* Key Information Cards - Consistent with other components */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg border bg-card shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <PhilippinePeso className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ₱{scholarshipData.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Scholarship Amount
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {new Date(
                        scholarshipData.applicationDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Application Date
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">3/3</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded Documents
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Progress Section */}
            <div className="rounded-lg border bg-card shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Application Progress
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    Current Stage: {scholarshipData.currentStage}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {scholarshipData.progress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scholarshipData.progress}%` }}
                  ></div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">
                        Next Action Required
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                        {scholarshipData.nextAction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Timeline */}
            <div className="rounded-lg border bg-card shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Application Timeline
              </h2>

              <div className="space-y-6">
                {scholarshipData.timeline.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        item.status === "completed"
                          ? "bg-green-500 border-green-500"
                          : item.status === "current"
                          ? "bg-blue-500 border-blue-500"
                          : "border-muted-foreground bg-background"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : item.status === "current" ? (
                        <Eye className="h-5 w-5 text-white" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={`font-medium ${
                            item.status === "completed"
                              ? "text-green-600"
                              : item.status === "current"
                              ? "text-blue-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {index < scholarshipData.timeline.length - 1 && (
                        <div className="w-px h-6 bg-border ml-5 mt-4"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submitted Documents */}
            <div className="rounded-lg border bg-card shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Submitted Documents
              </h2>

              <div className="space-y-4">
                {scholarshipData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getDocumentStatusIcon(doc.status)}
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>
                            Uploaded{" "}
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    All Documents Submitted
                  </h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-200">
                  You have successfully submitted all required documents. Your
                  application is now under review.
                </p>
              </div>
            </div>

            {/* Scholarship Details */}
            <div className="rounded-lg border bg-card shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                About This Scholarship
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {scholarshipData.description}
              </p>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Full Details
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Application
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t bg-background px-6 py-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
