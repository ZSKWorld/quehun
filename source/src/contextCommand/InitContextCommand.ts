import { CommandQueue } from "../core/mvc/controller/CommandQueue";
import { GamePreloadCommand } from "./GamePreloadCommand";
import { InitGlobalCommand } from "./InitGlobalCommand";
import { InitSceneCommand } from "./InitSceneCommand";
import { InitViewCommand } from "./InitViewCommand";

export class InitContextCommand extends CommandQueue {
    protected override initialize() {
        this.addSubCommand(InitGlobalCommand);
        this.addSubCommand(InitViewCommand);
        this.addSubCommand(InitSceneCommand);
        this.addSubCommand(GamePreloadCommand);
    }
}