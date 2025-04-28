import first from "../assets/undraw_mobile-login_4ntr.svg";
import second from "../assets/undraw_absorbed-in_0b2u.svg";
import { UserPlus, FileText, UploadCloud, MailCheck } from "lucide-react";

function Feature() {
  return (
    <div className="w-full px-35 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-[-7px] max-w-xl font-regular text-left zxc">
                How It Works
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Follow these simple steps to apply for your scholarship.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <div className="bg-muted aspect-video mb-2 flex items-center justify-center   rounded-md ">
                <UserPlus size={100} strokeWidth={1} />
              </div>
              <h3 className="text-xl tracking-tight">
                Create an account or log in
              </h3>
              <p className="text-muted-foreground text-base">
                Sign up for a new account or log in to your existing one to get
                started.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted aspect-video mb-2 flex items-center justify-center   rounded-md">
                <FileText strokeWidth={1} size={100} />
              </div>
              <h3 className="text-xl tracking-tight">
                Fill out the scholarship form
              </h3>
              <p className="text-muted-foreground text-base">
                Complete the scholarship application form with your personal and
                academic details.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted aspect-video mb-2 flex items-center justify-center   rounded-md">
                <UploadCloud strokeWidth={1} size={100} />
              </div>
              <h3 className="text-xl tracking-tight">
                Upload your documents
              </h3>
              <p className="text-muted-foreground text-base">
                Upload all required documents, such as transcripts and ID proofs.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="bg-muted rounded-md aspect-video mb-2"></div> */}
              <div className="bg-muted aspect-video mb-2 flex items-center justify-center   rounded-md">
                <MailCheck strokeWidth={1} size={100} />
              </div>
              <h3 className="text-xl tracking-tight">
                Submit and wait for updates via email
              </h3>
              <p className="text-muted-foreground text-base">
                After submission, stay tuned for application status and updates
                via your registered email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
