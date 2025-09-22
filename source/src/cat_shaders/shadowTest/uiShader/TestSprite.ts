/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
import testvs from "./texture.vs";
import testfs from "./texture.fs";
//顶点着色器   直接使用的是laya官方自带的
const vs: string = `
        attribute vec4 posuv;
        attribute vec4 attribColor;
        attribute vec4 attribFlags;
        attribute vec4 clipDir;
        attribute vec2 clipRect;
        uniform vec4 clipMatDir;
        uniform vec2 clipMatPos;
        varying vec2 cliped;
        uniform vec2 size;
        uniform vec2 clipOff;
        #ifdef WORLDMAT
            uniform mat4 mmat;
        #endif
        #ifdef MVP3D
            uniform mat4 u_MvpMatrix;
        #endif
        varying vec4 v_texcoordAlpha;
        varying vec4 v_color;
        varying float v_useTex;
        void main() {
            vec4 pos = vec4(posuv.xy,0.,1.);
            #ifdef WORLDMAT
                pos=mmat*pos;
            #endif
            vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);
            #ifdef MVP3D
                gl_Position=u_MvpMatrix*pos1;
            #else
                gl_Position=pos1;
            #endif
            v_texcoordAlpha.xy = posuv.zw;
            v_texcoordAlpha.z = attribColor.a/255.0;
            v_color = attribColor/255.0;
            v_color.xyz*=v_color.w;
            v_useTex = attribFlags.r/255.0;
            float clipw = length(clipMatDir.xy);
            float cliph = length(clipMatDir.zw);
            vec2 clpos = clipMatPos.xy;
            #ifdef WORLDMAT
            if(clipOff[0]>0.0){
                clpos.x+=mmat[3].x;
                clpos.y+=mmat[3].y;
            }
            #endif
            vec2 clippos = pos.xy - clpos;

            if(clipw>20000. && cliph>20000.)
                cliped = vec2(0.5,0.5);
            else {
                cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);
            }
        }
    `;
//0.0947416 0.118318 0.0947416
//0.118318  0.147761 0.118318
//0.0947416 0.118318 0.0947416
//片元着色器  一个简单的功能 根据噪图 过滤掉低于阈值的颜色
const ps: string = `
        precision mediump float;
        varying vec2 v_texcoord;
        varying vec4 v_color;
        uniform sampler2D texture;
        uniform sampler2D u_NoiseTex;
        //消融阈值  0 - 1
        uniform float u_Alph;

        varying vec4 v_texcoordAlpha;

        void main(){
            float pixel = 1.0 / 350.0;
            vec4 result = texture2D(texture, vec2(v_texcoordAlpha.x - pixel, v_texcoordAlpha.y - pixel)) * 0.0947416;
            result += texture2D(texture, vec2(v_texcoordAlpha.x, v_texcoordAlpha.y - pixel)) * 0.118318;
            result += texture2D(texture, vec2(v_texcoordAlpha.x + pixel, v_texcoordAlpha.y - pixel)) * 0.0947416;
            result += texture2D(texture, vec2(v_texcoordAlpha.x - pixel, v_texcoordAlpha.y)) * 0.118318;
            result += texture2D(texture, vec2(v_texcoordAlpha.x, v_texcoordAlpha.y)) * 0.147761;
            result += texture2D(texture, vec2(v_texcoordAlpha.x + pixel, v_texcoordAlpha.y)) * 0.118318;
            result += texture2D(texture, vec2(v_texcoordAlpha.x - pixel, v_texcoordAlpha.y + pixel)) * 0.0947416;
            result += texture2D(texture, vec2(v_texcoordAlpha.x, v_texcoordAlpha.y + pixel)) * 0.118318;
            result += texture2D(texture, vec2(v_texcoordAlpha.x + pixel, v_texcoordAlpha.y + pixel)) * 0.0947416;
            
            result *= u_Alph;
            gl_FragColor = texture2D(texture, vec2(v_texcoordAlpha.x, v_texcoordAlpha.y)) * u_Alph;
        }
    `;
class DissValue2D extends Laya.Value2D {
    public u_Alph: number;

    public u_NoiseTex: Laya.Texture2D;
}
export class DissolveSurfaceSprite extends Laya.Sprite {
    private shaderValue: DissValue2D;

