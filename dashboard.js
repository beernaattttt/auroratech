import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <p>Your Discord ID: {user.id}</p>
    </div>
  );
}
