// UMD-глобалы
const React = window.React;
const ReactDOM = window.ReactDOM;
const RRD = window.RRD;

import { getTracks, getTrack, createSubscription } from "./utils/api.js";

// Логи для понимания, почему Data API не работает
console.log("RRD keys has createBrowserRouter?", typeof RRD.createBrowserRouter);

// ============== Компоненты ==============
const Link = RRD.Link;
const Outlet = RRD.Outlet;

function NavLink(to, label) {
  return React.createElement(Link, { to, style: { marginRight: 8 } }, label);
}

function RootLayout({ children }) {
  return React.createElement(
    "div",
    { style: { maxWidth: 900, margin: "20px auto", fontFamily: "Inter, system-ui, Arial" } },
    React.createElement(
      "nav",
      { style: { marginBottom: 16 } },
      NavLink("/", "Home"),
      NavLink("/about", "About"),
      NavLink("/tracks", "Tracks"),
      NavLink("/subscribe", "Subscribe"),
    ),
    children || React.createElement(Outlet)
  );
}

function Home() { return React.createElement("h1", null, "Music Router — Home"); }

function About() {
  return React.createElement("div", null,
    React.createElement("h1", null, "About"),
    React.createElement("p", null, "Демо по маршрутизации, fallback без Data API.")
  );
}

// ---------- Tracks (поиск через search params) ----------
function Tracks() {
  const [sp, setSp] = RRD.useSearchParams();
  const q = sp.get("q") || "";
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    let on = true;
    getTracks(q).then(list => on && setItems(list));
    return () => (on = false);
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next = new URLSearchParams(sp);
    next.set("q", form.get("q") || "");
    setSp(next, { replace: true });
  }

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Tracks"),
    React.createElement(
      "form",
      { onSubmit, role: "search" },
      React.createElement("input", {
        name: "q",
        placeholder: "Search…",
        defaultValue: q,
        style: { padding: 8, width: 240, marginRight: 8 }
      }),
      React.createElement("button", { type: "submit" }, "Find")
    ),
    !items
      ? React.createElement("p", null, "Loading…")
      : items.length
        ? React.createElement(
            "ul",
            null,
            items.map(t =>
              React.createElement("li", { key: t.id },
                React.createElement(Link, { to: `/tracks/${t.id}` }, `${t.title} — ${t.artist}`)
              )
            )
          )
        : React.createElement("p", null, `Ничего не найдено по “${q}”.`)
  );
}

// ---------- Детали трека ----------
function TrackDetail() {
  const { id } = RRD.useParams();
  const [t, setT] = React.useState(null);

  React.useEffect(() => {
    let on = true;
    getTrack(id).then(x => on && setT(x)).catch(() => on && setT({ notFound: true }));
    return () => (on = false);
  }, [id]);

  if (!t) return React.createElement("p", null, "Loading…");
  if (t.notFound) return React.createElement("h1", null, "Not Found");

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, t.title),
    React.createElement("p", null, `Artist: ${t.artist}`),
    React.createElement(Link, { to: "/tracks" }, "← Back to list")
  );
}

// ---------- Subscribe (имитация action) ----------
function Subscribe() {
  const [msg, setMsg] = React.useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const res = await createSubscription(new FormData(e.currentTarget));
    if (res.ok) setMsg(`Subscribed: ${res.email}`);
  }
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Subscribe"),
    React.createElement(
      "form",
      { onSubmit },
      React.createElement("input", { type: "email", name: "email", placeholder: "you@example.com", required: true, style: { padding: 8 } }),
      React.createElement("button", { type: "submit", style: { marginLeft: 8 } }, "Send")
    ),
    msg && React.createElement("p", { style: { color: "green" } }, msg)
  );
}

function NotFound() { return React.createElement("h1", null, "404 — Page Not Found"); }

// ============== Маршрутизация (fallback) ==============
const { BrowserRouter, Routes, Route } = RRD;

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode, null,
    React.createElement(BrowserRouter, null,
      React.createElement(RootLayout, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: "/", element: React.createElement(Home) }),
          React.createElement(Route, { path: "/about", element: React.createElement(About) }),
          React.createElement(Route, { path: "/tracks", element: React.createElement(Tracks) }),
          React.createElement(Route, { path: "/tracks/:id", element: React.createElement(TrackDetail) }),
          React.createElement(Route, { path: "/subscribe", element: React.createElement(Subscribe) }),
          React.createElement(Route, { path: "*", element: React.createElement(NotFound) })
        )
      )
    )
  )
);
