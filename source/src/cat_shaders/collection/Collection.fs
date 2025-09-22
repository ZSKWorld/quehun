#ifdef FSHIGHPRECISION
precision highp float;
#else
precision mediump float;
#endif
#include "ShaderTool.glsl";

uniform sampler2D u_AlbedoTexture;
varying vec2 v_Texcoord0;

uniform sampler2D u_AO;
varying vec2 v_Texcoord1;
uniform vec4 u_aoColor;
uniform vec4 u_lightColor;
uniform float u_aoStrenth;
uniform float u_Color;
uniform float u_AlphaScale;

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
    color *= texture2D(u_AlbedoTexture, v_Texcoord0);
    vec4 _AO_var = texture2D(u_AO, v_Texcoord1);
    vec3 emissive = (lerp(color.rgb,u_lightColor.rgb,_AO_var.r)*(color.rgb*lerp(u_aoColor.rgb,vec3(u_aoStrenth,u_aoStrenth,u_aoStrenth),_AO_var.r)));
    gl_FragColor = vec4(emissive, color.a * u_AlphaScale);

}
