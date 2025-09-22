#include "Lighting.glsl";
#include "ShaderTool.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;
attribute vec4 a_Color;

uniform mat4 u_MvpMatrix;

uniform float u_OffsetSpeed;
uniform float u_OffsetDir;
uniform float u_OffsetAmp;

uniform float u_Movetape;
uniform float u_Time;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;

void main() {
    vec4 position = u_MvpMatrix * a_Position;
    position = remapGLPositionZ(position);
    
    vec4 tc = vec4(a_Color.r-0.5,a_Color.g-0.5,a_Color.b-0.5,a_Color.a-0.5);
    float offsct = maxV4(tc, 0.0);
	float offset = (sin(u_OffsetSpeed *(offsct + u_Time * 0.05) * 10.0) - u_OffsetDir)* u_OffsetAmp*offsct*0.25;
	float offsetb = (sin(u_Time * 0.05 * 10.0 * u_OffsetSpeed) *offsct - u_OffsetDir)* u_OffsetAmp*offsct*0.25;
	offset = lerp(offset, offsetb, u_Movetape);

    position.x += offset;
    position.y += offset * 0.25;
    v_Texcoord0 = a_Texcoord0;
    v_Texcoord1 = a_Texcoord1;
    gl_Position = position;
}
