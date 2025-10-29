const fs = require("fs");
const path = require("path");


const sourceDir = "E:/study/IT/Projects/Laya/3.0/quehun/source/bin/langRes/chs/extendRes/charactor";

function getAllFile(dirPath, absolute, filter, map) {
	if (fs.existsSync(dirPath) == false) return [];
	const names = [];
	fs.readdirSync(dirPath).forEach(filename => {
		const filePath = path.resolve(dirPath, filename);
		const state = fs.statSync(filePath);
		if (state.isDirectory()) {
			names.push(...getAllFile(filePath, absolute, filter, map));
		} else if (state.isFile()) {
			if (!filter || filter(filename)) {
				const temp = map ? map(filename) : filename;
				absolute ? names.push(path.resolve(dirPath, temp)) : names.push(temp);
			}
		}
	});
	return names;
}

const files = getAllFile(sourceDir, true, v => v.endsWith(".atlas.txt") || v.endsWith(".skel.txt"));
files.forEach(v => {
	fs.renameSync(v, v.replace(".atlas.txt", ".atlas").replace(".skel.txt", ".skel"));
});