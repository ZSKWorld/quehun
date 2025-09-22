precision highp float;

#include "Lighting.glsl";

uniform sampler2D u_MainTex;

varying vec2 v_Texcoord0;

varying vec3 v_Color;
void main()
{
    vec3 col = texture2D(u_MainTex, v_Texcoord0).rgb;
    gl_FragColor = vec4(col, v_Color.r);
}
