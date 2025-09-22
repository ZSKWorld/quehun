precision highp float;

uniform sampler2D u_MainTex;
uniform vec4 u_ShadowsColor;
uniform vec4 u_LightDir;
uniform vec4 u_SpecColor;
uniform vec3 u_CameraPos;
uniform float u_SpecSacle;
uniform float u_SpecPower;
uniform float u_FactorRange;

varying vec2 v_Texcoord0;
varying vec3 v_ViewDir;
varying vec3 v_WorldNormal;
varying vec4 v_WorldPos;
varying vec4 v_Color;

void main()
{
	vec3 worldNormal = normalize(v_WorldNormal);
	vec3 fnlviewDir = normalize(u_CameraPos.xyz - v_WorldPos.xyz);
	float LfresnelFactor = max(0.0, u_FactorRange - dot(fnlviewDir, worldNormal));

	vec3 r = normalize(reflect(u_LightDir.xyz, worldNormal));
	float t = pow(max(dot(-r, v_ViewDir), 0.0), u_SpecPower);
	vec4 spec = t * u_SpecColor;

	vec4 col = texture2D(u_MainTex, v_Texcoord0);
	col.rgb*= v_Color.r;
	col.rgb += u_ShadowsColor.rgb*LfresnelFactor+ spec.rgb*u_SpecSacle;
				
	col.a += LfresnelFactor;
	col.a *= v_Color.r;
    gl_FragColor = col;
}
