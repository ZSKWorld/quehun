precision highp float;

#include "Lighting.glsl";

uniform sampler2D u_MainTex;

uniform float u_Time;
uniform float u_HorAmount;
uniform float u_VerAmount;
uniform float u_Speed;
uniform float u_Alpha;
varying vec2 v_Texcoord0;

void main()
{
    float time = u_Time * u_Speed;
    float row = floor(time / u_HorAmount);
    float column = floor(time - row * u_HorAmount);

    vec2 uv = vec2(v_Texcoord0.x, v_Texcoord0.y - 1.0) + vec2(column, -row);
    uv.y = uv.y + 1.0;
    uv.x /= u_HorAmount;
    uv.y /= u_VerAmount;            
    // sample the texture
    vec4 col = texture2D(u_MainTex, uv);
    col.a *= u_Alpha;
    gl_FragColor = col;
}

