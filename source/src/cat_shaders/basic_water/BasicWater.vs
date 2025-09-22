#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;

varying vec4 v_Color;
varying vec3 v_ViewDir;
varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec2 v_Texcoord2;

uniform vec4 u_WaveScale;
uniform float u_Time;
uniform vec4 u_WaveSpeed;
uniform vec3 u_CameraPos;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

void main() {
    vec4 position;
    position = a_Position;
    gl_Position = u_MvpMatrix * position;

    vec4 waveScale4 = vec4(
            u_WaveScale.w * 0.1,
            u_WaveScale.x * 0.1,
            u_WaveScale.y * 0.1,
            u_WaveScale.z * 0.1);
    vec4 temp;
    temp.xy = position.xz * waveScale4.xy;
    temp.zw = position.xz * waveScale4.zw;
    v_Texcoord0 = a_Texcoord0;
    vec4 waveSpeed = vec4(-u_WaveSpeed.x, u_WaveSpeed.y, u_WaveSpeed.z, u_WaveSpeed.w);
    v_Texcoord1 = temp.xy + waveSpeed.xy * u_Time * 0.05 * 20.0;
    v_Texcoord2 = temp.wz + waveSpeed.zw * u_Time * 0.05 * 10.0;
    v_Color = a_Color;
    v_ViewDir = u_CameraPos.xyz - (u_WorldMat * position).xyz;

    gl_Position = remapGLPositionZ(gl_Position);
}

