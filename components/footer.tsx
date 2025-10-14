import Link from "next/link"
import {MessageCircle, Sparkles} from "lucide-react"
import {clsx} from "clsx";

export function Footer({className}: { className: string }) {


  const resourceLinks = [
    {name: "Cubyz Github", href: "https://github.com/PixelGuys/Cubyz/", icon: <MessageCircle className="h-4 w-4"/>},
    {name: "Cubyz Discord", href: "https://discord.gg/XtqCRRG", icon: <MessageCircle className="h-4 w-4"/>},
  ]


  return (
    <footer className={
      clsx("py-24 px-4 bg-gradient-to-b from-white to-gray-50",
        className)}>

      <div className="container px-4 py-16 mx-auto relative z-10">
        {/* Top Section - CTA */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white"/>
              </div>
              <span
                className="font-black text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {process.env.NEXT_PUBLIC_TITLE}
              </span>
            </div>
          </div>


          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors group"
                  >
                    <div className="text-gray-400 group-hover:text-rose-500 transition-colors">
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">cubyz.io is not directly affiliated with the Cubyz project.</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}