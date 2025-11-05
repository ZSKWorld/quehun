#ifdef CAMERA2D
    uniform mat3 u_view2D;
#endif

#ifdef SPRITE2DGLOBAL
#endif

#ifdef RENDERTEXTURE
    uniform vec3 u_InvertMat_0;
    uniform vec3 u_InvertMat_1;
#endif

#ifdef VERTEX_SIZE
    uniform vec4 u_vertexSize;
#endif

uniform vec3 u_NMatrix_0;
uniform vec3 u_NMatrix_1;
uniform vec2 u_size;

#ifdef MATERIALCLIP
    uniform vec4 u_mClipMatDir;
    uniform vec4 u_mClipMatPos;
#endif

uniform vec4 u_clipMatDir;
uniform vec4 u_clipMatPos;
varying vec2 v_cliped;
varying vec4 v_color;

void transfrom(vec2 pos, vec3 xDir, vec3 yDir, out vec2 outPos) {
    outPos.x = xDir.x * pos.x + xDir.y * pos.y + xDir.z;
    outPos.y = yDir.x * pos.x + yDir.y * pos.y + yDir.z;
}

void clip(inout vec2 globalPos) {
    vec4 clipMatDir;
    vec4 clipMatPos;
    #ifdef MATERIALCLIP
        clipMatDir = u_mClipMatDir;
        clipMatPos = u_mClipMatPos;
        float tx = clipMatPos.z;
        float ty = clipMatPos.w;
        float cmaxx = tx + clipMatDir.x;
        float cmaxy = ty + clipMatDir.w;
        float parentMinX = u_clipMatPos.x;
        float parentMinY = u_clipMatPos.y;
        float offsetx = u_clipMatPos.z - parentMinX;
        float offsety = u_clipMatPos.w - parentMinY;
        float parentMaxX = parentMinX + u_clipMatDir.x;
        float parentMaxY = parentMinY + u_clipMatDir.w;
        if(tx < parentMinX) {
            clipMatDir.x -= (parentMinX - tx);
            tx = clipMatPos.x = parentMinX;
        }
        if(cmaxx > parentMaxX) {
            clipMatDir.x -= (cmaxx - parentMaxX);
        }
        if(ty < parentMinY) {
            clipMatDir.w -= (parentMinY - ty);
            ty = clipMatPos.y = parentMinY;
        }
        if(cmaxy > parentMaxY) {
            clipMatDir.w -= (cmaxy - parentMaxY);
        }
        clipMatPos.zw = vec2(tx + offsetx, ty + offsety);
    #else
        clipMatDir = u_clipMatDir;
        clipMatPos = u_clipMatPos;
    #endif
    vec2 cliped;
    float clipw = length(clipMatDir.xy);
    float cliph = length(clipMatDir.zw);
    vec2 clippos = globalPos - clipMatPos.xy;
    if(clipw > 20000. && cliph > 20000.)
        cliped = vec2(0.5, 0.5);
    else {
        cliped = vec2(dot(clippos, clipMatDir.xy) / clipw / clipw, dot(clippos, clipMatDir.zw) / cliph / cliph);
    }
    globalPos = clippos + clipMatPos.zw;
    v_cliped = cliped;
}

void getGlobalPos(in vec2 localPos, out vec2 globalPos) {
    transfrom(localPos, u_NMatrix_0, u_NMatrix_1, globalPos);
}

void getProjectPos(in vec2 viewPos, out vec4 projectPos) {
    projectPos = vec4((viewPos.x / u_size.x - 0.5) * 2.0, (0.5 - viewPos.y / u_size.y) * 2.0, 0., 1.0);
    #ifdef INVERTY
        projectPos.y = -projectPos.y;
    #endif
}

void getViewPos(in vec2 globalPos, out vec2 viewPos) {
    #ifdef RENDERTEXTURE
        vec2 tempPos;
        transfrom(globalPos, u_InvertMat_0, u_InvertMat_1, tempPos);
        #ifdef CAMERA2D
            viewPos.xy = (u_view2D * vec3(tempPos, 1.0)).xy + u_size / 2.;
        #else
            viewPos.xy = tempPos;
        #endif
    #else
        #ifdef CAMERA2D
            viewPos.xy = (u_view2D * vec3(globalPos, 1.0)).xy + u_size / 2.;
        #else
            viewPos.xy = globalPos;
        #endif
    #endif
}

