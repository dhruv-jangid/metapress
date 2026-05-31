import { createAuth } from "@metapress/auth/server";

import { usernameBFCK } from "@/modules/cache/keys";
import { CacheService } from "@/modules/cache/service";
import { MailService } from "@/modules/mail/service";

export const auth = createAuth({
  onSendMail: (data) => MailService.send(data),
  onCacheGet: (key) => CacheService.get(key),
  onCacheSet: (key, value, ttl) => CacheService.set(key, value, ttl),
  onCacheDel: (key) => CacheService.del(key),
  onCacheBFAdd: (value) => CacheService.sAdd(usernameBFCK, value),
});

export type UserSession = (typeof auth.$Infer.Session)["user"];
