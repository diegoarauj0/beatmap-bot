import { IOsuClientService } from "@app/shared/contracts/services/osuClient.service"
import OsuClientService from "@app/shared/services/osuClient.service"
import { container } from "tsyringe"

container.register<IOsuClientService>("IOsuClientService", { useClass: OsuClientService })