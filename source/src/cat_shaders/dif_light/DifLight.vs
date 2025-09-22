#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec3 a_Normal;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;

varying vec2 v_Texcoord0;
varying vec3 v_Normal;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

#ifdef BONE
const int c_MaxBoneCount = 24;
attribute vec4 a_BoneIndices;
attribute vec4 a_BoneWeights;
uniform mat4 u_Bones[c_MaxBoneCount];
#endif

void main() {
    vec4 position;
#ifdef BONE
    mat4 skinTransform = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
    skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
    skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
    skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
    position=skinTransform*a_Position;
#else
    position=a_Position;
#endif    
    gl_Position = u_MvpMatrix * position;    
    v_Texcoord0 = a_Texcoord0;	
    v_Normal =  mat3(u_WorldMat) * a_Normal;
    gl_Position = remapGLPositionZ(gl_Position);
}

