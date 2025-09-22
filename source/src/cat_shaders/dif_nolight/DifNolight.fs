precision highp float;

#include "Lighting.glsl";

uniform sampler2D u_MainTex;

varying vec2 v_Texcoord0;

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
    vec3 col = texture2D(u_MainTex, v_Texcoord0).rgb;
    gl_FragColor = vec4(col, 1.0);
}
