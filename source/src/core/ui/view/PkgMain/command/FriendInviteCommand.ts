import { Command } from "../../../../mvc/controller/Command";

export class FriendInviteCommand extends Command {
	override execute(notifyName: string, data: [DO.IInviteInfo, IPlayerBaseView]): void {
		const mediator = Laya.Pool.getItemByCreateFun(EUIPoolKey.FriendInvite, () => $facade.createMediator(EViewID.ComFriendInviteView));
		mediator.data = { info: data[0], sender: data[1] };
		$uiMgr.addToLayer(mediator.view, ELayer.Toast);
	}
}
