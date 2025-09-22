precision highp float;

#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_FogTex;
uniform sampler2D u_BlockTex;
uniform sampler2D u_DecorativeTex;

uniform float u_Time;
uniform vec4 u_FogColor;
uniform vec4 u_CloudMove;
uniform float u_AlphaController;
uniform float u_CloudController;
uniform float u_TexScale;
uniform float u_Fresnelrange;
uniform float u_ScaleController;

varying vec2 v_Texcoord0;
varying vec3 v_Normal;
varying vec3 v_ViewDir;

void main()
{
    vec3 worldNormal = normalize(v_Normal);
    float fresnelFactor = (max(0.0, ( max(0.0, dot(normalize(v_ViewDir), worldNormal)-u_Fresnelrange))));

    vec4 ahlpaMask = texture2D(u_BlockTex, v_Texcoord0);
    vec2 iuv = v_Texcoord0;
    iuv.x += u_Time * 0.05 * 0.15 * u_CloudMove.x;
    iuv.y += u_Time * 0.05 * 0.075 * u_CloudMove.y;

    vec2 c = texture2D(u_DecorativeTex, vec2(iuv.x, iuv.y + u_Time * 0.05 * (0.3 - u_ScaleController * 0.15))).gb + texture2D(u_DecorativeTex, vec2(iuv.x + u_Time * 0.05 * 0.1, iuv.y)).gb - vec2(1.0, 1.0);

    vec2 ruv = vec2(iuv.x - 0.5, iuv.y - 0.5) + c.xy * 0.02;
    vec4 h = texture2D(u_FogTex, vec2(ruv.x * u_TexScale, ruv.y * u_TexScale));
    vec4 h2 = texture2D(u_FogTex, vec2(ruv.x * u_TexScale * 2.0, ruv.y * u_TexScale * 2.0));
    vec4 h3 = texture2D(u_FogTex, vec2(ruv.x * u_TexScale * 6.0, ruv.y * u_TexScale * 6.0));
    h = lerp( lerp(h, h2, u_ScaleController * 0.5 ), h3, (max(0.0, u_ScaleController - 1.0)));
    h.a = ahlpaMask.r * (1.0 - u_AlphaController) * (fresnelFactor * 3.0);
    h.a = lerp(h.a, h.a * (1.0 - max(0.0, (h.b - h.r))), u_CloudController);
    gl_FragColor = h;
}
