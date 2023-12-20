import {
  UseCase,
  UseCaseInput,
  UseCaseOutput,
} from "@/lib/shared/use-cases/UseCaseInterface";
import { inject, injectable } from "inversify";
import { actionTypesEnum } from "../../entities/Actions";
import type ActionsPort from "../../ports/ActionsPort";

export interface ActionsUseCaseInput extends UseCaseInput {
  actionType: actionTypesEnum;
  objectId: string;
}

export interface ActionsUseCaseOutput extends UseCaseOutput {
  success: boolean;
  actionType: actionTypesEnum;
  acted: boolean;
  objectId: string;
}

@injectable()
export class ActionsUseCase implements UseCase {
  private actionsPort: ActionsPort;
  constructor(@inject("actions-port") actionsPort: ActionsPort) {
    this.actionsPort = actionsPort;
  }
  async execute(input: ActionsUseCaseInput): Promise<ActionsUseCaseOutput> {
    const result = await this.actionsPort.performAction(
      input.actionType,
      input.objectId,
    );

    return {
      success: result,
      acted: result,
      actionType: input.actionType,
      objectId: input.objectId,
    };
  }
}
