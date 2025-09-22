/* eslint-disable camelcase */
import fs from "./MoltenSalt.fs";
import vs from "./MoltenSalt.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _ColorController = Laya.Shader3D.propertyNameToID("_ColorController");
const _SaltContorller = Laya.Shader3D.propertyNameToID("_SaltContorller");

export class MaterialMoltenSalt extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("MoltenSalt");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _ColorController(): number {
        return this._shaderValues.getNumber(_ColorController);
    }

    public set _ColorController(v: number) {
        this._shaderValues.setNumber(_ColorController, v);
    }

    public get _SaltContorller(): number {
        return this._shaderValues.getNumber(_SaltContorller);
    }

    public set _SaltContorller(v: number) {
        this._shaderValues.setNumber(_SaltContorller, v);
    }

    public clone() {
        const dest = new MaterialMoltenSalt();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._ColorController = this._ColorController;
        destMaterial._SaltContorller = this._SaltContorller;
    }
}

export class ShaderMoltenSalt {
    public static initShader(): void {
        const attributeMap = {
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _ColorController: Laya.Shader3D.PERIOD_MATERIAL,
            _SaltContorller: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("MoltenSalt");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
