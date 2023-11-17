import FeedPort, {
  feedTypes,
  getFeedOutput,
  getFeedParams,
} from "@/lib/data/core/ports/FeedPort";
import { injectable } from "inversify";
import { MastojsClientFactory, fetchFeedPage } from "../../shared/mastojs";
import { mastodon } from "masto";

@injectable()
export default class FeedsPortMastojsAdapter implements FeedPort {
  async getFeed(input: getFeedParams): Promise<getFeedOutput> {
    const client = await MastojsClientFactory.getClient();

    const config = {
      local: input.type === feedTypes.local,
      limit: input.limit,
      maxId: input.startFrom
        ? (parseInt(input.startFrom) - 1).toString()
        : undefined,
    };

    const repo = this.getRepository(client, input.type);

    const paginator = repo.list(config);
    const feed = await fetchFeedPage(paginator);

    const fetchNextPage = async (): Promise<getFeedOutput> => {
      const nextPageFeed = await fetchFeedPage(paginator);
      return {
        feed: nextPageFeed,
        next: fetchNextPage,
      };
    };

    return {
      feed: feed,
      next: fetchNextPage,
    };
  }

  private getRepository(client: mastodon.rest.Client, type: feedTypes) {
    switch (type) {
      case feedTypes.home:
        return client.v1.timelines.home;
      case feedTypes.public:
      case feedTypes.local:
        return client.v1.timelines.public;
      default:
        throw new Error(`Unsupported feed type: ${type}`);
    }
  }
}
