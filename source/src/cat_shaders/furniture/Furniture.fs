#ifdef FSHIGHPRECISION
precision highp float;
#else
precision mediump float;
#endif
#include "ShaderTool.glsl";

#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
varying vec4 v_Color;
#endif

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
varying vec2 v_Texcoord0;
#endif
uniform sampler2D u_AO;
varying vec2 v_Texcoord1;
uniform vec4 u_aoColor;
uniform vec4 u_lightColor;
uniform vec4 u_sunColor;
uniform float u_aoStrenth;

uniform vec4 u_AlbedoColor;

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
    vec4 color =  u_AlbedoColor;
#ifdef ALBEDOTEXTURE
    color *= texture2D(u_AlbedoTexture, v_Texcoord0);
#endif
#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
    color *= v_Color;
#endif

#ifdef ALPHATEST
    if(color.a < u_AlphaTestValue)
        discard;
#endif

    vec4 _AO_var = texture2D(u_AO, v_Texcoord1);
    vec3 emissive = ((u_sunColor.rgb*_AO_var.g) + lerp(color.rgb,u_lightColor.rgb,_AO_var.r)*(color.rgb * lerp(u_aoColor.rgb, vec3(u_aoStrenth,u_aoStrenth,u_aoStrenth),_AO_var.r)));
    gl_FragColor = vec4(emissive, 1.0);

#ifdef FOG
    float lerpFact = clamp((1.0 / gl_FragCoord.w - u_FogStart) / u_FogRange, 0.0, 1.0);
#ifdef ADDTIVEFOG
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), lerpFact);
#else
    gl_FragColor.rgb = mix(gl_FragColor.rgb, u_FogColor, lerpFact);
#endif
#endif

}

