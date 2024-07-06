import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex items-center space-between w-full px-2 py-4 md:px-4 border-b border-gray-200">
      <h2 className="text-2xl font-bold">
        <Link href="/">Goal Weight Tracker</Link>
      </h2>
      <ul className="ml-auto">
        <li>{/* <Link href="weight-by-date">Weight by Date</Link> */}</li>
      </ul>
    </nav>
  );
};

export default Nav;
