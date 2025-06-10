import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Twitter, Github } from "lucide-react";
export default function Footer() {
  return (
    <footer>
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-2xl zxczxc tracking-[-4px] ">
          Basc Edugrant
        </span>

        <div className="flex gap-3">
          <Link
            href="https://twitter.com"
            className="p-2 rounded-full"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com"
            className="p-2 rounded-full"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center mt-3">
        <div className="space-y-2">
          <div>© 2025 BASC Edugrant</div>
          <div>All rights reserved</div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <ul className=" flex gap-5">
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <ul className="flex gap-5">
            <li>
              <a href="/privacy" className="text-gray-500 hover:underline">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-gray-500 hover:underline">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

{
  /* 
    
      <div className="text-gray-500">
        
        </div>
    
    
    
     
    
    
    
    
    
    
  ; */
}
