// src/pages/NotFound.jsx
import { Link } from "react-router";
import { Label, TextLink } from "../components/Ui.jsx";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center pb-20 pt-36">
      <Label className="text-blue">Error 404 · 0.00° N · 0.00° E</Label>
      <h1 className="display mt-5 text-[clamp(4rem,15vw,14rem)]">Off the <em>map.</em></h1>
      <p className="mt-6 max-w-md text-lg text-navy/70">That page doesn't exist, or it has wandered off somewhere quieter.</p>
      <div className="mt-8 flex gap-8">
        <TextLink to="/">Back home</TextLink>
        <TextLink to="/destinations">Browse destinations</TextLink>
      </div>
      <Link to="/search" className="sr-only">Search</Link>
    </section>
  );
}