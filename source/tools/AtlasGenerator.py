import sys
import json
import os
import shutil
import time
import hashlib
import random

from tqdm import tqdm
from PIL import ImageDraw
from PIL import Image as ImageModule
from PIL.Image import Image
from PIL.Image import open as openImage

class Rect:
    _pool: list = []

    def create(x: int = 0, y: int = 0, w: int = 0, h: int = 0):
        if len(Rect._pool) > 0:
            return Rect._pool.pop().setXY(x, y).setSize(w, h)
        else:
            return Rect(x, y, w, h)

    def recover(rect):
        rect.reset()
        Rect._pool.append(rect)

    def __init__(self, x: int = 0, y: int = 0, w: int = 0, h: int = 0) -> None:
        self._x: int = x
        self._y: int = y
        self._w: int = w
        self._h: int = h

    def get_x(self): return self._x
    def set_x(self, value: int): self._x = max(value, 0)

    def get_y(self): return self._y
    def set_y(self, value: int): self._y = max(value, 0)

    def get_w(self): return self._w
    def set_w(self, value: int): self._w = max(value, 0)

    def get_h(self): return self._h
    def set_h(self, value: int): self._h = max(value, 0)

    def xMax(self): return self.get_x() + self.get_w()
    def yMax(self): return self.get_y() + self.get_h()

    def setXY(self, x: int = 0, y: int = 0):
        self.set_x(x)
        self.set_y(y)
        return self

    def setSize(self, w: int = 0, h: int = 0):
        self.set_w(w)
        self.set_h(h)
        return self

    def overlaps(self, other):
        return not (self.get_x() >= other.xMax() or self.xMax() <= other.get_x() or self.get_y() >= other.yMax() or self.yMax() <= other.get_y())

    def getOverlap(self, other, out):
        if out:
            out.reset()
        else:
            out = Rect.create()
        if self.overlaps(other):
            ltX = max(self.get_x(), other.get_x())
            ltY = max(self.get_y(), other.get_y())
            rbX = min(self.xMax(), other.xMax())
            rbY = min(self.yMax(), other.yMax())
            out.setXY(ltX, ltY).setSize(rbX - ltX, rbY - ltY)
        return out

    def contain(self, other):
        return self.get_x() <= other.get_x() and self.xMax() >= other.xMax() and self.get_y() <= other.get_y() and self.yMax() >= other.yMax()

    def reset(self):
        self.set_x(0)
        self.set_y(0)
        self.set_w(0)
        self.set_h(0)

TmpRect0 = Rect()
TmpRect1 = Rect()
TmpRect2 = Rect()

class FileInfo:
    _pool: list = []

    def create(filePath: str):
        if len(FileInfo._pool) > 0:
            return FileInfo._pool.pop().init(filePath)
        else:
            return FileInfo().init(filePath)

    def recover(info):
        FileInfo._pool.append(info.reset())
    
    def init(self, filePath:str):
        # 带后缀的名字
        self.extName = os.path.basename(filePath)
        # 不带后缀的名字
        self.name = filePath.split(".")[0]
        self.filePath = filePath
        self.fileBuffer = open(filePath, "rb")
        self.md5 = hashlib.md5(self.fileBuffer.read()).hexdigest()
        return self
    
    def reset(self):
        self.extName = ""
        self.name = ""
        self.filePath = ""
        if self.fileBuffer:
            self.fileBuffer.close()
        self.fileBuffer = None
        self.md5 = ""
        return self

