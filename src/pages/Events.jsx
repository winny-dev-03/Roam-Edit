// src/pages/Events.jsx
import Masthead from '../components/MastHead';
import SectionHead from '../components/SectionHead';
import UpcomingEvents from '../components/UpcomingEvents';
import { StoryMosaic, MoreFromSammy } from '../components/Stories';
import { useStories } from '../context/StoriesContext';
import { inSection } from '../lib/selectors';

export default function Events() {
  const { stories } = useStories();
  const list = inSection(stories, 'events');

  return (
    <>
      <Masthead section="events" />

      <section className="bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-10">
          <SectionHead kicker="Upcoming" title="Coming up" />
          <UpcomingEvents filterable />
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-10">
          <SectionHead kicker="Event coverage & personal experiences" title="From the crowd" />
          <StoryMosaic stories={list} />
        </div>
      </section>

      <MoreFromSammy exclude={list} />
    </>
  );
}