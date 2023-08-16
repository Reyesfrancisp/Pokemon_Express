function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-2 p-2 md:p-4 fixed bottom-0 w-full">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
        <a
              href="https://github.com/Reyesfrancisp/pokemon_devdex"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Image placeholder */}
              <img
                src="/finalLogo.png"
                className="h-6 md:h-8 mr-2 md:mr-3"
                alt="Logo"
              />
              {/* Name of the app */}
              <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
                Pokedex Express
              </span>
            </a>
            <ul className="flex flex-wrap items-center mt-2 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
              <li>
                <a href="#" className="mr-2 md:mr-4 hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-2 md:mr-4 hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-2 md:mr-4 hover:underline">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
        </div>
        <hr className="my-3 border-gray-200 md:my-4 dark:border-gray-700" />
        <span className="block text-xxs md:text-xs text-gray-500 md:text-center dark:text-gray-400">
        © {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/Reyesfrancisp/pokemon_devdex"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              App Name™
            </a>
            . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
