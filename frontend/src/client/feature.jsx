import first from "../assets/undraw_mobile-login_4ntr.svg";
import second from "../assets/undraw_absorbed-in_0b2u.svg";
import { UserPlus, FileText, UploadCloud, MailCheck } from "lucide-react";

function Feature() {
  return (
    <div className="w-full  ">
      <div className="container mx-auto bg-green-800  px-30 py-20">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-4xl tracking-[-5px] max-w-xl text-white font-regular text-left zxc">
                How It Works
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-white/50 text-left">
                Follow these simple steps to apply for your scholarship.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2 ">
              <div className="bg-muted  mb-2 flex items-center py-5 justify-center shadow-md  rounded-md ">
                <UserPlus size={90} className="text-green-900" strokeWidth={1} />
              </div>
              <h3 className="text-xl text-white tracking-tight">
                Create an account or log in
              </h3>
              <p className="text-white/50 text-base">
                Sign up for a new account or log in to your existing one to get
                started.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted  mb-2 flex items-center py-5 justify-center shadow-md   rounded-md">
                <FileText strokeWidth={1} size={90} className="text-green-900" />
              </div>
              <h3 className="text-xl text-white tracking-tight">
                Fill out the scholarship form
              </h3>
              <p className="text-white/50 text-base">
                Complete the scholarship application form with your personal
                details.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted  mb-2 flex items-center py-5 justify-center shadow-md   rounded-md">
                <UploadCloud strokeWidth={1} size={90} className="text-green-900" />
              </div>
              <h3 className="text-xl text-white tracking-tight">Upload your documents</h3>
              <p className="text-white/50 text-base">
                Upload all required documents, such as transcripts and ID
                proofs.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="bg-muted rounded-md  mb-2"></div> */}
              <div className="bg-muted  mb-2 flex items-center py-5 justify-center shadow-md   rounded-md">
                <MailCheck strokeWidth={1} size={90} className="text-green-900" />
              </div>
              <h3 className="text-xl text-white tracking-tight">
                Submit and wait for updates
              </h3>
              <p className="text-white/50 text-base">
                Stay tuned for application status and updates via your
                registered email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
