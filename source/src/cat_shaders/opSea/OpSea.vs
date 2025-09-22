#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;
uniform mat4 u_ViewProjection;

varying vec3 v_ViewDir;
varying vec3 v_worldNormal;
varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec2 v_Texcoord2;

uniform vec4 u_WaveScale;
uniform float u_WaveLen;
uniform float u_Time;
uniform float u_Frequency;
uniform float u_Strength;
uniform vec4 u_WaveSpeed;
uniform vec3 u_CameraPos;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

void main() {
    vec4 position;
    position = a_Position;

    vec4 waveScale4 = vec4(u_WaveScale.w * 0.1, u_WaveScale.x * 0.1, u_WaveScale.y * 0.1, u_WaveScale.z * 0.1);
    vec4 temp;
    temp.xy = position.xz * waveScale4.xy;
    temp.zw = position.xz * waveScale4.zw;
    v_Texcoord0 = a_Texcoord0;
    vec4 tempWaveSpeed = u_WaveSpeed;
    tempWaveSpeed.x *= -1.0;
    v_Texcoord1 = temp.xy + tempWaveSpeed.xy * u_Time * 0.05 * 20.0;
    v_Texcoord2 = temp.wz + tempWaveSpeed.zw * u_Time * 0.05 * 10.0;
    //float drifting = sin(position.g * u_WaveLen + position.b + u_Frequency * u_Time * 0.05 * 40.0) * u_Strength;
    //float drifting = ((sin((((position.b + (position.r) * u_WaveLen)) + (u_Frequency * u_Time * 0.05 * 20.0))) * u_Strength)) * 10.0;
    //position.xyz += vec3(drifting, drifting, drifting);
    v_ViewDir = normalize(u_CameraPos.xyz - (u_WorldMat * position).xyz);

    v_worldNormal = normalize(mat3(u_WorldMat) * a_Normal);

    // float h = sin(position.x + position.z + u_Time * 0.05 * 30.0) * 0.04;
    // vec4 worldPos = u_WorldMat * position;
    // worldPos.xz += h;

    gl_Position = remapGLPositionZ(u_MvpMatrix * a_Position);
}
