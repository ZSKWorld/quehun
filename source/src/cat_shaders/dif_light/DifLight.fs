precision highp float;

#include "Lighting.glsl";
#include "ShaderTool.glsl";

uniform sampler2D u_MainTex;

varying vec2 v_Texcoord0;


varying vec3 v_Normal;

uniform vec4 u_LightDir;
uniform vec4 u_LightColor;
uniform float u_LightController;

void main()
{
    vec3 col = texture2D(u_MainTex, v_Texcoord0).rgb;

    vec3 worldNormal = normalize(v_Normal);
    vec3 wordLightDir = normalize(unityPositionToLaya(u_LightDir)).xyz;
    col.rgb = lerp(col.rgb, col.rgb * u_LightColor.rgb * min(1.5, (max(0.0, dot(worldNormal, wordLightDir))) * 2.0 + 0.2), u_LightController);

    gl_FragColor = vec4(col, 1.0);
}
