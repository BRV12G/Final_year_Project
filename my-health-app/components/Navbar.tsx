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
          <Link href="/diet" className="hover:underline">
            Diet
          </Link>
        </li>
        <li>
          <Link href="/fitness" className="hover:underline">
            Fitness
          </Link>
        </li>
        <li>
          <Link href="/fitness" className="hover:underline">
            Goaltracking
          </Link>
        </li>
        <li>
          <Link href="/fitness" className="hover:underline">
            Chatbot
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
