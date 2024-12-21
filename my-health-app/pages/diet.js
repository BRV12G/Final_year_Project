import Link from 'next/link';

export default function Diet() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Diet Report</h1>
      <p>General Recommendations: [Hardcoded advice based on inputs]</p>
      <Link href="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}
