import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
