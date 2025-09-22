precision highp float;

#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_ReflectiveColor;
uniform sampler2D u_BumpMap;
uniform vec4 u_WaveScale;
uniform vec4 u_WaveSpeed;
uniform vec4 u_LightDir;
uniform float u_SpecPower;
uniform float u_SpecSacle;
uniform vec4 u_WaterSpecColor;
uniform vec4 u_WaterColor;
uniform sampler2D u_WaveTex;
uniform vec4 u_Fresnel;

uniform mat4 u_WorldMat;
uniform float u_Time;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec2 v_Texcoord2;
varying vec4 v_Color;
varying vec3 v_ViewDir;

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

void main()
{
    vec2 uvW = v_Texcoord0;
    uvW.y = 1.0 - uvW.y;
    float waveAlp = (uvW.y + 0.4);
    vec2 uvW2 = uvW;
    // uvW.y += sin(u_Time * 0.05 * 12.0) * 0.2 - 0.07;
    // uvW2.y += sin((u_Time * 0.05 + 50.0) * 12.0) * 0.2 - 0.07;
    // uvW2.x += 0.5;

	vec2 uvW3 = uvW;
	float uvOffset = max(-0.8, sin(u_Time * 0.05 * 8.0)*0.4) ;
	float uvOffset2 = max(-0.8,sin((u_Time * 0.05 + 60.0) * 8.0)*0.4);
	float uvOffset3 = max(-0.8,sin((u_Time * 0.05 + 120.0) * 8.0)*0.4);
	uvW.y -= uvOffset;
	uvW2.y -= uvOffset2;
	uvW3.y -= uvOffset3;
	uvW2.x += 0.3;
	uvW3.x += 0.6;
    uvW.y *= -1.0;
    uvW2.y *= -1.0;
    uvW3.y *= -1.0;

    vec4 _waveVar = texture2D(u_WaveTex, uvW);
    vec4 _waveVar2 = texture2D(u_WaveTex, uvW2);

    // _waveVar.rgb = _waveVar.rgb * (max(0.0, 0.925 - waveAlp)) * 5.0;
    // _waveVar2.rgb = _waveVar2.rgb * (max(0.0, 0.925 - waveAlp)) * 5.0;
    vec4 _waveVar3 = texture2D(u_WaveTex, uvW3);
	_waveVar.rgb = _waveVar.rgb * (max(0.0,waveAlp - 0.7)) * 3.5;
	_waveVar2.rgb = _waveVar2.rgb * (max(0.0, waveAlp - 0.7)) * 3.5;
	_waveVar3.rgb = _waveVar3.rgb * (max(0.0, waveAlp - 0.7)) * 3.5;

    vec3 viewdir = normalize(v_ViewDir);

    vec3 sampledNormalT1 = texture2D(u_BumpMap, v_Texcoord1).rgb;
    sampledNormalT1 = (sampledNormalT1 * 2.0 - 1.0) * 2.0;
    sampledNormalT1 = normalize(sampledNormalT1);
    vec3 sampledNormalT2 = texture2D(u_BumpMap, v_Texcoord2).rgb;
    sampledNormalT2 = (sampledNormalT2 * 2.0 - 1.0) * 2.0;
    sampledNormalT2 = normalize(sampledNormalT2);

    vec3 sampledNormalT = normalize((sampledNormalT1 + sampledNormalT2));
    vec3 normalL = vec3(sampledNormalT.x, sampledNormalT.z, sampledNormalT.y);
    vec3 normalW = normalize(normalL);

    vec3 r = reflect(vec3(-u_LightDir.x, u_LightDir.y, u_LightDir.z), normalW);
    r = normalize(r);
    float t = pow(max(dot(-r, viewdir), 0.0), u_SpecPower);
    vec4 spec = t * u_WaterSpecColor;

    float fresnelFactor = dot(viewdir.xyz + u_Fresnel.rgb, normalL);
    vec4 water = texture2D(u_ReflectiveColor, vec2(fresnelFactor, fresnelFactor));
    vec3 lerpcolor3 = lerp(water.rgb, u_WaterColor.rgb, 0.75);
    // vec3 waveVarAll = _waveVar.rgb + _waveVar2.rgb;
    vec3 waveVarAll = _waveVar.rgb*max(0.0, uvOffset)*1.5 + _waveVar2.rgb*max(0.0, uvOffset2)*1.5+ _waveVar3.rgb*max(0.0, uvOffset3)*1.5;
    float lerp_alpha = max(waveVarAll.r * (1.5 - v_Color.r ), (v_Color.r + (v_Color.r * (spec * 1.25))).r);

    vec4 color = vec4(lerpcolor3 + spec.rgb * u_SpecSacle, lerp_alpha);
    color.rgb += waveVarAll;
    gl_FragColor = color;
}
