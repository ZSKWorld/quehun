#include "Lighting.glsl";
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

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;
attribute vec3 a_Normal;

uniform mat4 u_WorldMat;

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif


varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;



#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

void main() {
    v_Texcoord0 = a_Texcoord0;
    v_Texcoord1 = a_Texcoord1;	
    
    mat3 worldInvMat;
    worldInvMat=INVERSE_MAT(mat3(u_WorldMat));
    v_Normal=normalize(a_Normal*worldInvMat);
    
    #if defined(DIRECTIONLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)
      vec3 positionWS=(u_WorldMat*a_Position).xyz;
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

    #ifdef GPU_INSTANCE
        gl_Position = a_MvpMatrix * a_Position;
    #else
        gl_Position = u_MvpMatrix * a_Position;
    #endif
    // gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}
