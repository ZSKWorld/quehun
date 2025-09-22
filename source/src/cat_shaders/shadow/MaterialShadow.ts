/* eslint-disable camelcase */
import vs from "./Shadow.vs";
import fs from "./Shadow.fs";

const AO = Laya.Shader3D.propertyNameToID("u_AO");
const _shadowPlaneId = Laya.Shader3D.propertyNameToID("u_shadowPlane");
const _shadowColorId = Laya.Shader3D.propertyNameToID("u_shadowColor");
const _shadowParamId = Laya.Shader3D.propertyNameToID("u_shadowParam");
const _lightDirId = Laya.Shader3D.propertyNameToID("u_lightDir");

export class MaterialShadow extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Shadow");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get ao() {
        return this._shaderValues.getTexture(AO);
    }

    public set ao(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(AO, v);
    }

    public get shadowPlane():Laya.Vector4 {
        return this._shaderValues.getVector(_shadowPlaneId);
    }

    public set shadowPlane(v: Laya.Vector4) {
        this._shaderValues.setVector(_shadowPlaneId, v);
    }

    public get shadowColor():Laya.Vector4 {
        return this._shaderValues.getVector(_shadowColorId);
    }

    public set shadowColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_shadowColorId, v);
    }

    public get shadowParam():Laya.Vector4 {
        return this._shaderValues.getVector(_shadowParamId);
    }

    public set shadowParam(v: Laya.Vector4) {
        this._shaderValues.setVector(_shadowParamId, v);
    }

    public get lightDir():Laya.Vector3 {
        return this._shaderValues.getVector3(_lightDirId);
    }

    public set lightDir(v: Laya.Vector3) {
        this._shaderValues.setVector3(_lightDirId, v);
    }
}

export class ShaderShadow {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_AlbedoTexture: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlbedoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_AO: Laya.Shader3D.PERIOD_MATERIAL,
            u_shadowPlane: Laya.Shader3D.PERIOD_MATERIAL,
            u_shadowColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_shadowParam: Laya.Shader3D.PERIOD_MATERIAL,
            u_lightDir: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };
        /*
            v2f vert(appdata_tan v)
            {
                  v2f o;
                  fixed3 vt;
                  vt = mul(unity_ObjectToWorld , v.vertex).xyz;
                  fixed3 tmpvar_3;
                  tmpvar_3 = (vt - (( (dot (_ShadowPlane.xyz, vt) - _ShadowPlane.w) / dot (_ShadowPlane.xyz, _lightDirection)) * _lightDirection));
                  fixed4 tmpvar_4;
                  tmpvar_4.w = 1.0;
                  tmpvar_4.xyz = tmpvar_3;
                  o.pos = mul(UNITY_MATRIX_VP , tmpvar_4);
                  o.texcord0 = mul(unity_ObjectToWorld,float4(0, 0, 0, 1));
                  o.texcord1 = tmpvar_3;
                  return o;
            }

            float4 frag(v2f inData) : COLOR
            {
                fixed3 posToPlane = inData.texcord0-inData.texcord1;
                fixed4 f = _ShadowColor;
                fixed v = pow (1.0 - clamp ((( sqrt( dot(posToPlane,posToPlane) ) * _ShadowPara.w) - _ShadowPara.x),0,1),_ShadowPara.y) * _ShadowPara.z;
                f.w = v * _ShadowColor.a;
                return f;
            }
        */

        const shader = Laya.Shader3D.add("Shadow", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