class TextureInfo(FileInfo):
    _pool: list = []

    def create(texPath: str, cutEmpty:bool = False):
        if len(TextureInfo._pool) > 0:
            return TextureInfo._pool.pop().init(texPath, cutEmpty)
        else:
            return TextureInfo().init(texPath, cutEmpty)

    def recover(info):
        TextureInfo._pool.append(info.reset())

    def get_w(self): return self.texture.width
    def get_h(self): return self.texture.height

    def xMax(self): return self.x + self.get_w()
    def yMax(self): return self.y + self.get_h()

    def init(self, texPath: str, cutEmpty:bool = False):
        super().init(texPath)
        self.x = 0
        self.y = 0
        self.idx = 0
        self.texture:Image = None
        self.sourceW = 0
        self.sourceH = 0
        self.spriteSourceX = 0
        self.spriteSourceY = 0
        self.cutEmpty = cutEmpty
        self.borderW = 0
        self.borderH = 0
        return self

    def setXY(self, x: int = 0, y: int = 0):
        self.x = x
        self.y = y
        return self

    def createTex(self):
        if self.texture: return
        self.texture = openImage(self.fileBuffer)
        self.fileBuffer = None

        self.sourceW = self.texture.width
        self.sourceH = self.texture.height
        
        if self.cutEmpty and self.texture.mode == "RGBA":
            bbox = self.texture.getbbox()
            if bbox:
                if bbox[0] > 0 or bbox[1] or bbox[2] < self.texture.width or bbox[3] < self.texture.height:
                    cropTex = self.texture.crop(bbox)
                    self.texture.close()
                    self.texture = cropTex
                    self.spriteSourceX = bbox[0]
                    self.spriteSourceY = bbox[1]

    def createBorder(self, borderW:int, borderH:int):
        borderW = borderW if borderW and borderW > 0 else 0
        borderH = borderH if borderH and borderH > 0 else 0
        self.borderW = borderW
        self.borderH = borderH
        if borderW or borderH:
            oldW, oldH = self.get_w(), self.get_h()
            newW = oldW + borderW * 2
            newH = oldH + borderH * 2
            tempTex = ImageModule.new("RGBA", (newW, newH))
            #左右
            for i in range(borderW):
                tempTex.paste(self.texture, (i, borderH))
                tempTex.paste(self.texture, (borderW + borderW - i, borderH))
            #上下
            for i in range(borderH):
                tempTex.paste(self.texture, (borderW, i))
                tempTex.paste(self.texture, (borderW, borderH + borderH - i))
            tempTex.paste(self.texture, (borderW, borderH))
            
            #处理四个顶点颜色
            for i in range(borderW):
                for j in range(borderH):
                    #左上
                    x, y = borderW - 1 - i, borderH - 1 - j
                    color1 = tempTex.getpixel((x, y + 1))
                    color2 = tempTex.getpixel((x + 1, y + 1))
                    color3 = tempTex.getpixel((x + 1, y))
                    tempTex.putpixel((x, y), (int((color1[0] + color2[0] + color3[0]) / 3), int((color1[1] + color2[1] + color3[1]) / 3), int((color1[2] + color2[2] + color3[2]) / 3), int((color1[3] + color2[3] + color3[3]) / 3)))
                    #右上
                    x, y = oldW + borderW + i, borderH - 1 - j
                    color1 = tempTex.getpixel((x - 1, y))
                    color2 = tempTex.getpixel((x - 1, y + 1))
                    color3 = tempTex.getpixel((x, y + 1))
                    tempTex.putpixel((x, y), (int((color1[0] + color2[0] + color3[0]) / 3), int((color1[1] + color2[1] + color3[1]) / 3), int((color1[2] + color2[2] + color3[2]) / 3), int((color1[3] + color2[3] + color3[3]) / 3)))
                    #左下
                    x, y = borderW - 1 - i, oldH + borderH + j
                    color1 = tempTex.getpixel((x + 1, y))
                    color2 = tempTex.getpixel((x + 1, y - 1))
                    color3 = tempTex.getpixel((x, y - 1))
                    tempTex.putpixel((x, y), (int((color1[0] + color2[0] + color3[0]) / 3), int((color1[1] + color2[1] + color3[1]) / 3), int((color1[2] + color2[2] + color3[2]) / 3), int((color1[3] + color2[3] + color3[3]) / 3)))
                    #右下
                    x, y = oldW + borderW + i, oldH + borderH + j
                    color1 = tempTex.getpixel((x, y - 1))
                    color2 = tempTex.getpixel((x - 1, y - 1))
                    color3 = tempTex.getpixel((x - 1, y))
                    tempTex.putpixel((x, y), (int((color1[0] + color2[0] + color3[0]) / 3), int((color1[1] + color2[1] + color3[1]) / 3), int((color1[2] + color2[2] + color3[2]) / 3), int((color1[3] + color2[3] + color3[3]) / 3)))
            self.texture.close()
            self.texture = tempTex

    def reset(self):
        super().reset()
        self.x = 0
        self.y = 0
        self.idx = 0
        if self.texture:
            self.texture.close()
        self.texture = None
        self.sourceW = 0
        self.sourceH = 0
        self.spriteSourceX = 0
        self.spriteSourceY = 0
        self.cutEmpty = False
        return self

