export interface MenuItem {
	id?: string;
  
	title: string;
	icon?: string;
  
	shortcut?: string;
  
	disabled?: boolean;
	hidden?: boolean;
  
	children?: MenuItem[];
  
	onClick?: () => void;
  
	// 动态控制
	visible?: () => boolean;
	enabled?: () => boolean;
  }
  export class MenuRegistry {
	private static menus: Map<string, MenuItem[]> = new Map();
  
	static register(context: string, items: MenuItem[]) {
	  this.menus.set(context, items);
	}
  
	static get(context: string): MenuItem[] {
	  return this.menus.get(context) || [];
	}
  
	static add(context: string, item: MenuItem) {
	  const list = this.get(context);
	  list.push(item);
	  this.menus.set(context, list);
	}
  }
  export class ContextMenuView {
	private root: HTMLElement;
	private panel: HTMLElement;
	private subMenus: HTMLElement[] = [];
  
	constructor(root: HTMLElement) {
	  this.root = root;
  
	  this.panel = document.createElement("div");
	  this.panel.className = "ctx-menu";
	  root.appendChild(this.panel);
  
	  this.bindGlobalClose();
	}
  
	show(x: number, y: number, items: MenuItem[]) {
	  this.panel.innerHTML = "";
  
	  this.renderList(this.panel, items, 0);
  
	  this.panel.style.display = "block";
	  this.panel.style.left = `${ x }px`;
	  this.panel.style.top = `${ y }px`;
	}
  
	hide() {
	  this.panel.style.display = "none";
	  this.clearSubMenus();
	}
	private renderList(parent: HTMLElement, items: MenuItem[], level: number) {
	  const list = document.createElement("div");
	  list.className = "ctx-list";
  
	  items.forEach(item => {
		if (item.hidden || item.visible?.() === false) return;
  
		const el = document.createElement("div");
		el.className = "ctx-item";
  
		el.innerHTML = `
		  <div class="icon">${ item.icon || "" }</div>
		  <div class="title">${ item.title }</div>
		  ${ item.children ? "<div class='arrow'>▶</div>" : "" }
		`;
  
		if (item.disabled || item.enabled?.() === false) {
		  el.classList.add("disabled");
		}
  
		// 点击
		el.onclick = (e) => {
		  e.stopPropagation();
  
		  if (item.disabled) return;
  
		  if (item.children?.length) {
			this.openSubMenu(el, item.children, level);
			return;
		  }
  
		  item.onClick?.();
		  this.hide();
		};
  
		list.appendChild(el);
	  });
  
	  parent.appendChild(list);
	}
	private openSubMenu(anchor: HTMLElement, items: MenuItem[], level: number) {
	  this.clearSubMenus(level);
  
	  const sub = document.createElement("div");
	  sub.className = "ctx-submenu";
  
	  document.body.appendChild(sub);
  
	  this.renderList(sub, items, level + 1);
  
	  const rect = anchor.getBoundingClientRect();
  
	  sub.style.left = `${ rect.right }px`;
	  sub.style.top = `${ rect.top }px`;
  
	  this.subMenus[level] = sub;
  
	  this.playSubAnim(sub);
	}
  
	private clearSubMenus(from = 0) {
	  this.subMenus.slice(from).forEach(m => m?.remove());
	  this.subMenus.length = from;
	}
	private playSubAnim(el: HTMLElement) {
	  el.style.opacity = "0";
	  el.style.transform = "translateX(6px)";
  
	  requestAnimationFrame(() => {
		el.style.transition = "all 120ms ease";
		el.style.opacity = "1";
		el.style.transform = "translateX(0)";
	  });
	}
	private bindGlobalClose() {
	  window.addEventListener("click", () => this.hide());
	  window.addEventListener("contextmenu", () => this.hide());
	  window.addEventListener("resize", () => this.hide());
	}
  }
  
  MenuRegistry.register("editor", [
	{
	  title: "新建文件",
	  icon: "📄",
	  onClick: () => console.log("new file")
	},
	{
	  title: "新建",
	  icon: "➕",
	  children: [
		{
		  title: "文件",
		  onClick: () => console.log("file")
		},
		{
		  title: "文件夹",
		  onClick: () => console.log("folder")
		}
	  ]
	},
	{
	  title: "删除",
	  icon: "🗑",
	  disabled: true
	}
  ]);
  
  const menu = new ContextMenuView(document.body);
  
  window.addEventListener("contextmenu", (e) => {
	e.preventDefault();
  
	menu.show(
	  e.clientX,
	  e.clientY,
	  MenuRegistry.get("editor")
	);
  });