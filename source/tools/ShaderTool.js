const fs = require("fs");
const path = require("path");

const sourceDir = "E:/study/IT/Projects/Laya/3.0/quehun/source/src/core/shader";
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

function getAllDirs(dirPath) {
    if (fs.existsSync(dirPath) == false) return [];
    const dirs = [];
    fs.readdirSync(dirPath).forEach(filename => {
        const filePath = path.resolve(dirPath, filename);
        const state = fs.statSync(filePath);
        if (state.isDirectory()) {
            dirs.push(filePath);
        }
    });
    return dirs;
}

const d2Dir = path.join(sourceDir, "2d");
const d3Dir = path.join(sourceDir, "3d");

function collectShaderDefine() {
    const d3Files = getAllFile(d3Dir, true, v => v.endsWith(".vs") || v.endsWith(".fs"));
    d3Files.sort();
    const d3Defines = d3Files.map(v => {
        const fileName = path.basename(v).replace(".vs", "_VS").replace(".fs", "_FS");
        return `export const ${fileName} = "${fs.readFileSync(v).toString().replace(/\r/g, "").replace(/\n/g, "\\n")}";`;
    });
    fs.writeFileSync(path.join(d3Dir, "Shader3DDefine.ts"), d3Defines.join("\n\n"));

    const d2Files = getAllFile(d2Dir, true, v => v.endsWith(".vs") || v.endsWith(".fs"));
    d2Files.sort();
    const d2Defines = d2Files.map(v => {
        const fileName = path.basename(v).replace(".vs", "_VS").replace(".fs", "_FS");
        return `export const ${fileName} = "${fs.readFileSync(v).toString().replace(/\r/g, "").replace(/\n/g, "\\n")}";`;
    });
    fs.writeFileSync(path.join(d2Dir, "Shader2DDefine.ts"), d2Defines.join("\n\n"));
}
collectShaderDefine();


const TypeMap = {
    "int": ["Laya.ShaderDataType.Int", "getInt", "setInt"],
    "bool": ["Laya.ShaderDataType.Bool", "getBool", "setBool"],
    "float": ["Laya.ShaderDataType.Float", "getFloat", "setFloat"],
    "vec2": ["Laya.ShaderDataType.Vector2", "getVector2", "setVector2"],
    "vec3": ["Laya.ShaderDataType.Vector3", "getVector3", "setVector3"],
    "vec4": ["Laya.ShaderDataType.Vector4", "getVector4", "setVector4"],
    "mat3": ["Laya.ShaderDataType.Matrix3x3", "getMatrix3x3", "setMatrix3x3"],
    "mat4": ["Laya.ShaderDataType.Matrix4x4", "getMatrix4x4", "setMatrix4x4"],
    "sampler2D": ["Laya.ShaderDataType.Texture2D", "getTexture", "setTexture"],
    "sampler3D": ["Laya.ShaderDataType.Texture3D", "getTexture", "setTexture"],
    "samplerCube": ["Laya.ShaderDataType.TextureCube", "getTexture", "setTexture"],
    "sampler2DArray": ["Laya.ShaderDataType.Texture2DArray", "getTexture", "setTexture"],
};
const TypeDefaultValue = {
    "Laya.ShaderDataType.Int": "0",
    "Laya.ShaderDataType.Bool": "false",
    "Laya.ShaderDataType.Float": "0",
    "Laya.ShaderDataType.Vector2": "new Laya.Vector2(0, 0)",
    "Laya.ShaderDataType.Vector3": "new Laya.Vector3(0, 0, 0)",
    "Laya.ShaderDataType.Vector4": "new Laya.Vector4(0, 0, 0, 0)",
    "Laya.ShaderDataType.Matrix3x3": "new Laya.Matrix3x3()",
    "Laya.ShaderDataType.Matrix4x4": "new Laya.Matrix4x4()",
};
const IgnoreUniform = {
    "u_Bones": 1,
    "u_Time": 1,
    "u_MvpMatrix": 1,
    "u_CurrentTime": 1,
}

