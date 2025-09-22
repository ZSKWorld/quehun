// #include "Lighting.glsl";

// attribute vec4 a_Position;

// uniform mat4 u_WorldMat;
// uniform vec4 u_LightDir;
// uniform float u_ShadowPos;
// uniform mat4 u_ViewProjection;
// uniform float u_Angle;

// #ifdef GPU_INSTANCE
// attribute mat4 a_MvpMatrix;
// #else
// uniform mat4 u_MvpMatrix;
// #endif

// #ifdef TILINGOFFSET
//     uniform vec4 u_TilingOffset;
// #endif

// #ifdef BONE
// const int c_MaxBoneCount = 24;
// attribute vec4 a_BoneIndices;
// attribute vec4 a_BoneWeights;
// uniform mat4 u_Bones[c_MaxBoneCount];
// #endif

// vec4 CalculateRotation(vec4 pos){
// 	float s = sin(radians(u_Angle));
// 	float c = cos(radians(u_Angle));
// 	mat2 rotMatrix = mat2(c, -s, s, c);
// 	pos.yz = pos.yz * rotMatrix;
// 	return pos;
// }
// //求逆矩阵
// mat4 InverseMat(mat4 m) {
// 		// M* / |M|
// 		//OpenGL 矩阵，按列存储，下面是对应到行列式
// 		float m00 = m[0][0],m01 = m[0][1],m02 = m[0][2],m03 = m[0][3];
// 		float m10 = m[1][0],m11 = m[1][1],m12 = m[1][2],m13 = m[1][3];
// 		float m20 = m[2][0],m21 = m[2][1],m22 = m[2][2],m23 = m[2][3];
// 		float m30 = m[3][0],m31 = m[3][1],m32 = m[3][2],m33 = m[3][3];

// 		//计算|M|,结果保存在det中，det00->det03计算的每个元素对应的代数余子式
// 		//计算过程就是把四阶的行列式展开成三阶的行列式
// 		float det = 0.0;
// 		float det00,det01,det02,det03;
// 		det00 = m11*(m22*m33-m32*m23)-m12*(m21*m33-m31*m23)+m13*(m21*m32-m31*m22);
// 		det01 = m10*(m22*m33-m32*m23)-m12*(m20*m33-m30*m23)+m13*(m20*m32-m30*m22);
// 		det02 = m10*(m21*m33-m31*m23)-m11*(m20*m33-m30*m23)+m13*(m20*m31-m30*m21);
// 		det03 = m10*(m21*m32-m31*m22)-m11*(m20*m32-m30*m22)+m12*(m20*m31-m30*m21);

// 		det = m00*det00-m01*det01+m02*det02-m03*det03;
// 		float Invdet = 1.0/det;
// 		//把余子式变成代数余子式
// 		det01*=-1.0;
//         det03*=-1.0;
// 		//计算det10->det33 对应元素的代数余子式
// 		float det10,det11,det12,det13;
// 		det10 = m01*(m22*m33-m32*m23)-m02*(m21*m33-m31*m23)+m03*(m21*m32-m31*m22);
// 		det11 = m00*(m22*m33-m32*m23)-m02*(m20*m33-m30*m23)+m03*(m20*m32-m30*m22);
// 		det12 = m00*(m21*m33-m31*m23)-m01*(m20*m33-m30*m23)+m03*(m20*m31-m30*m21);
// 		det13 = m00*(m21*m32-m31*m22)-m01*(m20*m32-m30*m22)+m02*(m20*m31-m30*m21);
// 		//把余子式变成代数余子式
// 		det10*=-1.0;
//         det12*=-1.0;

// 		float det20,det21,det22,det23;
// 		det20 = m01*(m12*m33-m32*m13)-m02*(m11*m33-m31*m13)+m03*(m11*m32-m31*m12);
// 		det21 = m00*(m12*m33-m32*m13)-m02*(m10*m33-m30*m13)+m03*(m10*m32-m30*m12);
// 		det22 = m00*(m11*m33-m31*m13)-m01*(m10*m33-m30*m13)+m03*(m10*m31-m30*m11);
// 		det23 = m00*(m11*m32-m31*m12)-m01*(m10*m32-m30*m12)+m02*(m10*m31-m30*m11);
// 		//把余子式变成代数余子式
// 		det21*=-1.0;
//         det23*=-1.0;

// 		float det30,det31,det32,det33;
// 		det30 = m01*(m12*m23-m22*m13)-m02*(m11*m23-m21*m13)+m03*(m11*m22-m21*m12);
// 		det31 = m00*(m12*m23-m22*m13)-m02*(m10*m23-m20*m13)+m03*(m10*m22-m20*m12);
// 		det32 = m00*(m11*m23-m21*m13)-m01*(m10*m23-m20*m13)+m03*(m10*m21-m20*m11);
// 		det33 = m00*(m11*m22-m21*m12)-m01*(m10*m22-m20*m12)+m02*(m10*m21-m20*m11);
// 		//把余子式变成代数余子式
// 		det30*=-1.0;
//         det32*=-1.0;
//         mat4 result = mat4(0.0);
// 		//伴随矩阵M*/|M| ,1/|M|保存在Invdet
// 		//注意这里伴随矩阵是把行元素对应的代数余子式写在列上
// 		result[0][0] = det00*Invdet;result[1][0] = det01*Invdet;result[2][0] = det02*Invdet;result[3][0] = det03*Invdet;
// 		result[0][1] = det10*Invdet;result[1][1] = det11*Invdet;result[2][1] = det12*Invdet;result[3][1] = det13*Invdet;
// 		result[0][2] = det20*Invdet;result[1][2] = det21*Invdet;result[2][2] = det22*Invdet;result[3][2] = det23*Invdet;
// 		result[0][3] = det30*Invdet;result[1][3] = det31*Invdet;result[2][3] = det32*Invdet;result[3][3] = det33*Invdet;
//         return result;
// }


// void main() {
//     vec4 vt;
//     #ifdef BONE
//         mat4 skinTransform = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
//         skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
//         skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
//         skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
//         vt=skinTransform*a_Position;
//         vt=skinTransform*a_Position;
//     #else
//         vt=a_Position;
//     #endif
//     vt = u_WorldMat * vt;
//     vt.y -= u_ShadowPos;
//     vec4 u_LightDir2 = CalculateRotation(vec4(100.0,200.0,100.0,0.0));

//     mat4 worldMatInvert = InverseMat(u_WorldMat);

//     vec3 litDir = normalize(vec3(u_LightDir2.x, u_LightDir2.y+vt.y, u_LightDir2.z)-vt.xyz);
//     vt.xz = vt.xz - (vt.y / litDir.y)*litDir.xz;
//     vt.y = u_ShadowPos;
//     vt = worldMatInvert * vt;
// 	vt = CalculateRotation(vt);

//     #ifdef GPU_INSTANCE
//         vt = a_MvpMatrix * vt;
//     #else
//         vt = u_MvpMatrix * vt;
//     #endif
//         gl_Position = remapGLPositionZ(vt);
// }
/////////////////////////////////////////////////////////////////////////////
#include "ShadowCasterVS.glsl";

void main()
{
    vec4 positionCS =  shadowCasterVertex();
    gl_Position=remapGLPositionZ(positionCS);
}