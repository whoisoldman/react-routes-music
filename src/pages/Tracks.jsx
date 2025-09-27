import { Form, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getTracks } from "../utils/api";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const tracks = await getTracks(q);
  return { tracks, q };
}

export default function Tracks() {
  const { tracks, q } = useLoaderData();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1>Tracks</h1>

      <Form role="search">
        <input
          name="q"
          placeholder="Search..."
          defaultValue={q}
          style={{ padding: 8, width: 240, marginBottom: 12 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>Find</button>
      </Form>

      <ul>
        {tracks.map(t => (
          <li key={t.id}>
            <Link to={`/tracks/${t.id}`}>{t.title} — {t.artist}</Link>
          </li>
        ))}
      </ul>

      {!tracks.length && <p>Ничего не найдено по запросу “{searchParams.get("q")}”.</p>}
    </div>
  );
}