    private shader: Laya.Shader;

    //定义一个shaderid  用于laya在查找shader 时使用
    static DissolveSurfaceSaveName: number = 9999;

    tex: Laya.Texture2D;

    constructor() {
        super();
        this.init();
    }

    public init(): void {
        this.shaderValue = new DissValue2D(
            DissolveSurfaceSprite.DissolveSurfaceSaveName,
            DissolveSurfaceSprite.DissolveSurfaceSaveName
        );
        //重要的一步  将渲染设置为自定义
        this.customRenderEnable = true;
        this.shader = new Laya.Shader2X(
            testvs, testfs, DissolveSurfaceSprite.DissolveSurfaceSaveName
        );
    }

    public setTexture(t: Laya.Texture2D) {
        (this.tex as any) = t;
    }

    /**
     * 设置噪图纹理
     * @param t
     */
    public setNoiseTexture(t: Laya.Texture2D) {
        //这里的名字是在shader里 定义好的。
        this.shaderValue.u_NoiseTex = t;
    }

    public setNoiseTexSkin(skin: string) {
        Laya.Texture2D.load(skin, new Laya.Handler(this, (tex) => {
            this.shaderValue.u_NoiseTex = tex._getSource();
        }));
    }

    /**
     * 设置消融范围  0 是原图  1 是消失完成
     * @param t
     */
    public setDissolveThreshold(t) {
        this.shaderValue.u_Alph = t;
    }

    // 自定义渲染提交
    public customRender(context: Laya.Context, x: number, y: number) {
        //这一步很重要
        context.drawTarget(
            this.tex as any, x, y, this.tex.width, this.tex.height, null, this.shaderValue
        );
    }
}

// private _value: number = 0;

// private aaaa() {
//     const url = "res/atlas/icon.png";
//     Laya.loader.load(url, Laya.Handler.create(this, () => {
//         const texture: Laya.Texture2D = Laya.Loader.getRes(url);
//         const spe: DissolveSurfaceSprite = new DissolveSurfaceSprite();
//         spe.setTexture(texture);
//         //设置噪图路径
//         spe.setNoiseTexSkin("timg.jpg");
//         spe.setDissolveThreshold(0);
//         spe.x = Laya.stage.width / 2 - texture.width / 2;
//         spe.y = Laya.stage.height / 2 - texture.height / 2;
//         Laya.stage.addChild(spe);
//         Laya.stage.on(Laya.Event.KEY_DOWN, this, (e: Laya.Event) => {
//             if (e.keyCode == Laya.Keyboard.A) {
//                 this._value -= 0.1;
//             } else if (e.keyCode == Laya.Keyboard.S) {
//                 this._value += 0.1;
//             } else {
//                 return;
//             }
//             this._value = Math.max(0, Math.min(this._value, 1));
//             console.log(this._value);
//             spe.setDissolveThreshold(this._value);
//         });
//     }));
// }

// var BlurVS = "#include \"Lighting.glsl\";\r\n#if defined(GL_FRAGMENT_PRECISION_HIGH)\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\nattribute vec4 a_PositionTexcoord;\r\nvarying vec2 v_Texcoord0;\r\n\r\nvoid main() {\r\n\tgl_Position = vec4(a_PositionTexcoord.xy, 0.0, 1.0);\r\n\tv_Texcoord0 = a_PositionTexcoord.zw;\r\n\tgl_Position = remapGLPositionZ(gl_Position);\r\n}";

// var BlurHorizentalFS = "#if defined(GL_FRAGMENT_PRECISION_HIGH)\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\n\r\nvarying vec2 v_Texcoord0;\r\nuniform sampler2D u_MainTex;\r\nuniform vec4 u_MainTex_TexelSize;\r\nuniform float u_DownSampleValue;\r\n\r\nvoid main()\r\n{\r\n    vec4 color = vec4(0.0,0.0,0.0,0.0);\r\n    vec2 uv = v_Texcoord0;\r\n    vec2 uvOffset = vec2(1.0,0.0)*u_MainTex_TexelSize.xy*u_DownSampleValue;\r\n    uv = uv - uvOffset*3.0;\r\n    //高斯参数\r\n    color+=0.0205*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.0855*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.232*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.324*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.232*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.0855*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.0205*texture2D(u_MainTex,uv);\r\n\r\n    gl_FragColor = color;\r\n    \r\n\r\n    \r\n}";

