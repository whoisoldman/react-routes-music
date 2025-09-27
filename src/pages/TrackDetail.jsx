import { useLoaderData } from "react-router-dom";
import { getTrack } from "../utils/api";

export async function loader({ params }) {
  return await getTrack(params.id);
}

export default function TrackDetail() {
  const track = useLoaderData();
  return (
    <div>
      <h1>{track.title}</h1>
      <p>Artist: {track.artist}</p>
    </div>
  );
}
