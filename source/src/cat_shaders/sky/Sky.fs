precision highp float;

#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_MainTex;
uniform sampler2D u_CloudTex;
uniform float u_CloudSpeed;
uniform float u_CloudPower;
uniform float u_Time;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;

void main()
{
    vec2 uv = v_Texcoord0;
    vec2 uv2 = v_Texcoord1;
    uv2.x += u_Time * 0.05 * u_CloudSpeed * 5.0;
    uv.x += u_Time * 0.05 * u_CloudSpeed;
    vec4 col = texture2D(u_MainTex, uv);
    vec4 coltemp = texture2D(u_CloudTex, uv2);
    col = lerp(col, coltemp, coltemp.a);

    gl_FragColor = col;
}
