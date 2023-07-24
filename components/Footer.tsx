import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-20 bg-drim_dark text-gray-300 flex items-center justify-center gap-4">
      <Link
        href={"/"}
        className="px-2 text-drim_white border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] text-4xl mt-1"
      >
        DRIMBOOKS
      </Link>
      <p className="text-sm -mt-4">
        All rights reserved{" "}
        <a
          className="hover:text-white hover:underline decoration-[1px] cursor-pointer duration-300"
          href="#"
          target="_blank"
        >
          @drimbooks.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
