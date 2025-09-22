#ifdef FSHIGHPRECISION
    precision highp float;
#else
    precision mediump float;
#endif

uniform sampler2D u_MainTex;
uniform sampler2D u_ComTex;
uniform float u_GrayRange;
uniform float u_FogRangeMax;
uniform float u_FogRangePow;
uniform vec4 u_FogtCol;
uniform float u_BloomTest;


varying vec2 v_Texcoord0;

float  luminance(vec4 col)
{
        float luminance = col.r * 0.2125 + col.g * 0.7154 + col.b * 0.0721;
        return luminance;
} 
vec3 lerp(vec3 l, vec3 r, float t)
{
    vec3 o = vec3(0.0, 0.0, 0.0);
    o.x = l.x + (r.x - l.x) * t;
    o.y = l.y + (r.y - l.y) * t;
    o.z = l.z + (r.z - l.z) * t;
    return o;
}  

void main()
{
        float range = 0.001;
        vec4 col = texture2D(u_MainTex, v_Texcoord0);                
        vec4 col1 = texture2D(u_MainTex, vec2(v_Texcoord0.x + range, v_Texcoord0.y));
        vec4 col2 = texture2D(u_MainTex, vec2(v_Texcoord0.x - range, v_Texcoord0.y));
        vec4 col3 = texture2D(u_MainTex, vec2(v_Texcoord0.x - range, v_Texcoord0.y + range));
        vec4 col4 = texture2D(u_MainTex, vec2(v_Texcoord0.x - range, v_Texcoord0.y - range));
        vec4 col5 = texture2D(u_MainTex, vec2(v_Texcoord0.x + range, v_Texcoord0.y + range));
        vec4 col6 = texture2D(u_MainTex, vec2(v_Texcoord0.x + range, v_Texcoord0.y - range));
        vec4 col7 = texture2D(u_MainTex, vec2(v_Texcoord0.x , v_Texcoord0.y + range));
        vec4 col8 = texture2D(u_MainTex, vec2(v_Texcoord0.x , v_Texcoord0.y - range));
        vec4 col9 = texture2D(u_MainTex, vec2(v_Texcoord0.x + 2.0 * range, v_Texcoord0.y));
        vec4 col10 = texture2D(u_MainTex, vec2(v_Texcoord0.x - 2.0 * range, v_Texcoord0.y));
        vec4 col11 = texture2D(u_MainTex, vec2(v_Texcoord0.x - 2.0 * range, v_Texcoord0.y + 2.0 * range));
        vec4 col12 = texture2D(u_MainTex, vec2(v_Texcoord0.x - 2.0 * range, v_Texcoord0.y - 2.0 * range));
        vec4 col13 = texture2D(u_MainTex, vec2(v_Texcoord0.x + 2.0 * range, v_Texcoord0.y + 2.0 * range));
        vec4 col14 = texture2D(u_MainTex, vec2(v_Texcoord0.x + 2.0 * range, v_Texcoord0.y - 2.0 * range));
        vec4 col15 = texture2D(u_MainTex, vec2(v_Texcoord0.x, v_Texcoord0.y + 2.0 * range));
        vec4 col16 = texture2D(u_MainTex, vec2(v_Texcoord0.x, v_Texcoord0.y - 2.0 * range));
        vec4 col17 = texture2D(u_MainTex, vec2(v_Texcoord0.x+ range, v_Texcoord0.y + 2.0 * range));
        vec4 col18 = texture2D(u_MainTex, vec2(v_Texcoord0.x+ range, v_Texcoord0.y - 2.0 * range));
        vec4 col19 = texture2D(u_MainTex, vec2(v_Texcoord0.x - range, v_Texcoord0.y + 2.0 * range));
        vec4 col20 = texture2D(u_MainTex, vec2(v_Texcoord0.x - range, v_Texcoord0.y - 2.0 * range));
        vec4 col21 = texture2D(u_MainTex, vec2(v_Texcoord0.x + 2.0 * range, v_Texcoord0.y+ range));
        vec4 col22 = texture2D(u_MainTex, vec2(v_Texcoord0.x - 2.0 * range, v_Texcoord0.y + range));
        vec4 col23 = texture2D(u_MainTex, vec2(v_Texcoord0.x + 2.0 * range, v_Texcoord0.y - range));
        vec4 col24 = texture2D(u_MainTex, vec2(v_Texcoord0.x - 2.0 * range, v_Texcoord0.y - range));

        vec4 lm1 = (col1 + col2 + col3 + col4 + col5 + col6 + col7 + col8 + col+ col9+ col10+ col11+ col12+ 
                col13+ col14+ col15+ col6+ col17+ col18+ col19+ col20+ col21+ col22+ col23+col24) *0.04;
        float lm2 = luminance(lm1);

        vec3  lm3 = lerp(col.rgb, vec3(lm2, lm2, lm2),u_GrayRange);

        col.rgb = lerp(col.rgb, u_FogtCol.rgb,min( 1.0, max(0.0, v_Texcoord0.y - u_FogRangeMax ) * u_FogRangePow ));

        // col.rgb = lerp(col.rgb, col.rgb + max( 0.0, ( lm2 - 0.8 )) * 5.0, u_BloomTest );
         col.rgb = lerp(col.rgb, col.rgb+max(0.0,(lm2 -0.7))*max(0.0,(0.75-max(0.5,v_Texcoord0.y)))*3.0, u_BloomTest);

        gl_FragColor = col;
}