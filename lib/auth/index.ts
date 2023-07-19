import { InMemoryStorageAdapter } from "./adapters/InMemoryStorageAdapter";
import { VercelKVAdapter } from "./adapters/VercelKVAdapter";
import { StoragePortInterface } from "./ports/StoragePortInterface";

export default class OAuthCredentialsStorageService {
  private static storageInstance: StoragePortInterface;

  public static createStorage(): StoragePortInterface {
    const env = process.env.NODE_ENV || "development";

    if (this.storageInstance) {
      return this.storageInstance;
    }

    switch (env) {
      case "test":
        this.storageInstance = new InMemoryStorageAdapter();
        break;
      case "production":
        this.storageInstance = new VercelKVAdapter();
        break;
      case "development":
        this.storageInstance = new VercelKVAdapter();
        break;
      default:
        this.storageInstance = new InMemoryStorageAdapter();
    }

    return this.storageInstance;
  }
}
