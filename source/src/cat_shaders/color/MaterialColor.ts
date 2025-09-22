/* eslint-disable camelcase */
import fs from "./Color.fs";
import vs from "./Color.vs";

const Color = Laya.Shader3D.propertyNameToID("u_Color");

export class MaterialColor extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Color");
    }

    public get Color() {
        return this._shaderValues.getVector(Color);
    }

    public set Color(v: Laya.Vector4) {
        this._shaderValues.setVector(Color, v);
    }
}

export class ShaderColor {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
        };
        const uniformMap = {
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_Color: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Color", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
