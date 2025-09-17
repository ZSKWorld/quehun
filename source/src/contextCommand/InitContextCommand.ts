import { NotifyConst } from "../core/common/NotifyConst";
import { CommandQueue } from "../core/mvc/controller/CommandQueue";
import { GamePreloadCommand } from "./GamePreloadCommand";
import { InitGameCommand } from "./InitGameCommand";
import { InitModelCommand } from "./InitModelCommand";
import { InitViewCommand } from "./InitViewCommand";

export class InitContextCommand extends CommandQueue {
    protected override initialize() {
        facade.removeCommand(NotifyConst.InitContext);
        this.addSubCommand(InitModelCommand);
        this.addSubCommand(InitViewCommand);
        this.addSubCommand(InitGameCommand);
        this.addSubCommand(GamePreloadCommand);
    }
}