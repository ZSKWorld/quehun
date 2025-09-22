precision highp float;

#include "Lighting.glsl";

uniform vec4 u_ShadowCol;

void main()
{
    gl_FragColor = vec4(u_ShadowCol.rgb, 0.35);
}
