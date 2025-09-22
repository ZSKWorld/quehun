#include "Lighting.glsl";
#include "ShaderTool.glsl";

attribute vec4 a_Position;

uniform mat4 u_WorldMat;
uniform vec4 u_LightDir;
uniform float u_ShadowPos;
uniform mat4 u_ViewProjection;
uniform float u_Angle;

#ifdef GPU_INSTANCE
attribute mat4 a_MvpMatrix;
#else
uniform mat4 u_MvpMatrix;
#endif

#ifdef TILINGOFFSET
    uniform vec4 u_TilingOffset;
#endif

#ifdef BONE
const int c_MaxBoneCount = 24;
attribute vec4 a_BoneIndices;
attribute vec4 a_BoneWeights;
uniform mat4 u_Bones[c_MaxBoneCount];
#endif

vec4 CalculateRotation(vec4 pos){
	float s = sin(radians(u_Angle));
	float c = cos(radians(u_Angle));
	mat2 rotMatrix = mat2(c, -s, s, c);
	pos.yz = pos.yz * rotMatrix;
	return pos;
}


void main() {
    vec4 vt;
    #ifdef BONE
        mat4 skinTransform = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
        skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
        skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
        skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
        vt=skinTransform*a_Position;
        vt=skinTransform*a_Position;
    #else
        vt=a_Position;
    #endif
    vt = u_WorldMat * vt;
    vt.y -= u_ShadowPos;
    vec4 u_LightDir2 = CalculateRotation(u_LightDir);

    mat4 worldMatInvert = invert(u_WorldMat);

    vec3 litDir = normalize(vec3(u_LightDir2.x, u_LightDir2.y+vt.y, u_LightDir2.z)-vt.xyz);
    vt.xz = vt.xz - (vt.y / litDir.y)*litDir.xz;
    vt.y = u_ShadowPos;
    vt = worldMatInvert * vt;
	vt = CalculateRotation(vt);

    #ifdef GPU_INSTANCE
        vt = a_MvpMatrix * vt;
    #else
        vt = u_MvpMatrix * vt;
    #endif
        gl_Position = remapGLPositionZ(vt);
}