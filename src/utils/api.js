// src/utils/api.js
const DB = [
  { id: "1", title: "Midnight City", artist: "M83" },
  { id: "2", title: "Numb", artist: "Linkin Park" },
  { id: "3", title: "Blinding Lights", artist: "The Weeknd" },
  { id: "4", title: "Bad Guy", artist: "Billie Eilish" }
];

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

export async function getTracks(q = "") {
  await delay();
  const query = (q || "").trim().toLowerCase();
  return query
    ? DB.filter(t => (t.title + " " + t.artist).toLowerCase().includes(query))
    : DB;
}

export async function getTrack(id) {
  await delay();
  const t = DB.find(t => t.id === id);
  if (!t) throw new Response("Not Found", { status: 404 });
  return t;
}

export async function createSubscription(formData) {
  await delay(500);
  return { ok: true, email: formData.get("email") };
}
