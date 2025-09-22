#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif

varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_COLOR;

#ifdef TILINGOFFSET
    uniform vec4 u_TilingOffset;
#endif


void main() {

#ifdef GPU_INSTANCE
    gl_Position = a_MvpMatrix * a_Position;
#else
    gl_Position = u_MvpMatrix * a_Position;
#endif

#ifdef TILINGOFFSET
    xlv_TEXCOORD0=TransformUV(a_Texcoord0,u_TilingOffset);
#else
    xlv_TEXCOORD0=a_Texcoord0;
#endif

    xlv_COLOR = a_Color;

    gl_Position=remapGLPositionZ(gl_Position);
}
