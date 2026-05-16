export class RichText implements IRichText {
	private _text: string = "";

	get text() { return this._text; }

	start(text: string = "") {
		this._text = text;
		return this;
	}

	end() {
		const result = this._text;
		this._text = "";
		Laya.Pool.recoverByClass(this);
		return result;
	}

	href(url: string, text?: string) {
		if (text != null) {
			this._text += `[url=${ url }]${ text }[/url]`;
		} else {
			this._text = `[url=${ url }]${ this._text }[/url]`;
		}
		return this;
	}

	img(url: string, width?: number, height?: number) {
		const size = (width && height) ? ` width="${ width }" height="${ height }"` : "";
		this._text += `<img src="${ url }"${ size }>`;
		return this;
	}

	bold(text?: string) {
		if (text != null) {
			this._text += `[b]${ text }[/b]`;
		} else {
			this._text = `[b]${ this._text }[/b]`;
		}
		return this;
	}

	italic(text?: string) {
		if (text != null) {
			this._text += `[i]${ text }[/i]`;
		} else {
			this._text = `[i]${ this._text }[/i]`;
		}
		return this;
	}

	underline(text?: string) {
		if (text != null) {
			this._text += `[u]${ text }[/u]`;
		} else {
			this._text = `[u]${ this._text }[/u]`;
		}
		return this;
	}

	space(num: number = 1) {
		if (num > 0) this._text += "&nbsp;".repeat(num);
		return this;
	}

	break(num: number = 1) {
		if (num > 0) this._text += "<br/>".repeat(num);
		return this;
	}

	size(size: number, text?: string) {
		if (text != null) {
			this._text += `[size=${ size }]${ text }[/size]`;
		} else {
			this._text = `[size=${ size }]${ this._text }[/size]`;
		}
		return this;
	}

	color(color: string, text?: string) {
		if (text != null) {
			this._text += `[color=${ color }]${ text }[/color]`;
		} else {
			this._text = `[color=${ color }]${ this._text }[/color]`;
		}
		return this;
	}

	append(text: string) {
		this._text += text;
		return this;
	}
}