import { JapaneseYenIcon, Link } from "lucide-react";

export function Footer() {
    return(
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/warmhome.png" className="h-28" alt="Flowbite Logo" />
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/about" className="hover:underline me-4 md:me-6">О нас</a>
                        </li>
                        <li>
                            {/* <a href="https://www.instagram.com/home.spark.ai/" className="hover:underline me-4 md:me-6">
                                <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" className="h-6 my-auto inline" alt="Instagram" />
                            </a> */}
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">homespark™</a></span>
            </div>
        </footer>
    )
}