// var BlurVerticalFS = "#if defined(GL_FRAGMENT_PRECISION_HIGH)\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\n\r\nvarying vec2 v_Texcoord0;\r\nuniform sampler2D u_MainTex;\r\nuniform vec4 u_MainTex_TexelSize;\r\nuniform float u_DownSampleValue;\r\n\r\nvoid main()\r\n{\r\n    vec4 color = vec4(0.0,0.0,0.0,0.0);\r\n    vec2 uv = v_Texcoord0;\r\n    vec2 uvOffset = vec2(0.0,1.0)*u_MainTex_TexelSize.xy*u_DownSampleValue;\r\n    uv = uv - uvOffset*3.0;\r\n    //高斯参数\r\n    color+=0.0205*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.0855*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.232*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.324*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.232*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.0855*texture2D(u_MainTex,uv);\r\n    uv+=uvOffset;\r\n    color+=0.0205*texture2D(u_MainTex,uv);\r\n\r\n    gl_FragColor = color;\r\n    \r\n\r\n    \r\n}";

// var BlurDownSampleFS = "#if defined(GL_FRAGMENT_PRECISION_HIGH)\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\n\r\nvarying vec2 v_Texcoord0;\r\nuniform sampler2D u_MainTex;\r\nuniform vec4 u_MainTex_TexelSize;\r\n\r\nvoid main()\r\n{\r\n    vec4 color = vec4(0.0,0.0,0.0,0.0);\r\n    color += texture2D(u_MainTex,v_Texcoord0+u_MainTex_TexelSize.xy*vec2(1.0,0.0));\r\n\tcolor += texture2D(u_MainTex,v_Texcoord0+u_MainTex_TexelSize.xy*vec2(-1.0,0.0));\r\n\tcolor += texture2D(u_MainTex,v_Texcoord0+u_MainTex_TexelSize.xy*vec2(0.0,-1.0));\r\n\tcolor += texture2D(u_MainTex,v_Texcoord0+u_MainTex_TexelSize.xy*vec2(0.0,1.0));\r\n    gl_FragColor = color/4.0;\r\n    //gl_FragColor = vec4(1.0,0.0,0.0,1.0);\r\n}";

// var BlurDownSampleVS = "#include \"Lighting.glsl\";\r\n#if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\nattribute vec4 a_PositionTexcoord;\r\nvarying vec2 v_Texcoord0;\r\n\r\nvoid main() {\r\n\tgl_Position = vec4(a_PositionTexcoord.xy, 0.0, 1.0);\r\n\tv_Texcoord0 = a_PositionTexcoord.zw;\r\n\tgl_Position = remapGLPositionZ(gl_Position);\r\n}";

// var BlurEdgeAdd = "#if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\n\r\nvarying vec2 v_Texcoord0;\r\nuniform sampler2D u_MainTex;\r\nuniform sampler2D u_sourceTexture0;\r\n\r\nvoid main()\r\n{\r\n    vec2 uv = v_Texcoord0;\r\n    vec4 mainColor = texture2D(u_MainTex,uv);\r\n    vec4 sourceColor = texture2D(u_sourceTexture0,uv);\r\n    float factor = step(sourceColor.x+sourceColor.y+sourceColor.z,0.001);\r\n    vec4 color = mix(sourceColor,mainColor,factor);\r\n    gl_FragColor =color;\r\n}";

// var BlurEdgeSub = "#if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\n\r\nvarying vec2 v_Texcoord0;\r\nuniform sampler2D u_sourceTexture0;\r\nuniform sampler2D u_sourceTexture1;\r\n\r\nvoid main()\r\n{\r\n    vec2 uv = v_Texcoord0;\r\n    vec4 blurColor = texture2D(u_sourceTexture0,uv);\r\n    vec4 clearColor = texture2D(u_sourceTexture1,uv);\r\n    float factor = step(clearColor.x+clearColor.y+clearColor.z,0.001);\r\n    vec4 color = blurColor*factor;\r\n    color = (1.0-step(color.x+color.y+color.z,0.15))*vec4(1.0,0.0,0.0,1.0);\r\n    gl_FragColor = color;\r\n}";