class AtlasGrid:
    _pool: list = []

    def create(maxSize: int, maxSingleSize: int = 256, padding: int = 2, power2: bool = False, squared: bool = False):
        if len(AtlasGrid._pool) > 0:
            return AtlasGrid._pool.pop().init(maxSize, maxSingleSize, padding, power2, squared)
        else:
            return AtlasGrid().init(maxSize, maxSingleSize, padding, power2, squared)

    def recover(grid):
        grid.reset()
        AtlasGrid._pool.append(grid)

    def __init__(self) -> None:
        self.maxSize = 1024
        self.maxSingleSize = 256
        self.padding = 2
        self.power2 = False
        self.squared = False
        self.useArea = 0
        self.curArea: Rect = Rect.create()
        self.freeAreas: list[Rect] = list()
        self.splitAreas: list[Rect] = list()
        self.textures: list[TextureInfo] = list()

    def init(self, maxSize: int, maxSingleSize: int = 256, padding: int = 2, power2: bool = False, squared: bool = False):
        self.maxSize = maxSize
        self.maxSingleSize = maxSingleSize
        self.padding = padding
        self.power2 = power2
        self.squared = squared
        self.useArea = 0
        self.freeAreas.append(Rect.create(0, 0, self.maxSize, self.maxSize))
        return self

    def insert(self, tex: TextureInfo):
        padding, curArea, freeAreas, splitAreas = self.padding, self.curArea, self.freeAreas, self.splitAreas
        index = self._getFreeAreaIndex(tex.get_w(), tex.get_h())
        targetArea = None
        if index != -1:
            targetArea = freeAreas[index]
        if targetArea:
            texWithPadding = TmpRect0.setXY(targetArea.get_x(), targetArea.get_y()).setSize(
                tex.get_w() + padding, tex.get_h() + padding)
            count = 0
            for i in range(len(freeAreas) - 1, -1, -1):
                v = freeAreas[i]
                if v.overlaps(texWithPadding):
                    count = 0
                    if texWithPadding.get_x() - v.get_x() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(v.get_x(), v.get_y(), texWithPadding.get_x() - v.get_x(), v.get_h()))
                    if v.xMax() - texWithPadding.xMax() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(texWithPadding.xMax(), v.get_y(), v.xMax() - texWithPadding.xMax(), v.get_h()))
                    if texWithPadding.get_y() - v.get_y() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(v.get_x(), v.get_y(), v.get_w(), texWithPadding.get_y() - v.get_y()))
                    if v.yMax() - texWithPadding.yMax() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(v.get_x(), texWithPadding.yMax(), v.get_w(), v.yMax() - texWithPadding.yMax()))
                    if count == 0 and (texWithPadding.get_w() < v.get_w() or texWithPadding.get_h() < v.get_h()):
                        splitAreas.append(v)
                    else:
                        Rect.recover(v)
                    topOfStack = freeAreas.pop()
                    if i < len(freeAreas):
                        freeAreas[i] = topOfStack
            self._filterSelfSubAreas(splitAreas)
            for v in splitAreas:
                freeAreas.append(v)
            splitAreas.clear()
            tex.setXY(texWithPadding.get_x(), texWithPadding.get_y())
            self.textures.append(tex)

            useW = tex.get_w() + min(self.maxSize - tex.xMax(), padding)
            useH = tex.get_h() + min(self.maxSize - tex.yMax(), padding)
            self.useArea = self.useArea + useW * useH

            curArea.setSize(max(texWithPadding.get_x() + tex.get_w(), curArea.get_w()),
                            max(texWithPadding.get_y() + tex.get_h(), curArea.get_h()))
            return True
        return False

    def useRatio(self):
        totalArea = self.maxSize * self.maxSize
        return self.useArea / totalArea * 100

    def reset(self):
        self.maxSize = 1024
        self.maxSingleSize = 256
        self.padding = 2
        self.power2 = False
        self.squared = False
        self.useArea = 0
        self.curArea.reset()
        for v in self.freeAreas:
            Rect.recover(v)
        self.freeAreas.clear()
        self.textures.clear()

    def _getFreeAreaIndex(self, width: int, height: int):
        padding, maxSize, curArea, freeAreas = self.padding, self.maxSize, self.curArea, self.freeAreas
        curW, curH = curArea.get_w(), curArea.get_h()
        index, minArea, squareRate = -1, 1e8, 0
        paddedW, paddedH = width + padding, height + padding
        def setData(a, b, c):
            nonlocal index, minArea, squareRate
            index = a
            minArea = b
            squareRate = c
        for i in range(len(freeAreas) - 1, -1, -1):
            free = freeAreas[i]
            widthEnough = paddedW <= free.get_w() if free.xMax() < maxSize else width <= free.get_w()
            heigthEnough = paddedH <= free.get_h() if free.yMax() < maxSize else height <= free.get_h()
            if widthEnough and heigthEnough:
                newCurW = max(free.get_x() + width, curW)
                newCurH = max(free.get_y() + height, curH)

                newMinArea = newCurW * newCurH
                newSquareRate = min(newCurW, newCurH) / max(newCurW, newCurH)

                if newMinArea < minArea:
                    setData(i, newMinArea, newSquareRate)
                    continue
                if newMinArea != minArea:continue

                if newSquareRate > squareRate:
                    setData(i, newMinArea, newSquareRate)
                    continue
                if newSquareRate != squareRate:continue

                if free.get_x() < freeAreas[index].get_x():
                    setData(i, newMinArea, newSquareRate)
                    continue
                if free.get_x() != freeAreas[index].get_x():continue

                if free.get_y() < freeAreas[index].get_y():
                    setData(i, newMinArea, newSquareRate)
        return index

    def _filterSelfSubAreas(self, areas: list[Rect]):
        for i in range(len(areas) - 1, -1, -1):
            filtered = areas[i]
            for j in range(len(areas) - 1, -1, -1):
                if i != j:
                    area = areas[j]
                    if area.contain(filtered):
                        Rect.recover(filtered)
                        topOfStack = areas.pop()
                        if i < len(areas):
                            areas[i] = topOfStack
                        break

