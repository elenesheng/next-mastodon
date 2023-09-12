import useFeed from "@/lib/hooks/useFeed";
import { TimelineProps } from "@/lib/types/TimelineProps";
import Status from "./status";

export default function Timeline({ type }: TimelineProps) {
  const { feed, loading } = useFeed(type);

  return (
    <div>
      {!loading && (
        <div role="feed">
          {feed.statuses.map((status, index) => (
            <Status
              key={index}
              name={status.name}
              avatar={status.avatar}
              authorUrl={status.authorUrl}
              createdAt={status.createdAt}
              text={status.text}
            />
          ))}
        </div>
      )}
    </div>
  );
}
