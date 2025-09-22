// precision highp float;

// #include "Lighting.glsl";

// uniform vec4 u_ShadowCol;

// void main()
// {
//     gl_FragColor = vec4(u_ShadowCol.rgb, 0.35);
// }
////////////////////////////////////////////////////////////////////////////
#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    precision highp int;
#else
    precision mediump float;
    precision mediump int;
#endif

#include "ShadowCasterFS.glsl";

void main()
{
    gl_FragColor=shadowCasterFragment();
}