function createGLSLMaterial3D(dir) {
    const fileName = path.basename(dir);
    const vsPath = path.join(dir, fileName + ".vs");
    if (fs.existsSync(vsPath) == false) return;
    const fsPath = path.join(dir, fileName + ".fs");
    if (fs.existsSync(fsPath) == false) return;
    const matPath = path.join(dir, fileName + "Material.ts");
    if (fs.existsSync(matPath)) return;
    const vsUniforms = fs.readFileSync(vsPath).toString().replace(/ {2,}/g, " ").match(/uniform [a-zA-Z0-9_]+ [a-zA-Z0-9_]+/g);
    const fsUniforms = fs.readFileSync(fsPath).toString().replace(/ {2,}/g, " ").match(/uniform [a-zA-Z0-9_]+ [a-zA-Z0-9_]+/g);
    // const matches = fs.readFileSync(fsPath).toString().replace(/ {2,}/g, " ").match(/uniform [a-zA-Z0-9_]+ [a-zA-Z0-9_]+(\[([a-zA-Z0-9_]+)\])*;/g);
    const uniforms = [...(vsUniforms || []), ...(fsUniforms || [])];
    const uniformsMap = {};
    uniforms.forEach(v => {
        const arr = v.split(" ");
        if (!IgnoreUniform[arr[2]] && !uniformsMap[arr[2]]) {
            uniformsMap[arr[2]] = arr[1];
        }
    });
    let content = `import { ${fileName}_FS as fs, ${fileName}_VS as vs } from "../Shader3DDefine";\n\n`;
    content += `const ShaderName = "${fileName}";\n\n`;
    for (const key in uniformsMap) {
        const e = uniformsMap[key];
        if (e == "sampler2D" || e == "sampler3D" || e == "samplerCube") {
            const defName = `DEF_${key.substring(2)}`;
            content += `const ${defName} = Laya.Shader3D.getDefineByName("${defName}");\n`;
        }
    }
    content += `\n`;
    content += `export class ${fileName}Material extends Laya.Material {\n`;
    content += `\tstatic init() {\n`;
    content += `\t\tconst uniformMap = {\n`;
    for (const key in uniformsMap) {
        const e = uniformsMap[key];
        content += `\t\t\t${key}: ${TypeMap[e]?.[0]},\n`;
    }
    content += `\t\t};\n`;
    content += `\t\tconst defaultValue = {\n`;
    for (const key in uniformsMap) {
        const e = uniformsMap[key];
        const defaultValue = TypeDefaultValue[TypeMap[e]?.[0]];
        if (defaultValue)
            content += `\t\t\t${key}: ${defaultValue},\n`;
    }
    content += `\t\t};\n`;
    content += `\t\tconst shader = Laya.Shader3D.add(ShaderName);\n`;
    content += `\t\tshader.shaderType = Laya.ShaderFeatureType.D3;\n`;
    content += `\t\tconst subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);\n`;
    content += `\t\tshader.addSubShader(subShader);\n`;
    content += `\t\tsubShader.addShaderPass(vs, fs);\n`;
    content += `\t}\n\n`;
    content += `\tconstructor() {\n`;
    content += `\t\tsuper();\n`;
    content += `\t\tthis.setShaderName(ShaderName);\n`;
    content += `\t}\n\n`;
    content += `\t//#region 字段\n`;
    for (const key in uniformsMap) {
        const e = uniformsMap[key];
        content += `\tget ${key}() { return this.${TypeMap[e]?.[1]}("${key}"); }\n`;
        if (e == "sampler2D" || e == "sampler3D" || e == "samplerCube") {
            const defName = `DEF_${key.substring(2)}`;
            content += `\tset ${key}(value) {\n`;
            content += `\t\tthis.setDefine(${defName}, !!value);\n`;
            content += `\t\tthis.${TypeMap[e]?.[2]}("${key}", value);\n`;
            content += `\t}\n`;
        } else {
            content += `\tset ${key}(value) { this.${TypeMap[e]?.[2]}("${key}", value); }\n`;
        }
    }
    content += `\t//#endregion\n`;
    content += `}`;
    fs.writeFileSync(matPath, content);

}
getAllDirs(d3Dir).forEach(v => createGLSLMaterial3D(v));
