import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <div >
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link
            to="/category"
          >
            Category
          </Link>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
