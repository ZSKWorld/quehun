precision highp float;

#include "Lighting.glsl";

uniform sampler2D u_RefTex;
uniform sampler2D u_BumpTex;
uniform sampler2D u_MoveWaveTex;

uniform mat4 u_WorldMat;
uniform float u_Time;
uniform vec4 u_LightDir;
uniform float u_SpecPower;
uniform float u_SpecScale;
uniform vec4 u_WaterSpecColor;
uniform vec4 u_WaterColor;
uniform vec4 u_Fresnel;
uniform float u_MwController;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec2 v_Texcoord2;
varying vec4 v_Color;
varying vec3 v_ViewDir;
varying vec3 v_worldNormal;

#ifdef ALPHATEST
uniform float u_AlphaTestValue;
#endif

#ifdef FOG
uniform float u_FogStart;
uniform float u_FogRange;
#ifdef ADDTIVEFOG
#else
uniform vec3 u_FogColor;
#endif
#endif

vec3 unpackScaleNormal(vec3 packednormal, float bumpScale)
{
    vec3 normal = packednormal.xyz * 2.0 - 1.0;
    //normal.y = -normal.y;//NOTE:because unity to LayaAir coordSystem.
    normal.xy *= bumpScale;
    return normal;
}

float  luminance(vec4 col)
{
	float luminance = col.r * 0.2125 + col.g * 0.7154 + col.b * 0.0721;
	return luminance;
}
vec3 lerp(vec3 l, vec3 r, float t)
{
    vec3 o = vec3(0.0, 0.0, 0.0);
    o.x = l.x + (r.x - l.x) * t;
    o.y = l.y + (r.y - l.y) * t;
    o.z = l.z + (r.z - l.z) * t;
    return o;
}

void main()
{
    vec2 uvMove = v_Texcoord0;
    uvMove.x += u_Time * 0.05;
    uvMove.y += u_Time * 0.05 * 0.3;
    //uvMove.y -= sin(u_Time * 0.05 * 30.0) * 0.02;
    vec4 moveWave = texture2D(u_MoveWaveTex, uvMove);
    moveWave *= u_MwController;
    vec3 viewdir = normalize(v_ViewDir);

    vec3 sampledNormalT1 = texture2D(u_BumpTex, TransformUV(v_Texcoord1, vec4(1.0, 1.0, 0.0, 0.0))).rgb;
    sampledNormalT1 = (sampledNormalT1 * 2.0 - 1.0) * 2.0;
    sampledNormalT1 = normalize(sampledNormalT1);
    vec3 sampledNormalT2 = texture2D(u_BumpTex, TransformUV(v_Texcoord2, vec4(1.0, 1.0, 0.0, 0.0))).rgb;
    sampledNormalT2 = (sampledNormalT2 * 2.0 - 1.0) * 2.0;
    sampledNormalT2 = normalize(sampledNormalT2);

    vec3 sampledNormalT = normalize((sampledNormalT1 + sampledNormalT2)*u_MwController);
    vec3 normalL = vec3(sampledNormalT.x, sampledNormalT.z, sampledNormalT.y);
    vec3 normalW = normalize(normalL);

    vec3 r = reflect(u_LightDir.xyz * 0.01, normalW);
    r = normalize(r);
    float t = pow(max(dot(-r, viewdir), 0.0), u_SpecPower);
    vec4 spec = t * u_WaterSpecColor;

    float fresnelFactor = dot(viewdir.xyz * u_Fresnel.xyz * 0.1, normalL);
    float fresnelFactor2 = dot(viewdir.xyz, v_worldNormal);

    vec4 water = texture2D(u_RefTex, vec2(fresnelFactor, fresnelFactor));
    vec3 lerpcolor3 = mix(water.rgb, water.rgb*u_WaterColor.rgb, 0.5);
    vec4 color = vec4(lerpcolor3 + spec.rgb * u_SpecScale, 0.85);

    // color.rgb *= (0.9 - fresnelFactor2) + 1.3;
    // float colorLF = luminance(color);
    // vec3 colorL = vec3(colorLF,colorLF,colorLF);
    // color.rgb = lerp(color.rgb, colorL,max(0.0, fresnelFactor2 - 0.55)*1.25);
    // color -= max(0.0,fresnelFactor2-0.8);
    // color.rgb += mix(moveWave.rgb, moveWave.rgb * pow(max(dot(-r, viewdir), 0.0), 500.0) * 1.5, 0.95) * 1.2;
    // color.a += moveWave.a * 0.1;

    gl_FragColor = color;
}
