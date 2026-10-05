import { AutoCadQueryClient, AutoCadRealtimeClient } from '@app-alba/autocad-client';
import {
  AutoCadBuildingVerificationService,
  type BuildingVerificationInput,
  type BuildingVerificationResult,
} from '@app-alba/building-analysis';

export class BuildingVerificationService {
  public async calculate(input: BuildingVerificationInput): Promise<BuildingVerificationResult> {
    const transport = new AutoCadRealtimeClient();
    try {
      await transport.connect();
      return await AutoCadBuildingVerificationService.calculate(
        new AutoCadQueryClient(transport),
        input,
      );
    } finally {
      transport.close();
    }
  }
}
