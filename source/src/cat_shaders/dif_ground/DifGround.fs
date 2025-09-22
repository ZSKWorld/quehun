precision highp float;
#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_MainTexR;
uniform sampler2D u_MainTexG;
uniform sampler2D u_MainTexB;
uniform sampler2D u_MainTexA;
uniform sampler2D u_RGBAaisle;
uniform sampler2D u_LightTex;

uniform vec4 u_LightCol;
uniform vec4 u_ShadowCol;
uniform float u_LightController;
uniform float u_CastController;
uniform float u_GlobalController;
uniform float u_BloomRange;
uniform float u_BloomPow;
uniform float u_LightRange;
uniform float u_Saturation;
uniform float u_SpRange;

varying vec2 uvr;
varying vec2 uvg;
varying vec2 uvb;
varying vec2 uva;
varying vec2 uv4;
varying vec2 uv5;

void main()
{
	vec4 colr = texture2D(u_MainTexR, uvr);
	vec4 colg = texture2D(u_MainTexG, uvg);
	vec4 colb = texture2D(u_MainTexB, uvb);
	vec4 cola = texture2D(u_MainTexA, uva);
	vec4 aisle = texture2D(u_RGBAaisle, uv4);
	vec4 col_l = texture2D(u_LightTex, uv5);
	float col_sp = col_l.b;
	float tempBloomRange = u_BloomRange * 0.85;

	vec4 col = colr * aisle.r + colg * aisle.g+ colb * aisle.b+ cola * (1.0 - aisle.a);
	col_sp = lerp(col_l.r, col_sp, u_SpRange);
	col_l.rgb = lerp(vec3(col_l.r, col_l.r, col_l.r), vec3(col_l.g, col_l.g, col_l.g), u_LightRange);

	col_l = col_l+(max(tempBloomRange, col_sp) - tempBloomRange) * (0.7 * u_BloomPow);
	col.rgb =lerp(col.rgb,col.rgb*col_l.rgb, u_LightController);

	vec3 castCol = lerp(col.rgb, u_LightCol.rgb*col.rgb, max(0.0, col_l.r-0.65));
	castCol = lerp(castCol.rgb, u_ShadowCol.rgb+castCol.rgb, max(0.0,1.0-col_l.r * 1.35));

	col.rgb = saturate( lerp(col.rgb,min(vec3(1.0,1.0,1.0), castCol*u_GlobalController).rgb, u_CastController));
	float luminance = col.r * 0.2125 + col.g * 0.7154 + col.b * 0.0721;

	vec3 luminanceColor = vec3(luminance, luminance, luminance);
	col.rgb = lerp(luminanceColor.rgb, col.rgb, u_Saturation);

    gl_FragColor = col;
}