class AtlasConfig:
    def __init__(self) -> None:
        self.name = ""
        self.inputDir = ""
        self.outputDir = ""
        self.maxSize = 1024
        self.maxSingleSize = 256
        self.padding = 2
        self.power2 = False
        self.multi4 = False
        self.squared = False
        self.cutTexEmpty = False
        self.cutAtlasEmpty = False
        self.repeatBorder = 1

class AtlasGenerator:
    _inst = None

    def Inst():
        if (not AtlasGenerator._inst):
            AtlasGenerator._inst = AtlasGenerator()
        return AtlasGenerator._inst

    def __init__(self) -> None:
        self.atlasGrids: list[AtlasGrid] = list()

    def _getNearestMulti4(self, value:int):
        num = 4
        while value > num:
            num = num + 4
        return num

    def packAtlas(self, texInfos:list[TextureInfo], config: AtlasConfig):
        canPack = True
        atlasGrids = self.atlasGrids

        for ti in tqdm(range(len(texInfos)), unit="img", desc="calculating atlas position", colour="#22FF22"):
            texInfo = texInfos[ti]
            success = False
            for i in range(len(atlasGrids)):
                success = atlasGrids[i].insert(texInfo)
                if success:
                    texInfo.idx = i
                    break
            if not success:
                grid = AtlasGrid()
                grid.init(config.maxSize, config.maxSingleSize, config.padding, config.power2, config.squared)
                success = grid.insert(texInfo)
                if success:
                    texInfo.idx = len(atlasGrids)
                else:
                    print(colorStr("insert tex to atlas failed:" + texInfo.filePath, 196))
                    canPack = False
                    break
                atlasGrids.append(grid)

        if canPack:
            createDir(config.outputDir)
            atlasCfg = {}
            # totalUseRatio = 0
            for i in tqdm(range(len(atlasGrids)), unit="img", desc="creating atlas", colour="#00CC33"):
                atlasSize = (config.maxSize, config.maxSize)
                if config.cutAtlasEmpty:
                    atlasSize = (atlasGrids[i].curArea.get_w(), atlasGrids[i].curArea.get_h())
                if config.multi4:
                    atlasSize = (self._getNearestMulti4(atlasSize[0]), self._getNearestMulti4(atlasSize[1]))
                image = ImageModule.new("RGBA", atlasSize)
                # totalUseRatio = totalUseRatio + atlasGrids[i].useRatio()
                for texInfo in atlasGrids[i].textures:
                    borderW, borderH = texInfo.borderW, texInfo.borderH
                    atlasCfg[texInfo.extName] = {
                        "x": texInfo.x + borderW,
                        "y": texInfo.y + borderH,
                        "w": texInfo.get_w() - borderW * 2,
                        "h": texInfo.get_h() - borderH * 2,
                        "idx": i
                    }
                    # drawImageBorder(texInfo.texture)
                    image.paste(texInfo.texture, (texInfo.x, texInfo.y))
                # drawAreasBorder(image, atlasGrids[i].freeAreas)
                image.save(os.path.join(config.outputDir, config.name + str(i) + ".png"))
                image.close()

            # print(colorStr("total use rate of atlas：", 226) + colorStr(str(int(totalUseRatio / len(atlasGrids) * 100) / 100) + "%", 46))

            with open(os.path.join(config.outputDir, config.name + "config.json"), "w+") as file:
                file.write(json.dumps(atlasCfg))

        for v in atlasGrids:
            AtlasGrid.recover(v)
        atlasGrids.clear()
        return canPack

