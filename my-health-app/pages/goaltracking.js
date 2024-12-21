import Link from 'next/link';

export default function Goaltracking() {
  return (
    <div style={{ padding: '20px' }}>
        <div>
            <p>Water Tracker</p>
            <p>Steps walked</p>
            <p>sleep</p>
            <p>extra activities</p>
        </div>
      <Link href="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}
