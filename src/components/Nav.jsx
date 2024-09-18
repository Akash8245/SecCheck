import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="bg-black text-white p-4 flex items-center justify-between h-16">
      <div className="text-[25px] font-extrabold">
        <span>Sec</span><span className="text-[red]">Check</span>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-400 font-bold text-[20px] ">Email</Link>
        <Link to="/password" className="hover:text-gray-400 font-bold text-[20px]">Password</Link>
        <Link to="/Database" className="hover:text-gray-400 font-bold text-[20px]">Database</Link>

      </div>
    </div>
  );
}
