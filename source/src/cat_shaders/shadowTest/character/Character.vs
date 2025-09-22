#include "Lighting.glsl";
//////////////////////////////////
#include "Shadow.glsl";
#if defined(DIRECTIONLIGHT)
    uniform vec3 u_CameraPos;
    varying vec3 v_ViewDir; 
#endif
#if (defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)
    varying vec3 v_PositionWorld;
#endif

#if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)
    varying vec4 v_ShadowCoord;
#endif
varying vec3 v_Normal; 
/////////////////////////////////
attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;
attribute vec3 a_Normal;

uniform mat4 u_WorldMat;
uniform vec4 u_LightDir;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec3 v_LightDir;
varying vec3 v_WorldNormal;
varying vec3 v_WorldPos;


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


        
void main() {
    vec4 position;
    mat3 worldMat;
    #ifdef BONE
        mat4 skinTransform = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
        skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
        skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
        skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
        worldMat=mat3(u_WorldMat * skinTransform);
        position=skinTransform*a_Position;
    #else
        position=a_Position;
        worldMat=mat3(u_WorldMat);
    #endif
    
    
    //////////////////////////////////////////////
    mat3 worldInvMat;
    #ifdef BONE
      worldInvMat=INVERSE_MAT(mat3(u_WorldMat*skinTransform));
    #else
      worldInvMat=INVERSE_MAT(mat3(u_WorldMat));
    #endif  
    v_Normal=normalize(a_Normal*worldInvMat);
    
    #if defined(DIRECTIONLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)
      vec3 positionWS=(u_WorldMat*position).xyz;
      #if defined(DIRECTIONLIGHT)
          v_ViewDir = u_CameraPos-positionWS;
      #endif
      #if (defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)
          v_PositionWorld = positionWS;
      #endif
    #endif
    
    #if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)
      v_ShadowCoord =getShadowCoord(vec4(positionWS,1.0));
    #endif
    //////////////////////////////////////////////
    #ifdef GPU_INSTANCE
        gl_Position = a_MvpMatrix * position;
    #else
        gl_Position = u_MvpMatrix * position;
    #endif

    #ifdef TILINGOFFSET
        v_Texcoord0=TransformUV(a_Texcoord0,u_TilingOffset);
    #else
        v_Texcoord0=a_Texcoord0;
    #endif

    v_Texcoord1 = a_Texcoord1;
    v_WorldPos = worldMat * position.xyz;
    v_WorldNormal = worldMat * a_Normal;
    v_LightDir = u_LightDir.xyz - v_WorldPos;
    gl_Position = remapGLPositionZ(gl_Position);
}
