import React from 'react'

const Footer = () => {
    return (
        <div className="w-full bg-transparent backdrop-blur-xs border-t-1 border-zinc-500 dark:border-amber-500 py-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-300 px-4">
                {/* Left side */}
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()} Hanfi. All rights reserved.
                </p>

                {/* Center */}
                <p className="text-center">
                    Built by <span className="font-semibold">Hanfi</span> <br className="md:hidden" />
                    with guidance from{" "}
                    <span className="font-semibold">Rohit Negi</span> &{" "}
                    <span className="font-semibold">Suraj Jha</span>
                </p>

                {/* Right side - social links */}
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/ZuhaibHanfi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-500 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://x.com/zuhaibhanfi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-500 transition-colors"
                    >
                        X (Twitter)
                    </a>
                    <a
                        href="mailto:youremail@example.com"
                        className="hover:text-amber-500 transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </div>

    )
}

export default Footer