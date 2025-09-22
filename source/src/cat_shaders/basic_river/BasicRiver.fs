precision highp float;

#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_ReflectiveColor;
uniform sampler2D u_BumpMap;
uniform sampler2D u_WaveTex;
uniform sampler2D u_LightMap;

uniform mat4 u_WorldMat;
uniform float u_Time;
uniform vec4 u_LightDir;
uniform float u_SpecPower;
uniform float u_SpecSacle;
uniform vec4 u_WaterSpecColor;
uniform vec4 u_WaterColor;
uniform vec4 u_Fresnel;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec2 v_Texcoord2;
varying vec2 v_Texcoord3;
varying vec4 v_Color;
varying vec3 v_ViewDir;

void main()
{
    vec4 Light_var = texture2D(u_LightMap, v_Texcoord3);
    float waveAlp = (v_Texcoord0.y - 1.0);
    vec2 uvW = v_Texcoord0;
    vec2 uvW2 = v_Texcoord0;
    vec2 uvW3 = v_Texcoord0;
    uvW.y += u_Time * 0.045 * 50.0;
    uvW2.y += (u_Time * 0.045 + 0.35) * 30.0;
    uvW3.y += (u_Time * 0.045 + 0.7) * 30.0;
    vec4 _waveVar = texture2D(u_WaveTex, uvW);
    vec4 _waveVar2 = texture2D(u_WaveTex, uvW2);
    vec4 _waveVar3 = texture2D(u_WaveTex, uvW3);
    float waveAlpU = abs(min(0.0, (waveAlp + 0.475))) * 3.0;
    _waveVar.rgb = _waveVar.rgb * waveAlpU;
    _waveVar2.rgb = _waveVar2.rgb * waveAlpU;
    _waveVar3.rgb = _waveVar3.rgb * waveAlpU;
    vec3 viewdir = normalize(v_ViewDir);

    vec3 sampledNormalT1 = texture2D(u_BumpMap, v_Texcoord1).rgb;
    sampledNormalT1 = (sampledNormalT1 * 2.0 - 1.0);
    sampledNormalT1.b = clamp(sqrt(1.0 - sampledNormalT1.x * sampledNormalT1.x - sampledNormalT1.y * sampledNormalT1.y) * 0.5 + 0.5, 0.0, 1.0);
    sampledNormalT1 = normalize(sampledNormalT1);
    vec3 sampledNormalT2 = texture2D(u_BumpMap, v_Texcoord2).rgb;
    sampledNormalT2 = (sampledNormalT2 * 2.0 - 1.0);
    sampledNormalT2.b = clamp(sqrt(1.0 - sampledNormalT2.x * sampledNormalT2.x - sampledNormalT2.y * sampledNormalT2.y) * 0.5 + 0.5, 0.0, 1.0);
    sampledNormalT2 = normalize(sampledNormalT2);

    vec3 sampledNormalT = normalize(0.5 * (sampledNormalT1 + sampledNormalT2));
    vec3 normalL = vec3(sampledNormalT.x, sampledNormalT.z, sampledNormalT.y);
    //vec3 _Noise_var = texture2D(u_NoiseTex, TransformUV(v_Texcoord1 + u_Time * 0.05 * 20.0 * vec2(0.0, -0.01), u_NoiseTexTrans)).rgb;

    /*normalL = normalL.rgb + vec3(_Noise_var.r - 0.5, _Noise_var.g - 0.5, 0.0) * u_NoiseScale;*/

    vec3 normalW = normalize(normalL);

    vec3 r = reflect(vec3(-u_LightDir.x, u_LightDir.y, u_LightDir.z), normalW);
    r = normalize(r);
    float t = pow(max(dot(-r, viewdir), 0.0), u_SpecPower);
    vec4 spec = t * u_WaterSpecColor;

    float fresnelFactor = dot(viewdir.xyz + u_Fresnel.rgb, normalL);
    vec4 water = texture2D(u_ReflectiveColor, vec2(fresnelFactor, fresnelFactor));
    vec3 lerpcolor3 = lerp(water.rgb, u_WaterColor.rgb, 0.75);

    vec4 lerp_color;
    lerp_color.rgb = lerpcolor3.rgb + _waveVar.rgb + _waveVar2.rgb + _waveVar3.rgb;
    vec4 color = lerp_color + spec * u_SpecSacle;
    color.a = v_Color.g;
    color.rgb *= Light_var.rgb;
    gl_FragColor = color;
}
