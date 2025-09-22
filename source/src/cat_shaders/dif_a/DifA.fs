precision highp float;
#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_MainTex;
uniform sampler2D u_LightMapTex;
uniform sampler2D u_MaskTex;

uniform float u_LightController;
uniform float u_CastController;
uniform float u_GlobalController;
uniform float u_BloomRange;
uniform float u_BloomPow;
uniform float u_Saturation;
uniform float u_LightRange;
uniform float u_SpRange;
uniform float u_Alpha;

uniform vec4 u_LightColor;
uniform vec4 u_ShadowColor;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;

void main()
{
	vec4 col = texture2D(u_MainTex, v_Texcoord0);
	vec4 mask = texture2D(u_MaskTex, v_Texcoord0);
	vec4 col_l = texture2D(u_LightMapTex, v_Texcoord1);
	float col_sp = texture2D(u_LightMapTex, v_Texcoord0).b;
	col_l = col_l + (max(vec4(0.85,0.85,0.85,0.85), col_l) - 0.85) * 0.7;
    float BloomRange = u_BloomRange * 0.85;
				
	col_sp = lerp(col_l.r, col_sp, u_SpRange);
	col_l.rgb = lerp(vec3(col_l.r, col_l.r, col_l.r), vec3(col_l.g, col_l.g, col_l.g), u_LightRange);

	col_l = col_l + (max(BloomRange, col_sp) - BloomRange) * (0.7 * u_BloomPow);
	col.rgb = lerp(col.rgb, col.rgb*col_l.rgb, u_LightController);

	vec3 castCol = lerp(col.rgb, u_LightColor.rgb*col.rgb, max(0.0, (col_l.r - 0.65)));
	castCol = lerp(castCol, u_ShadowColor.rgb+castCol.rgb, max(0.0, (1.0 - col_l.r*1.35)));


	col.rgb = saturate( lerp(col.rgb, min(vec3(1.0,1.0,1.0), (castCol*u_GlobalController)), u_CastController));

	if(mask.r - 0.5 < 0.0)discard;
	float luminance = col.r * 0.2125 + col.g * 0.7154 + col.b * 0.0721;

	vec3 luminanceColor = vec3(luminance, luminance, luminance);

	col.rgb = lerp(luminanceColor, col.rgb, u_Saturation);
    col.a *= u_Alpha;
    gl_FragColor = col;
}
