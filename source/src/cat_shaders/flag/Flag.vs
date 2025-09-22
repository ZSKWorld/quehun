#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;
attribute vec4 a_Color;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;

uniform float u_Frequency;
uniform float u_AmplitudeStrength;
uniform float u_InvWaveLength;
uniform float u_Fold;

uniform float u_Time;

varying vec3 v_ViewDir;
varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

void main() {
    vec4 position;
    vec4 v_before = u_WorldMat * a_Position;
    float offset = u_AmplitudeStrength * sin(u_Frequency * u_Time * 0.05 * 20.0 + (v_before.x + v_before.y * u_Fold) * u_InvWaveLength) * a_Texcoord0.x;

    position = u_MvpMatrix * vec4(a_Position.x, a_Position.y + offset, a_Position.z, a_Position.w);
    position = remapGLPositionZ(position);
    v_Texcoord0 = a_Texcoord0;
    gl_Position = position;
}

