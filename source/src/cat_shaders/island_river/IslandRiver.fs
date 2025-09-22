#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#include "Lighting.glsl";
#include "ShaderTool.glsl";

#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
varying vec4 v_Color;
#endif

varying vec2 v_uv0;
varying vec2 v_uv1;

uniform vec4 u_TilingOffset;
uniform vec4 u_to1;
uniform vec4 u_to2;
uniform vec4 u_to3;
uniform vec4 u_to5;

uniform vec4 u_AlbedoColor;
uniform vec4 u_waterColor;
uniform sampler2D u_AlbedoTexture;
uniform sampler2D u_AO;
uniform sampler2D u_noise;
uniform sampler2D u_wave;
uniform float u_Time;
uniform float u_fuSpeed;
uniform float u_fvSpeed;
uniform float u_wuSpeed;
uniform float u_wvSpeed;
uniform float u_blend;
uniform float u_side;
uniform float u_bright;
uniform mat4 u_WorldMat;
uniform vec4 u_aoColor;
uniform vec4 u_lightColor;
uniform float u_aoStrenth;

varying vec4 v_posWorld;

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
    vec4 objPos = u_WorldMat * vec4(0,0,0,1);
    float node_5809 = (u_fvSpeed*u_Time);
    float node_9752 = (u_Time*u_fuSpeed);
    vec2 flow = ((vec2(node_5809,node_9752)+vec2((1.0-node_9752),node_5809))*0.5);
    vec2 node_1391 = (v_uv0+flow);
    vec4 _NoiseTex_var = texture2D(u_noise,TransformUV(node_1391,u_to2));
    vec2 node_5710 = (v_uv0+(vec2(_NoiseTex_var.r,_NoiseTex_var.r)*u_blend));
    vec4 _MainTex_var = texture2D(u_AlbedoTexture,TransformUV(node_5710,u_to1));
    float node_5000 = sin(u_Time);

    vec2 wave = (v_uv0+vec2((u_wvSpeed*node_5000),(node_5000*u_wuSpeed)));
    vec2 node_134 = wave;
    vec4 _wave_var = texture2D(u_wave,TransformUV(node_134,u_to3));

    float node_913 = 0.5;
    float node_1592 = ((node_913*((1.0-v_uv0.g)*u_side))*(node_913*(v_uv0.g*u_side)));
    vec3 node_1104 = ((u_bright*(u_waterColor.rgb*_MainTex_var.rgb))+clamp((_wave_var.r*(1.0-node_1592)),0.0,1.0));
    vec4 _AO_var = texture2D(u_AO,TransformUV(v_uv1, u_to5));
    vec3 emissive = (lerp(node_1104,u_lightColor.rgb,_AO_var.r)*(node_1104*lerp(u_aoColor.rgb,vec3(u_aoStrenth,u_aoStrenth,u_aoStrenth),_AO_var.r)));
    vec4 finalRGBA = vec4(emissive,node_1592);

    gl_FragColor = finalRGBA;

#ifdef FOG
    float lerpFact = clamp((1.0 / gl_FragCoord.w - u_FogStart) / u_FogRange, 0.0, 1.0);
#ifdef ADDTIVEFOG
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), lerpFact);
#else
    gl_FragColor.rgb = mix(gl_FragColor.rgb, u_FogColor, lerpFact);
#endif
#endif     
}

