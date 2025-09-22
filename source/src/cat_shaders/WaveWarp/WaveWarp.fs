#ifdef FSHIGHPRECISION
    precision highp float;
#else
    precision mediump float;
#endif
#include "ShaderTool.glsl";

uniform sampler2D u_MainTex;
uniform sampler2D u_ComTex;
uniform float u_GrayRange;
uniform float u_FogRangeMax;
uniform float u_FogRangePow;
uniform vec4 u_FogtCol;


varying vec2 v_Texcoord0;

void main()
{
    vec4 col = texture2D(u_MainTex, v_Texcoord0);
    vec4 comCol = texture2D(u_ComTex, v_Texcoord0);
    if(col == comCol)
        col.rgb = col.rgb - comCol.rgb;
    
    float luminance = col.r * 0.2125 + col.g * 0.7154 + col.b * 0.0721;
    if(luminance == 0.0)
        gl_FragColor = comCol;
    else{
        col.rgb = lerp(col.rgb, vec3(luminance, luminance, luminance), max(0.0,v_Texcoord0.y- u_GrayRange));
        col.rgb = lerp(col.rgb, u_FogtCol.rgb,min(1.0,max(0.0,v_Texcoord0.y- u_FogRangeMax)*u_FogRangePow));
        gl_FragColor = col;
    }
}
