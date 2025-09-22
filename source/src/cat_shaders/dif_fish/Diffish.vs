#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_NORMAL;
#ifdef BONE
const int c_MaxBoneCount = 24;
attribute vec4 a_BoneIndices;
attribute vec4 a_BoneWeights;
uniform mat4 u_Bones[c_MaxBoneCount];
#endif
void main()
{
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

  highp mat3 tmpvar_2;
  tmpvar_2[0] = u_WorldMat[0].xyz;
  tmpvar_2[1] = u_WorldMat[1].xyz;
  tmpvar_2[2] = u_WorldMat[2].xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  xlv_TEXCOORD1 = a_Texcoord1.xy;
  xlv_NORMAL = normalize((tmpvar_2 * a_Normal));
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * position));
}