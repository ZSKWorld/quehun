uniform mat4 u_MvpMatrix;
uniform  float u_CurrentTime;

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
#ifdef COLOR
attribute vec4 a_Color;
#endif

varying vec2 v_TextureCoordinate;
varying float v_Time;
varying vec4 v_Color;

#ifdef BONE
attribute vec4 a_BoneIndices;
attribute vec4 a_BoneWeights;
const int c_MaxBoneCount = 24;
uniform mat4 u_Bones[c_MaxBoneCount];
#endif

void main()
{
#ifdef BONE
	mat4 skinTransform=mat4(0.0);
	skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
	skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
	skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
	skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
	vec4 position=skinTransform*a_Position;
	gl_Position = u_MvpMatrix * position;
#else
	gl_Position = u_MvpMatrix * a_Position;
#endif
    v_TextureCoordinate = a_Texcoord0;
    v_Time = u_CurrentTime;
#ifdef COLOR
    v_Color = a_Color;
#else
    v_Color = vec4(1.0, 1.0, 1.0, 1.0);
#endif
}