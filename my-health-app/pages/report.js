import Link from 'next/link';

export default function Report() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Health Report</h1>
      <p>Status: <b>Healthy</b> (or <b>Unhealthy</b>)</p>
      <p>General Recommendations: [Hardcoded advice based on inputs]</p>
      <Link href="/home">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}
