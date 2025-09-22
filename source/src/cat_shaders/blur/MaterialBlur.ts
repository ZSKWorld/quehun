/* eslint-disable camelcase */
/*
 * @Author       : zsk
 * @Date         : 2021-08-21 17:48:20
 * @LastEditors  : zsk
 * @LastEditTime : 2021-08-21 20:06:54
 * @Description  : null
 */
import BlurVS from "./Blur.vs";
import BlurDownSampleFS from "./BlurDownSample.fs";
import BlurDownSampleVS from "./BlurDownSample.vs";
import BlurHorizentalFS from "./BlurHorizontal.fs";
import BlurVerticalFS from "./BlurVertical.fs";
import Vector4 = Laya.Vector4;
import BaseTexture = Laya.BaseTexture;
import VertexMesh = Laya.VertexMesh;
import SubShader = Laya.SubShader;
import ShaderPass = Laya.ShaderPass;
import RenderState = Laya.RenderState;
import Shader3D = Laya.Shader3D;

export class MaterialBlur extends Laya.Material {
    static SHADERVALUE_MAINTEX: number = Laya.Shader3D.propertyNameToID("u_MainTex");

    static SHADERVALUE_TEXELSIZE: number = Laya.Shader3D.propertyNameToID("u_MainTex_TexelSize");

    static SHADERVALUE_DOWNSAMPLEVALUE: number = Laya.Shader3D.propertyNameToID("u_DownSampleValue");

    static SHADERVALUE_SOURCETEXTURE0: number = Laya.Shader3D.propertyNameToID("u_sourceTexture0");

    static ShADERVALUE_SOURCETEXTURE1: number = Laya.Shader3D.propertyNameToID("u_sourceTexture1");

    private texelSize: Vector4 = new Vector4();

    constructor(texelSize: Vector4, offset: number) {
        super();
        this.setShaderName("blurEffect");
        this._shaderValues.setNumber(MaterialBlur.SHADERVALUE_DOWNSAMPLEVALUE, offset);
        this._shaderValues.setVector(MaterialBlur.SHADERVALUE_TEXELSIZE, texelSize);
    }

    sourceTexture(sourceTexture0: BaseTexture, sourceTexture1: BaseTexture) {
        this._shaderValues.setTexture(MaterialBlur.SHADERVALUE_SOURCETEXTURE0, sourceTexture0);
        this._shaderValues.setTexture(MaterialBlur.ShADERVALUE_SOURCETEXTURE1, sourceTexture1);
    }
}
export class ShaderBlur {
    public static initShader(): void {
        //初始化shader
        const attributeMap: any = {
            a_PositionTexcoord: VertexMesh.MESH_POSITION0
        };
        const uniformMap = {
            u_MainTex: Shader3D.PERIOD_MATERIAL,
            u_MainTex_TexelSize: Shader3D.PERIOD_MATERIAL,
            u_DownSampleValue: Shader3D.PERIOD_MATERIAL,
            u_sourceTexture0: Shader3D.PERIOD_MATERIAL,
            u_sourceTexture1: Shader3D.PERIOD_MATERIAL
        };
        const shader: Shader3D = Shader3D.add("blurEffect");
        //subShader0  降采样
        let subShader: SubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        let shaderpass = subShader.addShaderPass(BlurDownSampleVS, BlurDownSampleFS);
        this.setRenderState(shaderpass.renderState);
        //subShader1 垂直反向模糊
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderpass = subShader.addShaderPass(BlurVS, BlurVerticalFS);
        this.setRenderState(shaderpass.renderState);
        //subShader2 水平方向模糊
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderpass = subShader.addShaderPass(BlurVS, BlurHorizentalFS);
        this.setRenderState(shaderpass.renderState);
    }

    private static setRenderState(state:Laya.RenderState) {
        state.depthTest = RenderState.DEPTHTEST_ALWAYS;
        state.depthWrite = false;
        state.cull = RenderState.CULL_NONE;
        state.blend = RenderState.BLEND_DISABLE;
    }
}
