precision highp float;

#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_MainTex;
uniform sampler2D u_SpecTex;
uniform vec4 u_SpeculaCrolor;
uniform float u_Gloss;
uniform float u_RimColorRange;
uniform float u_RimColorController;
uniform vec4 u_LightColor;
uniform vec4 u_RefColor;
uniform float u_BloomRange;
uniform float u_BloomPow;
uniform float u_GlobalController;
uniform float u_SpecPower;
uniform vec4 u_RimColor;
uniform vec3 u_CameraPos;
uniform vec4 u_ShadowA;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec3 v_LightDir;
varying vec3 v_WorldNormal;
varying vec3 v_WorldPos;

void main()
{
    vec4 col = texture2D(u_MainTex, v_Texcoord0);
    vec4 spe = texture2D(u_SpecTex, v_Texcoord1);

    vec3 worldNormal = normalize(v_WorldNormal);
    vec3 LightDir = normalize(v_LightDir);
    vec3 refDir = normalize(reflect(-LightDir, worldNormal));

    vec3 viewDir = normalize(u_CameraPos.xyz - v_WorldPos.xyz);
    vec3 specular = u_SpeculaCrolor.rgb * pow(max(0.0, dot(viewDir, refDir)), u_Gloss);


    float f = max(0.0, u_RimColorRange - saturate(dot(viewDir, worldNormal)));
    vec3 rimColor = f * col.rgb * u_RimColorController;

    float ls = dot(worldNormal, LightDir);
    vec3 Global = ((saturate(max(0.0, ls)) * u_LightColor.rgb + 1.0)*0.5 + (1.0 - ls) * u_RefColor.rgb);

    float lightmap = (spe.r+ ls +(max(u_BloomRange, (spe.r+ ls)*0.7) - u_BloomRange) * (0.7 * u_BloomPow))*0.5;
    col.rgb = (lerp(col.rgb, col.rgb*lightmap, 0.3));

    col.rgb = saturate(lerp(col.rgb, col.rgb * (Global*1.2), u_GlobalController )+ (specular * u_SpecPower * u_SpeculaCrolor.rgb)* spe.g) + rimColor*u_RimColor.rgb;

    col.a = spe.b;

    gl_FragColor = col*u_ShadowA;
}
