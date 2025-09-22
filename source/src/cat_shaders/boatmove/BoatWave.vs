#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;

uniform mat4 u_MvpMatrix;

varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_COLOR;
void main() {

    xlv_TEXCOORD0 = a_Texcoord0.xy;
    gl_Position = remapGLPositionZ(u_MvpMatrix * a_Position);
    xlv_COLOR = a_Color;
}