def createDir(dir:str):
    if (os.path.exists(dir) == False):
        os.makedirs(dir)

def rectifyPath(path:str):
    return path.replace("\\", "/")

def drawImageBorder(image: Image):
    """为图片添加边框"""
    w, h = image.width, image.height
    draw = ImageDraw.Draw(image, image.mode)
    color = (46 if image.mode == "P" else (255, 0, 0, 255))
    draw.polygon((0, 0, w-1, 0), fill=color)
    draw.polygon((0, 0, 0, h-1), fill=color)
    draw.polygon((w-1, 0, w-1, h-1), fill=color)
    draw.polygon((0, h-1, w-1, h-1), fill=color)

def drawAreasBorder(image:Image, areas:list[Rect]):
    draw = ImageDraw.Draw(image, image.mode)
    color = (46 if image.mode == "P" else (0,255,0,255))
    for free in areas:
        x = free.get_x()
        y = free.get_y()
        if x >= image.width or y >= image.height:
            continue
        xMax = min(image.width, free.xMax())
        yMax = min(image.height, free.yMax())
        if xMax - 1 > 0 and yMax - 1 > 0:
            draw.rectangle((x, y, xMax - 1, yMax - 1), None, color)

def colorStr(text:str, color:int = 255):
    color = min(max(color, 0), 255)
    return "\033[38;5;" + str(color) + "m" + text + "\033[0m"


config = AtlasConfig()
config.maxSize = 2048
config.maxSingleSize = 2048
config.padding = 2
config.power2 = False
config.multi4 = True
config.squared = False
config.cutTexEmpty = False
config.cutAtlasEmpty = True
config.repeatBorder = 1

# 要打包得贴图后缀名
packTexSuffixs = ["png", "jpg"]

def pack_dir_atlas() -> bool:
    packTexInfos:list[TextureInfo] = list()

    for item in os.listdir(config.inputDir):
        item_path = rectifyPath(os.path.join(config.inputDir, item))
        if not os.path.isfile(item_path): continue
        if not (item_path.split(".")[-1] in packTexSuffixs): continue
        v:TextureInfo = TextureInfo.create(item_path, config.cutTexEmpty)
        v.createTex()
        if v.get_w() > config.maxSize or v.get_h() > config.maxSize:
            print(colorStr("tex size exceeds max size of the atlas: " + v.filePath + " " + str(v.get_w()) + " " + str(v.get_h()), 196))
            return False
        if v.get_w() > config.maxSingleSize or v.get_h() > config.maxSingleSize:
            print(colorStr("tex size exceeds max size of the single tex:" + v.filePath + " " + str(v.get_w()) + " " + str(v.get_h()), 196))
            return False
        
        borderW, borderH = config.repeatBorder, config.repeatBorder
        if v.get_w() + borderW * 2 > config.maxSize:
            borderW = max(int((config.maxSize - v.get_w()) / 2), 0)
        if v.get_h() + borderH * 2 > config.maxSize:
            borderH = max(int((config.maxSize - v.get_h()) / 2), 0)
        v.createBorder(borderW, borderH)
        packTexInfos.append(v)
    
    packTexInfos.sort(key=lambda x: x.get_w(), reverse=True)

    packSuccess = AtlasGenerator.Inst().packAtlas(packTexInfos, config)

    for v in packTexInfos: TextureInfo.recover(v)
    packTexInfos.clear()

    return packSuccess

try:
    timestart = time.time()
    argv  = sys.argv
    argv.pop(0)
    config.name = argv[0]
    config.inputDir = rectifyPath(argv[1])
    config.outputDir = rectifyPath(argv[2])
    config.maxSingleSize = int(argv[3])
    print("\nstart pack atlas: " + config.inputDir)
    packSuccess = pack_dir_atlas()
    print("\npack atlas completed, use time: " + str(int((time.time() - timestart) * 1e4) / 1e4) + "s")
    print("---Pack Success---" if packSuccess else "---Pack Failed---")
except Exception as err:
    print(colorStr("exception founded", 196))
    print(err)
    print("---Pack Failed---")
