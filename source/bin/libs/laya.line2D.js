(function (exports, Laya) {
    'use strict';

    var LineFs = "#define SHADER_NAME 2DLineFS\n#include \"Sprite2DFrag.glsl\"\nvarying vec2 v_position;varying vec4 v_linePionts;varying float v_lineLength;varying vec2 v_linedir;varying vec3 v_dashed;varying float v_lineWidth;uniform vec4 u_TilingOffset;vec2 dotToline(in vec2 a,vec2 b,in vec2 p){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return ba*h+a;}void main(){vec2 p=dotToline(v_linePionts.xy,v_linePionts.zw,v_position);float d=v_lineWidth*0.5-length(p-v_position);vec2 left=v_linePionts.xy-v_linedir;vec2 p1=dotToline(left,v_linePionts.zw+v_linedir,v_position);float t=v_lineLength+length(left-p1)-v_dashed.z;d*=step(fract(t/v_dashed.x),v_dashed.y);vec2 uv=transformUV(v_texcoord.xy,u_TilingOffset);vec4 textureColor=texture2D(u_baseRender2DTexture,fract(uv));textureColor=transspaceColor(textureColor*u_baseRenderColor);gl_FragColor=vec4(textureColor.rgb,textureColor.a*smoothstep(0.0,2.0,d));}";

    var LineVs = "#define SHADER_NAME 2DLineVS\n#include \"Sprite2DVertex.glsl\"\nvarying vec2 v_position;varying vec4 v_linePionts;varying float v_lineLength;varying vec2 v_linedir;varying vec3 v_dashed;varying float v_lineWidth;uniform vec3 u_dashed;uniform float u_lineWidth;void lineMat(in vec2 left,in vec2 right,inout vec3 xDir,inout vec3 yDir,float LineWidth){vec2 dir=right-left;float lineLength=length(dir)+LineWidth+2.0;dir=normalize(dir);xDir.x=dir.x*lineLength;yDir.x=dir.y*lineLength;float lineWidth=LineWidth+2.0;xDir.y=-dir.y*LineWidth;yDir.y=dir.x*LineWidth;xDir.z=(left.x+right.x)*0.5;yDir.z=(left.y+right.y)*0.5;}void main(){vec2 oriUV=(a_position.xy+vec2(0.5,0.5));oriUV.x=(oriUV.x*length(a_linePos.xy-a_linePos.zw)+a_linelength)/50.0;v_texcoord=oriUV;vec2 left,right;getGlobalPos(a_linePos.xy,left);getGlobalPos(a_linePos.zw,right);float lengthScale=length(right-left)/length(a_linePos.zw-a_linePos.xy);v_lineLength=a_linelength*lengthScale;v_dashed=vec3(u_dashed.x*lengthScale,u_dashed.y,u_dashed.z*lengthScale);v_linePionts=vec4(left,right);float lineWidth=u_lineWidth*lengthScale;v_lineWidth=lineWidth;v_linedir=normalize(right-left)*v_lineWidth*0.5;vec3 xDir;vec3 yDir;lineMat(left,right,xDir,yDir,v_lineWidth);transfrom(a_position.xy,xDir,yDir,v_position);vec2 viewPos;getViewPos(v_position,viewPos);v_cliped=getClipedInfo(viewPos);vec4 pos;getProjectPos(viewPos,pos);gl_Position=pos;}";

    class LineShader {
        static __init__() {
            if (LineShader._isInit)
                return;
            LineShader._isInit = true;
            let attributeMap = {
                'a_position': [0, Laya.ShaderDataType.Vector3],
                'a_linePos': [2, Laya.ShaderDataType.Vector4],
                "a_linelength": [3, Laya.ShaderDataType.Float],
            };
            let uniformMap = {};
            let shader = Laya.Shader3D.add("LineShader", true, false);
            shader.shaderType = Laya.ShaderFeatureType.DEFAULT;
            let subShader = new Laya.SubShader(attributeMap, uniformMap, {});
            shader.addSubShader(subShader);
            subShader.addShaderPass(LineVs, LineFs);
            LineShader.LINEWIDTH = Laya.Shader3D.propertyNameToID("u_lineWidth");
            LineShader.DASHED = Laya.Shader3D.propertyNameToID("u_dashed");
            LineShader.TILINGOFFSET = Laya.Shader3D.propertyNameToID("u_TilingOffset");
            const commandUniform = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Line2DRender");
            commandUniform.addShaderUniform(LineShader.LINEWIDTH, "u_lineWidth", Laya.ShaderDataType.Float);
            commandUniform.addShaderUniform(LineShader.DASHED, "u_dashed", Laya.ShaderDataType.Vector3);
            commandUniform.addShaderUniform(LineShader.TILINGOFFSET, "u_TilingOffset", Laya.ShaderDataType.Vector4);
            let vertexs = new Float32Array([
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0.5, 0.5, 0,
                -0.5, 0.5, 0
            ]);
            let index = new Uint16Array([0, 1, 2, 0, 2, 3]);
            var declaration = new Laya.VertexDeclaration(12, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Vector3, 0),
            ]);
            let vertex = LineShader._vbs = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            vertex.vertexDeclaration = declaration;
            vertex.instanceBuffer = false;
            vertex.setDataLength(vertexs.byteLength);
            vertex.setData(vertexs.buffer, 0, 0, vertexs.byteLength);
            let ibs = LineShader._ibs = Laya.LayaGL.renderDeviceFactory.createIndexBuffer(Laya.BufferUsage.Dynamic);
            ibs._setIndexDataLength(index.buffer.byteLength);
            ibs._setIndexData(index, 0);
            LineShader.linePoisitionDesc = new Laya.VertexDeclaration(16, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Vector4, 2),
            ]);
            LineShader.lineLengthDesc = new Laya.VertexDeclaration(4, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Single, 3),
            ]);
        }
    }
    LineShader._isInit = false;

    class Line2DRender extends Laya.BaseRenderNode2D {
        static _createDefaultLineMaterial() {
            if (Line2DRender.defaultLine2DMaterial)
                return;
            LineShader.__init__();
            let mat = Line2DRender.defaultLine2DMaterial = new Laya.Material();
            mat.setShaderName("LineShader");
            mat.alphaTest = false;
            mat.depthTest = Laya.RenderState.DEPTHTEST_OFF;
            mat.cull = Laya.RenderState.CULL_NONE;
            mat.blend = Laya.RenderState.BLEND_ENABLE_ALL;
            mat.setIntByIndex(Laya.Shader3D.BLEND_SRC, Laya.RenderState.BLENDPARAM_SRC_ALPHA);
            mat.setIntByIndex(Laya.Shader3D.BLEND_DST, Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA);
        }
        get positions() {
            return this._positions;
        }
        set positions(value) {
            if ((value.length / 4) != ((value.length / 4) | 0))
                return;
            this._positions = value;
            this._needUpdate = true;
        }
        get lineWidth() {
            return this._lineWidth;
        }
        set lineWidth(value) {
            this._lineWidth = Math.max(1, value);
            this._spriteShaderData.setNumber(LineShader.LINEWIDTH, this._lineWidth);
        }
        set color(value) {
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._color);
            this._spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._color);
        }
        get color() {
            return this._color;
        }
        set enableDashedMode(value) {
            this._isdashed = value;
            this._updateDashValue();
        }
        get enableDashedMode() {
            return this._isdashed;
        }
        set dashedLength(value) {
            if (value == null)
                return;
            value = Math.max(0.01, value);
            this._dashedValue.x = value;
            this._updateDashValue();
        }
        get dashedLength() {
            return this._dashedValue.x;
        }
        set dashedPercent(value) {
            value = Math.max(Math.min(1, value), 0);
            this._dashedValue.y = value;
            this._updateDashValue();
        }
        get dashedPercent() {
            return this._dashedValue.y;
        }
        set dashedOffset(value) {
            this._dashedValue.z = value;
            this._updateDashValue();
        }
        get dashedOffset() {
            return this._dashedValue.z;
        }
        set texture(value) {
            if (!value) {
                value = Laya.Texture2D.whiteTexture;
            }
            if (value == this._baseRender2DTexture)
                return;
            if (this._baseRender2DTexture)
                this._baseRender2DTexture._removeReference(1);
            value._addReference();
            this._baseRender2DTexture = value;
            this._spriteShaderData.setTexture(Laya.BaseRenderNode2D.BASERENDER2DTEXTURE, value);
            if (value.gammaCorrection != 1) {
                this._spriteShaderData.addDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
            }
            else {
                this._spriteShaderData.removeDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
            }
        }
        get texture() {
            return this._baseRender2DTexture;
        }
        set tillOffset(value) {
            if (value == null) {
                this._tillOffset = new Laya.Vector4(0, 0, 1, 1);
            }
            else {
                value.cloneTo(this._tillOffset);
            }
            this._spriteShaderData.setVector(LineShader.TILINGOFFSET, this._tillOffset);
        }
        get tillOffset() {
            return this._tillOffset;
        }
        set sharedMaterial(value) {
            super.sharedMaterial = value;
            Laya.BaseRenderNode2D._setRenderElement2DMaterial(this._renderElements[0], this._materials[0] ? this._materials[0] : Line2DRender.defaultLine2DMaterial);
        }
        _updateDashValue() {
            if (this._isdashed) {
                this._spriteShaderData.setVector3(LineShader.DASHED, this._dashedValue);
            }
            else {
                this._spriteShaderData.setVector3(LineShader.DASHED, Line2DRender.defaultDashedValue);
            }
        }
        _getcommonUniformMap() {
            return ["BaseRender2D", "Line2DRender"];
        }
        _changeGeometry() {
            let lineLength = this._positions.length / 4;
            if (lineLength > this._maxLineNumer) {
                this._maxLineNumer = (((lineLength / this._enLarge) | 0) + 1) * this._enLarge;
                this._positionInstansBufferData = new Float32Array(this._maxLineNumer * 4);
                this._positionVertexBuffer.setDataLength(this._maxLineNumer * 16);
                this._lineLengthBufferData = new Float32Array(this._maxLineNumer * 1);
                this._lineLengthVertexBuffer.setDataLength(this._maxLineNumer * 4);
                this._renderGeometry.bufferState.applyState([LineShader._vbs, this._positionVertexBuffer, this._lineLengthVertexBuffer], LineShader._ibs);
                this._renderElements[0].geometry = this._renderGeometry;
            }
            this._positionInstansBufferData.set(this._positions, 0);
            this._positionVertexBuffer.setData(this._positionInstansBufferData.buffer, 0, 0, this._positionInstansBufferData.byteLength);
            {
                let totalLength = 0;
                for (var i = 0; i < lineLength; i++) {
                    const dataIndex = i * 4;
                    this._lineLengthBufferData[i] = totalLength;
                    totalLength += Math.hypot(this._positions[dataIndex + 2] - this._positions[dataIndex], this._positions[dataIndex + 3] - this._positions[dataIndex + 1]);
                }
                this._lineLengthVertexBuffer.setData(this._lineLengthBufferData.buffer, 0, 0, this._lineLengthBufferData.byteLength);
            }
            this._renderGeometry.instanceCount = lineLength;
        }
        addPoint(startx, starty, endx, endy) {
            this._positions.push(startx, starty, endx, endy);
            this._needUpdate = true;
        }
        clear() {
            this._positions.length = 0;
            this._needUpdate = true;
        }
        addCMDCall(context, px, py) {
            let mat = context._curMat;
            let vec3 = Laya.Vector3.TEMP;
            vec3.x = mat.a;
            vec3.y = mat.c;
            vec3.z = px * mat.a + py * mat.c + mat.tx;
            this._spriteShaderData.setVector3(Laya.BaseRenderNode2D.NMATRIX_0, vec3);
            vec3.x = mat.b;
            vec3.y = mat.d;
            vec3.z = px * mat.b + py * mat.d + mat.ty;
            this._spriteShaderData.setVector3(Laya.BaseRenderNode2D.NMATRIX_1, vec3);
            this._setRenderSize(context.width, context.height);
            context._copyClipInfoToShaderData(this._spriteShaderData);
        }
        onPreRender() {
            if (!this._needUpdate)
                return;
            this._needUpdate = false;
            this._changeGeometry();
        }
        _initRender() {
            let lineNums = this._maxLineNumer;
            let positionBuffer = this._positionVertexBuffer = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            positionBuffer.instanceBuffer = true;
            positionBuffer.vertexDeclaration = LineShader.linePoisitionDesc;
            positionBuffer.setDataLength(lineNums * 16);
            this._positionInstansBufferData = new Float32Array(lineNums * 4);
            positionBuffer.setData(this._positionInstansBufferData.buffer, 0, 0, this._positionInstansBufferData.byteLength);
            let lineLengthBuffer = this._lineLengthVertexBuffer = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            lineLengthBuffer.instanceBuffer = true;
            lineLengthBuffer.vertexDeclaration = LineShader.lineLengthDesc;
            lineLengthBuffer.setDataLength(lineNums * 4);
            this._lineLengthBufferData = new Float32Array(lineNums * 1);
            lineLengthBuffer.setData(this._lineLengthBufferData.buffer, 0, 0, this._lineLengthBufferData.byteLength);
            let geometry = this._renderGeometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElementInstance);
            geometry.bufferState = Laya.LayaGL.renderDeviceFactory.createBufferState();
            geometry.setDrawElemenParams(6, 0);
            geometry.indexFormat = Laya.IndexFormat.UInt16;
            geometry.instanceCount = 0;
            let buffers = [];
            buffers.push(LineShader._vbs);
            buffers.push(this._positionVertexBuffer);
            buffers.push(this._lineLengthVertexBuffer);
            geometry.bufferState.applyState(buffers, LineShader._ibs);
            let renderElement = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            renderElement.geometry = this._renderGeometry;
            renderElement.value2DShaderData = this._spriteShaderData;
            renderElement.renderStateIsBySprite = false;
            renderElement.nodeCommonMap = this._getcommonUniformMap();
            Laya.BaseRenderNode2D._setRenderElement2DMaterial(renderElement, this._materials[0] ? this._materials[0] : Line2DRender.defaultLine2DMaterial);
            this._renderElements[0] = renderElement;
        }
        constructor() {
            super();
            this._color = new Laya.Color();
            this._positions = [];
            this._isdashed = false;
            this._tillOffset = new Laya.Vector4(0, 0, 1, 1);
            this._dashedValue = new Laya.Vector3(20, 0.5, 0);
            this._needUpdate = false;
            this._maxLineNumer = 200;
            this._enLarge = 100;
            this._lineWidth = 1;
            Line2DRender._createDefaultLineMaterial();
            this._renderElements = [];
            this._materials = [];
            this._initRender();
            this._spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            this._spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._color);
            this._updateDashValue();
            this.tillOffset = null;
            this.texture = null;
        }
    }
    Line2DRender.defaultDashedValue = new Laya.Vector3(20, 1, 0);
    Laya.Laya.addInitCallback(() => Line2DRender._createDefaultLineMaterial());

    class Draw2DLineCMD extends Laya.Command2D {
        static create(pointArray, mat, color = Laya.Color.WHITE, lineWidth = 3) {
            var cmd = Draw2DLineCMD._pool.length > 0 ? Draw2DLineCMD._pool.pop() : new Draw2DLineCMD();
            cmd._line2DRender.color = color;
            cmd._line2DRender.positions = pointArray;
            cmd._line2DRender.lineWidth = lineWidth;
            cmd._setMatrix(mat);
            return cmd;
        }
        constructor() {
            super();
            this._drawElementData = Laya.LayaGL.render2DRenderPassFactory.createDraw2DElementCMDData();
            this._line2DRender = new Line2DRender();
            this._needUpdateElement = true;
            this._matrix = new Laya.Matrix();
            this._line2DRender.enableDashedMode = false;
            this._drawElementData.setRenderelements(this._line2DRender._renderElements);
        }
        _setMatrix(value) {
            value ? value.copyTo(this._matrix) : Laya.Matrix.EMPTY.copyTo(this._matrix);
            let mat = this._matrix;
            let vec3 = Laya.Vector3.TEMP;
            vec3.x = mat.a;
            vec3.y = mat.c;
            vec3.z = mat.tx;
            this._line2DRender._spriteShaderData.setVector3(Laya.BaseRenderNode2D.NMATRIX_0, vec3);
            vec3.x = mat.b;
            vec3.y = mat.d;
            vec3.z = mat.ty;
            this._line2DRender._spriteShaderData.setVector3(Laya.BaseRenderNode2D.NMATRIX_1, vec3);
        }
        getRenderCMD() {
            return this._drawElementData;
        }
        run() {
            this._line2DRender.onPreRender();
            this._line2DRender._setRenderSize(this._commandBuffer._renderSize.x, this._commandBuffer._renderSize.y);
        }
        recover() {
            Draw2DLineCMD._pool.push(this);
            super.recover();
        }
    }
    Draw2DLineCMD._pool = [];

    let c = Laya.ClassUtils.regClass;
    c("Line2DRender", Line2DRender);

    exports.Draw2DLineCMD = Draw2DLineCMD;
    exports.Line2DRender = Line2DRender;
    exports.LineShader = LineShader;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.line2D.js.map
