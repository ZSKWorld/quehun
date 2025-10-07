import * as fs from "fs";
import * as path from "path";


const sourceDir = "E:/study/IT/Projects/Laya/3.0/quehun/source/bin/langRes/chs/extendRes/charactor";



function getAllFile(dirPath: string, filter?: (name: string) => boolean, map?: (name: string) => string) {
    if (fs.existsSync(dirPath) == false) return [];
    const names: string[] = [];
    fs.readdirSync(dirPath).forEach(filename => {
        const filePath = path.resolve(dirPath, filename);
        const state = fs.statSync(filePath);
        if (state.isDirectory()) {
            names.push(...getAllFile(filePath, filter, map));
        } else if (state.isFile()) {
            if (!filter || filter(filename)) {
                const temp = map ? map(path.resolve(dirPath, filename)) : path.resolve(dirPath, filename);
                names.push(temp);
            }
        }
    });
    return names;
}