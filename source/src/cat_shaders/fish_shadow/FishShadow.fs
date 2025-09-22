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

uniform vec4 u_shadowColor;
uniform float u_shadowParam;

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
    vec4 color = texture2D(u_AlbedoTexture, v_Texcoord0);
    vec3 emissive = lerp(color.rgb,u_shadowColor.rgb,u_shadowParam);
    vec3 finalColor = emissive;
    //gl_FragColor = vec4(finalColor, 0.65);
    gl_FragColor = vec4(finalColor, 1.0);

#ifdef FOG
    float lerpFact = clamp((1.0 / gl_FragCoord.w - u_FogStart) / u_FogRange, 0.0, 1.0);
#ifdef ADDTIVEFOG
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), lerpFact);
#else
    gl_FragColor.rgb = mix(gl_FragColor.rgb, u_FogColor, lerpFact);
#endif
#endif

}
