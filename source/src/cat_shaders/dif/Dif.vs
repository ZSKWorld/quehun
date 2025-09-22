#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;

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

    #ifdef GPU_INSTANCE
        gl_Position = a_MvpMatrix * a_Position;
    #else
        gl_Position = u_MvpMatrix * a_Position;
    #endif
    // gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}
