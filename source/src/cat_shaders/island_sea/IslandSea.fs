#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#include "Lighting.glsl";

#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
varying vec4 v_Color;
#endif

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
varying vec2 v_uv0;
#endif
varying vec2 v_uv1;

uniform vec4 u_TilingOffset;
uniform vec4 u_to1;
uniform vec4 u_to2;

uniform vec4 u_AlbedoColor;
//uniform sampler2D u_wave;
uniform sampler2D u_wave2;
uniform sampler2D u_waterNormal;
uniform vec4 u_waterColor;
uniform float u_Time;
uniform float u_speed;        
uniform float u_wuSpeed;
uniform float u_wvSpeed;
uniform float u_opacityMin;
uniform float u_opacityMax;
uniform float u_side;
uniform float u_gloss;
uniform float u_waveFrequency;
uniform float u_waveTime;
uniform vec4 u_lightDir;
uniform mat4 u_WorldMat;
uniform vec3 u_CameraPos;

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

    //vec3 viewDirection = normalize(vec3(-3.92, 3.42, 14.8) - v_posWorld.xyz);
    vec3 viewDirection = normalize(u_CameraPos.xyz - v_posWorld.xyz);
    // vec3 eyePos = vec3(u_CameraPos.x, u_CameraPos.y, u_CameraPos.z);
    //vec3 viewDirection = normalize(eyePos - v_posWorld.xyz);
    vec3 halfDir = normalize((viewDirection+u_lightDir.rgb));

    float node_4527 = (u_Time * 2.0);
    float node_8541 = (-(node_4527*u_speed));
    vec2 node_3877 = (v_uv0+node_8541*vec2(-0.11,-0.15));
    vec4 node_1866 = texture2D(u_waterNormal,TransformUV(node_3877, u_to2));
    vec2 node_7387 = (v_uv0+node_8541*vec2(0.15,0.24));
    vec4 node_2502 = texture2D(u_waterNormal,TransformUV(node_7387, u_to2));
    vec3 node_3911 = (node_1866.rgb+node_2502.rgb);

    float node_9016 = (u_Time);
    float node_5897 = (u_waveTime+(u_waveFrequency*node_9016));
    float node_5000 = (sin(node_5897));
    vec2 wave = (v_uv0+vec2((u_wvSpeed*node_5000),(node_5000*u_wuSpeed)));
    vec2 node_9031 = wave;
    vec4 _waveTex_var = texture2D(u_AlbedoTexture,TransformUV(node_9031, u_TilingOffset));

    float waveAtten = (clamp(((1.2+cos(node_5897))+sin(node_5897)),0.0,1.0));
    float node_8866 = (v_uv0.g);            
    float node_3546 = (waveAtten-node_8866);
    float node_2132 = (sin(node_5897)-cos(node_5897));
    vec2 wave2 = (v_uv0+vec2((u_wvSpeed*node_2132),(node_2132*u_wuSpeed)));
    vec2 node_7762 = wave2;
    vec4 _waveTex2_var = texture2D(u_wave2,TransformUV(node_7762, u_to1));

    float node_9827 = clamp(((_waveTex_var.r*node_3546)+(_waveTex2_var.r*node_3546)),0.0,1.0);

    vec3 emissive = (((dot(u_lightDir.rgb,node_3911)+(pow(max(0.0,dot(node_1866.rgb,halfDir)),u_gloss)*0.1))*u_waterColor.rgb)+node_9827);

    vec3 finalColor = emissive;

    vec4 finalRGBA = vec4(finalColor,(node_9827+clamp((node_8866*u_side),u_opacityMin,u_opacityMax)));

    gl_FragColor = finalRGBA;
}

