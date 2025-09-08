"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var protobuf = require("protobufjs");
var replacePath = "proto_replace.json";
var protoPath = "temp/client.proto";
var protoCommonPath = "../../bin/proto/common";
var protoServicePath = "../../bin/proto/service";
var tempProtoPath = "temp";
var tsDeclarePath = "../../libs_game/proto.d.ts";
var SubTypeMark = "$";
var protoMap = {};
function setSubTypeMark(str, add) {
    str = str.replace("lq.", "");
    if (add) {
        if (str.startsWith(SubTypeMark))
            return str;
        return SubTypeMark + str;
    }
    return str.replace(new RegExp("[".concat(SubTypeMark, "]"), "g"), "");
}
var replaceTxt = fs.readFileSync(replacePath).toString();
var findIndex = -1;
while ((findIndex = replaceTxt.indexOf("//")) >= 0) {
    var index = replaceTxt.indexOf("\r\n", findIndex);
    replaceTxt = replaceTxt.replace(replaceTxt.substring(findIndex, index), "");
}
var replaces = JSON.parse(replaceTxt);
/** 获取字段转换后类型 */
function getFieldType(protoName, className, fieldName, typeName, isLua) {
    var _a, _b;
    //可能有嵌套
    var _classNames = className.split("_");
    var _className = _classNames[_classNames.length - 1];
    var fileds = (_b = (_a = replaces === null || replaces === void 0 ? void 0 : replaces[protoName]) === null || _a === void 0 ? void 0 : _a[_className]) === null || _b === void 0 ? void 0 : _b[fieldName];
    var omissible = fileds ? fileds.omissible : false;
    var type = fileds ? (isLua ? fileds.luaType : fileds.tsType) : "";
    if (!type)
        type = fileds ? fileds.type : "";
    if (!type) {
        switch (typeName) {
            case "double":
            case "float":
            case "int32":
            case "int64":
            case "uint32":
            case "uint64":
            case "sint32":
            case "sint32":
            case "fixed32":
            case "fixed64":
            case "sfixed32":
            case "sfixed64":
                type = "number";
                break;
            case "bool":
                type = "boolean";
                break;
            case "string":
                type = "string";
                break;
            case "bytes":
                type = isLua ? "number[]" : "Uint8Array";
                break;
            case "object":
                type = "any";
                break;
            default:
                type = "I" + setSubTypeMark(typeName, false);
                break;
        }
    }
    var omissibleStr = omissible ? "?" : "";
    var splitStr = isLua ? " " : ": ";
    return omissibleStr + splitStr + type;
}
;
//获取嵌套message类型
function getSubType(target) {
    var subTypes = [];
    var subNameMaps = [{}];
    var nameMap = subNameMaps[0];
    var nested = target.nested;
    if (nested) {
        Object.keys(nested).forEach(function (k) {
            var data = nested[k];
            data.name = target.name + "_" + k;
            data.name = setSubTypeMark(data.name, true);
            subTypes.push(data);
            nameMap[k] = data.name;
            var _a = getSubType(data), types = _a[0], map = _a[1];
            data.nested && subTypes.push.apply(subTypes, types);
            data.nested && subNameMaps.push(map);
        });
        // delete target.nested;
    }
    var subNameMap = {};
    subNameMaps.reverse().forEach(function (v) { return Object.assign(subNameMap, v); });
    return [subTypes, subNameMap];
}
function loadProto() {
    return new Promise(function (resolve) {
        var root = new protobuf.Root();
        var loadOption = { keepCase: true, alternateCommentMode: true, preferTrailingComment: true };
        root.load(protoPath, loadOption, function (err, root) {
            if (err) {
                console.log("加载失败：");
                console.log(err);
                return;
            }
            if (!root) {
                console.log("加载失败，无效的文件");
                return;
            }
            if (!root.nested)
                return;
            var namespaces = Object.values(root.nested);
            var replaceMark = function (type) {
                type = type.replace("lq.", "");
                return type.indexOf(".") >= 0 ? setSubTypeMark(type.replace(/\./g, "_"), true) : type;
            };
            namespaces.forEach(function (v) {
                if (!v.nested)
                    return;
                var nestedArray = v.nestedArray;
                var services = nestedArray.filter(function (v) { return v instanceof protobuf.Service; });
                var msgs = nestedArray.filter(function (v) { return v instanceof protobuf.Type; });
                var enums = nestedArray.filter(function (v) { return v instanceof protobuf.Enum; });
                services.forEach(function (v) {
                    v.methodsArray.forEach(function (fun) {
                        fun.requestType = replaceMark(fun.requestType);
                        fun.responseType = replaceMark(fun.responseType);
                    });
                    var filename = path.basename(v.filename || "unknown", ".proto");
                    protoMap[filename] = protoMap[filename] || { services: [], msgs: [] };
                    var data = v.toJSON({ keepComments: true });
                    data.name = v.name;
                    protoMap[filename].services.push(data);
                });
                msgs.forEach(function (msg) {
                    var _a;
                    msg.fieldsArray.forEach(function (field) { return (field.type = replaceMark(field.type)); });
                    var filename = path.basename(msg.filename || "unknown", ".proto");
                    protoMap[filename] = protoMap[filename] || { services: [], msgs: [] };
                    var data = msg.toJSON({ keepComments: true });
                    data.name = msg.name;
                    var _b = getSubType(data), subMsgs = _b[0], subNameMap = _b[1];
                    var tempMsgs = __spreadArray([data], subMsgs, true);
                    tempMsgs.forEach(function (v) {
                        Object.keys(v.fields).forEach(function (vk) {
                            var field = v.fields[vk];
                            if (subNameMap[field.type])
                                field.type = subNameMap[field.type];
                        });
                    });
                    (_a = protoMap[filename].msgs).push.apply(_a, tempMsgs);
                });
                enums.forEach(function (enumMsg) {
                    var _a;
                    var filename = path.basename(enumMsg.filename || "unknown", ".proto");
                    protoMap[filename] = protoMap[filename] || { services: [], msgs: [] };
                    var data = enumMsg.toJSON({ keepComments: true });
                    data.name = enumMsg.name;
                    var _b = getSubType(data), subMsgs = _b[0], subNameMap = _b[1];
                    var tempMsgs = __spreadArray([data], subMsgs, true);
                    (_a = protoMap[filename].msgs).push.apply(_a, tempMsgs);
                })
            });
            resolve(null);
        });
    });
}
/**创建ts自定义枚举 */
function buildTsCustomEnum() {
    var enumContent = "";
    var enumData = replaces.enums;
    enumData === null || enumData === void 0 ? void 0 : enumData.forEach(function (data) {
        if (!data.length)
            return;
        data = __spreadArray([], data, true);
        var nameArr = data.shift();
        if (nameArr.length == 1)
            enumContent += "\tconst enum ".concat(nameArr[0], " {\n");
        else
            enumContent += "\t/** ".concat(nameArr[1], " */\n\tconst enum ").concat(nameArr[0], " {\n");
        var enumIndex = 0;
        data.forEach(function (v1) {
            enumIndex = v1[1] || enumIndex;
            if (v1[2])
                enumContent += "\t/** ".concat(v1[2], " */\n\t").concat(v1[0], " = ").concat(enumIndex, ",\n");
            else
                enumContent += "\t".concat(v1[0], " = ").concat(enumIndex, ",\n");
            enumIndex++;
        });
        enumContent += "\t}\n\n";
    });
    return enumContent;
}
/** 创建ts声明文件 */
function buildTsDeclare() {
    var request = "";
    var notifies = "";
    var customEnum = buildTsCustomEnum();
    var omitproto = 'type ProtoObject<T> = Omit<T, "toJSON">;\n\n';
    var iproto = "interface IProto {\n\ttoJSON?(): ProtoObject<this>;\n}\n\n";
    var interfaces = omitproto + iproto + "interface IResponse extends IProto {\n\terror?: any;\n}\n\n";
    Object.keys(protoMap).sort().forEach(function (protoKey) {
        var proto = protoMap[protoKey];
        //rpc枚举
        proto.services.forEach(function (service) {
            Object.keys(service.methods).forEach(function (reqName) {
                var _a;
                var method = service.methods[reqName];
                var comment = "\t/**";
                (_a = method.comment) === null || _a === void 0 ? void 0 : _a.split("\n").forEach(function (com) { return comment += "\n\t *@description ".concat(com); });
                if (method.comment)
                    comment += "\n\t *@description req: {@link I".concat(method.requestType, "}, res: {@link I").concat(method.responseType, "}\n\t */\n");
                else
                    comment += " @description req: {@link I".concat(method.requestType, "}, res: {@link I").concat(method.responseType, "} */\n");
                request += "".concat(comment, "\t").concat(reqName, " = \"").concat(reqName, "\",\n");
            });
        });
        //messages
        proto.msgs.forEach(function (msg) {
            var _a;
            //ENotify枚举
            if (msg.name.startsWith("Notify")) {
                var notifyComment_1 = "\t/**";
                (_a = msg.comment) === null || _a === void 0 ? void 0 : _a.split("\n").forEach(function (com) { return notifyComment_1 += "\n\t *@description ".concat(com); });
                if (msg.comment) {
                    notifyComment_1 += "\n\t *@description res: {@link I".concat(msg.name, "}\n\t */\n");
                }
                else
                    notifyComment_1 += " @description res: {@link I".concat(msg.name, "} */\n");
                notifies += "".concat(notifyComment_1, "\t").concat(msg.name, " = \"").concat(msg.name, "\",\n");
            }
            //interface
            if (msg.comment) {
                var interfaceComment = "";
                var comments = msg.comment.split("\n");
                if (comments.length == 1)
                    interfaceComment = "/** ".concat(comments[0], " */\n");
                else {
                    interfaceComment = comments.reduce(function (pv, cv) { return pv += " *@description ".concat(cv, "\n"); }, "");
                    interfaceComment = "/**\n".concat(interfaceComment, " */\n");
                }
                interfaces += interfaceComment;
            }
            var fieldKeys = msg.fields ? Object.keys(msg.fields) : [];
            var valueKeys = msg.values ? Object.keys(msg.values) : [];
            var extend = msg.name.startsWith("Res") ? " extends IResponse" : " extends IProto";
            if (fieldKeys.length > 0) {
                interfaces += "interface I".concat(setSubTypeMark(msg.name, false) + extend, " {\n");
                fieldKeys.forEach(function (key) {
                    var field = msg.fields[key];
                    var fieldComment = "";
                    if (field.comment) {
                        var comments = field.comment.split("\n");
                        if (comments.length == 1)
                            fieldComment = "\t/** ".concat(comments[0], " */\n");
                        else {
                            fieldComment = comments.reduce(function (pv, cv) { return pv += "\t *@description ".concat(cv, "\n"); }, "");
                            fieldComment = "\t/**\n".concat(fieldComment, "\t */\n");
                        }
                    }
                    var rule = field.rule && field.rule == "repeated" ? "[]" : "";
                    interfaces += "".concat(fieldComment, "\t").concat(key).concat(getFieldType(protoKey, msg.name, key, field.type, false)).concat(rule, ";\n");
                });
                interfaces += "}\n";
            }
            else if (valueKeys.length > 0) {
                interfaces += "enum I".concat(setSubTypeMark(msg.name, false), " {\n");
                valueKeys.forEach(function (key) {
                    var value = msg.values[key];
                    interfaces += "".concat("\t").concat(key).concat(" = ").concat(value).concat(",\n");
                });
                interfaces += "}\n";
            }
            else {
                interfaces += "interface I".concat(msg.name + extend, " {\n\n}\n");
            }
            interfaces += "\n";
        });
    });
    request = "/** \u7F51\u7EDC\u8BF7\u6C42\u534F\u8BAE */\nconst enum ERequest {\n".concat(request, "}\n");
    notifies = "/** \u7F51\u7EDC\u901A\u77E5 */\nconst enum ENotify {\n".concat(notifies, "}\n");
    var content = "/**The file is automatically generated by ProtoDeclare.ts , please do not modify */\n\n"
        + notifies + "\n"
        + request + "\n"
        + customEnum
        + interfaces;
    fs.writeFileSync(tsDeclarePath, content);
}

function copyFile(source, target) {
    return fs.copyFileSync(source, target);
}

function copyToTemp() {
    if (!fs.existsSync("temp")) {
        fs.mkdir('./temp', err => {
            if (err) {
                // console.log(err + '创建temp失败');
                return;
            }
            // console.log('创建temp成功');
        });
    }
    const commons = fs.readdirSync(protoCommonPath);
    const services = fs.readdirSync(protoServicePath);
    const exports = ['client.proto', 'server.proto'];
    for (const filename of commons) {
        // console.log(`Copying proto/common/${filename} to temp/${filename}`);
        copyFile(`../../bin/proto/common/${filename}`, `temp/${filename}`);
    }
    for (const filename of services) {
        // console.log(`Copying proto/service/${filename} to temp/${filename}`);
        copyFile(`../../bin/proto/service/${filename}`, `temp/${filename}`);
    }
    for (const filename of exports) {
        // console.log(`Copying proto/${filename} to temp/${filename}`);
        copyFile(`../../bin/proto/${filename}`, `temp/${filename}`);
    }
}

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(function (file, index) {
            var curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

copyToTemp();
loadProto().then(function () {
    buildTsDeclare();
    deleteFolderRecursive("temp");
});
