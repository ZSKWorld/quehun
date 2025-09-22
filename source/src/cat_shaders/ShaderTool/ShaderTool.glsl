
//求逆矩阵
mat4 invert(mat4 m) {
	float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3];
	float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3];
	float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3];
	float a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3];
	float b00 = a00 * a11 - a01 * a10;
	float b01 = a00 * a12 - a02 * a10;
	float b02 = a00 * a13 - a03 * a10;
	float b03 = a01 * a12 - a02 * a11;
	float b04 = a01 * a13 - a03 * a11;
	float b05 = a02 * a13 - a03 * a12;
	float b06 = a20 * a31 - a21 * a30;
	float b07 = a20 * a32 - a22 * a30;
	float b08 = a20 * a33 - a23 * a30;
	float b09 = a21 * a32 - a22 * a31;
	float b10 = a21 * a33 - a23 * a31;
	float b11 = a22 * a33 - a23 * a32;
	float det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	return mat4((a11 * b11 - a12 * b10 + a13 * b09),(a02 * b10 - a01 * b11 - a03 * b09),(a31 * b05 - a32 * b04 + a33 * b03),(a22 * b04 - a21 * b05 - a23 * b03),
				(a12 * b08 - a10 * b11 - a13 * b07),(a00 * b11 - a02 * b08 + a03 * b07),(a32 * b02 - a30 * b05 - a33 * b01),(a20 * b05 - a22 * b02 + a23 * b01),
				(a10 * b10 - a11 * b08 + a13 * b06),(a01 * b08 - a00 * b10 - a03 * b06),(a30 * b04 - a31 * b02 + a33 * b00),(a21 * b02 - a20 * b04 - a23 * b00),
				(a11 * b07 - a10 * b09 - a12 * b06),(a00 * b09 - a01 * b07 + a02 * b06),(a31 * b01 - a30 * b03 - a32 * b00),(a20 * b03 - a21 * b01 + a22 * b00)) / det;
}


vec4 lerp(vec4 l, vec4 r, float t)
{
    vec4 o = vec4(0.0, 0.0, 0.0,0.0);
    o.x = l.x + (r.x - l.x) * t;
    o.y = l.y + (r.y - l.y) * t;
    o.z = l.z + (r.z - l.z) * t;
    o.w = l.w + (r.w - l.w) * t;
    return o;
}
vec3 lerp(vec3 l, vec3 r, float t)
{
    vec3 o = vec3(0.0, 0.0, 0.0);
    o.x = l.x + (r.x - l.x) * t;
    o.y = l.y + (r.y - l.y) * t;
    o.z = l.z + (r.z - l.z) * t;
    return o;
}
float lerp(float l, float r, float t)
{
    return l+(r-l)*t;
}

float saturate(float n) {
    if (n < 0.0) {
        return 0.0; 
    } else if (n > 1.0) {
        return 1.0; 
    } else {
        return n; 
    }
}

vec3 saturate(vec3 l) 
{
    vec3 o = vec3(saturate(l.x), saturate(l.y), saturate(l.z)); 
    return o;
}

float maxV4(vec4 v,float c){
    return max(max(max(c,v.r),v.g),v.b);
}
vec4 unityPositionToLaya(vec4 pos) {
    vec4 newPos = vec4(-pos.x, pos.y, -pos.z, pos.w);
    return newPos;
}

vec2 TransformUV1(vec2 texcoord,vec4 tilingOffset) {
    vec2 transTexcoord=vec2(texcoord.x,texcoord.y-1.0)*tilingOffset.xy+vec2(tilingOffset.z,-tilingOffset.w);
    transTexcoord.x = fract(transTexcoord.x);
    transTexcoord.y = -1.0 * abs(fract(transTexcoord.y));
    transTexcoord.y+=1.0;
    return transTexcoord;
}

vec3 unpackScaleNormal(vec3 packednormal, float bumpScale)
{
    vec3 normal = packednormal.xyz * 2.0 - 1.0;
    //normal.y = -normal.y;//NOTE:because unity to LayaAir coordSystem.
    normal.xy *= bumpScale;
    return normal;
}