#ifdef TEXTUREVS
    struct vertexInfo {
        vec2 pos;
        vec4 color;
        vec2 cliped;
        vec4 texcoordAlpha;
        float useTex;
        float useClip;
        vec4 customs;
    };
    uniform float u_VertAlpha;
    varying vec4 v_texcoordAlpha;
    varying float v_useTex;
    varying float v_useClip;
    varying vec4 v_customs;

    void getVertexInfo(inout vertexInfo info) {
        info.texcoordAlpha.xy = a_posuv.zw;
        info.color = a_attribColor;
        info.color.a *= u_VertAlpha;
        info.color.xyz *= info.color.w;
        info.useTex = a_attribFlags.r;
        info.useClip = a_attribFlags.g;
        info.customs = a_customs;
        vec2 pos;
        #ifdef VERTEX_SIZE
            pos = (a_posuv.xy * u_vertexSize.zw) + u_vertexSize.xy;
        #else
            pos = a_posuv.xy;
        #endif
        info.pos = pos;
    }

    vec4 getPosition(in vec2 positionOS) {
        vec2 globalPos;
        #ifdef VERTEX_SIZE
            getGlobalPos(positionOS, globalPos);
        #else
            globalPos = positionOS;
        #endif
        clip(globalPos);
        vec2 viewPos;
        getViewPos(globalPos, viewPos);
        vec4 pos;
        getProjectPos(viewPos, pos);
        return pos;
    }
#endif

#ifdef BASERENDER2D
    varying vec2 v_texcoord;
    uniform vec4 u_baseRenderColor;
    struct vertexInfo {
        vec4 color;
        vec2 uv;
        vec2 pos;
        vec2 lightUV;
    };
    #ifdef LIGHT2D_ENABLE
        varying vec2 v_lightUV;
        uniform vec4 u_LightAndShadow2DParam;
        void lightAndShadow(vertexInfo info) {
            v_lightUV = info.lightUV;
        }
        void invertMat(inout vec3 v1, inout vec3 v2) {
            float a1 = v1.x;
            float b1 = v2.x;
            float c1 = v1.y;
            float d1 = v2.y;
            float tx1 = v1.z;
            float ty1 = v2.z;
            float n = a1 * d1 - b1 * c1;
            v1.x = d1 / n;
            v2.x = -b1 / n;
            v1.y = -c1 / n;
            v2.y = a1 / n;
            v1.z = (c1 * ty1 - d1 * tx1) / n;
            v2.z = -(a1 * ty1 - b1 * tx1) / n;
        }
    #endif

    vec4 linearToGamma(in vec4 value) {
        return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.a);
    }

    void getVertexInfo(inout vertexInfo info) {
        info.pos = a_position.xy;
        info.color = vec4(1.0, 1.0, 1.0, 1.0);
        #ifdef COLOR
            info.color = a_color;
            info.color.rgb *= a_color.a;
        #endif
            info.color *= linearToGamma(u_baseRenderColor);
        #ifdef UV
            info.uv = a_uv;
        #endif
        #ifdef LIGHT2D_ENABLE
            vec2 global;
            getGlobalPos(info.pos, global);
            info.lightUV.x = (global.x - u_LightAndShadow2DParam.x) / u_LightAndShadow2DParam.z;
            info.lightUV.y = 1.0 - (global.y - u_LightAndShadow2DParam.y) / u_LightAndShadow2DParam.w;
        #endif
    }

    vec4 getPosition(in vec2 positionOS) {
        vec2 globalPos;
        getGlobalPos(positionOS, globalPos);
        clip(globalPos);
        vec2 viewPos;
        getViewPos(globalPos, viewPos);
        vec4 pos;
        getProjectPos(viewPos, pos);
        return pos;
    }
#endif
