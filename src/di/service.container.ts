import { IOsuClientService } from "@app/shared/contracts/services/osuClient.service"
import { IOsuCacheService } from "@app/shared/contracts/services/osuCache.service"
import { IOsuTokenService } from "@app/shared/contracts/services/osuToken.service"
import { OsuCacheService } from "@app/shared/services/osuCache.service"
import { OsuTokenService } from "@app/shared/services/osuToken.service"
import OsuClientService from "@app/shared/services/osuClient.service"
import { container } from "tsyringe"

container.register<IOsuClientService>("IOsuClientService", { useClass: OsuClientService })
container.register<IOsuCacheService>("IOsuCacheService", { useClass: OsuCacheService })
container.register<IOsuTokenService>("IOsuTokenService", { useClass: OsuTokenService })